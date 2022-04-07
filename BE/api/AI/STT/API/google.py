from google.cloud import storage
import sys, os, re
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from hanspell import spell_checker
from config.settings import BASE_DIR
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(BASE_DIR) + "/AI/STT/API/festive-vim-345604-8faec2e2d112.json"


def upload_file(file_path, file_name):
    storage_client = storage.Client()
    buckets = list(storage_client.list_buckets())
    bucket = storage_client.get_bucket("glassix")
    blob = bucket.blob("audio/" + file_name)
    blob.upload_from_filename(file_path + file_name)
    print("success")


def transcribe_gcs(file_name):
    from google.cloud import speech


    gcs_uri = "gs://glassix/audio/" + file_name
    client = speech.SpeechClient()
    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
        sample_rate_hertz=48000,
        audio_channel_count = 1,
        language_code="ko",
    )

    operation = client.long_running_recognize(config=config, audio=audio)
    print("Waiting for operation to complete...")
    response = operation.result(timeout=90)
    STT_text = ""

    for result in response.results:
        text = result.alternatives[0].transcript
        STT_text += (text + "\n")
    print(STT_text)
    text = STT_text.replace('\n',' ')
    text = ' '.join(text.split())
    p = re.compile('\S\b*다\s')
    text = re.sub(p,'다. ',text)
    p = re.compile('\S\b*요\s')
    text = re.sub(p,'요. ',text)
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
