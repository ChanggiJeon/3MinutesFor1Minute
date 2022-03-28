## 0. 사용법(설치)

#### 1. conda env create -f environment.yaml

#### 2. conda activate ai

#### (장고에 AI 합친 뒤, 다시 conda환경 설정할 예정입니다.)



#### Google STT API사용시()

```
1.리눅스 SDK 설치
https://cloud.google.com/sdk/docs/install#linux
윈도우 SDK 설치
https://cloud.google.com/sdk/docs/install#windows

2.설치 후 google계정 연결하고, 설정 해야함.(개인적으로 테스트 원하시면 말씀해주세요.)
```





## 1. STT Model 학습.

#### 1. 로컬 -> 학습 서버로 데이터 전송

1. ##### 데이터 직접 전송

   1. AI Hub의 데이터 였으므로 AI Hub에서 Ubuntu용 다운로드 파일인 INNORIX를 사용

      ```
      INNORIX는 Ubuntu 18.04에 한해 지원하며(GUI환경), Terminal, CLI환경에서는 사용할 수 없다.(공식답변)
      ```

   2. scp 사용

      ```
      scp 파일명 계정@IP:파일저장할서버경로
      ex) scp test.txt root@192.168.0.8:/scptest
      
      포트가 막힌건지, 아니면 싸피 서버 보안때문에 안되는 것인지 모르겠지만.
      Denied가 뜬다.
      ```

      

2. ##### 구글 드라이브 구매 및 파일 업로드

   1) 폴더를 올리니 속도가 매우 느리다.

   2) zip파일을 올리기 -> 그래도 속도가 상당히 느림

   3) Cyberduck 파일 전송 프로그램으로 업로드함.(1시간 만에 완료!)

      

3. ##### 구글 드라이브에서 다운로드(구글 드라이브가 보안 업데이트를 해서 다운로드 방법이 점점 복잡해짐.)

   1) wget 사용 -> permission denied

      ```
      wget --load-cookies ~/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies ~/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id={FILEID}' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id={FILEID}" -O {FILENAME} && rm -rf ~/cookies.txt
      ```

   2) gdown.pl으로 드라이브 파일 다운로드 -> 어느정도 받다가 403 forbbiden

      ```
      wget https://raw.github.com/circulosmeos/gdown.pl/master/gdown.pl
      chmod u+x gdown.pl
      ./gdown.pl 'https://docs.google.com/uc?export=download&id={FILEID}' {FILENAME}
      ```

   3) curl 사용 -> permission denied

      ```
      #!/bin/bash
      
      FILEID=$1
      FILENAME=$2
      
      curl -sc ~/cookie.txt "https://drive.google.com/uc?export=download&id=${FILEID}" > /dev/null
      
      curl -Lb ~/cookie.txt "https://drive.google.com/uc?export=download&confirm=`awk '/_warning_/ {print $NF}' ~/cookie.txt`&id=${FILEID}" -o ${FILENAME}
      
      chmod u+x gdown.sh
      ./gdown.sh {FILEID} {FILENAME}	
      ```

   4. pip install gdown 사용

      ```
      공개로 설정했는데도 자꾸 설정 안했다고 거절뜸!
      -> 안되서 그냥 잤는데 다음날 일어나니 다운이 된다.
      -> 왜 그런지 정확히는 알 수 없지만, 공개하고 몇 시간이 지나야 가능한듯 싶음.
      -> 깃 허브 답변.
      
      Access denied with the following error:
      
       	Too many users have viewed or downloaded this file recently. Please
      	try accessing the file again later. If the file you are trying to
      	access is particularly large or is shared with many people, it may
      	take up to 24 hours to be able to view or download the file. If you
      	still can't access a file after 24 hours, contact your domain
      	administrator. 
      라고 되어있지만 깃허브를 열심히 찾아본 결과 자기들도 왜 뜨는지 해결방안이 뭔지 모름
      용량을 줄여서 된 사람도 있고. 기다렸더니 된 사람도 있고. 다양함.
      ```

   5. pip install gshell 사용!!(해결!!!!)

      ```
      pip install gshell
      gshell init
      terminal 창에 뜨는 연결 링크로 사용할 google 계정을 연결하면 된다.
      
      >> 학습데이터 옮기는데만 3일을 내리 삽질하니 기쁘다기보다 현타가 심하게 왔다.
      >> 생각해보면 모델을 학습 시킨 뒤에 다시 꺼내와야하므로 계정 연결하는 법을 찾는게 훨씬 빨랐을 것이다.
      >> ...하...
      ```

   6. mobaxterm

      ```
      컨설턴트님, 다른 조원분들께 상담해본 결과 mobaxterm을 사용해도 좋다고 한다!
      https://mobaxterm.mobatek.net/ 를 사용하자.
      ```

