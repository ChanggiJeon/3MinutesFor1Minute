from google.cloud import storage
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./ssafy-345204-8ee8c7463811.json"


def upload_file(file_path, file_name):

    storage_client = storage.Client()

    buckets = list(storage_client.list_buckets())

    bucket = storage_client.get_bucket("ssafy_data")

    blob = bucket.blob('audio/'+file_name)
    blob.upload_from_filename(file_path)
    print(buckets)


async def transcribe_gcs(file_name):
    """Asynchronously transcribes the audio file specified by the gcs_uri."""
    from google.cloud import speech

    gcs_uri = "gs://ssafy_data/audio/"+file_name
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=48000,
        audio_channel_count = 2,
        language_code="ko",
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Waiting for operation to complete...")
    response = await operation.result(timeout=90)

    STT_text = str
    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    for result in response.results:
        # The first alternative is the most likely one for this portion.
        text = result.alternatives[0].transcript
        STT_text += text
    return STT_text

# if __name__ == "__main__":
#     transcribe_gcs()
