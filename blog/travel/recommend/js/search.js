/**
 * JowonPlace Travel Blog - Search Engine & Dynamic Generator
 * 사용자 입력 기반 여행지 검색, 위키피디아/위키미디어 오픈 API 실시간 이미지 연동 및 5대 명소 실감형 블로그 생성기
 */

// 대한민국 및 세계 주요 여행지 5대 대표 명소 사전 매핑 (정확한 명소명 매칭용)
const KNOWN_DESTINATIONS_MAP = {
  "서울": {
    region: "국내",
    spots: [
      { name: "N서울타워 & 남산 케이블카", category: "도심 랜드마크 & 파노라마 뷰", searchTerm: "N서울타워" },
      { name: "경복궁 & 광화문 광장", category: "조선 왕궁 & 역사 문화", searchTerm: "경복궁" },
      { name: "북촌한옥마을 & 삼청동", category: "전통 한옥 & 갤러리 산책", searchTerm: "북촌한옥마을" },
      { name: "익선동 한옥 카페거리 & 성수동", category: "감성 카페 & 트렌디 골목", searchTerm: "익선동" },
      { name: "반포 한강공원 & 달빛무지개분수", category: "선셋 피크닉 & 야경 명소", searchTerm: "반포한강공원" }
    ]
  },
  "여수": {
    region: "국내",
    spots: [
      { name: "오동도 & 동백꽃 산책길", category: "해안 국립공원 & 자연 산책", searchTerm: "오동도" },
      { name: "여수 해상케이블카 (자산공원-돌산공원)", category: "해상 뷰 & 다도해 절경", searchTerm: "여수해상케이블카" },
      { name: "돌산공원 & 돌산대교 야경", category: "여수 밤바다 시그니처 야경", searchTerm: "돌산대교" },
      { name: "고소동 천사벽화골목 & 카페거리", category: "언덕 벽화마을 & 오션뷰 카페", searchTerm: "고소동 천사벽화마을" },
      { name: "여수 낭만포차거리 & 하멜등대", category: "밤바다 버스킹 & 해산물 미식", searchTerm: "하멜등대" }
    ]
  },
  "전주": {
    region: "국내",
    spots: [
      { name: "전주 한옥마을 & 경기전", category: "전통 한옥 단지 & 조선 태조 어진", searchTerm: "전주한옥마을" },
      { name: "전동성당", category: "로마네스크 양식 성당 건축", searchTerm: "전동성당" },
      { name: "오목대 & 이목대", category: "한옥마을 파노라마 조망 쉼터", searchTerm: "오목대" },
      { name: "자만벽화마을 & 달빛 언덕", category: "아기자기한 벽화 & 감성 카페", searchTerm: "자만벽화마을" },
      { name: "전주 남부시장 & 청년몰", category: "야시장 미식 투어 & 로컬 푸드", searchTerm: "전주남부시장" }
    ]
  },
  "속초": {
    region: "국내",
    spots: [
      { name: "속초아이 대관람차 & 속초해수욕장", category: "오션뷰 랜드마크 & 에메랄드 해변", searchTerm: "속초해수욕장" },
      { name: "설악산 권금성 & 케이블카", category: "압도적 기암괴석 & 명산 절경", searchTerm: "설악산 권금성" },
      { name: "아바이마을 & 갯배 체험", category: "실향민 역사 & 오징어순대 미식", searchTerm: "아바이마을" },
      { name: "영금정 & 속초등대 전망대", category: "동해 바위 누각 & 일출 명소", searchTerm: "영금정" },
      { name: "속초 관광수산시장 (중앙시장)", category: "닭강정과 활어회 전통시장", searchTerm: "속초관광수산시장" }
    ]
  },
  "파리": {
    region: "유럽",
    spots: [
      { name: "에펠탑 (Tour Eiffel)", category: "세계적 시그니처 랜드마크", searchTerm: "에펠탑" },
      { name: "루브르 박물관 & 유리 피라미드", category: "세계 최대 미술관 & 예술 감상", searchTerm: "루브르 박물관" },
      { name: "몽마르트르 언덕 & 사크레쾨르 대성당", category: "예술가의 거리 & 파리 전경", searchTerm: "사크레쾨르 대성당" },
      { name: "샹젤리제 거리 & 개선문", category: "쇼핑 명소 & 나폴레옹 기념 건축", searchTerm: "에투알 개선문" },
      { name: "센강 바토무슈 유람선 & 에펠탑 야경", category: "낭만 크루즈 & 황금빛 파리 밤", searchTerm: "센강" }
    ]
  },
  "도쿄": {
    region: "아시아",
    spots: [
      { name: "도쿄 타워 & 시바 공원", category: "레트로 붉은 타워 랜드마크", searchTerm: "도쿄 타워" },
      { name: "센소지 & 아사쿠사 나카미세", category: "에도 전통 사찰 & 길거리 간식", searchTerm: "센소지" },
      { name: "시부야 스크램블 교차로 & 시부야 스카이", category: "최첨단 도심 & 360도 루프탑 전망", searchTerm: "시부야 스크램블 교차로" },
      { name: "메이지 신궁 & 하라주쿠 다케시타", category: "도심 속 거대 숲 & 트렌드 거리", searchTerm: "메이지 신궁" },
      { name: "오다이바 해변공원 & 레인보우 브리지", category: "도쿄만 야경 & 미래형 수변 도시", searchTerm: "레인보우 브리지" }
    ]
  }
};

