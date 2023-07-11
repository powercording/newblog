## ai chat 도중 3회이상 채팅 시도시 서버응답에러 발생 ->

해당 라이브러리에 http 통신 상태 코드에 대하여 200번대 번호 외의 처리가 없기 때문에 발생하는것.
라이브러리 pr 참조하여 수정 예정임. 그렇지만 왜 200번대가 아닌 다른상태의 코드를 반환하는지는 아직 의문.

### 마크다운 포스트의 함수 분리 또는 높은 수준의 초상화 고민해보기

- [ ] api 와 서비스 로직 관리 하기. // 진행중
- [ ] 서비스 클래스 / Api 라우트 에서 리턴값 또는 리다이렉트 고민해보기.
- [ ] 클라이언트 컴포넌트의 함수호출을 상위 페이지에서 내려주고, 서버액션으로 처리하기

### 포스트(마크다운) crud 에 최소한의 검증절차 추가하기.

- [x] 마크다운 게시할때 제목과 컨텐츠가 비어있나 확인하는 로직 추가하기.
- [x] 각 글쓰기 수정 삭제 버튼에 검증절차 추가 하기.

### 레이아웃 (UI)

- [X|⚠️] 로딩페이지의 레이아웃이 부자연 스러움.
- [ ] 마크다운 읽기 페이지에서도 삭제할수 있는 버튼 추가하기.
