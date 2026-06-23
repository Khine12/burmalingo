from xml.sax.saxutils import escape

import azure.cognitiveservices.speech as speechsdk
from azure.storage.blob import BlobServiceClient, ContentSettings

from app.config import settings

# HD voices (preview "DragonHDLatestNeural" voices, confirmed available in the
# eastus region) used for the dialogue.
HD_VOICES = {
    "A": "en-US-Aria:DragonHDLatestNeural",
    "B": "en-US-Andrew:DragonHDLatestNeural",
    "C": "en-US-Emma:DragonHDLatestNeural",
}

# Speech rate per proficiency level — natural pace for lower levels,
# progressively faster for more advanced learners.
LEVEL_RATES = {
    "beginner": "0%",
    "elementary": "0%",
    "pre_intermediate": "0%",
    "intermediate": "+10%",
    "upper_intermediate": "+10%",
}

_blob_service_client: BlobServiceClient | None = None


def build_dialogue_ssml(turns: list[tuple[str, str]], rate: str) -> str:
    """Build multi-voice SSML for a dialogue.

    turns: list of (speaker, text) pairs where speaker is "A" or "B".
    """
    body = "".join(
        f'<voice name="{HD_VOICES[speaker]}"><prosody rate="{rate}">{escape(text)}</prosody></voice>'
        for speaker, text in turns
    )
    return (
        '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">'
        f"{body}</speak>"
    )


def _synthesize_ssml(ssml: str) -> bytes:
    if not settings.AZURE_SPEECH_KEY or not settings.AZURE_SPEECH_REGION:
        raise RuntimeError("Azure Speech service is not configured")

    speech_config = speechsdk.SpeechConfig(
        subscription=settings.AZURE_SPEECH_KEY,
        region=settings.AZURE_SPEECH_REGION,
    )
    speech_config.set_speech_synthesis_output_format(
        speechsdk.SpeechSynthesisOutputFormat.Audio24Khz96KBitRateMonoMp3
    )

    # audio_config=None means the SDK does not also play to the default
    # speaker — it just returns the encoded bytes in result.audio_data.
    synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=None)
    result = synthesizer.speak_ssml_async(ssml).get()

    if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print(
            f"[tts] synthesized {len(result.audio_data)} bytes, "
            f"duration={result.audio_duration.total_seconds():.2f}s",
            flush=True,
        )
        return result.audio_data

    if result.reason == speechsdk.ResultReason.Canceled:
        details = speechsdk.SpeechSynthesisCancellationDetails(result)
        raise RuntimeError(f"Azure TTS canceled: {details.reason} — {details.error_details}")

    raise RuntimeError(f"Azure TTS failed with unexpected reason: {result.reason}")


def _get_container_client():
    global _blob_service_client
    if not settings.AZURE_STORAGE_CONNECTION_STRING or not settings.AZURE_STORAGE_CONTAINER:
        raise RuntimeError("Azure Blob storage is not configured")
    if _blob_service_client is None:
        _blob_service_client = BlobServiceClient.from_connection_string(
            settings.AZURE_STORAGE_CONNECTION_STRING
        )
    return _blob_service_client.get_container_client(settings.AZURE_STORAGE_CONTAINER)


def upload_audio(audio_bytes: bytes, filename: str) -> str:
    """Upload mp3 bytes to the Blob container and return its URL.

    The container's public access level controls whether this URL is
    actually reachable without a SAS token — it must be set to "Blob"
    (anonymous read access for blobs) in the Azure portal.
    """
    container = _get_container_client()
    blob_client = container.get_blob_client(filename)
    blob_client.upload_blob(
        audio_bytes,
        overwrite=True,
        content_settings=ContentSettings(content_type="audio/mpeg"),
    )
    return blob_client.url


def generate_lesson_audio(turns: list[tuple[str, str]], slug: str, level: str) -> str:
    """Synthesize the dialogue at the rate for `level`, upload it, and return the URL."""
    rate = LEVEL_RATES[level]
    ssml = build_dialogue_ssml(turns, rate=rate)
    audio_bytes = _synthesize_ssml(ssml)
    return upload_audio(audio_bytes, f"{slug}.mp3")
