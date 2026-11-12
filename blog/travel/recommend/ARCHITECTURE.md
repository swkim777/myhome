# JowonPlace Architecture & Pipeline Specification

## 1. 아키텍처 개요
본 애플리케이션은 순수 프론트엔드(Vanilla HTML/CSS/JS) 기반의 싱글 페이지 애플리케이션(SPA) 구조로 설계되었습니다.

```mermaid
flowchart TD
    User([사용자]) -->|1. 여행지 입력 or 태그 클릭| SearchBox[검색 컨트롤러]
    SearchBox -->|2. 검색 쿼리 전달| SearchEngine[TravelSearchEngine (js/search.js)]
    
    subgraph SearchEngineLayer [검색 & 큐레이션 레이어]
        SearchEngine -->|3-A. 사전 데이터 매칭?| DataCache[js/data.js (대표 여행지 6선)]
        SearchEngine -->|3-B. 신규 여행지?| WikiAPI[위키피디아 Open API & Web Search]
        WikiAPI --> Generator[스마트 5대 명소 블로그 생성기]
    end

    DataCache -->|4. 포맷팅된 데이터 반환| AppController[App Controller (js/app.js)]
    Generator -->|4. 동적 블로그 데이터 반환| AppController

    AppController -->|5. 뷰 전환 및 DOM 렌더링| BlogView[5대 명소 실감형 블로그 뷰]
    BlogView --> User
```

## 2. 데이터 파이프라인
- **입력**: 자연어 여행지 키워드 (예: "여수", "속초", "제주도")
- **1단계 (캐시 검사)**: `INITIAL_DESTINATIONS` 및 `localStorage` 캐시 검색
- **2단계 (실시간 웹 탐색)**: 위키피디아 REST API(`https://ko.wikipedia.org/w/api.php`)를 통해 지역 개요 및 핵심 랜드마크 추출
- **3단계 (콘텐츠 생성)**:
  - 5대 테마(랜드마크, 자연 산책, 감성 카페/베이커리, 문화 마켓, 일몰 야경) 매핑
  - 1인칭 후기, 인생샷 포토존 팁, 현지인 여행 팁 자동 결합
- **4단계 (렌더링)**: 타임라인 바, 사진, 평점, 에필로그가 포함된 매거진 스타일 뷰 출력

## 3. 확장 가이드
Antigravity 에이전트와 연동하여 새로운 여행지 데이터를 추가하려면 `.gemini/skills/travel-blog-generator/`의 스킬을 활용하여 `js/data.js` 배열에 신규 객체를 등록하면 즉시 사이트에 반영됩니다.
