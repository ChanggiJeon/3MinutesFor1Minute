# **api url**

### **공통 (중복되는 부분) : http://127.0.0.1:8000/api/**

- 계정 (Account)
  - 회원가입 [POST] : accounts/signup/
    - 아이디: username(string)
    - 비밀번호: password(string)
    - 비밀번호 확인: password_confirm(string)
  - 로그인 [POST] : accounts/api/token/
    - 아이디: username(string)
    - 비밀번호: password(string)
  - 회원 탈퇴 [DELETE] : accounts/delete/
    - 아이디: username(string)



- 커뮤니티 (Community)
  - 커뮤니티 생성 [POST] : community/create/
    - 커뮤니티 이름: name(string)
    - 공개 여부: is_private(boolean / default=공개(False))
    - 커뮤니티 소개: intro(string / 빈칸 허용)



- 게시글 (Board)
  - 글 목록 출력 [GET] : boards/
  - 글 작성 [POST] : boards/create/
    - title
    - content
    - is_notice (기본 False)
    - upload (필수 X, 테스트 X)
  - 글 상세 정보 (댓글까지 출력) [GET] : boards/<int:board pk>/
  - 글 삭제 [DELETE] : boards/<int:board pk>/delete/
  - 글 수정 (수정할 부분만) [PUT] : boards/<int:board pk>/update/
    - title
    - content
    - is_notice (기본 False)
    - upload (필수 X, 테스트 X)
  - 댓글 작성 [POST] : boards/<int:board pk>/comment/create/
    - content
  - 댓글 삭제 [DELETE] : boards/<int:board pk>/comment/<int:comment pk>/delete/
  - 댓글 수정 [PUT] : boards/<int:board pk>/comment/<int:comment pk>/update/
    - content



- 회의록 (Minute)
  - 회의록 목록 출력 [GET] : minutes/
  - 회의록 작성 [POST] : minutes/create/
    - title
    - content
    - conclusion
    - is_closed (기본 False)
    - deadline
    - reference_file (필수 X, 테스트 X)
  - 회의록 상세 정보 (스피치까지 출력) [GET] : minutes/<int:minute pk>/
  - 회의록 삭제 [DELETE] : minutes/<int:minute pk>/delete/
  - 회의록 수정 (수정할 부분만) [PUT] : minutes/<int:minute pk>/update/
    - title
    - content
    - conclusion
    - is_closed (기본 False)
    - deadline
    - reference_file (필수 X, 테스트 X)



- 스피치 (Speech)
  - 스피치 작성 [POST] : minutes/<int:minute pk>/create/
    - title
    - content
    - summary
    - cloud_keyword
    - record_file (테스트 X)
    - reference_file (필수 X, 테스트 X)
  - 스피치 상세 정보 (댓글까지 출력) [GET] : minutes/<int:minute pk>/speech/<int:speech pk>/
  - 스피치 삭제 [DELETE] : minutes/<int:minute pk>/speech/<int:speech pk>/delete/
  - 스피치 수정 (수정할 부분만) [PUT] : minutes/<int:minute pk>/speech/<int:speech pk>/update/
    - title
    - content
    - summary
    - cloud_keyword
    - reference_file (필수 X, 테스트 X)
  - 댓글 작성 [POST] : minutes/<int:minute pk>/speech/<int:speech pk>/comment/create/
    - content
  - 댓글 수정 [PUT] : minutes/<int:minute pk>/comment/speech/<int:speech pk>/<int:comment pk>/update/
    - content
  - 댓글 삭제 [DELETE] : minutes/<int:minute pk>/comment/speech/<int:speech pk>/<int:comment pk>/delete/

