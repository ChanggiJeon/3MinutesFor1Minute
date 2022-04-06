import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration


tokenizer = PreTrainedTokenizerFast.from_pretrained('digit82/kobart-summarization')
model = BartForConditionalGeneration.from_pretrained('digit82/kobart-summarization')


def summary(text : str):
    raw_input_ids = tokenizer.encode(text)
    input_ids = [tokenizer.bos_token_id] + raw_input_ids + [tokenizer.eos_token_id]
    summary_ids = model.generate(torch.tensor([input_ids]),  num_beams=4,  max_length=512,  eos_token_id=1)
    output = tokenizer.decode(summary_ids.squeeze().tolist(), skip_special_tokens=True)
    return output

# text = """LG에너지솔루션이 러시아의 우크라이나 침공이 시작된 이후 국내 증시에서 공매도 거래대금이 가장 많았던 종목인 것으로 나타났다.
# 26일 한국거래소에 따르면 LG에너지솔루션은 코스피200에 편입된 지난 11일부터 전날까지 공매도 거래대금이 9217억원을 기록했다. 이는 공매도 대상인 코스피200·코스닥150지수 종목 가운데 가장 많은 액수다.
# 지난 11일 부터 2주간 LG에너지솔루션의 전체 거래대금 대비 공매도 거래대금의 비중은 22.84%로, 공매도 비중 역시 가장 컸다.
# 미국 연방준비제도의 긴축 이슈, 러시아의 우크라이나 침공 등으로 주가 하락에 대한 우려가 커지면서 투기적 거래가 늘어난 것이 공매도가 늘어난 이유로 풀이된다.
# 이는 러시아의 우크라이나 침공에 따라 니켈 등의 원자재 가격이 급등하고 이것이 수익성에 대한 우려로 번지면서 2차전지 기업 전반의 투자 심리 위축으로 이어질 것이란 관측 때문에 나타나는 현상이다.
# LG에너지솔루션의 주가는 니켈값 급등 등의 영향으로 지난 8일 종가 기준 신저가인 41만500원까지 내려갔다. 코스피200에 편입된 지난 11일부터 15일까지는 3거래일 연속 신저가를 경신했다.
# 이 기간 LG에너지솔루션의 공매도 거래액은 6580억원으로 전체 거래대금(1조8329억원)의 35.9%를 차지했다.
# 다만 이후에는 니켈 가격이 안정되고 연준이 기준금리 인상을 결정하는 등 불확실성이 일부 해소되면서 주가는 반등하는 모양새다.
# LG에너지솔루션이 캐나다에 미국 완성차 업체 스텔란티스와 배터리 합작공장을 설립하고 미국 내 배터리 단독공장도 추가로 짓기로 하는 등 호재도 잇따랐다. 이에따라 주가는 지난 16일부터 8거래일 연속 상승하면서 시가총액은 전날 100조원대를 회복했다.
# 한편, LG에너지솔루션 다음으로는 삼성전자(7129억원), 두산중공업(4957억원), HMM(4024억원), 카카오(2869억원) 등의 공매도 거래대금이 많았다.
# 종목별 전체 거래대금 대비 공매도 거래대금의 비중으로는 포스코케미칼(18.40%), 호텔신라(18.18%), 엔지켐생명과학(17.33%) 등이 LG에너지솔루션의 뒤를 이었다.
# 유가증권시장과 코스닥시장 전체 공매도 거래대금은 지난 14일 1조17억원까지 늘었다가 증시가 반등하면서 지난 25일 4500억원대로 감소했다."""

# print(summary(text))
# print(summarize(text, ratio=0.4))
