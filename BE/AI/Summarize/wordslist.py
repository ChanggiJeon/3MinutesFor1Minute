from konlpy.tag import Okt

async def wordcloud(text : str):
    okt = Okt()
    nouns = okt.nouns(text)
    words = [n for n in nouns if len(n) > 1] # 단어의 길이가 1개인 것은 제외
    return words
