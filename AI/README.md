## Data 학습 삽질과정.



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
      ```

      

#### 2. 전처리 및 데이터 학습

 1. Kospeech 오류 수정

    ```
    kospeech -> models -> __init__.py 32 line에 BeamDecoderRNN를 지워주자.
    ```

 2.  전처리

    ```
    1. AI hub에서 데이터를 다운 받으면 복잡하게 나눠져 있는데, 학습에 필요한 KsponSpeech_01~05까지의 파일을 data폴더에 train_data 폴더를 만들어 안에다 압축을 풀고, 폴더 depth를 조정하여 data -> KsponSpeech_01~05 -> pem, txt파일이 올 수 있도록 만든다.
    
    2. 필요한 라이브러리들을 모두 설치 한 뒤 dataset -> kspon -> preprocess.sh에 들어가서 DATASET_PATH를 "(절대경로를 추천한다).../data/train_data"로 맞추고
    VOCAB_DEST는 "(절대경로).../kospeech/data"로 맞춘다.
    ```

	3.  모델 학습 후 평가

    ```
    bin/inference.py에서 50~52줄 사이의 require을 required로 바꾼다.
    ```

    
