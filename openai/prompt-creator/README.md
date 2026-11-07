# Prompt Studio

공개형 프롬프트 생성기. React / TypeScript / Vinext 기반의 작은 실사용 프로토타입입니다.

## 기능

- 목적을 먼저 묻는 7단계 문답과 목적별 질문 분기
- 필수 입력 검사, 선택 질문 생략, 진행 상태, 이전 답변 수정
- Markdown 미리보기·원문, 직접 편집, 클립보드 복사, Markdown 다운로드
- 버전 검증을 포함한 localStorage 저장과 복원
- 키보드 접근, 모달 초점 관리, 반응형 레이아웃

## 생성 방식과 자료

생성은 규칙 기반으로 브라우저에서 실행합니다. Gemini API 호출이나 API 키가 필요하지 않습니다. 입력은 서버로 전송하지 않고 이 브라우저에 저장합니다. Google 문서 변경은 자동 반영되지 않습니다.

우선 참고: https://ai.google.dev/gemini-api/docs/prompting-strategies
확인일: 2026-11-08. 명확한 지시, 맥락 제공, 일관된 출력 구조, few-shot 예시, 반복 개선을 질문과 생성 규칙에 반영했습니다.

## 실행과 검증

- 의존성 설치: `pnpm install`
- 개발: `pnpm dev`
- 타입 검사: `pnpm exec tsc --noEmit`
- 생성·복원 로직 검사: `node --test tests/prompt-engine.test.mjs`
- 빌드: `pnpm build`

사용자 승인에 따라 공개 접근으로 운영합니다. 누구나 배포 URL로 이용할 수 있습니다. 입력한 답변과 초안은 각 방문자의 브라우저에 저장되며 다른 방문자에게 공유되지 않습니다. 접근 정책은 호스팅 계층에서 제어합니다.
