# Git 컨벤션

- Commit Message

  - 첫 글자는 대문자로 작성
  - Feat, Fix만 해당
    - ‘Change’, ‘Add’ 로 시작(코드 수정, 추가)
    - 형식 : 명령어 + 수정/추가/변경사항 + 파일명
    - ex) Feat/BE/Add : login function in main
  - 그 외(BE/FE 구분 필요없을 시, 안붙여도 됨)
    - ex) Rename/BE : login to sign in
    - ex) Docs : write git, jira convention in README.md

- 명령어

  - Feat : 새로운 기능 추가
  - Fix : 버그 수정
  - Comment : 필요한 주석 추가 및 변경
  - Style : 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
  - Del : 파일 삭제
  - Docs : 문서 수정
  - Test : 테스트 코드, 리펙토링 테스트 코드 추가
  - Chore : 빌드 업무 수정, 패키지 매니저 수정 - ex) .gitignore 수정
  - Refactor : 프로덕션 코드 리팩토링, 새로운 기능이나 버그 수정 없이 현재 구현을 개선
  - Rename : 파일 혹은 폴더명 수정

- GIT add/commit/push 취소하기

  참조 : https://gmlwjd9405.github.io/2018/05/25/git-add-cancle.html

  - add 취소
    - git reset HEAD : 전체 취소
    - git reset HEAD filename : 해당 파일만 취소
  - commit 취소
    - git reset HEAD^ : 가장 최근 커밋 취소 + add도 취소
    - git reset —soft HEAD^ : 가장 최근 커밋만 취소
    - git reset —hard HEAD^ : commit, add 취소 + 만들었던 파일도 이전 커밋상태로 초기화
    - git commit —amend : commit 메세지 수정
  - push 취소
    - push 취소는 팀원과의 버젼관리가 꼬일 수 있음으로 사용을 지양한다.
    - push의 취소는 다소 복잡함으로 참조한 블로그를 참고

- Git remote에 잘못 push 파일 삭제하기(.gitignore 누락한 경우)

  참조 : https://gmlwjd9405.github.io/2018/05/17/git-delete-incorrect-files.html

  - 간단함으로 참조한 블로그를 참고하여 실행

- 알아두면 좋은 키워드

  1. Rebase : branch 가지가 갈라지지 않고 merge하고 싶을 때
  2. Amend : Commit 메시지 수정, commit 내용 수정.
  3. Reset : 과거의 커밋으로 돌아가기(--hard옵션 사용시 저장 내용 다 날라가므로 커밋 먼저 하고, git log로 커밋 번호 알아둬야 함!!)
  4. Stash : temp commit이 필요할 때 사용! (git checkout으로 이동할 때 매우 유용하다.) + git stash apply로 최신 저장 stash불러 올 수 있음. Or git stash list로 확인 후 불러온다.



# Jira 컨벤션

- Epic은 유저에게 제공하는 서비스 단위
- Story는 기능 단위
- Sub-task로 작은 단위로 나누어 등록
- Jira 관리는 철저히
- 프로젝트 관련 이슈만 작성

