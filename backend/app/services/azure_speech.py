import shutil
import subprocess
import tempfile
import os
import threading

import azure.cognitiveservices.speech as speechsdk
from fastapi import HTTPException

from app.config import settings


RECEIVED_WEBM_PATH = os.path.join(tempfile.gettempdir(), "burmalingo_received.webm")
EBML_MAGIC = b"\x1a\x45\xdf\xa3"


def _safe_unlink(path: str | None, label: str) -> None:
    if not path or not os.path.exists(path):
        return
    try:
        os.unlink(path)
    except (PermissionError, OSError) as e:
        # Best-effort cleanup — a leftover temp file is harmless, a crashed
        # request is not.
        print(f"[cleanup] could not delete {label} ({path}): {e}", flush=True)


def _convert_to_wav(audio_bytes: bytes, wav_path: str) -> None:
    print(f"[ffmpeg] input_bytes={len(audio_bytes)}", flush=True)
    print(f"[ffmpeg] first16_hex={audio_bytes[:16].hex()}", flush=True)

    if audio_bytes[:4] != EBML_MAGIC:
        print(
            f"[ffmpeg] WARNING: received bytes do NOT start with the WebM/EBML "
            f"magic ({EBML_MAGIC.hex()}); got {audio_bytes[:4].hex()}. The data "
            f"arriving from the frontend is not a valid webm container — this is "
            f"not an ffmpeg/conversion problem.",
            flush=True,
        )

    # Save to a permanent (non-temp) path so it survives the request for
    # inspection. A normal buffered "wb" write always writes the full byte
    # string or raises — unlike os.write(), which is allowed to do a short
    # write — so this is also the fix for any truncated-write suspicion.
    with open(RECEIVED_WEBM_PATH, "wb") as f:
        f.write(audio_bytes)
    written = os.path.getsize(RECEIVED_WEBM_PATH)
    print(
        f"[ffmpeg] webm written={written} expected={len(audio_bytes)} "
        f"match={written == len(audio_bytes)} path={RECEIVED_WEBM_PATH}",
        flush=True,
    )

    # Probe the RECEIVED webm itself (before any conversion) so a broken
    # input file can be told apart from a broken ffmpeg invocation.
    try:
        recv_probe = subprocess.run(
            [
                "ffprobe", "-v", "error",
                "-show_entries", "format=format_name,duration",
                "-of", "default=noprint_wrappers=1",
                RECEIVED_WEBM_PATH,
            ],
            capture_output=True, timeout=10,
        )
        recv_out = recv_probe.stdout.decode(errors="replace").strip()
        recv_err = recv_probe.stderr.decode(errors="replace").strip()
        if recv_probe.returncode == 0:
            print(f"[ffprobe] received.webm OK: {recv_out}", flush=True)
        else:
            print(
                f"[ffprobe] received.webm INVALID (exit {recv_probe.returncode}): {recv_err}",
                flush=True,
            )
    except Exception as probe_err:
        print(f"[ffprobe] received.webm probe failed: {probe_err}", flush=True)

    cmd = [
        "ffmpeg", "-y",
        "-i", RECEIVED_WEBM_PATH,
        "-ar", "16000",
        "-ac", "1",
        "-c:a", "pcm_s16le",
        wav_path,
    ]
    print(f"[ffmpeg] cmd={cmd}", flush=True)
    try:
        result = subprocess.run(cmd, capture_output=True, timeout=30)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="ffmpeg is not installed on the server — contact support",
        )
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=422, detail="Audio conversion timed out (>30 s)")

    if result.returncode != 0:
        stderr_full = result.stderr.decode(errors="replace")
        print(
            f"[ffmpeg] returncode={result.returncode}\n[ffmpeg] stderr:\n{stderr_full}",
            flush=True,
        )
        raise HTTPException(
            status_code=422,
            detail=f"Audio conversion failed (exit {result.returncode}): {stderr_full}",
        )

    wav_size = os.path.getsize(wav_path)
    print(f"[ffmpeg] output wav size={wav_size} bytes", flush=True)

    # Confirm format and duration via ffprobe
    try:
        probe = subprocess.run(
            [
                "ffprobe", "-v", "error",
                "-show_entries",
                "format=duration:stream=sample_rate,channels,bits_per_raw_sample",
                "-of", "default=noprint_wrappers=1",
                wav_path,
            ],
            capture_output=True, timeout=10,
        )
        print(f"[ffprobe] {probe.stdout.decode(errors='replace').strip()}", flush=True)
    except Exception as probe_err:
        print(f"[ffprobe] failed: {probe_err}", flush=True)

    # Save a debug copy so you can play it and confirm it contains voice
    debug_path = os.path.join(tempfile.gettempdir(), "burmalingo_debug.wav")
    try:
        shutil.copy2(wav_path, debug_path)
        print(f"[debug] WAV saved to {debug_path}", flush=True)
    except Exception as copy_err:
        print(f"[debug] Could not save debug WAV: {copy_err}", flush=True)


