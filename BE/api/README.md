## 1. 가상환경 구축

#### 0. Conda 가상환경 중 AI가 있으면 삭제

```
conda env remove -n ai
```



#### 1. 설치

```
conda env create -f environment.yaml
conda activate AI
conda install -c conda-forge brotlipy
pip install -r requirements.txt
```



## 2. BackEnd 실행

1. conda activate AI

2. F1 => python: Select Interpreter에서 AI로 설정

3. python manage.py runserver

4. http://127.0.0.1:8000/swagger/ (스웨거)

주의 : env 파일 받아서 api 폴더에 넣고 .env로 이름 바꿔줘야함!



## 3. DB 구축

1. mysql workbench를 열고, + 버튼을 눌러서 connections를 만든다.

2. 적당한 Name 주고, Port: 3307, Username: root, Password: ssafy

3. myproject.sql로 DB 입력



## 4. api url

### 공통 (중복되는 부분) : http://127.0.0.1:8000/api/

- 계정 (Account)

  - 로그인 [POST] : api/token/
    - 아이디 : username (string)
    - 비밀번호 : password (string)
  - 회원가입 [POST] : signup/
    - 아이디 : username (string)
    - 비밀번호 : password (string)
    - 비밀번호 확인 : password_confirm (string)
  - 회원 탈퇴 [DELETE] : delete/<str : username>/
  - 아이디 중복 확인 [GET] : uniquecheck/username/<str : username>/
  - 이메일 중복 확인 [GET] : uniquecheck/email/<str : email>/
  - 프로필 [GET] : profile/<str : username>/
  - 아이디 찾기 [GET] : find/username/<str : email>/<str : name>/
  - 비밀번호 찾기 [GET] : find/password/<str : username>/<str : email>/<str : name>/




- 커뮤니티 (Community)

  1. 커뮤니티 생성

  - 커뮤니티 생성 [POST] : community/create/
    - 커뮤니티 이름 : name
    - 공개 여부 : is_private (boolean / default=공개 (False))
    - 커뮤니티 소개 : intro (빈칸 허용)
  - 커뮤니티 이름 중복 체크 [GET] : uniquecheck/community_name/<str : community_name>/

  1. 커뮤니티 가입

  - 커뮤니티 가입 신청 [POST] : apply/<int : community_pk>/
    - 닉네임 : nickname (default=기존 유저의 이름)
    - 자기 소개 : bio (빈칸 허용)
    - 프로필 사진 : profile_image ⇒ 추후 추가
  - 커뮤니티 검색 (커뮤니티 코드) [GET] : search/code/<str : code>/
  - 커뮤니티 검색 (커뮤니티 이름) [GET] : search/name/<str : keyword>/

  1. 커뮤니티 상세 관리

  - 커뮤니티 상세 조회, 수정 및 삭제 [GET, PUT, DELETE] : <int : community_pk>/
    1. GET
    2. PUT
       - 커뮤니티 이름 : name
       - 공개 여부 : is_private (boolean)
       - 커뮤니티 소개 : intro (빈칸 허용)
    3. DELETE

  1. 커뮤니티 멤버 관리

  - 커뮤니티 멤버 조회 [GET] : <int : community_pk>/member/
  - 커뮤니티 멤버 삭제 [DELETE] : <int : community_pk>/member/<int : member_pk>/

  1. 커뮤니티 멤버 초대

  - 커뮤니티 멤버 초대 [GET] : invite/<int : community_pk>/<int : user_pk>/
  - 유저 검색 [GET] : invite/search/<str : keyword>/

  1. 커뮤니티 멤버 개인 정보 수정 및 탈퇴

  - 커뮤니티 멤버 개인 수정 [PUT] : <int : community_pk>/member/<int : member_pk>/update/
    - 닉네임 : nickname
    - 소개 : bio
  - 커뮤니티 탈퇴 [DELETE] : <int : community_pk>/member/<int : member_pk>/withdraw/




- 게시글 (Board)

  - 글 목록 출력 [GET] : <int : community_pk>/boards/
  - 글 작성 [POST] : <int : community_pk>/boards/create/
    - title
    - content
    - is_notice (기본 False)
    - upload (필수 X, 테스트 X)
  - 글 상세 정보 (댓글까지 출력) [GET] : <int : community_pk>/boards/<int : board_pk>/
  - 글 삭제 [DELETE] : <int : community_pk>/boards/<int : board_pk>/delete/
  - 글 수정 (수정할 부분만) [PUT] : <int : community_pk>/boards/<int : board_pk>/update/
    - title
    - content
    - is_notice (기본 False)
    - upload (필수 X, 테스트 X)
  - 댓글 작성 [POST] : <int : community_pk>/boards/<int : board_pk>/comment/create/
    - content
  - 댓글 삭제 [DELETE] : <int : community_pk>/boards/<int : board_pk>/comment/<int : comment_pk>/delete/
  - 댓글 수정 [PUT] : <int : community_pk>/boards/<int : board_pk>/comment/<int : comment_pk>/update/
    - content




- 회의록 (Minute)

  - 회의록 목록 출력 [GET] : <int : community_pk>/minutes/
  - 회의록 작성 (멤버 목록 호출) [GET] : <int : community_pk>/minutes/create/
  - 회의록 작성 (진짜 생성) [POST] : <int : community_pk>/minutes/create/
    - title
    - content
    - conclusion
    - is_closed (기본 False)
    - deadline
    - reference_file (필수 X, 테스트 X)
    - participants = [nickname, ..., ] (회의에 참석할 멤버 닉네임들 리스트로)
  - 회의록 상세 정보 (스피치까지 출력) [GET] : <int : community_pk>/minutes/<int : minute_pk>/
  - 회의록 삭제 [DELETE] : <int : community_pk>/minutes/<int : minute_pk>/delete/
  - 회의록 수정 (수정할 부분만, 회의에 참석한 멤버 수정 불가) [PUT] : <int : community_pk>/minutes/<int : minute_pk>/update/
    - title
    - content
    - conclusion
    - is_closed (기본 False)
    - deadline
    - reference_file (필수 X, 테스트 X)




- 스피치 (Speech)

  - 스피치 작성 [POST] : <int : community_pk>/minutes/<int : minute_pk>/create/
    - title
    - content
    - summary
    - cloud_keyword
    - record_file (테스트 X)
    - reference_file (필수 X, 테스트 X)
  - 스피치 상세 정보 (댓글까지 출력) [GET] : <int : community_pk>/minutes/<int : minute_pk>/speech/<int : speech_pk>/
  - 스피치 삭제 [DELETE] : <int : community_pk>/minutes/<int : minute_pk>/speech/<int : speech_pk>/delete/
  - 스피치 수정 (수정할 부분만) [PUT] : <int : community_pk>/minutes/<int : minute_pk>/speech/<int : speech_pk>/update/
    - title
    - content
    - summary
    - cloud_keyword
    - reference_file (필수 X, 테스트 X)
  - 댓글 작성 [POST] : <int : community_pk>/minutes/<int : minute_pk>/speech/<int : speech_pk>/comment/create/
    - content
  - 댓글 수정 [PUT] : <int : community_pk>/minutes/<int : minute_pk>/comment/speech/<int : speech_pk>/<int : comment_pk>/update/
    - content
  - 댓글 삭제 [DELETE] : <int : community_pk>/minutes/<int : minute_pk>/comment/speech/<int : speech_pk>/<int : comment_pk>/delete/
