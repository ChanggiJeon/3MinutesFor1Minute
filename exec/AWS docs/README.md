# 포팅 메뉴얼



## :one: 개발 환경

### DevOps

- AWS EC2
- Ubuntu: 20.04.4 LTS
- Docker: 20.10.14
- Docker-compose: 1.29.2
- Jenkins

#### FE

- node: 16.3.11

#### BE

- django: 4.0.3
- conda: 4.10.3
- python: 3.10.4

#### DB

- mariaDB: 10.3.34

#### IDE

- Visual Studio Code



## :two:  ENV

- FE

```
- FE/frontend/.env.production -
REACT_APP_API_URL='https://j6d202.p.ssafy.io/api'
REACT_APP_MEDIA_URL='https://j6d202.p.ssafy.io/media'

```

- BE

```
- BE/api/.env -
DEBUG=False
SECRET_KEY=django-insecure-jjrl%&6eo9lan6tk$9m-k+q2v&znre!jxqlbe@%y0ykmrnga3m
ALLOWED_HOSTS=https://j6d202.p.ssafy.io,http://j6d202.p.ssafy.io,http://localhost:3000
DATABASE_NAME=glassix
DATABASE_USER=glassix
DATABASE_PASS=G6ingumi!
DATABASE_HOST=j6d202.p.ssafy.io
DATABASE_PORT=3307
CACHE_URL=memcache://127.0.0.1:11211,127.0.0.1:11212,127.0.0.1:11213
EMIAL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_USE_TLS=True
EMAIL_PORT=587
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=jaeseeeeeed@gmail.com
EMAIL_HOST_PASSWORD=ssafyA1#
REDIRECT_PAGE=http://j6d202.p.ssafy.io/login
```





## :three:  배포 환경

![image-20220408091547524](/uploads/6d839bdb4caa73dc5d9bee32b4a08494/image-20220408091547524.png)



- Docker

```bash
# 업데이트 및 HTTP 패키지 설치
sudo apt update
sudo apt-get install -y ca-certificates \ 
    curl \
    software-properties-common \
    apt-transport-https \
    gnupg \
    lsb-release

# GPG 키 및 저장소 추가
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Docker engine 설치
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```



- Docker-compose

```bash
# docker-compose 설치
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# docker-compose 권한 부여
sudo chmod +x /usr/local/bin/docker-compose

# docker-compose 실행 파일 바인딩
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose -version
```



- Cert(HTTPS)

```bash
# letsencrypt 설치
sudo apt-get install letsencrypt

# certkey 생성
sudo letsencrypt certonly --standalone -d j6d202.p.ssafy.io
```





- 포트

```
FE: 3000 / React
BE: 8000 / Gunicorn -> Django
DB: 3307 / MariaDB
Jenkins: 8080
	# jenkins docker build
        docker run -d -p 8080:8080 \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v /usr/bin/docker:/usr/bin/docker \
        -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose \
        -v workspace:/var/jenkins_home \
        --name my_jenkins \
        -u root jenkins/jenkins:lts	
```



## :four:  배포

```bash
# /workspace/
# Gunicorn 실행 sh 파일 권한 부여
chmod +x BE/api/wsgi-entrypoint.sh
chmod +x BE/api/manage.py

# docker compose 빌드
docker-compose build

# docker compose container 실행
docker-compose up -d

# BE container 접속
docker exec -it <BE container 명> bash

# python daemon 실행
python Thread.py
```



## :five:  DB 접속 정보

```
database: glassix
username=glassix
password=G6ingumi!
host=j6d202.p.ssafy.io
port=3307
```

