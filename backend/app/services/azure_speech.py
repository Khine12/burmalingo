import subprocess

import azure.cognitiveservices.speech as speechsdk
from fastapi import HTTPException

from app.config import settings


def _convert_to_raw_pcm(audio_bytes: bytes) -> bytes:
    """Convert any browser audio format to raw 16 kHz mono 16-bit PCM.

    Azure's PushAudioInputStream (default format) expects exactly this layout.
    Browsers send webm/opus (Chrome, Firefox, Android) or mp4/aac (Safari, iPhone)
    — neither is accepted without conversion.

    Uses ffmpeg's stdin→stdout pipe so no temp files are created.
    Raises 503 if ffmpeg is not installed, 422 if conversion fails.
    """
    try:
        result = subprocess.run(
            [
                "ffmpeg",
                "-y",            # allow overwrite (required for pipe targets)
                "-i", "pipe:0",  # read from stdin
                "-ar", "16000",  # resample to 16 kHz
                "-ac", "1",      # downmix to mono
                "-f", "s16le",   # raw signed-16-bit little-endian PCM, no container
                "pipe:1",        # write to stdout
            ],
            input=audio_bytes,
            capture_output=True,
            timeout=30,
        )
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="ffmpeg is not installed on the server — contact support",
        )
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=422, detail="Audio conversion timed out (>30 s)")

    if result.returncode != 0:
        stderr = result.stderr.decode(errors="replace")[:400]
        raise HTTPException(
            status_code=422,
            detail=f"Audio conversion failed: {stderr}",
        )

    return result.stdout


def score_pronunciation(audio_bytes: bytes, reference_text: str) -> dict:
    """Call Azure Cognitive Services to score pronunciation of audio against reference_text.

    Accepts any audio format the browser might send (webm/opus, mp4/aac, wav).
    Internally converts to raw PCM before passing to the Azure SDK.

    Returns a dict of score keys ready to be passed directly to log_assessment().

    Raises:
        503 — Azure credentials not configured / ffmpeg missing
        422 — audio unreadable or Azure could not recognise speech
        502 — Azure returned a cancellation/error result
    """
    if not settings.AZURE_SPEECH_KEY or not settings.AZURE_SPEECH_REGION:
        raise HTTPException(status_code=503, detail="Azure Speech service is not configured")

    # Convert browser audio to the raw PCM layout that PushAudioInputStream expects
    raw_pcm = _convert_to_raw_pcm(audio_bytes)

    speech_config = speechsdk.SpeechConfig(
        subscription=settings.AZURE_SPEECH_KEY,
        region=settings.AZURE_SPEECH_REGION,
    )

    pronunciation_config = speechsdk.PronunciationAssessmentConfig(
        reference_text=reference_text,
        grading_system=speechsdk.PronunciationAssessmentGradingSystem.HundredMark,
        granularity=speechsdk.PronunciationAssessmentGranularity.Phoneme,
        enable_miscue=True,
    )
    pronunciation_config.enable_prosody_assessment()

    # Default PushAudioInputStream format is 16 kHz / 16-bit / mono — matches our PCM
    stream = speechsdk.audio.PushAudioInputStream()
    stream.write(raw_pcm)
    stream.close()
    audio_config = speechsdk.audio.AudioConfig(stream=stream)

    recognizer = speechsdk.SpeechRecognizer(
        speech_config=speech_config,
        audio_config=audio_config,
    )
    pronunciation_config.apply_to(recognizer)

    result = recognizer.recognize_once()

    if result.reason == speechsdk.ResultReason.NoMatch:
        raise HTTPException(status_code=422, detail="Could not recognise speech in the audio")

    if result.reason == speechsdk.ResultReason.Canceled:
        cancellation = speechsdk.CancellationDetails(result)
        raise HTTPException(
            status_code=502,
            detail=f"Azure Speech error: {cancellation.reason} — {cancellation.error_details}",
        )

    pa = speechsdk.PronunciationAssessmentResult(result)

    return {
        "transcript":          result.text,
        "pronunciation_score": pa.pronunciation_score,
        "accuracy_score":      pa.accuracy_score,
        "fluency_score":       pa.fluency_score,
        "completeness_score":  pa.completeness_score,
        "prosody_score":       getattr(pa, "prosody_score", None),
        "overall_score":       pa.pronunciation_score,
    }