def score_pronunciation(audio_bytes: bytes, reference_text: str) -> dict:
    if not settings.AZURE_SPEECH_KEY or not settings.AZURE_SPEECH_REGION:
        raise HTTPException(status_code=503, detail="Azure Speech service is not configured")

    wav_path = None
    recognizer = None
    audio_config = None
    try:
        wav_fd, wav_path = tempfile.mkstemp(suffix=".wav")
        os.close(wav_fd)  # release fd immediately; ffmpeg writes via -y

        _convert_to_wav(audio_bytes, wav_path)

        speech_config = speechsdk.SpeechConfig(
            subscription=settings.AZURE_SPEECH_KEY,
            region=settings.AZURE_SPEECH_REGION,
        )
        speech_config.speech_recognition_language = "en-US"

        # Unscripted assessment: reference_text must be empty, NOT the prompt.
        # A non-empty reference_text puts Azure in scripted mode, which biases
        # recognition toward that exact text — it'll happily "recognize" the
        # prompt itself regardless of what the user actually said. The prompt
        # is only used downstream for the GPT-4o topic-relevance check.
        pronunciation_config = speechsdk.PronunciationAssessmentConfig(
            reference_text="",
            grading_system=speechsdk.PronunciationAssessmentGradingSystem.HundredMark,
            granularity=speechsdk.PronunciationAssessmentGranularity.Phoneme,
            enable_miscue=True,
        )
        pronunciation_config.enable_prosody_assessment()

        audio_config = speechsdk.audio.AudioConfig(filename=wav_path)

        recognizer = speechsdk.SpeechRecognizer(
            speech_config=speech_config,
            audio_config=audio_config,
        )
        pronunciation_config.apply_to(recognizer)

        done = threading.Event()
        recognized_results: list = []
        canceled_detail = None

        def on_recognized(evt):
            r = evt.result
            print(f"[azure] recognized reason={r.reason} text={r.text!r}", flush=True)
            if r.reason == speechsdk.ResultReason.RecognizedSpeech:
                recognized_results.append(r)

        def on_session_stopped(evt):
            print("[azure] session_stopped", flush=True)
            done.set()

        def on_canceled(evt):
            nonlocal canceled_detail
            canceled_detail = speechsdk.CancellationDetails(evt.result)
            print(
                f"[azure] canceled reason={canceled_detail.reason} "
                f"error_code={canceled_detail.error_code} "
                f"error_details={canceled_detail.error_details}",
                flush=True,
            )
            done.set()

        recognizer.recognized.connect(on_recognized)
        recognizer.session_stopped.connect(on_session_stopped)
        recognizer.canceled.connect(on_canceled)

        recognizer.start_continuous_recognition()
        done.wait(timeout=120)
        recognizer.stop_continuous_recognition()

    finally:
        # Drop references to the Azure SDK objects first — AudioConfig keeps
        # the WAV file open, and on Windows an open file can't be deleted
        # until its handle is released (unlike POSIX, which allows it).
        recognizer = None
        audio_config = None
        _safe_unlink(wav_path, "wav")

    if canceled_detail and canceled_detail.reason == speechsdk.CancellationReason.Error:
        raise HTTPException(
            status_code=502,
            detail=f"Azure Speech error: {canceled_detail.reason} — {canceled_detail.error_details}",
        )

    if not recognized_results:
        raise HTTPException(status_code=422, detail="Could not recognise speech in the audio")

    # Aggregate scores across segments, weighted by word count
    transcripts: list[str] = []
    total_words = 0
    acc_sum = flu_sum = comp_sum = pro_sum = pros_sum = 0.0
    pros_words = 0

    for r in recognized_results:
        text = (r.text or "").strip()
        wc = len(text.split())
        if wc == 0:
            print("[azure] skipping segment with no recognized words", flush=True)
            continue

        try:
            pa = speechsdk.PronunciationAssessmentResult(r)
            accuracy = pa.accuracy_score
            fluency = pa.fluency_score
            completeness = pa.completeness_score
            pronunciation = pa.pronunciation_score
        except AttributeError as e:
            print(f"[azure] skipping segment — no pronunciation assessment data: {e}", flush=True)
            continue

        transcripts.append(text)
        total_words += wc
        acc_sum  += accuracy      * wc
        flu_sum  += fluency       * wc
        comp_sum += completeness  * wc
        pro_sum  += pronunciation * wc
        prosody = getattr(pa, "prosody_score", None)
        if prosody is not None:
            pros_sum   += prosody * wc
            pros_words += wc

    if total_words == 0:
        raise HTTPException(status_code=422, detail="Could not extract pronunciation assessment from the recognized speech")

    w = total_words
    return {
        "transcript":          " ".join(transcripts),
        "accuracy_score":      round(acc_sum  / w, 2),
        "fluency_score":       round(flu_sum  / w, 2),
        "completeness_score":  round(comp_sum / w, 2),
        "pronunciation_score": round(pro_sum  / w, 2),
        "prosody_score":       round(pros_sum / pros_words, 2) if pros_words else None,
        "overall_score":       round(pro_sum  / w, 2),
    }
