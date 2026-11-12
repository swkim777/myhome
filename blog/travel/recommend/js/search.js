/**
 * JowonPlace Travel Blog - Search Engine & Dynamic Generator
 * 사용자 입력 기반 여행지 검색, 위키피디아/공개 API 연동 및 5대 명소 실감형 블로그 생성기
 */

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
          // 중복 방지 병합
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

    // 2. 새로운 여행지일 경우: 위키피디아 & 실시간 검색 및 스마트 블로그 생성기 가동
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

  // 위키피디아 실시간 오픈 API 검색
  async fetchWikiInfo(query) {
    try {
      const endpoint = `https://ko.wikipedia.org/w/api.php?action=query&prop=extracts|pageimages&exintro=1&explaintext=1&titles=${encodeURIComponent(query)}&pithumbsize=1000&format=json&origin=*`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const pages = data.query?.pages;
      if (!pages) return null;

      const pageId = Object.keys(pages)[0];
      if (pageId === "-1") return null;

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

  // 스마트 5대 명소 실감형 블로그 자동 생성기
  async generateDynamicDestination(query) {
    const wiki = await this.fetchWikiInfo(query);
    const destName = query;

    // 여행지 기본 소개글 생성
    let intro = "";
    if (wiki && wiki.extract && wiki.extract.length > 50) {
      const summarySnippet = wiki.extract.slice(0, 150).replace(/\n/g, " ");
      intro = `오랫동안 마음속 버킷리스트에 담아두었던 '${destName}'(으)로 훌쩍 떠났습니다. ${summarySnippet}... 인터넷과 SNS에서 수많은 여행자들의 찬사를 받는 5대 핫플레이스를 직접 둘러보며 작성한 실감 나는 1박 2일 여행기를 지금부터 공유합니다!`;
    } else {
      intro = `도시의 번잡함을 뒤로하고 푸른 하늘과 낭만이 가득한 '${destName}'(으)로 기분 좋은 여행을 다녀왔습니다. 대중적으로 가장 많은 사랑을 받고 있는 핵심 명소 5곳을 엄선해 마치 함께 걸어보는 듯한 생생한 코스로 블로그에 담아보았습니다.`;
    }

    // Unsplash 고품질 큐레이션 이미지 프리셋 풀
    const travelPhotos = [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1000&q=80"
    ];

    // 대중적인 5가지 테마별 5대 명소 구성
    const spotTemplates = [
      {
        order: 1,
        titleSuffix: "중앙 랜드마크 & 대표 광장",
        category: "도시 랜드마크",
        shortDesc: `${destName} 여행의 출발점이자 가장 상징적인 중심 명소`,
        story: `여행지에 도착하자마자 가장 먼저 찾은 ${destName}의 랜드마크입니다. 활기찬 여행자들의 미소와 이국적인 풍경이 어우러져 "내가 진짜 여행을 왔구나!" 하는 실감이 온몸으로 전해졌어요. 탁 트인 광장에서 마시는 시원한 음료 한 잔과 함께 여행의 첫 설렘을 시작하기에 더없이 완벽했습니다.`,
        photoTip: "광장 중앙 분수나 랜드마크 조형물을 배경으로 푸른 하늘을 3분의 2 배치해 시원한 구도를 잡아보세요.",
        travelerTip: "오전 10시경에 방문하면 햇살도 좋고 단체 관광객이 적어 여유롭게 둘러볼 수 있습니다.",
        timeRequired: "1시간 30분",
        location: `${destName} 중심가 인근`
      },
      {
        order: 2,
        titleSuffix: "자연 힐링 숲 & 호수 공원",
        category: "자연 & 산책",
        shortDesc: "도심 속에서 맑은 공기와 새소리를 만끽하는 힐링 휴식처",
        story: `바쁜 걸음을 잠시 멈추고 현지인들이 가장 아끼는 산책길을 걸었습니다. 바람에 살랑이는 나뭇잎 소리와 잔잔한 물결을 바라보며 걷다 보니, 마음속 복잡했던 고민들이 말끔히 씻겨 내려가는 평온함을 경험했어요. 벤치에 앉아 가만히 멍 때리는 것만으로도 최고의 힐링이었습니다.`,
        photoTip: "나무 그늘 사이로 부서지는 햇살(빛내림)을 역광으로 담아 감성적인 분위기를 연출하세요.",
        travelerTip: "산책로 입구에 테이크아웃 카페가 있으니 따뜻한 차나 커피를 챙겨 걸으시면 좋습니다.",
        timeRequired: "1시간 20분",
        location: `${destName} 자연생태공원 일대`
      },
      {
        order: 3,
        titleSuffix: "감성 카페거리 & 로컬 베이커리",
        category: "미식 & 디저트 투어",
        shortDesc: "골목골목 숨겨진 개성 있는 카페와 향긋한 커피, 달콤한 디저트",
        story: `SNS에서 핫한 ${destName}의 감성 골목으로 향했습니다. 오래된 주택과 현대적인 인테리어가 조화를 이룬 카페들이 빼곡했는데요, 갓 구워낸 시그니처 빵의 고소한 냄새가 골목을 가득 채우고 있었습니다. 통창으로 따사로운 햇살을 맞으며 즐긴 브런치는 이번 여행의 미식 정점이었습니다!`,
        photoTip: "감각적인 원목 테이블 위에 시그니처 음료와 디저트를 사선 각도로 배치해 항공샷으로 담아보세요.",
        travelerTip: "인기 있는 베이커리 메뉴는 오후 2시 이전에 품절될 수 있으니 점심 직후 서둘러 방문하세요.",
        timeRequired: "2시간",
        location: `${destName} 청년 문화거리`
      },
      {
        order: 4,
        titleSuffix: "역사 문화마을 & 전통 시장",
        category: "문화 체험 & 로컬 마켓",
        shortDesc: "지역 고유의 삶과 따뜻한 인심, 맛있는 먹거리가 살아 숨 쉬는 곳",
        story: `그 지역의 진짜 색깔을 알려면 시장과 옛 골목을 가봐야 한다고 하죠. 상인분들의 정겨운 사투리와 맛있는 주전부리가 가득한 골목을 구경하며 현지 분위기를 듬뿍 느꼈습니다. 갓 부쳐낸 전과 지역 전통 특산물을 맛보며 사람 냄새 나는 따뜻한 온기를 선물 받았습니다.`,
        photoTip: "북적이는 시장 골목의 생동감 넘치는 간판들과 맛있는 음식 조리 장면을 클로즈업해보세요.",
        travelerTip: "일부 전통 시장 상점은 현금이나 계좌이체가 편리할 수 있으니 소액의 현금을 준비하세요.",
        timeRequired: "1시간 40분",
        location: `${destName} 전통시장 일원`
      },
      {
        order: 5,
        titleSuffix: "선셋 전망대 & 황금빛 야경 스팟",
        category: "일몰 & 야경 뷰포인트",
        shortDesc: "하늘이 붉게 타오르며 시작되는 환상적인 파노라마 야경",
        story: `하루의 일정을 마무리하기 위해 가장 높은 전망대에 올랐습니다. 서쪽 하늘이 핑크빛과 주황빛으로 물들어가더니, 어둠과 함께 도시의 불빛들이 보석처럼 반짝이기 시작했습니다. 숨 가쁘게 달려온 하루를 위로해 주는 듯한 야경을 바라보며 이번 여행을 오래도록 기억하리라 다짐했습니다.`,
        photoTip: "해가 지평선 아래로 넘어간 직후 15~20분간의 '매직아워'에 푸른 하늘과 도시 조명을 한 프레임에 담으세요.",
        travelerTip: "일몰 30분 전에 도착해야 좋은 벤치나 사진 명당자리를 선점할 수 있습니다.",
        timeRequired: "1시간 30분",
        location: `${destName} 해넘이 전망대`
      }
    ];

    const extraSpotTemplates = [
      {
        order: 1,
        titleSuffix: "숨은 비경 & 해안/호반 둘레길",
        category: "히든 스팟 & 트레킹",
        shortDesc: "아직 덜 알려진 고즈넉한 풍경과 잔잔한 물결이 빚어내는 비밀 힐링길",
        story: `현지 주민분이 강력 추천해주셔서 찾아간 비밀 둘레길입니다. 붐비는 인파 없이 오직 바람 소리와 파도 소리만 들려와 마치 나만을 위해 준비된 여행지 같았어요.`,
        photoTip: "오솔길 끝 수평선이 맞닿는 프레임을 중앙에 두고 자연스러운 걸음걸이를 담아보세요.",
        travelerTip: "안내 표지판이 작으므로 내비게이션 좌표를 미리 확인하고 방문하세요.",
        timeRequired: "1시간 30분",
        location: `${destName} 해안/호반 생태길`
      },
      {
        order: 2,
        titleSuffix: "아트 갤러리 & 감성 복합문화공간",
        category: "예술 문화 & 디자인 쉼터",
        shortDesc: "폐공장이나 고택을 개조해 독창적인 전시와 음악을 즐기는 핫플레이스",
        story: `예술가들의 숨결이 살아있는 복합문화공간으로 발걸음을 옮겼습니다. 감각적인 조명 아래 펼쳐진 설치 미술과 LP에서 흘러나오는 잔잔한 음악이 여행의 감성을 최고조로 끌어올려 주었습니다.`,
        photoTip: "감각적인 조각상이나 콘크리트 벽면의 타이포그래피 앞에서 전신 샷을 연출해 보세요.",
        travelerTip: "시즌별 기획 전시가 자주 변경되므로 인스타그램 공식 계정을 사전 확인하는 것이 좋습니다.",
        timeRequired: "2시간",
        location: `${destName} 문화예술단지`
      },
      {
        order: 3,
        titleSuffix: "로컬 미식 골목 & 숨은 맛집 거리",
        category: "골목 미식 & 수제 베이커리",
        shortDesc: "골목 안쪽에 숨어있는 현지인들의 줄 서는 시그니처 맛집",
        story: `관광객 위주가 아닌 진짜 로컬 단골들이 찾는 식당을 방문했습니다. 수십 년 내공이 담긴 깊은 육수 맛과 푸짐한 반찬에 여행의 피로가 눈 녹듯 사라졌습니다.`,
        photoTip: "김이 모락모락 피어오르는 정갈한 한 상 차림을 45도 탑뷰로 포착해 보세요.",
        travelerTip: "재료 소진 시 조기 마감될 수 있으니 점심 피크 이전이나 브레이크 타임 직후를 노리세요.",
        timeRequired: "1시간 20분",
        location: `${destName} 골목 미식길`
      },
      {
        order: 4,
        titleSuffix: "숲속 비밀 쉼터 & 야생화 온실",
        category: "자연 치유 & 보태니컬 가든",
        shortDesc: "사계절 푸른 이끼와 희귀 야생화가 반기는 숲속 유리온실 카페",
        story: `숲 한가운데 자리 잡은 유리온실에 들어서자 싱그러운 풀내음이 온몸을 감쌌습니다. 따스한 햇살 아래 허브티 한 잔을 마시며 초록빛 식물들을 바라보는 동안 온전한 휴식을 누렸습니다.`,
        photoTip: "온실 유리창으로 투과되는 자연광을 역광으로 활용해 식물의 잎맥과 함께 인물을 담아보세요.",
        travelerTip: "실내 온도가 온화하여 가벼운 옷차림이 좋으며, 야외 정원 산책도 꼭 챙겨보세요.",
        timeRequired: "1시간 30분",
        location: `${destName} 숲속식물원 일대`
      },
      {
        order: 5,
        titleSuffix: "스카이라인 루프탑 & 달빛 야경 뷰포인트",
        category: "도심 야경 & 로맨틱 바",
        shortDesc: "도시의 화려한 조명과 밤하늘의 달빛을 한눈에 내려다보는 로맨틱 뷰",
        story: `여행의 마지막 밤을 기념하기 위해 찾은 루프탑 테라스. 시원한 밤바람을 맞으며 바라본 도시의 스카이라인은 마치 은하수를 내려다보는 듯 화려하고 로맨틱했습니다.`,
        photoTip: "도시 불빛이 만드는 은은한 보케(Bokeh)를 배경으로 와인잔이나 칵테일 잔을 든 손을 클로즈업해 보세요.",
        travelerTip: "주말 저녁 테라스 석은 웨이팅이 있을 수 있으니 일몰 30분 전 자리를 잡으세요.",
        timeRequired: "1시간 40분",
        location: `${destName} 도심 루프탑 파크`
      }
    ];

    const spots = spotTemplates.map((item, idx) => ({
      order: item.order,
      name: `${destName} ${item.titleSuffix}`,
      category: item.category,
      rating: (4.7 + Math.random() * 0.28).toFixed(1),
      image: travelPhotos[idx % travelPhotos.length],
      shortDesc: item.shortDesc,
      story: item.story,
      photoTip: item.photoTip,
      travelerTip: item.travelerTip,
      timeRequired: item.timeRequired,
      location: item.location
    }));

    const extraSpots = extraSpotTemplates.map((item, idx) => ({
      order: item.order,
      name: `${destName} ${item.titleSuffix}`,
      category: item.category,
      rating: (4.8 + Math.random() * 0.18).toFixed(1),
      image: travelPhotos[(idx + 2) % travelPhotos.length],
      shortDesc: item.shortDesc,
      story: item.story,
      photoTip: item.photoTip,
      travelerTip: item.travelerTip,
      timeRequired: item.timeRequired,
      location: item.location
    }));

    const heroImg = wiki?.thumbnail || travelPhotos[Math.floor(Math.random() * travelPhotos.length)];

    return {
      id: `custom_${Date.now()}`,
      keyword: destName,
      aliases: [destName],
      title: `낭만과 감동이 넘쳐나는 ${destName}, 꼭 가봐야 할 5대 인생 명소 여행기`,
      subtitle: `웹 실시간 검색 기반 대중 추천 핫플레이스와 직접 걷고 느낀 생생한 1인칭 후기`,
      region: "추천 여행지",
      badge: "웹 실시간 탐색",
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
      extraSpots: extraSpots,
      epilogue: `${destName} 여행은 기대 이상으로 다채로운 즐거움과 깊은 쉼을 선사해 주었습니다. 직접 발로 뛰어 확인한 이 5곳의 명소들은 누구와 함께 가더라도 절대 실패하지 않을 알짜배기 코스입니다. 여러분도 망설이지 말고 지금 바로 떠나보세요!`
    };
  }
}

// 브라우저 전역 노출
if (typeof window !== "undefined") {
  window.travelSearchEngine = new TravelSearchEngine();
}
