from wordcloud import WordCloud
import matplotlib.pyplot as plt
from collections import Counter
from konlpy.tag import Okt
from PIL import Image
import numpy as np


okt = Okt()
nouns = okt.nouns("""KT(030200)가 ‘기업의 일하는 방식의 변화에 디지털기술을 더하다’라는 주제로 디지코(DIGICO) 콘퍼런스 ‘디지털-X 서밋 2022’를 다음달 14일 온라인으로 개최한다고 22일 밝혔다.
KT는 올해 ‘디지털-X 서밋’에서 디지털전환(DX)이 필요한 기업들에게 더욱 실질적인 정보를 제공하기 위해 인공지능컨택센터(AICC), 로봇, 통신DX, 안전DX 등을 핵심 내용으로 한 사업 설명과 다양한 고객 사례를 발표한다.
행사는 키노트 발표 외에 총 4개의 파트로 구성된다. 키노트에서는 신수정Enterprise부문장이 ‘기업의 성공적인 DX 추진을 위한 KT의 역할’ 발표를 통해 ‘DX Enabler & Partner’로서 KT의 전략과 경쟁력에 대해서 소개할 계획이다.
첫 파트에서는 ‘일하는 방식의 변화에 인공지능(AI)을 더하다’를 주제로 최준기 AI/빅데이터 본부장 상무가 ‘AICC의 추진현황 및 발전방향’, 기업고객본부장 박정준 상무가 ‘AICC 기술도입 사례’를 각각 발표한다.
두 번째 파트는 ‘일하는 방식의 변화에 로봇을 더하다’라는 주제로 이상호 AI로봇사업단장이 ‘로봇사업의 현재와 미래’를 주제로 발표를 하고, 이어서 기업고객담당 이길욱 상무의 ‘KT로봇 사업 도입 사례’ 발표를 들을 수 있다.
세 번째 파트는 통신 사업 관련한 사업 내용이 발표된다, ‘일하는 방식의 변화에 통신을 더하다’라는 주제로, 민혜병 Enterprise서비스DX 본부장이 ‘통신DX 적용을 통한 기업가치의 혁신’을 발표하고, 양방향 예약알림, 위협알림 차단, 5G 모바일 에지 컴퓨팅(MEC) 등을 적용한 다양한 기업 사례들을 소개한다.
네 번째 파트는 ‘일하는 방식의 변화에 안전을 더하다’ 라는 주제로, DX플랫폼사업본부장 김영식 상무가 ‘AI를 활용한 안전한 사업환경 조성’을, 노형래 기업고객담당이 ‘산업안전DX 기술도입 사례’ 발표를 각각 진행한다.
이번 ‘디지털-X 서밋 2022’는 KT Enterprise 홈페이지에서 사전 등록 후 참가가 가능하다. 사전등록, 설문, 컨설팅 요청자를 대상으로 추첨을 통해 소피텔 숙박권, 밀리의 서재 이용권, 스타벅스 기프티쇼 등을 제공한다.
신수정 부문장은 “올해 콘퍼런스에서 여러 분야의 DX 사례와 KT의 주요 사업, 기업의 DX 사례 등 다양한 내용을 소개한다”며 “대기업뿐 아니라 중소기업, 벤처기업, 공공분야 등의 DX 추진에도 많은 도움이 될 것으로 기대한다”고 말했다.""")
words = [n for n in nouns if len(n) > 1] # 단어의 길이가 1개인 것은 제외
c = Counter(words)
wc = WordCloud(font_path='./resource/H2GSRB.TTF', width=400, height=400, scale=2.0, max_font_size=250)
gen = wc.generate_from_frequencies(c)
plt.figure()
plt.imshow(gen)