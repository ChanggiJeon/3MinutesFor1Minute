# api url

### 공통 (중복되는 부분) : http://127.0.0.1:8000/api/

- 계정 (Account)
  - 
- 커뮤니티 (Community)
  - 

- 게시글 (Board)
  - 글 작성 [POST] : boards/create/
    - 필요한 데이터 : title, content, upload (필수 X, 테스트 X), is_notice (기본 False)
  - 글 목록 출력 [GET] : boards/
  - 글 상세 정보 (댓글까지 출력) [GET] : boards/<int:board pk>/
  - 글 수정 [PUT] : boards/<int:board pk>/update/
    - 필요한 데이터 : { title, content, upload (필수 X, 테스트 X), is_notice (기본 False) } 중 수정한 부분
  - 글 삭제 [DELETE] : boards/<int:board pk>/delete/
  - 댓글 작성 [POST] : boards/<int:board pk>/comment/create/
    - 필요한 데이터 : parent (대댓글인 경우), content
  - 댓글 수정 [PUT] : boards/<int:board pk>/comment/<int:comment pk>/update/
    - 필요한 데이터 : content 수정한 경우
  - 댓글 삭제 [DELETE] : boards/<int:board pk>/comment/<int:comment pk>/delete/

- 회의록 (Minute)
  - 회의록 작성 [POST] : minutes/create/
    - 필요한 데이터 (추가 예정) : title, content
  - 회의록 목록 출력 [GET] : minutes/
  - 회의록 상세 정보 (댓글까지 출력) [GET] : minutes/<int:minute pk>/
  - 회의록 수정 [PUT] : minutes/<int:minute pk>/update/
    - 필요한 데이터 (추가 예정) : { title, content } 중 수정한 부분
  - 회의록 삭제 [DELETE] : minutes/<int:minute pk>/delete/
  - 댓글 작성 [POST] : minutes/<int:minute pk>/comment/create/
    - 필요한 데이터 : parent (대댓글인 경우), content
  - 댓글 수정 [PUT] : minutes/<int:minute pk>/comment/<int:comment pk>/update/
    - 필요한 데이터 : content 수정한 경우
  - 댓글 삭제 [DELETE] : minutes/<int:minute pk>/comment/<int:comment pk>/delete/