4. GPU 서버

   1. 용량부족

      ```
      1. 용량확인 df -h(보기 좋게 표시)
      2. 학습용 데이터는 home/team1 폴더에 저장하지 말고, data/team1/에 저장해서 사용하자!(300GB넘는다!)
         학습데이터 경로는 pwd명령어로 경로 확인 후, 절대경로로 집어 넣으면 OK
      ```

   2. 학습진행

      ```
      1. nohup 실행명령어 &(백그라운드로 실행)
      2. tail -f nohup.out << 실행중인 프로세서 추적.
      ```

      


#### 2. 전처리 및 데이터 학습

 1. Kospeech 오류 수정

    ```
    kospeech -> models -> __init__.py 32 line에 BeamDecoderRNN를 지워주자.
    ```

 2. 전처리

    ```
    1. AI hub에서 데이터를 다운 받으면 복잡하게 나눠져 있는데, 학습에 필요한 KsponSpeech_01~05까지의 파일을 data폴더에 train_data 폴더를 만들어 안에다 압축을 풀고, 폴더 depth를 조정하여 data -> KsponSpeech_01~05 -> pem, txt파일이 올 수 있도록 만든다.
    
    2. 필요한 라이브러리들을 모두 설치 한 뒤 dataset -> kspon -> preprocess.sh에 들어가서 DATASET_PATH를 "(절대경로를 추천한다).../data/train_data"로 맞추고
    VOCAB_DEST는 "(절대경로).../kospeech/data"로 맞춘다.
    
    3. sh preprocess.sh 로 실행.
    
    4. dataset폴더에 만들어진 transcripts.txt를 data로 옮기자.
    ```
    
 3. 데이터 학습

    ```
    1. 처음에 nohup 실행명령어 & 로 백그라운드로 nohup실행을 했으나, nohup.out에서 로그가 17900step에서 더이상 진행되지 않는 현상이 발생
    2. 실행중인 process확인결과 실행중인 것으로 나옴
    3. 하지만 5000step마다 생성되어야할 모델이 생성되지 않는 것을 보아, 어떠한 문제가 발생된 듯 싶음
    4. 정확히 어떠한 문제인지 파악 불가
    5. foreground 실행하여 학습 진행(배치사이즈 64, augmentation 사용 x) >>> 성공!!
    ```
    
 4. Validate set 문제

    ```
    1. train : validate = 520,000 : 100,000 으로 잡아서 학습을 진행시킴
    2. foreground로 진행하다 보니, validate 도중에 logger가 찍히지 않아서 오랜 시간 응답없음으로 서버 연결이 끊킴! => 코드를 변경하여 로그를 가끔씩 찍을 수 있도록 변경
    ```

    




#### 3. 모델 학습 후 평가

```
1. bin/inference.py에서 50~52줄 사이의 require을 required로 바꾼다.
2. wav, pcm, flac파일은 load_audio에서 관리해 줌.
```



#### 4. 중간 모델 이어서 학습

```
1. 작성된 코드는 output에 있는 최신폴더 > 그 안에 있는 최신폴더를 상대경로로 불러온다.
2. FileNotFound에러가 발생시에 절대경로로 잡아줘야한다.
3. kospeech/trainer/supervised_train.py에 130번 줄 latest_checkpoint_path="절대경로"로 수정해주자.
```



## 2. Summarization

#### 1. 알라꿍달라꿍

```
2021 훈민정음 한국어 음성•자연어 인공지능 경진대회 대화요약 부분에서 1등한 오픈소스
>> 정확도가 그렇게 높지는 않고, 5000자(?) 이상 넣으면 에러가 떠서 가볍게 포기
```



#### 2. SKT-KoBART

```
SKT-KoBART Summarization >> 2022.03.21일 기준 Summerization 업데이트 예정임.
```



#### 3. KoBART-summairzation

```
https://github.com/seujung/KoBART-summarization
정확도가 알라꿍달라꿍보다 높음.(체감상)
KoBART pre-trainning모델을 사용하고, Dacon 한국어 문서 생성요약 AI 경진대회의 학습 데이터로
fine-tuning한 모델을 사용함.(학습 예정)
```



#### 4. pororo

```
설치가 엄청나게 복잡함.
21년 이후 commit이 없고, windows에서는 설치하기 힘든 라이브러리와, 구버전의 cuda를 깔아야하고(이를 위해 파이썬 버전도 3.7이하로 해야함.), 여러 에러들을 발생시킴.
```



#### 5. textRank

```
설치 및 사용이 매우 쉬우나, 요약 성능이 찾아본 모델중 가장 떨어짐.
설치시 gensim==3.8.3버전으로 설치해야함.(이후 버전은 gensim에서 summarization을 지원하지 x)
```