class TravelSearchEngine {
  constructor() {
    this.cachedDestinations = [...(window.INITIAL_DESTINATIONS || [])];
    this.loadCustomFromStorage();
  }

  // 로컬 스토리지에 저장된 사용자 추가 여행지 불러오기
  loadCustomFromStorage() {
    try {
      const stored = localStorage.getItem("jowonplace_custom_destinations");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach(custom => {
            if (!this.cachedDestinations.some(d => d.id === custom.id)) {
              this.cachedDestinations.push(custom);
            }
          });
        }
      }
    } catch (e) {
      console.warn("로컬 스토리지 데이터 로드 실패:", e);
    }
  }

  // 사용자 추가 여행지 저장
  saveCustomToStorage(destination) {
    try {
      const stored = localStorage.getItem("jowonplace_custom_destinations");
      let list = stored ? JSON.parse(stored) : [];
      list = list.filter(item => item.id !== destination.id);
      list.unshift(destination);
      localStorage.setItem("jowonplace_custom_destinations", JSON.stringify(list));
    } catch (e) {
      console.warn("로컬 스토리지 저장 실패:", e);
    }
  }

  // 여행지 검색 및 블로그 생성 메인 함수
  async searchOrGenerate(query) {
    const cleanQuery = (query || "").trim();
    if (!cleanQuery) return null;

    const lowerQuery = cleanQuery.toLowerCase();

    // 1. 사전 큐레이션 및 캐시 데이터베이스에서 매칭 검색
    const found = this.cachedDestinations.find(dest => {
      if (dest.keyword && dest.keyword.toLowerCase().includes(lowerQuery)) return true;
      if (dest.title && dest.title.toLowerCase().includes(lowerQuery)) return true;
      if (dest.aliases && dest.aliases.some(a => a.toLowerCase().includes(lowerQuery) || lowerQuery.includes(a.toLowerCase()))) return true;
      return false;
    });

    if (found) {
      return {
        isNew: false,
        data: found,
        source: "curated"
      };
    }

    // 2. 새로운 여행지일 경우: 위키피디아/위키미디어 실시간 검색 및 스마트 블로그 생성기 가동
    const generated = await this.generateDynamicDestination(cleanQuery);
    if (generated) {
      this.cachedDestinations.unshift(generated);
      this.saveCustomToStorage(generated);
      return {
        isNew: true,
        data: generated,
        source: "live_search"
      };
    }

    return null;
  }

  // 위키피디아 실시간 오픈 API 검색 (도시/지역 기본 정보 및 대표 썸네일)
  async fetchWikiInfo(query) {
    try {
      const endpoint = `https://ko.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=1&explaintext=1&titles=${encodeURIComponent(query)}&pithumbsize=1200&format=json&origin=*`;
      const response = await fetch(endpoint);
      if (!response.ok) return null;
      const data = await response.json();
      const pages = data.query?.pages;
      if (!pages) return null;

      const pageId = Object.keys(pages)[0];
      if (pageId === "-1") {
        // 검색 폴백
        return await this.searchWikiByGenerator(query);
      }

      const page = pages[pageId];
      return {
        title: page.title,
        extract: page.extract || "",
        thumbnail: page.thumbnail?.source || null
      };
    } catch (err) {
      console.warn("위키피디아 API 연동 실패 (오프라인/CORS 대체):", err);
      return null;
    }
  }

  // 위키피디아 검색어 제너레이터 기반 검색 (키워드가 정확한 표제어가 아닐 때)
  async searchWikiByGenerator(query) {
    try {
      const url = `https://ko.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=extracts|pageimages&exintro=1&explaintext=1&pithumbsize=1200&format=json&origin=*`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      const pages = data.query?.pages;
      if (!pages) return null;
      const page = Object.values(pages)[0];
      if (!page) return null;
      return {
        title: page.title,
        extract: page.extract || "",
        thumbnail: page.thumbnail?.source || null
      };
    } catch (e) {
      return null;
    }
  }

  // 해당 명소의 실제 사진을 위키피디아 및 위키미디어 커먼즈에서 실시간 검색하는 핵심 엔진
  async fetchSpotImage(searchTerm, fallbackCategory = "landscape") {
    if (!searchTerm) return this.getCategoryFallbackPhoto(fallbackCategory);

    // 1단계: 한국어 위키피디아에서 검색하여 고해상도 썸네일 획득
    try {
      const wikiUrl = `https://ko.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=1&prop=pageimages&pithumbsize=1000&format=json&origin=*`;
      const wikiRes = await fetch(wikiUrl);
      if (wikiRes.ok) {
        const data = await wikiRes.json();
        const pages = data.query?.pages;
        if (pages) {
          const first = Object.values(pages)[0];
          if (first && first.thumbnail?.source) {
            return first.thumbnail.source;
          }
        }
      }
    } catch (e) {
      // 위키피디아 검색 실패 시 위키미디어 커먼즈로 fallback
    }

    // 2단계: 위키미디어 커먼즈(Commons)에서 자유 라이선스 실사 사진 검색
    try {
      const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(searchTerm)}&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json&origin=*`;
      const commonsRes = await fetch(commonsUrl);
      if (commonsRes.ok) {
        const cdata = await commonsRes.json();
        const cpages = cdata.query?.pages;
        if (cpages) {
          const first = Object.values(cpages)[0];
          const info = first?.imageinfo?.[0];
          if (info && (info.thumburl || info.url)) {
            return info.thumburl || info.url;
          }
        }
      }
    } catch (e) {
      // 커먼즈 검색 실패 시 안전한 테마별 카테고리 고품질 사진 반환
    }

    // 3단계: 특정 장소 사진을 찾을 수 없는 경우 해당 명소 성격(자연, 카페, 야경, 전통 등)에 맞는 안전한 테마 사진 제공
    return this.getCategoryFallbackPhoto(fallbackCategory);
  }

  // 특정 명소에 대한 복수 웹 실사 이미지 검색 함수 (후보 4~6개 반환)
  async searchMultipleSpotImages(query, limit = 4) {
    const results = [];
    if (!query) return results;

    // 1. 위키미디어 커먼즈 API 검색 (실제 현장 사진 복수 획득)
    try {
      const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=${limit}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;
      const res = await fetch(commonsUrl);
      if (res.ok) {
        const data = await res.json();
        const pages = data.query?.pages;
        if (pages) {
          for (const pid of Object.keys(pages)) {
            const page = pages[pid];
            const info = page.imageinfo?.[0];
            const url = info?.thumburl || info?.url;
            if (url && !results.includes(url)) {
              results.push(url);
            }
          }
        }
      }
    } catch (e) {
      console.warn("위키미디어 이미지 복수 검색 실패:", e);
    }

    // 2. 한국어 위키피디아 검색 API
    if (results.length < limit) {
      try {
        const wikiUrl = `https://ko.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=pageimages&pithumbsize=800&format=json&origin=*`;
        const res = await fetch(wikiUrl);
        if (res.ok) {
          const data = await res.json();
          const pages = data.query?.pages;
          if (pages) {
            for (const pid of Object.keys(pages)) {
              const page = pages[pid];
              const url = page.thumbnail?.source;
              if (url && !results.includes(url)) {
                results.push(url);
              }
            }
          }
        }
      } catch (e) {
        console.warn("위키피디아 이미지 복수 검색 실패:", e);
      }
    }

    return results;
  }

  // 사용자가 입력한 웹 URL에 접속하여 사진들을 파싱/추출하는 함수
  async extractImagesFromWebUrl(targetUrl) {
    const images = [];
    let cleanUrl = targetUrl.trim();
    if (cleanUrl.startsWith("www.")) {
      cleanUrl = "https://" + cleanUrl;
    }

    // 1. 직접 이미지 파일 링크인 경우 (.jpg, .png, .webp, unsplash, wikimedia 등)
    const isDirectImage = /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(cleanUrl) ||
      cleanUrl.includes("images.unsplash.com") ||
      cleanUrl.includes("wikimedia.org") ||
      cleanUrl.includes("pds.joins.com") ||
      cleanUrl.includes("pstatic.net");

    if (isDirectImage) {
      images.push(cleanUrl);
      try {
        const u = new URL(cleanUrl);
        if (/\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(u.pathname)) {
          return images;
        }
      } catch (e) {}
    }

    // 2. 위키피디아 웹 문서 URL인 경우 (공식 API로 문서 내 실제 고화질 사진 일괄 파싱)
    const wikiMatch = cleanUrl.match(/([a-z]{2})\.wikipedia\.org\/wiki\/([^#?]+)/i);
    if (wikiMatch) {
      const lang = wikiMatch[1];
      const title = decodeURIComponent(wikiMatch[2]);
      try {
        const apiUrl = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&generator=images&gimlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;
        const res = await fetch(apiUrl);
        if (res.ok) {
          const data = await res.json();
          const pages = data.query?.pages;
          if (pages) {
            for (const pid of Object.keys(pages)) {
              const info = pages[pid].imageinfo?.[0];
              const imgUrl = info?.thumburl || info?.url;
              if (imgUrl && !imgUrl.endsWith(".svg") && !images.includes(imgUrl)) {
                images.push(imgUrl);
              }
            }
          }
        }
      } catch (e) {
        console.warn("위키피디아 URL 이미지 추출 실패:", e);
      }
      if (images.length > 0) return images;
    }

    // 3. 일반 웹페이지 URL인 경우: HTML 가져오기 (직접 fetch 및 CORS 프록시 활용)
    let htmlContent = "";

    // 3-1. 직접 fetch 시도
    try {
      const directRes = await fetch(cleanUrl, { mode: "cors" });
      if (directRes.ok) {
        htmlContent = await directRes.text();
      }
    } catch (e) {
      // CORS 제한 시 프록시 fallback
    }

    // 3-2. CORS 프록시 (allorigins) 시도
    if (!htmlContent) {
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(cleanUrl)}`;
        const pRes = await fetch(proxyUrl);
        if (pRes.ok) {
          const pData = await pRes.json();
          htmlContent = pData.contents || "";
        }
      } catch (e) {
        console.warn("CORS 프록시 1 실패:", e);
      }
    }

    // 3-3. 2차 CORS 프록시 (corsproxy.io) 시도
    if (!htmlContent) {
      try {
        const proxyUrl2 = `https://corsproxy.io/?url=${encodeURIComponent(cleanUrl)}`;
        const pRes2 = await fetch(proxyUrl2);
        if (pRes2.ok) {
          htmlContent = await pRes2.text();
        }
      } catch (e) {
        console.warn("CORS 프록시 2 실패:", e);
      }
    }

    // 4. HTML 파싱 및 이미지 태그 추출
    if (htmlContent) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");

        // 4-1. 대표 메타 태그 (og:image, twitter:image) 추출 (최우선 순위)
        const ogTags = [
          doc.querySelector('meta[property="og:image"]')?.getAttribute("content"),
          doc.querySelector('meta[property="og:image:secure_url"]')?.getAttribute("content"),
          doc.querySelector('meta[name="twitter:image"]')?.getAttribute("content"),
          doc.querySelector('meta[name="twitter:image:src"]')?.getAttribute("content")
        ];

        ogTags.forEach(rawOg => {
          if (rawOg) {
            const absOg = this.resolveUrl(rawOg, cleanUrl);
            if (this.isValidPhotoUrl(absOg) && !images.includes(absOg)) {
              images.push(absOg);
            }
          }
        });

        // 4-2. <img> 태그 파싱
        const imgTags = doc.querySelectorAll("img");
        imgTags.forEach(img => {
          const rawSrc = img.getAttribute("src") ||
                         img.getAttribute("data-src") ||
                         img.getAttribute("data-original") ||
                         img.getAttribute("data-lazy-src") ||
                         img.getAttribute("srcset");

          if (rawSrc) {
            const candidate = rawSrc.split(",")[0].trim().split(" ")[0];
            const resolved = this.resolveUrl(candidate, cleanUrl);
            if (this.isValidPhotoUrl(resolved) && !images.includes(resolved)) {
              images.push(resolved);
            }
          }
        });
      } catch (err) {
        console.warn("HTML 이미지 파싱 오류:", err);
      }
    }

    return images;
  }

  // 상대 경로 URL을 기준 웹 URL의 절대 경로로 변환
  resolveUrl(relativeOrAbsolute, baseUrl) {
    if (!relativeOrAbsolute) return "";
    try {
      return new URL(relativeOrAbsolute, baseUrl).href;
    } catch (e) {
      if (relativeOrAbsolute.startsWith("//")) {
        return "https:" + relativeOrAbsolute;
      }
      return relativeOrAbsolute;
    }
  }

  // 유효한 사진 URL인지 필터링 (트래커, 1픽셀, 불필요한 아이콘 제외)
  isValidPhotoUrl(url) {
    if (!url || typeof url !== "string") return false;
    if (url.startsWith("data:image/svg") || url.endsWith(".svg")) return false;
    if (url.includes("tracking") || url.includes("pixel") || url.includes("1x1") || url.includes("beacon")) return false;
    if (url.includes("spacer") || url.includes("blank.gif") || url.includes("spinner")) return false;
    return url.startsWith("http://") || url.startsWith("https://");
  }

  // 테마별(카테고리별) 안전 폴백 고화질 사진 (지명이 드러나지 않는 범용 고품질 사진)
  getCategoryFallbackPhoto(category = "landscape") {
    const photoMap = {
      landmark: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80", // 모던 랜드마크
      nature: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",   // 싱그러운 숲길
      cafe: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",     // 감성 카페
      culture: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1000&q=80",  // 전통 골목길
      sunset: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",   // 황금빛 노을
      beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",    // 맑은 바다
      night: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80",    // 도심 야경
      market: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80"   // 로컬 마켓
    };
    return photoMap[category] || photoMap.landmark;
  }

  // 스마트 5대 명소 실감형 블로그 자동 생성기
  async generateDynamicDestination(query) {
    const destName = query.trim();
    const wiki = await this.fetchWikiInfo(destName);

    // 여행지 기본 소개글 생성
    let intro = "";
    if (wiki && wiki.extract && wiki.extract.length > 50) {
      const summarySnippet = wiki.extract.slice(0, 160).replace(/\n/g, " ");
      intro = `오랫동안 마음속 버킷리스트에 담아두었던 '${destName}'(으)로 훌쩍 떠났습니다. ${summarySnippet}... 인터넷과 SNS에서 수많은 여행자들의 찬사를 받는 5대 핫플레이스를 직접 둘러보며 작성한 실감 나는 1박 2일 여행기를 지금부터 공유합니다!`;
    } else {
      intro = `도시의 번잡함을 뒤로하고 푸른 하늘과 낭만이 가득한 '${destName}'(으)로 기분 좋은 여행을 다녀왔습니다. 대중적으로 가장 많은 사랑을 받고 있는 핵심 명소 5곳을 엄선해 마치 함께 걸어보는 듯한 생생한 코스로 블로그에 담아보았습니다.`;
    }

    // 사전 정의된 대표 명소 목록이 있는지 확인
    const matchedCityKey = Object.keys(KNOWN_DESTINATIONS_MAP).find(k => destName.includes(k) || k.includes(destName));
    const knownData = matchedCityKey ? KNOWN_DESTINATIONS_MAP[matchedCityKey] : null;

    // 명소 기본 정보 템플릿 구성
    const spotBases = knownData ? knownData.spots.map((s, idx) => ({
      order: idx + 1,
      name: s.name,
      category: s.category,
      searchTerm: s.searchTerm,
      shortDesc: `${destName}에서 가장 사랑받는 핵심 ${s.category.split('&')[0].trim()} 명소`,
      story: `여행의 감동을 더해준 ${s.name}입니다. 현지인과 여행자 모두에게 인기 있는 이유를 직접 발로 디디며 실감할 수 있었어요. 탁 트인 시야와 특유의 감성이 어우러져 카메라 셔터를 멈출 수 없었습니다.`,
      photoTip: `명소 중앙 프레임에 푸른 하늘이나 노을빛을 3분의 2 배치하여 광각으로 담아보세요.`,
      travelerTip: `주말에는 방문객이 많으므로 오전 일찍 또는 일몰 시간대에 방문하시는 것을 추천합니다.`,
      timeRequired: "1시간 30분",
      location: `${destName} 주요 중심지`,
      fallbackCat: idx === 0 ? "landmark" : (idx === 1 ? "nature" : (idx === 2 ? "culture" : (idx === 3 ? "cafe" : "sunset")))
    })) : [
      {
        order: 1,
        name: `${destName} 대표 랜드마크 & 중심 광장`,
        category: "도시 랜드마크",
        searchTerm: `${destName} 랜드마크`,
        shortDesc: `${destName} 여행의 출발점이자 가장 상징적인 중심 명소`,
        story: `여행지에 도착하자마자 가장 먼저 찾은 ${destName}의 상징적 랜드마크입니다. 활기찬 여행자들의 미소와 이국적인 풍경이 어우러져 "내가 진짜 여행을 왔구나!" 하는 실감이 온몸으로 전해졌어요.`,
        photoTip: "광장 중앙 조형물을 배경으로 푸른 하늘을 시원하게 배치해 보세요.",
        travelerTip: "오전 10시경에 방문하면 채광도 좋고 여유롭게 둘러볼 수 있습니다.",
        timeRequired: "1시간 30분",
        location: `${destName} 중심가 일대`,
        fallbackCat: "landmark"
      },
      {
        order: 2,
        name: `${destName} 자연 힐링 숲 & 호수 공원`,
        category: "자연 & 산책",
        searchTerm: `${destName} 공원`,
        shortDesc: "도심 속에서 맑은 공기와 새소리를 만끽하는 힐링 휴식처",
        story: `바쁜 걸음을 잠시 멈추고 현지인들이 가장 아끼는 산책길을 걸었습니다. 바람에 살랑이는 나뭇잎 소리와 잔잔한 물결을 바라보며 걷다 보니, 마음속 복잡했던 고민들이 말끔히 씻겨 내려갔습니다.`,
        photoTip: "나무 그늘 사이로 부서지는 햇살(빛내림)을 역광으로 담아 감성적인 분위기를 연출하세요.",
        travelerTip: "산책로 입구에 테이크아웃 카페가 있으니 따뜻한 음료를 챙겨 걸으시면 좋습니다.",
        timeRequired: "1시간 20분",
        location: `${destName} 자연생태공원 일대`,
        fallbackCat: "nature"
      },
      {
        order: 3,
        name: `${destName} 감성 카페거리 & 로컬 베이커리`,
        category: "미식 & 디저트 투어",
        searchTerm: `${destName} 카페`,
        shortDesc: "골목골목 숨겨진 개성 있는 카페와 향긋한 커피, 달콤한 디저트",
        story: `SNS에서 핫한 ${destName}의 감성 골목으로 향했습니다. 개성 있는 인테리어의 카페들과 갓 구워낸 시그니처 빵의 고소한 냄새가 골목을 가득 채우고 있었습니다.`,
        photoTip: "감각적인 원목 테이블 위에 시그니처 음료와 디저트를 사선 각도로 배치해 보세요.",
        travelerTip: "인기 있는 베이커리 메뉴는 오후에 조기 품절될 수 있으니 점심 직후 방문을 권장합니다.",
        timeRequired: "2시간",
        location: `${destName} 문화거리`,
        fallbackCat: "cafe"
      },
      {
        order: 4,
        name: `${destName} 역사 문화마을 & 전통 시장`,
        category: "문화 체험 & 로컬 마켓",
        searchTerm: `${destName} 전통시장`,
        shortDesc: "지역 고유의 삶과 따뜻한 인심, 맛있는 먹거리가 살아 숨 쉬는 곳",
        story: `그 지역의 진짜 색깔을 알려면 시장과 옛 골목을 가봐야 하죠. 상인분들의 정겨운 인심과 맛있는 주전부리가 가득한 골목을 구경하며 따뜻한 온기를 선물 받았습니다.`,
        photoTip: "북적이는 시장 골목의 생동감 넘치는 간판들과 맛있는 음식 조리 장면을 클로즈업해보세요.",
        travelerTip: "일부 전통 시장 상점은 현금이나 계좌이체가 편리할 수 있으니 소액의 현금을 준비하세요.",
        timeRequired: "1시간 40분",
        location: `${destName} 전통시장 일원`,
        fallbackCat: "market"
      },
      {
        order: 5,
        name: `${destName} 선셋 전망대 & 파노라마 야경`,
        category: "일몰 & 야경 뷰포인트",
        searchTerm: `${destName} 야경`,
        shortDesc: "하늘이 붉게 타오르며 시작되는 환상적인 파노라마 야경",
        story: `하루의 일정을 마무리하기 위해 가장 높은 전망대에 올랐습니다. 서쪽 하늘이 붉게 물들어가더니, 어둠과 함께 도시의 불빛들이 보석처럼 반짝이기 시작했습니다.`,
        photoTip: "해가 지평선 아래로 넘어간 직후 15~20분간의 '매직아워'에 조명과 하늘빛을 함께 담으세요.",
        travelerTip: "일몰 30분 전에 도착해야 좋은 벤치나 사진 명당자리를 선점할 수 있습니다.",
        timeRequired: "1시간 30분",
        location: `${destName} 해넘이 전망대`,
        fallbackCat: "sunset"
      }
    ];

    // 각 명소별 실제 사진을 위키피디아/위키미디어에서 비동기 검색하여 매핑
    const spotPromises = spotBases.map(async (item) => {
      // 검색어: 명소 자체의 검색어 또는 도시이름 + 명소이름
      const queryTerm = item.searchTerm || `${destName} ${item.name}`;
      const realImage = await this.fetchSpotImage(queryTerm, item.fallbackCat);

      return {
        order: item.order,
        name: item.name,
        category: item.category,
        rating: (4.7 + Math.random() * 0.28).toFixed(1),
        image: realImage,
        shortDesc: item.shortDesc,
        story: item.story,
        photoTip: item.photoTip,
        travelerTip: item.travelerTip,
        timeRequired: item.timeRequired,
        location: item.location
      };
    });

    const spots = await Promise.all(spotPromises);

    // 대표 히어로 이미지 결정 (위키피디아 대표 썸네일 우선, 없으면 1번 명소 실제 사진)
    const heroImg = wiki?.thumbnail || (spots[0] && spots[0].image) || this.getCategoryFallbackPhoto("landmark");

    return {
      id: `custom_${Date.now()}`,
      keyword: destName,
      aliases: [destName],
      title: `낭만과 감동이 넘쳐나는 ${destName}, 꼭 가봐야 할 5대 인생 명소 여행기`,
      subtitle: `웹 실시간 검색 기반 대중 추천 핫플레이스와 직접 걷고 느낀 생생한 1인칭 후기`,
      region: knownData?.region || "추천 여행지",
      badge: "실시간 정품 명소",
      likes: Math.floor(450 + Math.random() * 500),
      heroImage: heroImg,
      author: {
        name: "여행 큐레이터 하늘",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        date: new Date().toISOString().slice(0, 10).replace(/-/g, "."),
        readTime: "6분 읽기"
      },
      introStory: intro,
      spots: spots,
      extraSpots: spots,
      epilogue: `${destName} 여행은 기대 이상으로 다채로운 즐거움과 깊은 쉼을 선사해 주었습니다. 직접 발로 뛰어 확인한 이 5곳의 명소들은 누구와 함께 가더라도 절대 실패하지 않을 알짜배기 코스입니다. 여러분도 망설이지 말고 지금 바로 떠나보세요!`
    };
  }
}

// 브라우저 전역 노출
if (typeof window !== "undefined") {
  window.travelSearchEngine = new TravelSearchEngine();
}
