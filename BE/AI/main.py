from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration

from fastapi.responses import FileResponse
from wordcloud import WordCloud
import matplotlib.pyplot as plt
from collections import Counter
from konlpy.tag import Okt
from PIL import Image
import numpy as np

app = FastAPI()

origins = [
    "http://localhost:8080",#백엔드 서버 주소
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tokenizer = PreTrainedTokenizerFast.from_pretrained('digit82/kobart-summarization')
model = BartForConditionalGeneration.from_pretrained('digit82/kobart-summarization')

# @app.AI("/voice")
# async def vtt(file : UploadFile):
#     return None

@app.post("/summarize")
async def summery(text : str):

    raw_input_ids = tokenizer.encode(text)
    input_ids = [tokenizer.bos_token_id] + raw_input_ids + [tokenizer.eos_token_id]
    summary_ids = model.generate(torch.tensor([input_ids]),  num_beams=4,  max_length=512,  eos_token_id=1)
    output = tokenizer.decode(summary_ids.squeeze().tolist(), skip_special_tokens=True)
    return output

@app.post("/wordcloud")
async def wordcloud(text : str):
    okt = Okt()
    nouns = okt.nouns(text)
    words = [n for n in nouns if len(n) > 1] # 단어의 길이가 1개인 것은 제외
    return words
