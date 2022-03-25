from AI.STT.API.google import upload_file, transcribe_gcs
from AI.Summarize.summarize import summery
from AI.Wordslist.wordslist import wordslist


def ai(file_path, file_name):
    upload_file(file_path, file_name)
    text = transcribe_gcs(file_name)
    summary = summery(text)
    cload_keyword = wordslist(text)
    return text, summary, cload_keyword
