from google.cloud import storage
from hanspell import spell_checker
import re
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = 'C:/Users/multicampus/Desktop/S06P22D202/BE/api/AI/STT/API/ssafy-345204-8ee8c7463811.json'


def upload_file(file_path, file_name):
    storage_client = storage.Client()
    buckets = list(storage_client.list_buckets())
    bucket = storage_client.get_bucket("ssafy_data")
    blob = bucket.blob("audio/" + file_name)
    blob.upload_from_filename(file_path + file_name)
    print(buckets)


def transcribe_gcs(file_name):
    from google.cloud import speech


    gcs_uri = "gs://ssafy_data/audio/" + file_name
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
    response = operation.result(timeout=90)
    STT_text = ""

    for result in response.results:
        text = result.alternatives[0].transcript
        STT_text += (text + "\n")
    
    text = STT_text.replace('\n',' ')
    text = ' '.join(text.split())
    p = re.compile('\S\b*다\s')
    text = re.sub(p,'다. ',text)
    input_convert = text.replace('.','.#').split('#')
    input_list =  [""]

    for i in input_convert:
        if len(input_list[-1]) + len(i) < 500:
            input_list[-1] += i
        else:
            input_list.append(i)  
    
    result = spell_checker.check(input_list)

    fixed_text = ''
    for i in result:
        fixed_text += i.checked

    return fixed_text


# if __name__ == "__main__":
#     upload_file("C:/Users/multicampus/Desktop/S06P22D202/BE/api/media/test/", "article.wav")

text = transcribe_gcs("article.wav")
print(text)