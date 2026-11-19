/**
 * VERTEX Mountain & Trail Dataset
 * 산림청(forest.go.kr) 공식 100대 명산 전체(100선) + 국내 최고봉 TOP 20 통합 데이터베이스 (총 107대 명산)
 * 모든 산의 이미지는 한국어 위키백과(ko.wikipedia.org/wiki/<산이름>)의 실제 산 이미지(위키백과 문서에 이미지가 없는 경우 산림청 공식 실사)로 매칭됨
 */

const MOUNTAIN_DATA = [
  {
    "id": "hallasan",
    "forestId": "20000661",
    "isForest100": true,
    "top20Rank": 1,
    "name": "한라산 (백록담)",
    "subTitle": "화산이 잉태한 남한 최고(最高)의 영산 (산림청 100대 명산)",
    "location": "제주도 제주시, 서귀포시",
    "altitude": 1947.3,
    "gain": 1327,
    "difficulty": "중급",
    "region": "제주",
    "themes": [
      "100대 명산",
      "TOP 20",
      "일출 명소",
      "설산",
      "단풍"
    ],
    "distance": 18.3,
    "duration": "8시간 30분",
    "rating": 4.98,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg/1280px-KOCIS_Halla_Mountain_in_Jeju-do_%286387785543%29.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,947.3m] 백록담 화산호와 1,800여 종의 고산식물, 360여 개의 오름을 품은 남한 최고봉.",
    "fullDesc": "한라산(산림청 공식 1,947.3m)은 금강산, 지리산과 함께 우리나라 3대 영산의 하나이며 남한에서 가장 높은 산입니다. 이름은 \"은하수를 끌어당길 수 있다(雲漢可拏引也)\"는 뜻에서 유래했으며 부악(釜岳), 두무악(頭無岳), 영주산(瀛州山), 진산(眞山) 등으로도 불렸습니다. 정상에는 분화구인 백록담이 있고 산자락에는 360여 개의 측화산(오름)이 분포하며, 탐라계곡, 안덕계곡, 왕관릉, 성판악, 관음사, 영실, 어리목 등이 유명합니다. 1970년 국립공원으로 지정되었고 유네스코 세계자연유산에 등재된 고산식물의 보고입니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 620,
        "label": "관음사 입구"
      },
      {
        "km": 3.2,
        "alt": 1100,
        "label": "탐라계곡"
      },
      {
        "km": 6,
        "alt": 1500,
        "label": "삼각봉 대피소"
      },
      {
        "km": 8.7,
        "alt": 1947.3,
        "label": "백록담 정상"
      },
      {
        "km": 11,
        "alt": 1500,
        "label": "진달래밭 대피소"
      },
      {
        "km": 14.5,
        "alt": 1100,
        "label": "사라오름 입구"
      },
      {
        "km": 18.3,
        "alt": 750,
        "label": "성판악 입구"
      }
    ],
    "waypoints": [
      {
        "name": "관음사 탐방로 입구",
        "alt": 620,
        "dist": 0,
        "note": "사전 탐방예약 QR코드 확인"
      },
      {
        "name": "탐라계곡 & 왕관릉 조망",
        "alt": 1100,
        "dist": 3.2,
        "note": "용진각 현수교 및 급경사 계단 진입"
      },
      {
        "name": "삼각봉 대피소",
        "alt": 1500,
        "dist": 6,
        "note": "정상 통제 시간(12:00) 확인 필수"
      },
      {
        "name": "백록담 정상 (1,947.3m)",
        "alt": 1947.3,
        "dist": 8.7,
        "note": "남한 최고봉 분화구 화구벽"
      },
      {
        "name": "진달래밭 대피소",
        "alt": 1500,
        "dist": 11,
        "note": "성판악 방면 하산 거점"
      },
      {
        "name": "성판악 탐방지원센터",
        "alt": 750,
        "dist": 18.3,
        "note": "완주 및 등정인증서 신청"
      }
    ],
    "checklist": [
      "한라산 탐방예약 QR코드 및 신분증 지참",
      "방풍·방수 고어텍스 재킷 (고지대 급변 기상 대비)",
      "동계 시즌 아이젠 및 스패츠 필수 휴대",
      "보온병 온수 및 고열량 행동식",
      "등산 스틱 및 무릎 보호대 (장거리 하산)"
    ],
    "weather": {
      "baseTemp": 16,
      "peakTemp": 3.3,
      "windSpeed": 5.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%95%9C%EB%9D%BC%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423745&fileSn=1"
  },
  {
    "id": "jirisan",
    "forestId": "20000946",
    "isForest100": true,
    "top20Rank": 2,
    "name": "지리산 (천왕봉)",
    "subTitle": "백두의 끝, 역사의 피와 눈물이 함께 묻혀있는 이상향 (산림청 100대 명산)",
    "location": "전라북도 남원시, 전라남도 구례군, 경상남도 하동군ㆍ산청군ㆍ함양군",
    "altitude": 1915.4,
    "gain": 1275,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "TOP 20",
      "일출 명소",
      "종주 코스",
      "설산"
    ],
    "distance": 12.8,
    "duration": "7시간 30분",
    "rating": 4.96,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Korea-Mountain-Jirisan-15.jpg/1280px-Korea-Mountain-Jirisan-15.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,915.4m] 천왕봉(1,915.4m)·반야봉(1,731.8m)·노고단(1,507m)을 거느린 남한 내륙 최고봉.",
    "fullDesc": "지리산(산림청 공식 1,915.4m)은 신라 5악 중 남악으로 남한 내륙의 최고봉인 천왕봉(1,915.4m)을 주봉으로 반야봉(1,731.8m), 노고단(1,507m) 등 동서 100여 리의 거대한 산악군을 이뤄 \"지리산 12동천\"과 지리산 10경(노고단 운해, 피아골 단풍, 반야봉 낙조, 세석평전 철쭉, 천왕봉 일출 등)을 형성합니다. \"어리석은 사람이 머물면 지혜로운 사람으로 달라진다\"는 데서 이름이 유래했으며 방장산, 두류산으로도 불렸습니다. 1967년 대한민국 국립공원 제1호로 지정되었으며 화엄사, 천은사, 연곡사, 쌍계사, 실상사 등 수많은 국보·보물 사찰을 품고 있습니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 640,
        "label": "중산리센터"
      },
      {
        "km": 1.3,
        "alt": 800,
        "label": "칼바위"
      },
      {
        "km": 3.4,
        "alt": 1450,
        "label": "법계사"
      },
      {
        "km": 4.5,
        "alt": 1700,
        "label": "개선문"
      },
      {
        "km": 5,
        "alt": 1810,
        "label": "통천문"
      },
      {
        "km": 5.4,
        "alt": 1915.4,
        "label": "천왕봉 정상"
      },
      {
        "km": 7.1,
        "alt": 1650,
        "label": "장터목대피소"
      },
      {
        "km": 12.8,
        "alt": 640,
        "label": "중산리 회귀"
      }
    ],
    "waypoints": [
      {
        "name": "중산리 탐방지원센터",
        "alt": 640,
        "dist": 0,
        "note": "경남 산청군 시천면 중산리 들머리"
      },
      {
        "name": "칼바위 삼거리",
        "alt": 800,
        "dist": 1.3,
        "note": "장터목·법계사 갈림길"
      },
      {
        "name": "로타리대피소 & 법계사",
        "alt": 1450,
        "dist": 3.4,
        "note": "식수 보충 및 휴식처"
      },
      {
        "name": "통천문",
        "alt": 1810,
        "dist": 5,
        "note": "하늘로 통하는 바위 협곡 계단"
      },
      {
        "name": "천왕봉 (1,915.4m)",
        "alt": 1915.4,
        "dist": 5.4,
        "note": "남한 내륙 최고봉 정상석"
      },
      {
        "name": "장터목대피소",
        "alt": 1650,
        "dist": 7.1,
        "note": "주능선 거점 대피소"
      }
    ],
    "checklist": [
      "중등산화 및 무릎 보호대, 등산 스틱",
      "방풍 하드쉘 재킷 및 보온 플리스",
      "헤드랜턴 및 여분 배터리 (일출 산행 시)",
      "식수 1.5L 이상 및 고열량 행동식"
    ],
    "weather": {
      "baseTemp": 12.5,
      "peakTemp": 0.1,
      "windSpeed": 6.8,
      "condition": "맑음 (능선 강풍)"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%A7%80%EB%A6%AC%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423712&fileSn=1"
  },
  {
    "id": "seoraksan",
    "forestId": "20000386",
    "isForest100": true,
    "top20Rank": 3,
    "name": "설악산 (대청봉)",
    "subTitle": "섬세한 비경 두루 갖춘 팔방미인, 한국의 알프스 (산림청 100대 명산)",
    "location": "강원도 속초시 설악동, 인제군 북면ㆍ인제읍, 양양군 서면ㆍ강현면",
    "altitude": 1708.1,
    "gain": 1488,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "TOP 20",
      "암릉 산행",
      "단풍",
      "설산",
      "일출 명소"
    ],
    "distance": 19.5,
    "duration": "11시간",
    "rating": 5,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Korea_Seoraksan.jpg/1280px-Korea_Seoraksan.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,708.1m] 공룡능선을 경계로 내설악·외설악·남설악이 어우러진 남한 제3위 고봉.",
    "fullDesc": "설악산(산림청 공식 1,708.1m)은 한라산(1,947.3m), 지리산(1,915.4m)에 이어 남한에서 세 번째로 높은 산으로 강원도 속초시, 인제군, 양양군에 걸쳐 있습니다. 동국여지승람에 \"한가위에 내리기 시작한 눈이 하지에 이르러 사라지기 때문에 설악이라 한다\"고 기록되어 있으며 설산, 설봉산, 한계산으로도 불렸습니다. 백두대간인 공룡능선을 경계로 서쪽 내설악(백담·수렴동·가야동·12선녀탕 계곡)과 동쪽 외설악(천불동계곡·울산바위·토왕성폭포), 오색 남설악으로 나뉘며 1970년 국립공원, 1982년 유네스코 생물권보전지역으로 지정되었습니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 220,
        "label": "소공원"
      },
      {
        "km": 3.5,
        "alt": 580,
        "label": "비선대"
      },
      {
        "km": 6.5,
        "alt": 1220,
        "label": "마등령"
      },
      {
        "km": 8.5,
        "alt": 1275,
        "label": "1275봉"
      },
      {
        "km": 11.2,
        "alt": 1225,
        "label": "신선대"
      },
      {
        "km": 13,
        "alt": 1600,
        "label": "희운각대피소"
      },
      {
        "km": 15.5,
        "alt": 1708.1,
        "label": "대청봉 정상"
      },
      {
        "km": 19.5,
        "alt": 920,
        "label": "오색 지구"
      }
    ],
    "waypoints": [
      {
        "name": "설악동 소공원 & 신흥사",
        "alt": 220,
        "dist": 0,
        "note": "조계종 제3교구 본사 신흥사 경유"
      },
      {
        "name": "비선대",
        "alt": 580,
        "dist": 3.5,
        "note": "마등령·천불동계곡 갈림길"
      },
      {
        "name": "마등령 삼거리",
        "alt": 1220,
        "dist": 6.5,
        "note": "북주능의 등뼈 공룡능선 진입점"
      },
      {
        "name": "신선대 전망대",
        "alt": 1225,
        "dist": 11.2,
        "note": "공룡능선 암봉군 파노라마 조망"
      },
      {
        "name": "대청봉 (1,708.1m)",
        "alt": 1708.1,
        "dist": 15.5,
        "note": "설악산 최고봉 및 동해 일출 조망"
      },
      {
        "name": "남설악 오색 탐방센터",
        "alt": 920,
        "dist": 19.5,
        "note": "양양군 서면 오색리 하산 종점"
      }
    ],
    "checklist": [
      "접지력이 뛰어난 비브람창 등산화",
      "암릉 구간용 그립 장갑 및 스틱",
      "식수 2L 이상 및 전해질 보충제",
      "방풍 자켓 및 비상 헤드랜턴"
    ],
    "weather": {
      "baseTemp": 10,
      "peakTemp": -1.1,
      "windSpeed": 9.2,
      "condition": "구름 많음 (강풍)"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%84%A4%EC%95%85%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423772&fileSn=1"
  },
  {
    "id": "deogyusan",
    "forestId": "20000144",
    "isForest100": true,
    "top20Rank": 4,
    "name": "덕유산 (향적봉)",
    "subTitle": "첩첩산중, 덕이 겹친 큰 산 (산림청 100대 명산)",
    "location": "전라북도 무주군ㆍ장수군, 경상남도 거창군ㆍ함양군",
    "altitude": 1614.2,
    "gain": 890,
    "difficulty": "초급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "TOP 20",
      "설산",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 8.5,
    "duration": "4시간 30분",
    "rating": 4.91,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Deogyusan_from_Hyangjeok_Peak.jpg/1280px-Deogyusan_from_Hyangjeok_Peak.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,614.2m] 향적봉에서 남덕유까지 17km의 장대한 산줄기와 무주구천동 33경의 명산.",
    "fullDesc": "덕유산(산림청 공식 1,614.2m)은 전북 무주군·장수군과 경남 거창군·함양군의 2도 4군 8개면에 걸쳐 있는 남한 제4위 고봉입니다. 덕이 있고 크며 넉넉한 산이라는 뜻에서 이름이 유래했으며, 주봉인 향적봉(1,614.2m)에서 남덕유산까지 17km의 장대한 산줄기를 이루어 금강과 낙동강의 수원이 됩니다. 북쪽으로 흐르는 30여 km의 무주구천동 33경(제1경 나제통문~제32경 백련사~제33경 향적봉)과 신라 흥덕왕 5년(830년) 무염국사가 창건한 백련사, 거창 수승대 등이 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 600,
        "label": "무주 리조트"
      },
      {
        "km": 2.5,
        "alt": 1520,
        "label": "설천봉"
      },
      {
        "km": 3.1,
        "alt": 1614.2,
        "label": "향적봉 정상"
      },
      {
        "km": 4.3,
        "alt": 1595,
        "label": "중봉"
      },
      {
        "km": 5.5,
        "alt": 900,
        "label": "백련사"
      },
      {
        "km": 8.5,
        "alt": 720,
        "label": "구천동 센터"
      }
    ],
    "waypoints": [
      {
        "name": "무주 설천하우스",
        "alt": 600,
        "dist": 0,
        "note": "곤돌라 탑승장"
      },
      {
        "name": "설천봉 상제루",
        "alt": 1520,
        "dist": 2.5,
        "note": "상고대 포토존 및 정비소"
      },
      {
        "name": "향적봉 (1,614.2m)",
        "alt": 1614.2,
        "dist": 3.1,
        "note": "무주구천동 제33경 덕유산 주봉"
      },
      {
        "name": "중봉 덕유평전",
        "alt": 1595,
        "dist": 4.3,
        "note": "아고산대 구상나무·주목 군락지"
      },
      {
        "name": "백련사 & 구천동계곡",
        "alt": 900,
        "dist": 5.5,
        "note": "신라 흥덕왕 5년(830년) 창건 고찰"
      }
    ],
    "checklist": [
      "아이젠 및 스패츠 (동계 시즌 필수)",
      "방한 모자, 넥워머, 고글",
      "따뜻한 식수 및 핫팩"
    ],
    "weather": {
      "baseTemp": 5,
      "peakTemp": -5.5,
      "windSpeed": 8,
      "condition": "상고대 절정"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%8D%95%EC%9C%A0%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424053&fileSn=1"
  },
  {
    "id": "gyebangsan",
    "forestId": "20000043",
    "isForest100": true,
    "top20Rank": 5,
    "name": "계방산",
    "subTitle": "해발은 높되 산세는 유순하니 (산림청 100대 명산)",
    "location": "강원도 홍천군 내면, 평창군 용평면ㆍ진부면",
    "altitude": 1579.1,
    "gain": 490,
    "difficulty": "초급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "TOP 20",
      "설산",
      "일출 명소"
    ],
    "distance": 9.8,
    "duration": "4시간 30분",
    "rating": 4.89,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424552&fileSn=1",
    "shortDesc": "[산림청 공식 1,579.1m] 한라·지리·설악·덕유에 이은 남한 제5위 고봉, 운두령과 주목 설경의 백미.",
    "fullDesc": "계방산(산림청 공식 1,579.1m)은 한라산(1,947.3m), 지리산(1,915.4m), 설악산(1,708.1m), 덕유산(1,614.2m)에 이어 남한에서 다섯 번째로 높은 산입니다. 강원도 홍천군 내면과 평창군 용평면·진부면에 걸쳐 있으며 내린천으로 흐르는 계방천의 발원지입니다. 희귀수목인 주목·철쭉나무와 산약초·야생화가 군락을 이루어 생태계 보호지역으로 지정되었고, 자동차로 오를 수 있는 높은 고개인 운두령(1,089m)에서 유순한 능선을 따라 올라 백두대간을 한눈에 조망하는 겨울철 적설 산행지로 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 1089,
        "label": "운두령 고개"
      },
      {
        "km": 1.9,
        "alt": 1280,
        "label": "물푸레군락"
      },
      {
        "km": 3.2,
        "alt": 1492,
        "label": "전망대 능선"
      },
      {
        "km": 4.1,
        "alt": 1579.1,
        "label": "계방산 정상"
      },
      {
        "km": 5.4,
        "alt": 1295,
        "label": "노동리 갈림길"
      },
      {
        "km": 9.8,
        "alt": 780,
        "label": "노동계곡 주차장"
      }
    ],
    "waypoints": [
      {
        "name": "운두령 탐방로 입구 (1,089m)",
        "alt": 1089,
        "dist": 0,
        "note": "자동차로 오르는 고산 들머리"
      },
      {
        "name": "물푸레나무 군락지",
        "alt": 1280,
        "dist": 1.9,
        "note": "울창한 활엽수림 눈꽃 터널"
      },
      {
        "name": "능선 전망대 (1,492m)",
        "alt": 1492,
        "dist": 3.2,
        "note": "백두대간 및 오대산·설악산 조망"
      },
      {
        "name": "계방산 정상 (1,579.1m)",
        "alt": 1579.1,
        "dist": 4.1,
        "note": "남한 제5위 고봉 정상석과 주목군락"
      },
      {
        "name": "노동계곡 & 방아다리약수 권역",
        "alt": 780,
        "dist": 9.8,
        "note": "하산 완료"
      }
    ],
    "checklist": [
      "체인 아이젠 및 스패츠 (무릎 이상 빠질 정도의 풍부한 적설량 대비)",
      "방풍 고어텍스 자켓 및 귀마개",
      "등산 스틱 1쌍 및 보온 도시락"
    ],
    "weather": {
      "baseTemp": 4,
      "peakTemp": -6.2,
      "windSpeed": 6.5,
      "condition": "맑음 (설경)"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B3%84%EB%B0%A9%EC%82%B0_%28%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424552&fileSn=1"
  },
  {
    "id": "hambaeksan",
    "forestId": "20000663",
    "isForest100": false,
    "top20Rank": 6,
    "name": "함백산",
    "subTitle": "주목과 설경이 아름다운 산, 5대 적멸보궁 정암사를 품은 대박산",
    "location": "강원도 태백시, 영월군 상동읍, 정선군 고한읍",
    "altitude": 1573,
    "gain": 243,
    "difficulty": "초급",
    "region": "강원",
    "themes": [
      "TOP 20",
      "설산",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 7.2,
    "duration": "3시간 30분",
    "rating": 4.87,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/%ED%95%A8%EB%B0%B1%EC%82%B0_%EC%B6%94%EB%AA%A8%EA%B3%B5%EC%9B%90_%EA%B0%9C%EC%9B%90%EC%8B%9D.jpg/1280px-%ED%95%A8%EB%B0%B1%EC%82%B0_%EC%B6%94%EB%AA%A8%EA%B3%B5%EC%9B%90_%EA%B0%9C%EC%9B%90%EC%8B%9D.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,573m (1,572.9m)] 산경표의 대박산·삼국유사의 묘범산, 만항재(1,330m)와 정암사의 명산.",
    "fullDesc": "함백산(산림청 공식 1,573m / 상세 1,572.9m)은 강원도 태백시, 영월군 상동읍, 정선군 고한읍에 걸친 남한 제6위의 고봉입니다. 산경표에서는 \"크고 밝은 뫼\"라는 뜻의 대박산(大朴山), 삼국유사에서는 묘범산(妙梵山)이라 불렸으며, 자장율사가 적멸보궁과 수마노탑을 세우고 진신사리를 모신 정암사(선장단 주목)를 품고 있습니다. 남한에서 가장 높은 도로인 만항재(1,330m)에서 두문동재(1,268m)까지 고원 산나물과 주목·고사목 상고대 설경이 장관을 이룹니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 1330,
        "label": "만항재(1,330m)"
      },
      {
        "km": 1.2,
        "alt": 1420,
        "label": "함백산 기원단"
      },
      {
        "km": 2.3,
        "alt": 1573,
        "label": "함백산 정상"
      },
      {
        "km": 3.4,
        "alt": 1505,
        "label": "중함백"
      },
      {
        "km": 5.5,
        "alt": 1442,
        "label": "은대봉"
      },
      {
        "km": 7.2,
        "alt": 1268,
        "label": "두문동재(1,268m)"
      }
    ],
    "waypoints": [
      {
        "name": "만항재 (1,330m)",
        "alt": 1330,
        "dist": 0,
        "note": "남한에서 가장 높은 포장도로 고개 들머리"
      },
      {
        "name": "함백산 기원단",
        "alt": 1420,
        "dist": 1.2,
        "note": "태백선수촌 갈림길 및 기원단"
      },
      {
        "name": "함백산 정상 (1,573m / 1,572.9m)",
        "alt": 1573,
        "dist": 2.3,
        "note": "주목·고사목 상고대와 360도 백두대간 뷰"
      },
      {
        "name": "중함백 & 은대봉",
        "alt": 1505,
        "dist": 3.4,
        "note": "고원 산나물 및 주목 군락 능선"
      },
      {
        "name": "두문동재 (1,268m)",
        "alt": 1268,
        "dist": 7.2,
        "note": "만항재에 버금가는 고원 고개 날머리"
      }
    ],
    "checklist": [
      "강풍 대비 방풍 자켓 및 바라클라바",
      "아이젠 및 스틱",
      "따뜻한 차와 행동식"
    ],
    "weather": {
      "baseTemp": 5.5,
      "peakTemp": -4.7,
      "windSpeed": 8.8,
      "condition": "쾌청 (강풍)"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%95%A8%EB%B0%B1%EC%82%B0"
  },
  {
    "id": "taebaeksan",
    "forestId": "20000638",
    "isForest100": true,
    "top20Rank": 7,
    "name": "태백산 (장군봉·영봉)",
    "subTitle": "단군제 올리는 신성한 산, 한강·낙동강·오십천의 모태 뿌리산 (산림청 100대 명산)",
    "location": "강원도 태백시, 경상북도 봉화군 석포면",
    "altitude": 1566.7,
    "gain": 677,
    "difficulty": "초급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "TOP 20",
      "설산",
      "일출 명소"
    ],
    "distance": 8.4,
    "duration": "4시간 30분",
    "rating": 4.93,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Taebaeksan_2016_12_30_winter.jpg/1280px-Taebaeksan_2016_12_30_winter.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,566.7m] 천제단이 있는 영봉과 장군봉(1,567m)·부쇠봉(1,549.4m)·문수봉(1,514.9m)의 성산.",
    "fullDesc": "태백산(산림청 공식 1,566.7m)은 강원도 태백시 문곡소도동과 경북 봉화군 석포면 대현리, 영월군 상동면 접경에 자리한 민족의 성산입니다. 영남평야의 젖줄인 낙동강과 한강, 삼척 오십천이 발원하는 국토의 뿌리산이며, 삼국사기에 왕이 친히 천제를 올렸다는 기록이 있는 천제단(영봉)을 중심으로 북쪽에 장군봉(1,567m), 영봉과 문수봉 사이의 부쇠봉(1,549.4m), 동쪽에 문수봉(1,514.9m)이 완만한 육산 능선을 이룹니다. 망경사의 한국 최고도 명수 용정·용담과 주목군락 설경이 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 890,
        "label": "유일사 매표소"
      },
      {
        "km": 2.3,
        "alt": 1280,
        "label": "유일사 쉼터"
      },
      {
        "km": 3.5,
        "alt": 1490,
        "label": "주목군락지"
      },
      {
        "km": 4,
        "alt": 1566.7,
        "label": "장군봉(1,566.7m)"
      },
      {
        "km": 4.3,
        "alt": 1560,
        "label": "천제단(영봉)"
      },
      {
        "km": 5,
        "alt": 1460,
        "label": "망경사(용정)"
      },
      {
        "km": 8.4,
        "alt": 870,
        "label": "당골광장"
      }
    ],
    "waypoints": [
      {
        "name": "유일사 탐방지원센터",
        "alt": 890,
        "dist": 0,
        "note": "암벽이 적고 완만한 등산로 출발"
      },
      {
        "name": "태백산 주목군락지",
        "alt": 1490,
        "dist": 3.5,
        "note": "흰 눈으로 뒤덮인 고산 주목 설경"
      },
      {
        "name": "장군봉 (1,566.7m / 1,567m)",
        "alt": 1566.7,
        "dist": 4,
        "note": "태백산 최고봉"
      },
      {
        "name": "천제단 (영봉)",
        "alt": 1560,
        "dist": 4.3,
        "note": "신라 임금이 순행하여 천제를 올린 성지"
      },
      {
        "name": "망경사 & 용정·용담",
        "alt": 1460,
        "dist": 5,
        "note": "가장 높은 곳에 위치한 한국 으뜸 명수"
      },
      {
        "name": "당골광장",
        "alt": 870,
        "dist": 8.4,
        "note": "석탄박물관 및 태백산 눈축제장"
      }
    ],
    "checklist": [
      "아이젠 및 스패츠",
      "방한 장갑, 핫팩, 보온병",
      "선글라스 (설원 자외선 차단)"
    ],
    "weather": {
      "baseTemp": 5,
      "peakTemp": -5.2,
      "windSpeed": 7.4,
      "condition": "눈꽃 만개"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%83%9C%EB%B0%B1%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424190&fileSn=1"
  },
  {
    "id": "odaesan",
    "forestId": "20000455",
    "isForest100": true,
    "top20Rank": 8,
    "name": "오대산 (비로봉)",
    "subTitle": "한 승려의 희생으로 소실위기를 모면한 상원사와 국내 제일의 수림 (산림청 100대 명산)",
    "location": "강원도 평창군 진부면, 홍천군 내면, 강릉시 연곡면",
    "altitude": 1565.4,
    "gain": 845,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "TOP 20",
      "단풍",
      "설산",
      "종주 코스"
    ],
    "distance": 10.2,
    "duration": "5시간",
    "rating": 4.9,
    "image": "https://upload.wikimedia.org/wikipedia/commons/e/e2/Korea-Gangwondo-Odaesan_National_Park_1663-07.JPG?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 1,565.4m] 비로봉·호령봉·상왕봉·두로봉·동대산 다섯 봉우리와 월정사·적멸보궁의 불교 성지.",
    "fullDesc": "오대산(산림청 공식 1,565.4m)은 연꽃 모양으로 둘러선 다섯 개의 봉우리—주봉 비로봉(1,565.4m), 호령봉(1,565.5m), 상왕봉(1,493m), 동대산(1,433.5m), 두로봉(1,422.7m)—가 모나지 않고 평평한 대지를 이루고 있는 데서 이름이 유래했습니다. 동쪽으로 노인봉(1,338.8m)과 소금강지구(구룡폭포·만물상)가 펼쳐지며, 서부 월정사지구에는 월정사, 국보 제36호 동종과 한암 스님의 일화가 깃든 상원사, 중대 사자암·적멸보궁, 북대 미륵암, 남대 지장암, 동대 관음암, 서대 수정암이 자리한 우리나라 최고의 불교 성지이자 남한 최대의 수림지대입니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 720,
        "label": "상원사 주차장"
      },
      {
        "km": 1.5,
        "alt": 1050,
        "label": "중대 사자암"
      },
      {
        "km": 2,
        "alt": 1180,
        "label": "적멸보궁"
      },
      {
        "km": 3.5,
        "alt": 1565.4,
        "label": "비로봉 정상"
      },
      {
        "km": 5.8,
        "alt": 1493,
        "label": "상왕봉(1,493m)"
      },
      {
        "km": 7.5,
        "alt": 1250,
        "label": "북대 미륵암"
      },
      {
        "km": 10.2,
        "alt": 720,
        "label": "상원사 회귀"
      }
    ],
    "waypoints": [
      {
        "name": "상원사 (국보 제36호 동종)",
        "alt": 720,
        "dist": 0,
        "note": "신라 자장법사 창건 및 한암 스님이 지켜낸 고찰"
      },
      {
        "name": "중대 사자암 & 적멸보궁",
        "alt": 1180,
        "dist": 2,
        "note": "부처님 진신사리가 봉안된 성지"
      },
      {
        "name": "비로봉 정상 (1,565.4m)",
        "alt": 1565.4,
        "dist": 3.5,
        "note": "오대산 최고봉 정상석"
      },
      {
        "name": "상왕봉 (1,493m)",
        "alt": 1493,
        "dist": 5.8,
        "note": "두로봉(1,422.7m)으로 이어지는 중후한 토산 능선"
      },
      {
        "name": "북대 미륵암 갈림길",
        "alt": 1250,
        "dist": 7.5,
        "note": "상원사 원점회귀 임도 하산길"
      }
    ],
    "checklist": [
      "등산 스틱 (적멸보궁~비로봉 가파른 계단 구간)",
      "충분한 식수 1.5L 및 행동식",
      "방풍 자켓 및 무릎 보호대"
    ],
    "weather": {
      "baseTemp": 9,
      "peakTemp": -1.1,
      "windSpeed": 5.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%98%A4%EB%8C%80%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423777&fileSn=1"
  },
  {
    "id": "gariwangsan",
    "forestId": "20000006",
    "isForest100": true,
    "top20Rank": 9,
    "name": "가리왕산 (상봉)",
    "subTitle": "약초 많은 태백산의 지붕, 정선아리랑 흐르는 정선의 주산 (산림청 100대 명산)",
    "location": "강원도 정선군 정선읍 회동리ㆍ북평면, 평창군 진부면",
    "altitude": 1561.8,
    "gain": 1022,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "TOP 20",
      "단풍",
      "설산"
    ],
    "distance": 9.6,
    "duration": "6시간",
    "rating": 4.84,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424055&fileSn=1",
    "shortDesc": "[산림청 공식 1,561.8m] 큰 가리(볏단 더미)를 닮은 정선의 지붕, 강릉부삼산봉표와 주목 극상림.",
    "fullDesc": "가리왕산(산림청 공식 1,561.8m)은 산의 모습이 큰 가리(벼나 나무를 쌓은 더미) 같다고 하여 유래했으며, 옛 갈왕(葛王)이 난을 피해 숨어들어 갈왕산으로도 불렸습니다. 상봉(1,561.8m)을 중심으로 중봉(1,436m), 하봉(1,381.7m), 서쪽의 중왕산(1,381.4m)까지 육중한 산세가 이어지며, 마항치(馬項峙)에는 조선시대 일반인의 채삼을 금하던 국내 유일의 \"강릉부삼산봉표(江陵府蔘山封標)\" 비가 세워져 있습니다. 동강으로 흘러드는 오대천과 조양강의 발원지이며 회동리 자연휴양림과 얼음동굴, 장구목이 이끼계곡이 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 540,
        "label": "장구목이 입구"
      },
      {
        "km": 2.2,
        "alt": 980,
        "label": "이끼계곡 상단"
      },
      {
        "km": 3.6,
        "alt": 1380,
        "label": "임도(마항치 인근)"
      },
      {
        "km": 4.4,
        "alt": 1561.8,
        "label": "가리왕산 상봉"
      },
      {
        "km": 5.8,
        "alt": 1436,
        "label": "중봉(1,436m)"
      },
      {
        "km": 9.6,
        "alt": 540,
        "label": "회동리/장구목이"
      }
    ],
    "waypoints": [
      {
        "name": "장구목이 / 회동리 들머리",
        "alt": 540,
        "dist": 0,
        "note": "오대천·조양강 발원 수계 진입"
      },
      {
        "name": "마항치 & 임도 삼거리",
        "alt": 1380,
        "dist": 3.6,
        "note": "국내 유일 강릉부삼산봉표 유적 권역"
      },
      {
        "name": "가리왕산 상봉 (1,561.8m)",
        "alt": 1561.8,
        "dist": 4.4,
        "note": "정선의 지붕 최고봉 및 주목·잣나무 극상림"
      },
      {
        "name": "중봉 (1,436m) & 하봉 (1,381.7m)",
        "alt": 1436,
        "dist": 5.8,
        "note": "숙암 방면 철쭉 밀집 능선"
      }
    ],
    "checklist": [
      "방수 중등산화 (계곡 습기 및 총 6시간 산행 대비)",
      "등산 스틱 및 에너지 보충식",
      "여벌 보온 의류 및 식수 1.5L"
    ],
    "weather": {
      "baseTemp": 11,
      "peakTemp": 0.8,
      "windSpeed": 5.8,
      "condition": "구름 조금"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B0%80%EB%A6%AC%EC%99%95%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424055&fileSn=1"
  },
  {
    "id": "garibong",
    "forestId": "20000003",
    "isForest100": false,
    "top20Rank": 10,
    "name": "가리봉",
    "subTitle": "한계령 너머 한적한 산행을, 설악 서북주능선과 마주한 암봉",
    "location": "강원도 인제군",
    "altitude": 1519,
    "gain": 889,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "TOP 20",
      "암릉 산행",
      "단풍"
    ],
    "distance": 10.5,
    "duration": "6시간",
    "rating": 4.84,
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/59/%EA%B0%80%EB%A6%AC%EB%B4%89%EB%8F%99%28Garibong-dong_%E5%8A%A0%E9%87%8C%E5%B3%B0%E6%B4%9E%29_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 1,519m] 설악산 귀때기청봉(1,580m)~대승령 서북주능선과 마주보는 험준한 암봉.",
    "fullDesc": "가리봉(산림청 공식 1,519m)은 강원도 인제군에 위치한 설악산국립공원 소속의 산으로, 설악산 귀때기청봉(1,580m)과 대승령을 잇는 설악산 서북 주능선과 마주보고 있어 독립된 산처럼 보입니다. 멀리서 보면 봉우리가 둥글둥글 완만해 보이지만 실제로는 험준한 암봉들이 많은 산이며, 옥녀탕 앞이나 한계령을 들머리로 삼고 남서쪽에는 명물 필례약수가 자리하고 있습니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 630,
        "label": "옥녀탕/필례약수"
      },
      {
        "km": 2.5,
        "alt": 980,
        "label": "지능선 안부"
      },
      {
        "km": 4.2,
        "alt": 1390,
        "label": "주걱봉 갈림길"
      },
      {
        "km": 5.2,
        "alt": 1519,
        "label": "가리봉 정상"
      },
      {
        "km": 7.5,
        "alt": 1100,
        "label": "필례계곡 상류"
      },
      {
        "km": 10.5,
        "alt": 630,
        "label": "필례약수 회귀"
      }
    ],
    "waypoints": [
      {
        "name": "옥녀탕 / 필례약수 들머리",
        "alt": 630,
        "dist": 0,
        "note": "한계령 서남측 필례약수 기점"
      },
      {
        "name": "주걱봉 안부 삼거리",
        "alt": 1390,
        "dist": 4.2,
        "note": "험준한 바위 암봉 구간"
      },
      {
        "name": "가리봉 정상 (1,519m)",
        "alt": 1519,
        "dist": 5.2,
        "note": "귀때기청봉(1,580m)과 서북주능선 정면 조망"
      }
    ],
    "checklist": [
      "국립공원 탐방 개방 여부 사전 확인 및 GPS 트랙 지참",
      "접지력 우수한 등산화 및 장갑",
      "식수 2L 및 비상 랜턴"
    ],
    "weather": {
      "baseTemp": 10.5,
      "peakTemp": 0.6,
      "windSpeed": 6.4,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B0%80%EB%A6%AC%EB%B4%89"
  },
  {
    "id": "namdeogyusan",
    "forestId": "20000106",
    "isForest100": false,
    "top20Rank": 11,
    "name": "남덕유산",
    "subTitle": "소음을 잠재우는 울창한 수림, 금강·남강·황강 3대 강의 발원샘",
    "location": "경상남도 거창군 (거창군ㆍ함양군ㆍ전북 장수군 경계)",
    "altitude": 1507,
    "gain": 867,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "TOP 20",
      "암릉 산행",
      "설산",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.2,
    "duration": "5시간",
    "rating": 4.91,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Deogyusan_from_Hyangjeok_Peak.jpg/1280px-Deogyusan_from_Hyangjeok_Peak.jpg",
    "shortDesc": "[산림청 공식 1,507m] 육십령(금강)·참샘(남강)·삿갓골샘(황강) 3대 강의 첫물길을 품은 백두대간 명봉.",
    "fullDesc": "남덕유산(산림청 공식 1,507m)은 백두대간 상의 경남 거창군, 함양군, 전북 장수군 경계선에 솟아 있으며 향적봉에 견줄 만한 웅장한 산세를 지닌 산입니다. 3대 강의 발원샘을 갖고 있는 것이 특징으로, 육십령은 금강(錦江)의 발원샘이며, 정상 남쪽 기슭의 신비한 \"참샘\"(겨울엔 온수, 여름엔 찬물이 솟는 샘)은 진주 남강(南江)의 첫물길이 되고, 북쪽 바른골과 삿갓골샘은 낙동강 지류 황강(黃江)의 첫물길입니다. 삿갓골샘 인근에는 대피소가 있으며 가을 단풍과 겨울 설경이 뛰어납니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 640,
        "label": "영각사 매표소"
      },
      {
        "km": 2.3,
        "alt": 1280,
        "label": "영각재"
      },
      {
        "km": 3.4,
        "alt": 1450,
        "label": "참샘/철계단"
      },
      {
        "km": 3.9,
        "alt": 1507,
        "label": "남덕유산 정상"
      },
      {
        "km": 5.1,
        "alt": 1492,
        "label": "서봉(장수덕유)"
      },
      {
        "km": 8.2,
        "alt": 640,
        "label": "영각사 회귀"
      }
    ],
    "waypoints": [
      {
        "name": "영각사 탐방지원센터",
        "alt": 640,
        "dist": 0,
        "note": "남덕유산 최단 들머리"
      },
      {
        "name": "영각재 & 참샘 권역",
        "alt": 1280,
        "dist": 2.3,
        "note": "진주 남강의 첫물길 참샘과 가파른 철계단"
      },
      {
        "name": "남덕유산 정상 (1,507m)",
        "alt": 1507,
        "dist": 3.9,
        "note": "향적봉까지 17km 덕유 주능선 및 삿갓골 조망"
      },
      {
        "name": "서봉 / 장수덕유산 (1,492m)",
        "alt": 1492,
        "dist": 5.1,
        "note": "남덕유 암봉을 조망하는 바위 능선"
      }
    ],
    "checklist": [
      "아이젠 및 방풍 장비 (적설량이 많고 철계단 결빙 주의)",
      "무릎 보호대 및 스틱",
      "식수 1.5L 및 고열량 간식"
    ],
    "weather": {
      "baseTemp": 11,
      "peakTemp": 1.2,
      "windSpeed": 7,
      "condition": "쾌청"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%82%A8%EB%8D%95%EC%9C%A0%EC%82%B0"
  },
  {
    "id": "duwibong",
    "forestId": "20000166",
    "isForest100": false,
    "top20Rank": 13,
    "name": "두위봉",
    "subTitle": "두루뭉실 능선에 펼쳐진 철쭉 물결과 수령 1,800년 국내 최고령 주목",
    "location": "강원도 정선군 남면, 사북읍·영월군 중동면 직동리",
    "altitude": 1470,
    "gain": 890,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "TOP 20",
      "단풍",
      "설산"
    ],
    "distance": 9.8,
    "duration": "5시간",
    "rating": 4.83,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424055&fileSn=1",
    "shortDesc": "[산림청 공식 1,470m (지도 1,466m)] 수만 평의 연분홍 철쭉 군락과 도사곡 수령 1,800년 주목의 명산.",
    "fullDesc": "두위봉(산림청 공식 1,470m / 지형도 1,466m)은 강원도 정선군 남면·사북읍과 영월군 중동면 직동리에 걸쳐 있으며, 산이 두루뭉실하다 하여 \"두리봉\"으로도 불립니다. 특이하게도 주능선 1km 거리에 삼각점 봉우리와 1999년 정상 표지석을 세운 철쭉기념비 바위 봉우리 두 개의 정상이 있습니다. 초여름 수만 평의 연분홍 철쭉 군락과 아라리고개~도사곡의 자작나무·참나무 군락지, 그리고 도사곡에 자생하는 수령 1,800년의 국내 최고령 천연기념물 주목이 절경을 이룹니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 580,
        "label": "단곡계곡/자미원"
      },
      {
        "km": 2.5,
        "alt": 950,
        "label": "자작나무 군락"
      },
      {
        "km": 3.8,
        "alt": 1310,
        "label": "아라리고개"
      },
      {
        "km": 4.9,
        "alt": 1470,
        "label": "두위봉 정상(1,470m)"
      },
      {
        "km": 6.5,
        "alt": 1180,
        "label": "1,800년 주목"
      },
      {
        "km": 9.8,
        "alt": 620,
        "label": "도사곡 하산"
      }
    ],
    "waypoints": [
      {
        "name": "단곡계곡 / 자미원 들머리",
        "alt": 580,
        "dist": 0,
        "note": "울창한 자작나무 군락지 진입"
      },
      {
        "name": "아라리고개",
        "alt": 1310,
        "dist": 3.8,
        "note": "참나무 군락 및 철쭉 능선 분기점"
      },
      {
        "name": "두위봉 정상 (1,470m / 1,466m)",
        "alt": 1470,
        "dist": 4.9,
        "note": "철쭉기념비 정상석 및 삼각점 쌍봉"
      },
      {
        "name": "도사곡 천년 주목 (수령 1,800년)",
        "alt": 1180,
        "dist": 6.5,
        "note": "산림청 공인 국내 최고령 1,800년 주목"
      }
    ],
    "checklist": [
      "등산 스틱 및 무릎 보호대",
      "물 1.5L 및 간식",
      "바람막이 재킷"
    ],
    "weather": {
      "baseTemp": 11.5,
      "peakTemp": 2,
      "windSpeed": 4.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%91%90%EC%9C%84%EB%B4%89"
  },
  {
    "id": "hwaaksan",
    "forestId": "20000679",
    "isForest100": true,
    "top20Rank": 12,
    "name": "화악산 (중봉)",
    "subTitle": "강원도와 경기도를 가르는 경기도 제1고봉 (산림청 100대 명산)",
    "location": "경기도 가평군 북면, 강원도 화천군 사내면",
    "altitude": 1468.3,
    "gain": 1058,
    "difficulty": "상급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "TOP 20",
      "단풍",
      "설산"
    ],
    "distance": 10.4,
    "duration": "5시간 30분",
    "rating": 4.8,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423984&fileSn=1",
    "shortDesc": "[산림청 공식 1,468.3m] 시계가 100km에 달하는 경기도 최고봉, 동쪽 매봉·서쪽 중봉의 삼형제봉.",
    "fullDesc": "화악산(산림청 공식 1,468.3m)은 경기도 가평군 북면과 강원도 화천군 사내면 경계에 우뚝 솟은 경기도 제1의 고봉입니다. 한북정맥 도마치봉(937m)에서 석룡산(1,155m)을 지나 솟구쳤으며 응봉(1,436.3m), 촉대봉(1,125m)과 함께 \"경기의 알프스\"를 형성합니다. 화악산을 중심으로 동쪽 매봉, 서쪽 중봉을 삼형제봉이라 부르며, 정상은 군사지역이어서 서남쪽 1km 거리의 중봉이 정상을 대신합니다. 애기봉을 거쳐 수덕산까지 약 10km 능선과 서쪽 조무락골(쌍룡폭포·복호등폭포), 남쪽 오림계곡(승원폭포·옥녀탕), 집다리골 자연휴양림이 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 410,
        "label": "삼팔교(조무락골)"
      },
      {
        "km": 2.5,
        "alt": 780,
        "label": "복호등폭포"
      },
      {
        "km": 4.1,
        "alt": 1250,
        "label": "중봉 능선"
      },
      {
        "km": 5.2,
        "alt": 1468.3,
        "label": "화악산(중봉)"
      },
      {
        "km": 7.2,
        "alt": 1150,
        "label": "애기봉"
      },
      {
        "km": 10.4,
        "alt": 410,
        "label": "조무락골 회귀"
      }
    ],
    "waypoints": [
      {
        "name": "조무락골 삼팔교",
        "alt": 410,
        "dist": 0,
        "note": "가평천의 주천이 되는 청정 계곡 들머리"
      },
      {
        "name": "쌍룡폭포 & 복호등폭포",
        "alt": 780,
        "dist": 2.5,
        "note": "조무락골을 대표하는 폭포와 와폭"
      },
      {
        "name": "화악산 중봉 (공식 산높이 1,468.3m)",
        "alt": 1468.3,
        "dist": 5.2,
        "note": "시계 100km로 가평·춘천 중서부 산군 조망"
      },
      {
        "name": "애기봉 능선",
        "alt": 1150,
        "dist": 7.2,
        "note": "수덕산으로 이어지는 10km 조망 능선"
      }
    ],
    "checklist": [
      "중등산화 및 스틱 (고도차 1,000m 이상의 육산 급경사)",
      "충분한 식수 2L 및 염분 보충제",
      "방풍 자켓"
    ],
    "weather": {
      "baseTemp": 12,
      "peakTemp": 2.5,
      "windSpeed": 5.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%99%94%EC%95%85%EC%82%B0_%28%EA%B2%BD%EA%B8%B0/%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423984&fileSn=1"
  },
  {
    "id": "balwangsan",
    "forestId": "20000260",
    "isForest100": false,
    "top20Rank": 14,
    "name": "발왕산",
    "subTitle": "국내 최고 레저타운을 겸비한 겨울산, 발왕이와 옥녀의 전설이 깃든 주목 설원",
    "location": "강원도 평창군 도암면, 진부면ㆍ강릉시 왕산면",
    "altitude": 1458,
    "gain": 738,
    "difficulty": "초급",
    "region": "강원",
    "themes": [
      "TOP 20",
      "설산",
      "일출 명소"
    ],
    "distance": 7.6,
    "duration": "3시간 30분",
    "rating": 4.86,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/%EB%B0%9C%EC%99%95%EC%82%B0_%EB%8B%A4%EB%9E%8C%EC%A5%90.jpg/1280px-%EB%B0%9C%EC%99%95%EC%82%B0_%EB%8B%A4%EB%9E%8C%EC%A5%90.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,458m (평화봉 1,459m)] 황병산에서 남쪽으로 솟구친 설원의 거봉과 고산 주목군락.",
    "fullDesc": "발왕산(산림청 공식 1,458m / 정상석 1,459m)은 강원도 평창군 도암면(대관령면)·진부면과 강릉시 왕산면의 경계를 이루는 산으로, 백두대간이 오대산·황병산을 거쳐 대관령으로 이어질 무렵 황병산에서 남쪽으로 솟구친 거봉입니다. 옛날 발이 컸던 발왕이와 그를 사랑한 옥녀의 슬픈 전설에서 이름이 유래되었으며, 산세가 부드럽고 정상부의 주목군락과 설원의 절경이 손꼽힙니다. 정상에 오르면 북쪽 삼양대관령목장의 황병산을 비롯해 노인봉, 두로봉, 상왕봉, 비로봉, 계방산이 장대한 파노라마로 펼쳐집니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 720,
        "label": "용평 들머리"
      },
      {
        "km": 2.2,
        "alt": 1100,
        "label": "능선 등산로"
      },
      {
        "km": 3.8,
        "alt": 1450,
        "label": "스카이워크"
      },
      {
        "km": 4.5,
        "alt": 1458,
        "label": "발왕산 정상(1,458m)"
      },
      {
        "km": 5.5,
        "alt": 1420,
        "label": "주목군락지"
      },
      {
        "km": 7.6,
        "alt": 720,
        "label": "하산 완료"
      }
    ],
    "waypoints": [
      {
        "name": "용평리조트 등산로 입구",
        "alt": 720,
        "dist": 0,
        "note": "접근성이 뛰어난 들머리"
      },
      {
        "name": "발왕산 정상 (1,458m)",
        "alt": 1458,
        "dist": 4.5,
        "note": "황병산·오대산 5봉·계방산 파노라마 조망"
      },
      {
        "name": "정상 주목군락지",
        "alt": 1420,
        "dist": 5.5,
        "note": "발왕산의 자랑인 고산 천년 주목 숲길"
      }
    ],
    "checklist": [
      "가벼운 트레킹화 또는 등산화",
      "동계 산행 시 아이젠 및 방한모",
      "보온 텀블러 및 카메라"
    ],
    "weather": {
      "baseTemp": 7,
      "peakTemp": -2.5,
      "windSpeed": 6,
      "condition": "상고대 맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%9C%EC%99%95%EC%82%B0"
  },
  {
    "id": "bangtaesan",
    "forestId": "20000262",
    "isForest100": true,
    "top20Rank": 15,
    "name": "방태산 (주걱봉)",
    "subTitle": "깊은 산속 옹달샘, 약수 많고 승지 많은 한국적 유토피아 (산림청 100대 명산)",
    "location": "강원도 인제군 기린면, 상남면 (홍천군 내면 경계)",
    "altitude": 1445.7,
    "gain": 945,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "TOP 20",
      "단풍",
      "종주 코스"
    ],
    "distance": 11.6,
    "duration": "6시간",
    "rating": 4.88,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424075&fileSn=1",
    "shortDesc": "[산림청 공식 1,445.7m] 주걱봉(1,444m)·구룡덕봉(1,389m)·가칠봉(1,241.1m)과 적가리골 이폭포·저폭포.",
    "fullDesc": "방태산(산림청 공식 1,445.7m)은 주걱봉(1,444m), 구룡덕봉(1,389m), 가칠봉(1,241.1m), 응복산(1,156m) 등 고산준봉을 거느리고 있으며 한국에서 가장 큰 자연림이라 할 정도로 원시 수목이 울창해 생태적 가치가 높은 산입니다. 정감록에는 난을 피해 숨을 만한 3둔 5갈의 피난처로 기록되어 있으며, 높이 10m의 이폭포와 3m의 저폭포(이단폭포)가 있는 적가리골, 아침가리골, 방동약수, 개인약수 등이 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 500,
        "label": "방태산 휴양림"
      },
      {
        "km": 1.5,
        "alt": 680,
        "label": "이폭포·저폭포"
      },
      {
        "km": 4.1,
        "alt": 1260,
        "label": "매봉령"
      },
      {
        "km": 5.3,
        "alt": 1389,
        "label": "구룡덕봉(1,389m)"
      },
      {
        "km": 6.8,
        "alt": 1445.7,
        "label": "방태산 주걱봉"
      },
      {
        "km": 8.5,
        "alt": 1120,
        "label": "지당골 갈림길"
      },
      {
        "km": 11.6,
        "alt": 500,
        "label": "휴양림 회귀"
      }
    ],
    "waypoints": [
      {
        "name": "적가리골 자연휴양림 & 이폭포·저폭포",
        "alt": 500,
        "dist": 0,
        "note": "높이 10m 이폭포와 3m 저폭포의 절경"
      },
      {
        "name": "매봉령 능선",
        "alt": 1260,
        "dist": 4.1,
        "note": "원시 수림대를 지나 주능선 진입"
      },
      {
        "name": "구룡덕봉 (1,389m)",
        "alt": 1389,
        "dist": 5.3,
        "note": "하마등처럼 너르고 평평한 조망 능선"
      },
      {
        "name": "방태산 정상 / 주걱봉 (1,445.7m / 1,444m)",
        "alt": 1445.7,
        "dist": 6.8,
        "note": "설악산·점봉산·오대산 파노라마"
      }
    ],
    "checklist": [
      "중등산화 및 스틱 (11km 이상 중장거리 원시림 산행)",
      "식수 2L 및 행동식",
      "방풍 자켓 및 구급함"
    ],
    "weather": {
      "baseTemp": 11,
      "peakTemp": 1.6,
      "windSpeed": 5.4,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%A9%ED%83%9C%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424075&fileSn=1"
  },
  {
    "id": "sobaeksan",
    "forestId": "20000397",
    "isForest100": true,
    "top20Rank": 16,
    "name": "소백산 (비로봉)",
    "subTitle": "퇴계 이황이 시 쓰던 산, 한국의 알프스 고산 초원 (산림청 100대 명산)",
    "location": "경상북도 영주시 풍기읍, 충청북도 단양군 단양읍",
    "altitude": 1439.7,
    "gain": 990,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "TOP 20",
      "일출 명소",
      "설산",
      "종주 코스"
    ],
    "distance": 12,
    "duration": "5시간 30분",
    "rating": 4.93,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Sobaeksan.jpg/1280px-Sobaeksan.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,439.7m] 비로봉(1,439.7m)·국망봉(1,420.8m)·연화봉(1,376.9m)과 천연기념물 주목·솜다리.",
    "fullDesc": "소백산(산림청 공식 1,439.7m)은 경북 영주시 풍기읍과 충북 단양군 단양읍 경계를 이루며 우리나라 12대 명산 중 하나로 \"한국의 알프스\"라 불립니다. 정상인 비로봉(1,439.7m)을 비롯해 국망봉(1,420.8m), 연화봉(1,376.9m), 제2연화봉(1,357.3m) 등 1,000m 이상 고원 초원 능선이 20km 이상 장쾌하게 뻗어 있습니다. 비로봉 일대에는 주목군락지(천연기념물 제244호)와 한국산 에델바이스인 솜다리가 군락을 이루며, 희방사, 구인사, 부석사, 소수서원(사적 제55호), 국립천문대 등이 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 450,
        "label": "천동/희방사 입구"
      },
      {
        "km": 3.5,
        "alt": 850,
        "label": "천동 쉼터"
      },
      {
        "km": 5.2,
        "alt": 1350,
        "label": "주목군락(천연기념물)"
      },
      {
        "km": 6,
        "alt": 1439.7,
        "label": "비로봉(1,439.7m)"
      },
      {
        "km": 8.5,
        "alt": 1376.9,
        "label": "연화봉(1,376.9m)"
      },
      {
        "km": 12,
        "alt": 450,
        "label": "하산 완료"
      }
    ],
    "waypoints": [
      {
        "name": "천동 / 희방골 들머리",
        "alt": 450,
        "dist": 0,
        "note": "소백산의 대표적인 등산 기점"
      },
      {
        "name": "비로봉 주목군락지",
        "alt": 1350,
        "dist": 5.2,
        "note": "천연기념물 제244호 주목군락 및 솜다리 서식지"
      },
      {
        "name": "비로봉 정상 (1,439.7m)",
        "alt": 1439.7,
        "dist": 6,
        "note": "국망봉(1,420.8m)~연화봉(1,376.9m) 초원 조망"
      },
      {
        "name": "연화봉 & 국립천문대",
        "alt": 1376.9,
        "dist": 8.5,
        "note": "소백산 천문대 경유 능선"
      }
    ],
    "checklist": [
      "방풍 고글 및 바라클라바 (초원 능선 강풍 대비)",
      "윈드스토퍼 하드쉘 및 방한 장갑",
      "보온병 온수 및 스틱"
    ],
    "weather": {
      "baseTemp": 8,
      "peakTemp": -1.4,
      "windSpeed": 11.5,
      "condition": "강풍 주의"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%86%8C%EB%B0%B1%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424235&fileSn=1"
  },
  {
    "id": "manbokdae",
    "forestId": "20000184",
    "isForest100": false,
    "top20Rank": 18,
    "name": "만복대",
    "subTitle": "흐드러지는 억새 품에서 산행의 피로를 풀고, 지리산의 많은 복을 차지한 봉우리",
    "location": "전라북도 남원시 산내면 덕동리 (전남 구례군 산동면 경계)",
    "altitude": 1433,
    "gain": 331,
    "difficulty": "초급",
    "region": "충청/전라",
    "themes": [
      "TOP 20",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 7.4,
    "duration": "3시간 30분",
    "rating": 4.88,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Nogodan_at_Jirisan%2C_Korea_03.JPG/1280px-Nogodan_at_Jirisan%2C_Korea_03.JPG?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1,433m] 지리산 최고의 금빛 억새 능선과 봄철 구례 산수유마을을 품은 넉넉한 고봉.",
    "fullDesc": "만복대(산림청 공식 1,433m)는 지리산의 많은 복(萬福)을 차지하고 있다고 해서 붙여진 이름으로, 전북 남원시와 전남 구례군 경계의 지리산 서북능선에 솟아 있습니다. 경사가 완만하고 능선이 넉넉하여 누구나 무난하게 오를 수 있으며, 북풍한설에 피어난 겨울 설화와 가을철 지리산 주능선을 배경으로 금빛으로 출렁이는 억새 군무가 장관입니다. 봄철에는 구례 산동면 상위·하위마을의 노란 산수유꽃과 연계한 산행지로도 사랑받습니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 1102,
        "label": "성삼재 휴게소"
      },
      {
        "km": 1.5,
        "alt": 1248,
        "label": "작은고리봉"
      },
      {
        "km": 2.8,
        "alt": 1210,
        "label": "묘봉치"
      },
      {
        "km": 5.4,
        "alt": 1433,
        "label": "만복대 정상(1,433m)"
      },
      {
        "km": 7.4,
        "alt": 1172,
        "label": "정령치 휴게소"
      }
    ],
    "waypoints": [
      {
        "name": "성삼재 (1,102m)",
        "alt": 1102,
        "dist": 0,
        "note": "지리산 서북능선 출발점"
      },
      {
        "name": "작은고리봉 & 묘봉치",
        "alt": 1248,
        "dist": 1.5,
        "note": "구례 산동면 산수유마을 조망"
      },
      {
        "name": "만복대 정상 (1,433m)",
        "alt": 1433,
        "dist": 5.4,
        "note": "지리산 최고의 금빛 억새 군락지"
      },
      {
        "name": "정령치 (1,172m)",
        "alt": 1172,
        "dist": 7.4,
        "note": "남원 방면 하산 완료"
      }
    ],
    "checklist": [
      "방풍 자켓 및 모자 (개방형 억새 초원 능선)",
      "자외선 차단제 및 선글라스",
      "물 1.5L 및 가벼운 행동식"
    ],
    "weather": {
      "baseTemp": 13.5,
      "peakTemp": 4.2,
      "windSpeed": 6.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%A7%8C%EB%B3%B5%EB%8C%80"
  },
  {
    "id": "gayasan",
    "forestId": "20000009",
    "isForest100": true,
    "top20Rank": 17,
    "name": "가야산 (칠불봉·상왕봉)",
    "subTitle": "연꽃으로 피어오른 불교의 성지, 택리지의 석화성(石火星) (산림청 100대 명산)",
    "location": "경상남도 합천군ㆍ거창군, 경상북도 성주군",
    "altitude": 1432.6,
    "gain": 883,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "TOP 20",
      "암릉 산행",
      "단풍"
    ],
    "distance": 9.8,
    "duration": "5시간 30분",
    "rating": 4.92,
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0b/GayaSanghwangbong.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 1,432.6m] 불꽃 같은 기암괴봉 석화성(만물상)과 세계문화유산 팔만대장경 해인사의 명산.",
    "fullDesc": "가야산(산림청 공식 1,432.6m)은 경남 합천군·거창군과 경북 성주군을 한몸에 품은 우리나라 12대 명산이자 조선 8경에 속하는 국립공원(1972년 지정)입니다. 옛 가야국이 있던 곳의 가장 높고 훌륭한 산이라 하여 가야산이라 불렸으며, 소머리 같아 우두산(소 코 모양의 우비정 샘), 상왕산, 설산, 중향산으로도 불렸습니다. \"택리지\"에서는 가야산의 기암괴봉을 불꽃에 비유해 석화성(石火星)이라 찬탄했으며, 1995년 유네스코 세계문화유산으로 지정된 국보 팔만대장경과 해인사, 홍류동 계곡, 만물상, 용문폭포가 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 550,
        "label": "백운동 센터"
      },
      {
        "km": 1.8,
        "alt": 980,
        "label": "만물상(석화성)"
      },
      {
        "km": 3,
        "alt": 1160,
        "label": "서성재"
      },
      {
        "km": 4.2,
        "alt": 1432.6,
        "label": "칠불봉(1,432.6m)"
      },
      {
        "km": 4.5,
        "alt": 1430,
        "label": "상왕봉(우두봉)"
      },
      {
        "km": 8.5,
        "alt": 650,
        "label": "해인사/홍류동"
      },
      {
        "km": 9.8,
        "alt": 550,
        "label": "치인 주차장"
      }
    ],
    "waypoints": [
      {
        "name": "백운동 탐방지원센터",
        "alt": 550,
        "dist": 0,
        "note": "성주 만물상·용기골 코스 기점"
      },
      {
        "name": "만물상 암릉 (석화성)",
        "alt": 980,
        "dist": 1.8,
        "note": "택리지가 불꽃에 비유한 기암괴봉 능선"
      },
      {
        "name": "서성재",
        "alt": 1160,
        "dist": 3,
        "note": "만물상과 용기골이 만나는 안부"
      },
      {
        "name": "칠불봉 (1,432.6m) & 상왕봉(우두봉)",
        "alt": 1432.6,
        "dist": 4.2,
        "note": "가야산 최고봉과 우비정 샘이 있는 우두봉"
      },
      {
        "name": "해인사 & 홍류동천 계곡",
        "alt": 550,
        "dist": 9.8,
        "note": "세계문화유산 팔만대장경 법보사찰"
      }
    ],
    "checklist": [
      "암릉 접지력이 좋은 등산화 및 장갑",
      "등산 스틱 및 무릎 보호대",
      "식수 1.5L 및 행동식"
    ],
    "weather": {
      "baseTemp": 13,
      "peakTemp": 3.7,
      "windSpeed": 5.1,
      "condition": "쾌청"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B0%80%EC%95%BC%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423563&fileSn=1"
  },
  {
    "id": "jeombongsan",
    "forestId": "20000553",
    "isForest100": true,
    "top20Rank": 20,
    "name": "점봉산 (주전골·곰배령)",
    "subTitle": "원시림과 계곡이 조화롭게 어우러진 산, 오색약수 품은 설악산 전망대 (산림청 100대 명산)",
    "location": "강원도 양양군 서면, 인제군 기린면ㆍ인제읍",
    "altitude": 1426,
    "gain": 716,
    "difficulty": "초급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "TOP 20",
      "단풍",
      "설산"
    ],
    "distance": 10.5,
    "duration": "4시간 30분",
    "rating": 4.92,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424022&fileSn=1",
    "shortDesc": "[산림청 공식 1,426m] 유네스코 생물권보존구역·산림유전자원보호림, 12담 구곡 주전골과 곰배령.",
    "fullDesc": "점봉산(산림청 공식 1,426m)은 강원도 양양군 서면과 인제군 기린면·인제읍에 걸쳐 설악산 대청봉과 한계령을 사이에 두고 마주보는 명산입니다. 옛 이름은 \"덤붕산\"(작은점봉산은 작은덤붕)이라 불렸으며, 원시림이 울창하고 모데미풀 등 희귀식물이 자생해 유네스코 생물권보존구역 및 산림유전자원보호림, 제1회 아름다운 숲 전국대회 보전 숲으로 선정되었습니다. 12담 구곡으로 불리는 주전골과 철분 탄산수인 오색약수터, 보물 제497호 양양 오색리 삼층석탑(성국사터), 그리고 산림청 사전예약제로 운영되는 곰배령(1,164m) 생태탐방로가 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 450,
        "label": "생태관리센터/오색"
      },
      {
        "km": 2.2,
        "alt": 680,
        "label": "강선마을/주전골"
      },
      {
        "km": 5.1,
        "alt": 1164,
        "label": "곰배령(1,164m)"
      },
      {
        "km": 6.5,
        "alt": 1426,
        "label": "점봉산(1,426m)"
      },
      {
        "km": 8.2,
        "alt": 950,
        "label": "하산 삼거리"
      },
      {
        "km": 10.5,
        "alt": 450,
        "label": "탐방센터 회귀"
      }
    ],
    "waypoints": [
      {
        "name": "점봉산 산림생태관리센터 / 오색약수",
        "alt": 450,
        "dist": 0,
        "note": "곰배령 생태탐방 또는 주전골 오색약수 기점"
      },
      {
        "name": "주전골 성국사터 & 강선마을",
        "alt": 680,
        "dist": 2.2,
        "note": "12담 구곡 계곡과 보물 제497호 삼층석탑"
      },
      {
        "name": "곰배령 (1,164m)",
        "alt": 1164,
        "dist": 5.1,
        "note": "모데미풀 등 야생화가 만발하는 고산 초원"
      },
      {
        "name": "점봉산 정상 권역 (산림청 공식 1,426m)",
        "alt": 1426,
        "dist": 6.5,
        "note": "유네스코 생물권보존 핵심 특별보호구"
      }
    ],
    "checklist": [
      "산림청(점봉산 곰배령) 사전 탐방예약 및 신분증 필수",
      "특별보호구역 지정 탐방로 이탈 엄금",
      "트레킹화, 스틱, 식수 1L"
    ],
    "weather": {
      "baseTemp": 11,
      "peakTemp": 1.8,
      "windSpeed": 4.5,
      "condition": "쾌청"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%A0%90%EB%B4%89%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424022&fileSn=1"
  },
  {
    "id": "baegunsan",
    "forestId": null,
    "isForest100": false,
    "top20Rank": 19,
    "name": "백운산 (마천봉)",
    "subTitle": "국내 고도 19위, 운탄고도 하늘길과 낙엽송 숲의 고원 명산",
    "location": "강원도 정선군 고한읍ㆍ사북읍, 영월군 상동읍",
    "altitude": 1426,
    "gain": 376,
    "difficulty": "초급",
    "region": "강원",
    "themes": [
      "TOP 20",
      "설산",
      "단풍"
    ],
    "distance": 10.2,
    "duration": "4시간 30분",
    "rating": 4.82,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d7/From_the_top_of_the_hike.jpg/1280px-From_the_top_of_the_hike.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[국내 고도 19위 · 1,426m] 운탄고도 하늘길과 마운틴탑이 어우러진 해발 1,426m 고원 산행지.",
    "fullDesc": "흰 구름이 늘 산봉우리를 감싼다 하여 이름 붙은 강원도 정선에는 두 개의 유명한 백운산이 있습니다. 첫째는 국내 고도 19위인 정선 고한읍·영월 상동읍 경계의 백운산 마천봉(1,426m)으로 운탄고도 하늘길과 낙엽송 숲길이 유명하며, 둘째는 산림청 100대 명산으로 선정된 정선 신동읍·평창 미탄면의 동강 백운산(산림청 공식 883.5m, 천연기념물 제260호 백룡동굴과 칠족령 동강 감입곡류 조망)입니다. 또한 남부권에는 호남정맥 최고봉인 산림청 100대 명산 광양 백운산(1,222.2m)이 있습니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 1050,
        "label": "운탄고도 들머리"
      },
      {
        "km": 2.8,
        "alt": 1177,
        "label": "하늘길 삼거리"
      },
      {
        "km": 4.8,
        "alt": 1340,
        "label": "마운틴탑"
      },
      {
        "km": 5.9,
        "alt": 1426,
        "label": "백운산 마천봉(1,426m)"
      },
      {
        "km": 7.4,
        "alt": 1210,
        "label": "수리봉 능선"
      },
      {
        "km": 10.2,
        "alt": 883.5,
        "label": "하산 종점"
      }
    ],
    "waypoints": [
      {
        "name": "운탄고도 하늘길 입구",
        "alt": 1050,
        "dist": 0,
        "note": "해발 1,000m 고원 낙엽송 숲길"
      },
      {
        "name": "마운틴탑 전망대",
        "alt": 1340,
        "dist": 4.8,
        "note": "함백산·태백산 파노라마 쉼터"
      },
      {
        "name": "백운산 마천봉 (1,426m)",
        "alt": 1426,
        "dist": 5.9,
        "note": "국내 고도 19위 백운산 최고봉"
      }
    ],
    "checklist": [
      "산행 목적지 확인 (고한 마천봉 1,426m vs 동강 점재마을 백운산 883.5m)",
      "트레킹화 또는 중등산화 및 스틱",
      "물 1L 및 방풍 자켓"
    ],
    "weather": {
      "baseTemp": 9.5,
      "peakTemp": 0.2,
      "windSpeed": 4.8,
      "condition": "구름 조금"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%B1%EC%9A%B4%EC%82%B0_%28%EC%A0%84%EB%9D%BC%EB%82%A8%EB%8F%84%29"
  },
  {
    "id": "forest_20000167",
    "forestId": "20000167",
    "isForest100": true,
    "top20Rank": null,
    "name": "두타산",
    "subTitle": "번뇌를 잠 재우는 무릉도원 (산림청 100대 명산)",
    "location": "강원도 동해시 삼화동, 삼척시 미로면ㆍ하장면",
    "altitude": 1357,
    "gain": 977,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 9.8,
    "duration": "5시간",
    "rating": 4.86,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424506&fileSn=1",
    "shortDesc": "[산림청 공식 1357m] 무릉계곡 등 경관이 아름다운 점 등을 고려하여 선정, 삼화사(三和寺), 관음암(觀音庵), 두타산성(頭陀山城)이 있음.",
    "fullDesc": "[산림청 100대 명산 선정이유] 무릉계곡 등 경관이 아름다운 점 등을 고려하여 선정, 삼화사(三和寺), 관음암(觀音庵), 두타산성(頭陀山城)이 있음. 바위에 50여개의 크고 작은 구멍이 패여 산이름이 붙여졌으며, 예로부터 기우제를 지내는 등 토속신앙의 기도처인 쉰움산(五十井山)이 유명 계곡 이름을 무릉계(武陵溪)라고 했다. 얼마나 대단한 경치면 감히 “무릉도원은 바로 여기”라고 내세웠다. 두타산과 청옥산, 고적대, 갈미봉, 1243봉으로 둘러싸인 반석계곡이다. 가보면 고개를 끄덕이게될 것이다. 벼루처럼 매끄러운 바위운동장에 무수한 글씨가 새겨져있고 한켠으로는 맑은 물이 렌즈처럼 얇게 흐른다. 골짜기로 들어가면 여기도 폭포 저기도 폭포, 깎아세운 절벽 위엔 층층이 소나무들… 내가 정말 무릉도원에 들어왔구나 싶으리라. [형 지형인 무릉계 물받이의 남쪽 울타리를 이루는 청옥·두타산은 언제나 쌍둥이처럼 붙어다닌다. 뗄 수 없이 돈독하고 가까운 동시에 무릉계라는 보물을 공유하고 있기 때문이다. 그렇지만 생김새는 사뭇 달라 청옥은 듬직한 육산(肉山)인 반면 두타는...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 380,
        "label": "무릉계곡 들머리"
      },
      {
        "km": 2.2,
        "alt": 693,
        "label": "삼화사"
      },
      {
        "km": 4.1,
        "alt": 1044,
        "label": "관음암"
      },
      {
        "km": 5.4,
        "alt": 1357,
        "label": "정상"
      },
      {
        "km": 7.4,
        "alt": 820,
        "label": "두타산성"
      },
      {
        "km": 9.8,
        "alt": 380,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "무릉계곡 들머리",
        "alt": 380,
        "dist": 0,
        "note": "강원도 동해시 삼화동 산행 기점"
      },
      {
        "name": "삼화사",
        "alt": 693,
        "dist": 2.2,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "관음암",
        "alt": 1044,
        "dist": 4.1,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "두타산 정상 (1357m)",
        "alt": 1357,
        "dist": 5.4,
        "note": "산림청 100대 명산 두타산 최고봉"
      },
      {
        "name": "두타산성",
        "alt": 820,
        "dist": 7.4,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 5.2,
      "windSpeed": 6.3,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%91%90%ED%83%80%EC%82%B0_%28%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424506&fileSn=1"
  },
  {
    "id": "forest_20000263",
    "forestId": "20000263",
    "isForest100": true,
    "top20Rank": null,
    "name": "백덕산",
    "subTitle": "주능선에 피어나는 설화 (산림청 100대 명산)",
    "location": "강원도 평창군 방림면, 횡성군 안흥면, 영월군 수주면",
    "altitude": 1350.1,
    "gain": 970,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "종주 코스"
    ],
    "distance": 9.7,
    "duration": "5시간 30분",
    "rating": 4.9,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423923&fileSn=1",
    "shortDesc": "[산림청 공식 1350.1m] 사자산(1180.",
    "fullDesc": "[산림청 100대 명산 선정이유] 사자산(1180.4m), 삿갓봉(1028.8m), 솟매봉(882.7m) 등이 솟아 있어 산세가 웅장하고 골이 깊은 등 경관이 좋으며, 평창강(平昌江)과 주천강(酒泉江)의 수계인 점 등을 고려하여 선정, 신라 때 자장율사가 창건하였다고 전해지는 법흥사(法興寺)와 경내에 있는 보물 제612호로 지정된 징효대사보인탑이 유명 백덕산은 평창군 방림면과 평창읍, 영월군 주천면과 수주면, 횡성군 안흥면의 경계에 솟아있는 해발 1350.1m의 산이다. 천연 원시림을 간직한 주계곡과 함께 설경이 뛰어나 겨울철 산행지로 유명하다. 더욱이 백덕산 남서쪽 연화봉 아래에 설악산 봉정암, 오대산 상원사, 영취산 통도사, 정암사 태백산과 함께 5대 적멸보궁 중 하나인 신라시대 천년고찰 법흥사가 있어 더욱 유명하다. 백덕산을 오르내리는 길목인 사자산(1180.4m)은 원래 사재산(四財山)이었다. 이는 옻, 꿀, 삼, 흉년에 먹는다는 전단토 등 4가지 보물이 있어 사재산에서는 굶어 죽지 않는 전설에서 나온 이름이다. 그러나 법흥사를 창건한 자장율사가 부처님의 사리를 지금의 적멸보궁으로 모셔오면서 사자를 타고 왔다 하...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 380,
        "label": "삿갓봉 들머리"
      },
      {
        "km": 2.1,
        "alt": 690,
        "label": "솟매봉"
      },
      {
        "km": 4.1,
        "alt": 1040,
        "label": "자장율사"
      },
      {
        "km": 5.3,
        "alt": 1350.1,
        "label": "정상"
      },
      {
        "km": 7.4,
        "alt": 816,
        "label": "법흥사"
      },
      {
        "km": 9.7,
        "alt": 380,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "삿갓봉 들머리",
        "alt": 380,
        "dist": 0,
        "note": "강원도 평창군 방림면 산행 기점"
      },
      {
        "name": "솟매봉",
        "alt": 690,
        "dist": 2.1,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "자장율사",
        "alt": 1040,
        "dist": 4.1,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "백덕산 정상 (1350.1m)",
        "alt": 1350.1,
        "dist": 5.3,
        "note": "산림청 100대 명산 백덕산 최고봉"
      },
      {
        "name": "법흥사",
        "alt": 816,
        "dist": 7.4,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 5.2,
      "windSpeed": 6.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%B1%EB%8D%95%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423923&fileSn=1"
  },
  {
    "id": "forest_20001321",
    "forestId": "20001321",
    "isForest100": true,
    "top20Rank": null,
    "name": "대암산",
    "subTitle": "강원 양구군 동면의 대표 명산 (산림청 100대 명산)",
    "location": "강원 양구군 동면, 인제군 서화면",
    "altitude": 1312.6,
    "gain": 943,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "단풍",
      "종주 코스"
    ],
    "distance": 9.4,
    "duration": "5시간",
    "rating": 4.9,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000020027986&fileSn=1",
    "shortDesc": "[산림청 공식 1312.6m] 휴전선이 가까운 지역으로 각종 희귀생물과 원시림에 가까운 숲이 잘 보존되어 천연보호구역(천연기념물 제246호)으로 지정(1973년) 관리되는 등 우리나라 최대 희귀생....",
    "fullDesc": "[산림청 100대 명산 선정이유] 휴전선이 가까운 지역으로 각종 희귀생물과 원시림에 가까운 숲이 잘 보존되어 천연보호구역(천연기념물 제246호)으로 지정(1973년) 관리되는 등 우리나라 최대 희귀생물자원의 보고인 점 등을 감안하여 선정, 대암산 정상부에 있는 약 9,000여평이 넘는 풀밭 같은 넓은 초원에 큰 용늪과 작은용늪의 고층습지가 있음. 그 주위가 마치 화채(punch) 그릇(bowl)같아 펀치볼로 불리우며 해안분지(亥安盆地)가 유명 고층습원으로 잘 알려진 대암산은 정상부근에 있는 분지형으로 된 큰 용늪과 작은 용늪이 있다. 이 습원의 크기는 동서 약 150미터, 남북 약 100미터 내외의 부정형으로 서북에서 동남으로 완만한 경사를 이루고 있다. 높은 학술적 가치를 지니고 있는 이 고층습원에서 1968년 5월부터 1969년 8월까지의 기간중 김두영(현 강원도 학생과학관 근무)에 의해 부유생물 47종이 채집되었고, 한편 대암산에 분포한 식물의 종류는 총 59과 123종으로 그 중 고층습원의 특유종이 19종 미기록종 15종이 알려져 있어 생물의 보고이며 1973년 7월 10일 인근의 대우산과 함께 천연보호구역으로 지정되었다. 대암산 정상은 등산 통제구역으로 일반 등산은 생태식물원을 들머리로 한 정상 서남쪽...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 370,
        "label": "천연보호 들머리"
      },
      {
        "km": 2.1,
        "alt": 672,
        "label": "삿갓사"
      },
      {
        "km": 3.9,
        "alt": 1011,
        "label": "두타연계곡"
      },
      {
        "km": 5.2,
        "alt": 1312.6,
        "label": "정상"
      },
      {
        "km": 7.1,
        "alt": 794,
        "label": "하산 능선 갈림"
      },
      {
        "km": 9.4,
        "alt": 370,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "천연보호 들머리",
        "alt": 370,
        "dist": 0,
        "note": "강원 양구군 동면 산행 기점"
      },
      {
        "name": "삿갓사",
        "alt": 672,
        "dist": 2.1,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "두타연계곡",
        "alt": 1011,
        "dist": 3.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "대암산 정상 (1312.6m)",
        "alt": 1312.6,
        "dist": 5.2,
        "note": "산림청 100대 명산 대암산 최고봉"
      },
      {
        "name": "하산 능선 갈림길",
        "alt": 794,
        "dist": 7.1,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 5.5,
      "windSpeed": 6.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%8C%80%EC%95%94%EC%82%B0_%28%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000020027986&fileSn=1"
  },
  {
    "id": "forest_20000628",
    "forestId": "20000628",
    "isForest100": true,
    "top20Rank": null,
    "name": "치악산",
    "subTitle": "골골마다 절의와 은사가 굽이치네 (산림청 100대 명산)",
    "location": "강원도 원주시, 횡성군, 영월군",
    "altitude": 1282,
    "gain": 922,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "종주 코스"
    ],
    "distance": 9.2,
    "duration": "5시간",
    "rating": 4.87,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Chiaksan_as_seen_from_Birobong_Peak.jpg/1280px-Chiaksan_as_seen_from_Birobong_Peak.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1282m] 주봉인 비로봉을 중심으로 남대봉 (1,180m)과 매화산(1,083.",
    "fullDesc": "[산림청 100대 명산 선정이유] 주봉인 비로봉을 중심으로 남대봉 (1,180m)과 매화산(1,083.1m) 등 1천여 미터의 고봉들이 연이어 있어 경관이 아름다우며 곳곳에 산성과 사찰, 사적지들이 널리 산재해 있고 국립공원으로 지정(1984년)된 점 등을 고려하여 선정, 구룡계곡, 부곡계곡, 금대계곡 등과 신선대, 구룡소, 세렴폭포, 상원사 등이 있음. 사계절별로 봄 진달래와 철쭉, 여름 구룡사의 울창한 숲과 깨끗한 물, 가을의 단풍, 겨울 설경이 유명 명산은 가까이 가보면 안다. 영동고속국도 원주를 지날 무렵 뭇 산을 제압하는 훤칠한 산이 보인다면 물어볼 것도 없이 치악산인 것이다. 들고을 원주(原州)에서 보면 그건 거대한 장벽이다. 17킬로미터의 장대한 주릉이 그대로 천여미터를 솟아올랐다. 이런 압도적 산세의 뒤편으로는 또 매화산(1083.1m)과 매봉산(1095m) 줄기를 실팍하게 뻗쳐 산물결 첩첩의 겹산을 만들고있다. 하여 사이사이 구룡사 큰골, 부곡분지, 상원골의 깊은 구렁을 형성한다. 한쪽은 개활지 끝의 1자형 산줄기로 바깥 세상에 선을 보이고 반대편은 겹산 첩첩, 웅숭깊은 맛을 들였다. 드러냄과 감춤이 반반씩인 이상적인 산세인 것이다. 구룡사 큰골의 감춤은 소나무의 왕 황장목이다. 증거처럼 절 입구에는 황장금...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 360,
        "label": "비로봉 들머리"
      },
      {
        "km": 2.0,
        "alt": 655,
        "label": "남대봉"
      },
      {
        "km": 3.9,
        "alt": 987,
        "label": "구룡계곡"
      },
      {
        "km": 5.1,
        "alt": 1282,
        "label": "정상"
      },
      {
        "km": 7.0,
        "alt": 775,
        "label": "부곡계곡"
      },
      {
        "km": 9.2,
        "alt": 360,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "비로봉 들머리",
        "alt": 360,
        "dist": 0,
        "note": "강원도 원주시 산행 기점"
      },
      {
        "name": "남대봉",
        "alt": 655,
        "dist": 2.0,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "구룡계곡",
        "alt": 987,
        "dist": 3.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "치악산 정상 (1282m)",
        "alt": 1282,
        "dist": 5.1,
        "note": "산림청 100대 명산 치악산 최고봉"
      },
      {
        "name": "부곡계곡",
        "alt": 775,
        "dist": 7.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 5.7,
      "windSpeed": 6.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B9%98%EC%95%85%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423430&fileSn=1"
  },
  {
    "id": "forest_20000218",
    "forestId": "20000218",
    "isForest100": true,
    "top20Rank": null,
    "name": "명지산",
    "subTitle": "사방으로 산자락을 펼친 명지산 (산림청 100대 명산)",
    "location": "경기도 가평군 북면ㆍ하면",
    "altitude": 1252.3,
    "gain": 902,
    "difficulty": "상급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "종주 코스"
    ],
    "distance": 8.9,
    "duration": "4시간 30분",
    "rating": 4.91,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424214&fileSn=1",
    "shortDesc": "[산림청 공식 1252.3m] 경기도내에서 두 번째로 높은 산으로 경기도의 최고봉인 화악산(1,468.",
    "fullDesc": "[산림청 100대 명산 선정이유] 경기도내에서 두 번째로 높은 산으로 경기도의 최고봉인 화악산(1,468.3m)과 가평천을 사이에 하고 있으며, 강씨봉, 귀목봉, 청계산, 우목봉 등 산세가 웅장하고 군립공원으로 지정된 점 등을 감안하여 선정, 20여km를 흐르는 산 동쪽의 가평천 계곡과 익근리계곡의 명지폭포가 유명. 명지산 일대의 산과 계곡들은 경기도내에서는 첫째가는 심산유곡으로 알려져 있음 명지산은 하늘금 이쁜 명산은 아니지만 높고 깊은 맛이 있다. 경기도에서 가장 산이 많고 지대가 높은 가평군에 자리한 제2봉이기 때문이다. 특히 남쪽의 청우산(617.8m)에서 시작, 대금산(705.8m), 매봉(929.2m), 연인산(1068m)을 거쳐 올라오는 70리 능선길은 적설기 종주코스로 호(號)가 나있다. 이 능선은 북서계절풍을 가로막는 첫 1000미터 전후 산줄기다. 동쪽의 익근리계곡을 C자로 둘러싸는 산세여서 그쪽으로 등산로가 발달해 있다. 서쪽은 귀목고개에서 상판리로 향하거나 귀목봉(1036m) 너머 강씨봉고개에서 포천 일동으로 내려가게 돼있다. 그만큼 연계 교통이 불편한 까닭에 찾는 이들이 적어 호젓한 잇점은 있다. 봄철 나물산행의 적지다. 명지산행의 백미...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 350,
        "label": "강씨봉 들머리"
      },
      {
        "km": 2.0,
        "alt": 639,
        "label": "귀목봉"
      },
      {
        "km": 3.7,
        "alt": 963,
        "label": "우목봉"
      },
      {
        "km": 4.9,
        "alt": 1252.3,
        "label": "정상"
      },
      {
        "km": 6.8,
        "alt": 756,
        "label": "익근리계곡"
      },
      {
        "km": 8.9,
        "alt": 350,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "강씨봉 들머리",
        "alt": 350,
        "dist": 0,
        "note": "경기도 가평군 북면ㆍ하면 산행 기점"
      },
      {
        "name": "귀목봉",
        "alt": 639,
        "dist": 2.0,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "우목봉",
        "alt": 963,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "명지산 정상 (1252.3m)",
        "alt": 1252.3,
        "dist": 4.9,
        "note": "산림청 100대 명산 명지산 최고봉"
      },
      {
        "name": "익근리계곡",
        "alt": 756,
        "dist": 6.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 5.9,
      "windSpeed": 6.0,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%AA%85%EC%A7%80%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424214&fileSn=1"
  },
  {
    "id": "forest_20000247",
    "forestId": "20000247",
    "isForest100": true,
    "top20Rank": null,
    "name": "민주지산",
    "subTitle": "화전민터가 있는 원시숲 (산림청 100대 명산)",
    "location": "충청북도 영동군 상촌면ㆍ용화면, 전라북도 무주군 설천면, 경상북도 김천시 부항면",
    "altitude": 1241.7,
    "gain": 892,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.8,
    "duration": "4시간",
    "rating": 4.97,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/35/Minjujisan_Muju.jpg/1280px-Minjujisan_Muju.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1241.7m] 1000m 이상의 고산준봉을 거느리고 울창한 산림과 바위가 어우러져 있으며, 국내 최대 원시림 계곡인 물한계곡이 있는 점 등을 고려하여 선정물이 차다는 한천마을 상류....",
    "fullDesc": "[산림청 100대 명산 선정이유] 1000m 이상의 고산준봉을 거느리고 울창한 산림과 바위가 어우러져 있으며, 국내 최대 원시림 계곡인 물한계곡이 있는 점 등을 고려하여 선정물이 차다는 한천마을 상류에서부터 약 20㎞를 흐르는 깊은 계곡으로, 원시림 등이 잘 보존된 손꼽히는 생태관광지인 물한계곡(勿閑溪谷)이 특히 유명. 정상 남쪽 50m쯤 아래에는 삼두마애불상이 있음. 충북, 전북, 경북의 경계인 삼도봉과 연접 민주지산(1241.7m)은 충북, 경북, 전북 등 3도에 걸쳐 있다. 동으로는 석기봉과 삼도봉, 북으로는 각호산이 좌우로 날개처럼 우뚝 솟아올라 웅장한 기상을 펼치며 백두대간을 굽어보는 산이다. '동국여지승람'과 '대동여지도'에는 백운산(白雲山)으로 기록되어 있으나 일제 강점기에 민주지산으로 바뀌었다. 물한계곡을 중심으로 한 충청도 쪽 등산로는 민주지산에서 가장 길고 아름답다. 삼도봉을 비롯한 1000미터가 넘는 네 봉우리에서 흘러내린 계곡이 모두 물한계곡에서 합쳐지기에 수량이 풍부하고 경관이 수려하다. 특히 물한계곡에는 황룡사 부근의 용소와 옥소폭포, 의용골폭포, 음주골폭포(미니미폭포) 등이 볼 만하다. 삼도봉과 석기봉을 거쳐 민주지산 정상에 이르는 능선에는 잡목과 진달...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 350,
        "label": "고산준봉 들머리"
      },
      {
        "km": 1.9,
        "alt": 635,
        "label": "물한계곡"
      },
      {
        "km": 3.7,
        "alt": 957,
        "label": "삼도봉"
      },
      {
        "km": 4.8,
        "alt": 1241.7,
        "label": "정상"
      },
      {
        "km": 6.7,
        "alt": 751,
        "label": "석기봉"
      },
      {
        "km": 8.8,
        "alt": 350,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "고산준봉 들머리",
        "alt": 350,
        "dist": 0,
        "note": "충청북도 영동군 상촌면ㆍ용화면 산행 기점"
      },
      {
        "name": "물한계곡",
        "alt": 635,
        "dist": 1.9,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "삼도봉",
        "alt": 957,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "민주지산 정상 (1241.7m)",
        "alt": 1241.7,
        "dist": 4.8,
        "note": "산림청 100대 명산 민주지산 최고봉"
      },
      {
        "name": "석기봉",
        "alt": 751,
        "dist": 6.7,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 5.9,
      "windSpeed": 6.0,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%AF%BC%EC%A3%BC%EC%A7%80%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423585&fileSn=1"
  },
  {
    "id": "forest_20000012",
    "forestId": "20000012",
    "isForest100": true,
    "top20Rank": null,
    "name": "가지산",
    "subTitle": "영남알프스의 최고봉 (산림청 100대 명산)",
    "location": "울산광역시, 경상북도 청도군, 경상남도 밀양시",
    "altitude": 1240.9,
    "gain": 891,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.8,
    "duration": "4시간",
    "rating": 4.92,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Yeongnam_Alps_in_Summer.jpg/1280px-Yeongnam_Alps_in_Summer.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1240.9m] 백두대간 남단의 중심으로 \"영남알프스\"에서 가장 높은 산으로 '79년 도립공원으로 지정되었음.",
    "fullDesc": "[산림청 100대 명산 선정이유] 백두대간 남단의 중심으로 \"영남알프스\"에서 가장 높은 산으로 '79년 도립공원으로 지정되었음. 수량이 풍부한 폭포와 아름다운 소(沼)가 많고, 천연기념물 224호인 얼음골과 도의국사 사리탑인 \"8각운당형부도(보물 제369호)\"가 보존되어 있는 석남사(石南寺)가 소재하는 점 등을 고려하여 선정능선 곳곳에 바위봉과 억새밭이 어우러져 있고 전망이 좋으며 자연휴양림이 있음. 밀양강의 지류인 산내천과 무적천의 발원지이다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 350,
        "label": "백두대 들머리"
      },
      {
        "km": 1.9,
        "alt": 635,
        "label": "도의국사"
      },
      {
        "km": 3.7,
        "alt": 956,
        "label": "사리탑"
      },
      {
        "km": 4.8,
        "alt": 1240.9,
        "label": "정상"
      },
      {
        "km": 6.7,
        "alt": 751,
        "label": "석남사"
      },
      {
        "km": 8.8,
        "alt": 350,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "백두대 들머리",
        "alt": 350,
        "dist": 0,
        "note": "울산광역시 산행 기점"
      },
      {
        "name": "도의국사",
        "alt": 635,
        "dist": 1.9,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "사리탑",
        "alt": 956,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "가지산 정상 (1240.9m)",
        "alt": 1240.9,
        "dist": 4.8,
        "note": "산림청 100대 명산 가지산 최고봉"
      },
      {
        "name": "석남사",
        "alt": 751,
        "dist": 6.7,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 5.9,
      "windSpeed": 6.0,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B0%80%EC%A7%80%EC%82%B0_%28%EA%B2%BD%EC%83%81%EB%8F%84%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423564&fileSn=1"
  },
  {
    "id": "forest_20000543",
    "forestId": "20000543",
    "isForest100": true,
    "top20Rank": null,
    "name": "장안산",
    "subTitle": "전라북도 장수군 장수읍의 대표 명산 (산림청 100대 명산)",
    "location": "전라북도 장수군 장수읍, 계남면",
    "altitude": 1237.4,
    "gain": 887,
    "difficulty": "상급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.8,
    "duration": "4시간",
    "rating": 4.94,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/%EC%9E%A5%EC%95%88%EC%82%B0.jpg/1280px-%EC%9E%A5%EC%95%88%EC%82%B0.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1237.4m] 덕산계곡을 비롯한 크고 작은 계곡과 윗용소, 아랫용소 등 연못 및 기암괴석이 산림과 어우러져 군립공원(1986년)으로 지정된 점 등을 고려하여 선정, 산등에서 동쪽 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 덕산계곡을 비롯한 크고 작은 계곡과 윗용소, 아랫용소 등 연못 및 기암괴석이 산림과 어우러져 군립공원(1986년)으로 지정된 점 등을 고려하여 선정, 산등에서 동쪽 능선으로 펼쳐진 광활한 갈대밭과 덕산용소계곡이 유명 장안산은 금남정맥과 호남정맥을 거느리며 백두대간의 기운을 충청도와 전라도에 전하는 호남의 종산이다. 여름에는 피서지, 가을에는 억새와 단풍으로 유명한데 이 일대의 계곡과 숲의 경관이 뛰어나 1986년 장수군 군립공원으로 지정되었다. 이 산에는 26개의 크고 작은 계곡과 7개의 연못, 14개의 기암괴석, 5개의 약수터 등 연못과 폭포가 절경을 이룬다. 장안산 동쪽능선에는 광활한 억새밭이 펼쳐 있어 가을이면 산능선 전체가 억새로 뒤덮인다. 장안산 들머리는 여러 군데가 있으나 덕산계곡에서 범년동으로 가는 길목을 들머리로 하는 곳이 좋다. 등산로 입구에는 안내도와 화장실이 있다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 350,
        "label": "덕산계곡 들머리"
      },
      {
        "km": 1.9,
        "alt": 634,
        "label": "덕산용소계곡"
      },
      {
        "km": 3.7,
        "alt": 953,
        "label": "백두대"
      },
      {
        "km": 4.8,
        "alt": 1237.4,
        "label": "정상"
      },
      {
        "km": 6.7,
        "alt": 749,
        "label": "동쪽능선"
      },
      {
        "km": 8.8,
        "alt": 350,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "덕산계곡 들머리",
        "alt": 350,
        "dist": 0,
        "note": "전라북도 장수군 장수읍 산행 기점"
      },
      {
        "name": "덕산용소계곡",
        "alt": 634,
        "dist": 1.9,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "백두대",
        "alt": 953,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "장안산 정상 (1237.4m)",
        "alt": 1237.4,
        "dist": 4.8,
        "note": "산림청 100대 명산 장안산 최고봉"
      },
      {
        "name": "동쪽능선",
        "alt": 749,
        "dist": 6.7,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.0,
      "windSpeed": 6.0,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9E%A5%EC%95%88%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423424&fileSn=1"
  },
  {
    "id": "forest_20000281",
    "forestId": "20000281",
    "isForest100": true,
    "top20Rank": null,
    "name": "백운산(광양)",
    "subTitle": "또아리봉에서 바라본 낙조 (산림청 100대 명산)",
    "location": "전라남도 광양시 봉강면ㆍ옥룡면ㆍ진상면ㆍ다압면, 구례군 간전면",
    "altitude": 1222.2,
    "gain": 882,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 8.7,
    "duration": "4시간 30분",
    "rating": 4.85,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423672&fileSn=1",
    "shortDesc": "[산림청 공식 1222.2m] 주봉을 중심으로 하여 또아리봉과 도솔봉, 매봉, 억불봉 등 산세가 웅장하며 경관이 수려하고 억새풀과 철쭉 군락, 온.",
    "fullDesc": "[산림청 100대 명산 선정이유] 주봉을 중심으로 하여 또아리봉과 도솔봉, 매봉, 억불봉 등 산세가 웅장하며 경관이 수려하고 억새풀과 철쭉 군락, 온.한대 900종의 식물이 서식하는 등 경관.생태적 특징을 고려하여 선정, 자연휴양림이 있으며, 백운사(白雲寺), 성불사(成佛寺) 등이 유명 풍수지리의 금과옥조 명당도(明堂圖)의 본을 이루는 산이다. 좌청룡, 우백호, 입수, 안산…. 모두 이 산 모양새를 보고 체계화됐다. 국사(國師)제도도 없던 나말여초(羅末麗初)에 살았음에도 국사로 일컬어지는 도선으로 인해서다. 지도를 펴고 600미터 등고선을 따라 형광펜을 칠해보라. 거기서 떠오르는 백운산은 바다로 날아가는 커다란 한 마리 새다. 새의 머리, 도솔봉 남릉은 해발 700미터 끝자락에서 좌우로 갈리고있다. 오른쪽 줄기는 서쪽으로 불룩한 호(弧)를 긋다 그대로 남류(南流), 광양 진산 내우산(內牛山)으로 뻗어가고 왼쪽 가지는 동쪽 불룩 초승달 백계산(505.8m)을 이룬다. 꽃봉오리처럼 감싸인 가운데에는 암술대 모양의 입수(入首)가 있다. 도선이 머물렀던 옥룡사터...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 340,
        "label": "또아리봉 들머리"
      },
      {
        "km": 1.9,
        "alt": 622,
        "label": "도솔봉"
      },
      {
        "km": 3.7,
        "alt": 940,
        "label": "억불봉"
      },
      {
        "km": 4.8,
        "alt": 1222.2,
        "label": "정상"
      },
      {
        "km": 6.6,
        "alt": 737,
        "label": "백운사"
      },
      {
        "km": 8.7,
        "alt": 340,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "또아리봉 들머리",
        "alt": 340,
        "dist": 0,
        "note": "전라남도 광양시 봉강면ㆍ옥룡면ㆍ진상면ㆍ다압면 산행 기점"
      },
      {
        "name": "도솔봉",
        "alt": 622,
        "dist": 1.9,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "억불봉",
        "alt": 940,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "백운산(광양) 정상 (1222.2m)",
        "alt": 1222.2,
        "dist": 4.8,
        "note": "산림청 100대 명산 백운산(광양) 최고봉"
      },
      {
        "name": "백운사",
        "alt": 737,
        "dist": 6.6,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.1,
      "windSpeed": 5.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%B1%EC%9A%B4%EC%82%B0_%28%EC%A0%84%EB%9D%BC%EB%82%A8%EB%8F%84%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423672&fileSn=1"
  },
  {
    "id": "forest_20000492",
    "forestId": "20000492",
    "isForest100": true,
    "top20Rank": null,
    "name": "운문산",
    "subTitle": "숨겨진 비경을 들킬세라 (산림청 100대 명산)",
    "location": "경상북도 청도군 운문면, 경상남도 밀양시 산내면",
    "altitude": 1195.1,
    "gain": 865,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.9,
    "duration": "4시간 30분",
    "rating": 4.89,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423573&fileSn=1",
    "shortDesc": "[산림청 공식 1195.1m] 구연동(臼淵洞), 얼음골이라 부르는 동학(洞壑), 해바위(景岩) 등 천태만상의 기암괴석이 계곡과 어우러져 경관이 수려하고 군립공원으로 지정(1983년)된 점 등을 고....",
    "fullDesc": "[산림청 100대 명산 선정이유] 구연동(臼淵洞), 얼음골이라 부르는 동학(洞壑), 해바위(景岩) 등 천태만상의 기암괴석이 계곡과 어우러져 경관이 수려하고 군립공원으로 지정(1983년)된 점 등을 고려하여 선정, 보물 제835호 대웅전, 제678호 삼층석탑, 제193호 석등, 제316호 원응국사비, 제317호 석조여래좌상 등 각종 문화유적이 있는 운문사가 있음. 석남사 경내에 있는 4백년의 수령을 자랑하는 처진 소나무(반송 : 천연기념물 제180호)가 유명 거울에 비친 下자형 산줄기 영남알프스의 윗금 서쪽끝을 이루는 산이다. 거대한 봉분 같은 단순한 모양새이지만 억산과 가지산의 좌우 준봉에서 북으로 뻗어간 긴 능선들 덕분에 운문사 들어앉은 깊은 골을 갖추었다. 그러나 남쪽으로는 여지없는 홑산이어서 크단한 바위산덩이 한바우산으로 불린다. 저는 볼품이 별로 없지만 정상 전망 하나는 일품이다. 가지산 새끼 백운산 뒤로 포장을 친 듯한 능동∼재약산 줄기와 그 너머로 어깨를 드러낸 간월산의 장엄한 모습이다. 가을이면 그 등성이에 억새가 물결친다. 산이름이 운문사에서 비롯한 사실에서 보듯 보물 많은 절 운문사를 위해 존재하는 느낌이다. 가지산 역시 마찬가지인 바 현지인들은 지금 가지산으로 불리는 것이 본래는 운문산이었다고 주장한다. 운...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 330,
        "label": "삼층석탑 들머리"
      },
      {
        "km": 2.0,
        "alt": 607,
        "label": "원응국사"
      },
      {
        "km": 3.7,
        "alt": 918,
        "label": "운문사"
      },
      {
        "km": 4.9,
        "alt": 1195.1,
        "label": "정상"
      },
      {
        "km": 6.8,
        "alt": 719,
        "label": "석남사"
      },
      {
        "km": 8.9,
        "alt": 330,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "삼층석탑 들머리",
        "alt": 330,
        "dist": 0,
        "note": "경상북도 청도군 운문면 산행 기점"
      },
      {
        "name": "원응국사",
        "alt": 607,
        "dist": 2.0,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "운문사",
        "alt": 918,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "운문산 정상 (1195.1m)",
        "alt": 1195.1,
        "dist": 4.9,
        "note": "산림청 100대 명산 운문산 최고봉"
      },
      {
        "name": "석남사",
        "alt": 719,
        "dist": 6.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.2,
      "windSpeed": 5.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9A%B4%EB%AC%B8%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423573&fileSn=1"
  },
  {
    "id": "forest_20000686",
    "forestId": "20000686",
    "isForest100": true,
    "top20Rank": null,
    "name": "황석산",
    "subTitle": "썩은 갈치 다 모이는 오지의 산 (산림청 100대 명산)",
    "location": "경상남도 함양군",
    "altitude": 1192.5,
    "gain": 862,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.9,
    "duration": "4시간 30분",
    "rating": 4.76,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424323&fileSn=1",
    "shortDesc": "[산림청 공식 1192.5m] 거망에서 황석으로 이어지는 능선에 있는 광활한 억새밭 등 경관이 아름답고 황석산성 등 역사적 유적이 있는 점 등을 고려하여 선정, 정유재란 당시 왜군에게 마지막까지 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 거망에서 황석으로 이어지는 능선에 있는 광활한 억새밭 등 경관이 아름답고 황석산성 등 역사적 유적이 있는 점 등을 고려하여 선정, 정유재란 당시 왜군에게 마지막까지 항거하던 사람들이 성이 무너지자 죽음을 당하고 부녀자들은 천길 절벽에서 몸을 날려 지금껏 황석산 북쪽 바위 벼랑이 핏빛이라는 전설이 있는 황석산성이 있음. 황석산은 거창 남녘에 솟은 범상치 않은 바위산이다. 백두대간 줄기에서 뻗어 내린 네 개의 산 기백·금원·거망·황석 가운데 가장 끝 자락에 솟구친 이 봉우리는 덕유산에서도 선명하게 보인다．가을철에는 거망에서 황석으로 이어지는 능선에 광활한 억새밭이 장관이다. 금원, 기백산과의 사이에는 유명한 용추계곡이 있다. ６·２５ 때 빨치산 여장군 정순덕이 활약했던 곳이 바로 이웃하고 있는 거망산이다. 황석산성은 함양 안의 사람들의 지조와 절개를 상징하는 중요한 유적지이다. 정유재란 당시 왜군에게 마지막까지 항거하던 이들이 성이 무너지자 죽음을 당하고 부녀자들은 천길 절벽에서 몸을 날려 지금껏 황석산 북쪽 바위 벼랑은 핏빛으로 물들어 있다． 안의에서는 화림동 여덟 개의 못과 여덟 개의 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 330,
        "label": "황석산성 들머리"
      },
      {
        "km": 2.0,
        "alt": 606,
        "label": "정유재"
      },
      {
        "km": 3.7,
        "alt": 916,
        "label": "백두대"
      },
      {
        "km": 4.9,
        "alt": 1192.5,
        "label": "정상"
      },
      {
        "km": 6.8,
        "alt": 718,
        "label": "용추계곡"
      },
      {
        "km": 8.9,
        "alt": 330,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "황석산성 들머리",
        "alt": 330,
        "dist": 0,
        "note": "경상남도 함양군 산행 기점"
      },
      {
        "name": "정유재",
        "alt": 606,
        "dist": 2.0,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "백두대",
        "alt": 916,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "황석산 정상 (1192.5m)",
        "alt": 1192.5,
        "dist": 4.9,
        "note": "산림청 100대 명산 황석산 최고봉"
      },
      {
        "name": "용추계곡",
        "alt": 718,
        "dist": 6.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.2,
      "windSpeed": 5.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%99%A9%EC%84%9D%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424323&fileSn=1"
  },
  {
    "id": "forest_20000651",
    "forestId": "20000651",
    "isForest100": true,
    "top20Rank": null,
    "name": "팔공산",
    "subTitle": "작은 국보급 문화재 전시장 (산림청 100대 명산)",
    "location": "경상북도 군위군 부계면, 영천시 신녕면, 대구광역시 동구",
    "altitude": 1192.3,
    "gain": 862,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "종주 코스"
    ],
    "distance": 8.9,
    "duration": "4시간 30분",
    "rating": 4.87,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/%ED%8C%94%EA%B3%B5%EC%82%B0_%EA%B4%80%EB%B4%89_%EA%B2%BD%EC%B9%98%28%EA%B2%BD%EC%82%B0%EC%8B%9C_%EB%B0%A9%ED%96%A5%29.jpg/1280px-%ED%8C%94%EA%B3%B5%EC%82%B0_%EA%B4%80%EB%B4%89_%EA%B2%BD%EC%B9%98%28%EA%B2%BD%EC%82%B0%EC%8B%9C_%EB%B0%A9%ED%96%A5%29.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1192.3m] 비로봉(毘盧峰)을 중심으로 하여 동서로 16km에 걸친 능선 경관이 아름다우며 대도시 근교에서는 가장 높은 산으로 도시민에게 휴식처를 제공하고 도립공원으로 지정(19....",
    "fullDesc": "[산림청 100대 명산 선정이유] 비로봉(毘盧峰)을 중심으로 하여 동서로 16km에 걸친 능선 경관이 아름다우며 대도시 근교에서는 가장 높은 산으로 도시민에게 휴식처를 제공하고 도립공원으로 지정(1980년)된 점 등을 고려하여 선정, 동화사(桐華寺), 은해사(銀海寺), 부인사(符仁寺), 송림사(松林寺), 관암사(冠岩寺) 등 불교문화의 성지로 유명. 신라의 중악(中岳) 팔공산은 대구산악인의 모산이며 약사신앙의 1번지다. 이름은 대구, 칠곡, 인동(현 구미 인의동 일대), 신녕, 의흥, 영천, 하양, 경산 등 여덟 마을에 걸쳐 있어 붙여졌다. 가산에서 갓바위까지 주릉만 26km다. 기슭에는 파계사, 부인사, 동화사, 은해사, 제2석굴암 등 이름난 절이 많다. ? 최적 탐방 시기 : 사계절 아름다움, 매년 10월 초순경 [달구벌축제]가 열림 ? 볼거리 : 관봉석조여래좌상. 장군바위.선본사.약사암.용덕사.용주암.원효암.천성사.불굴사. 봄에는 진달래와 연산홍이 피고 여름에는 울창한 숲과 맑은 물이 있으며, 가을은 전국에서 제일 아름다운 단풍거리가 순환도로를 따라 전개되어 진풍경을 연출하고 있으며, 겨울은 설경과 설화가 아름답...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 330,
        "label": "비로봉 들머리"
      },
      {
        "km": 2.0,
        "alt": 606,
        "label": "동화사"
      },
      {
        "km": 3.7,
        "alt": 916,
        "label": "은해사"
      },
      {
        "km": 4.9,
        "alt": 1192.3,
        "label": "정상"
      },
      {
        "km": 6.8,
        "alt": 718,
        "label": "부인사"
      },
      {
        "km": 8.9,
        "alt": 330,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "비로봉 들머리",
        "alt": 330,
        "dist": 0,
        "note": "경상북도 군위군 부계면 산행 기점"
      },
      {
        "name": "동화사",
        "alt": 606,
        "dist": 2.0,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "은해사",
        "alt": 916,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "팔공산 정상 (1192.3m)",
        "alt": 1192.3,
        "dist": 4.9,
        "note": "산림청 100대 명산 팔공산 최고봉"
      },
      {
        "name": "부인사",
        "alt": 718,
        "dist": 6.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.3,
      "windSpeed": 5.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%8C%94%EA%B3%B5%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423570&fileSn=1"
  },
  {
    "id": "forest_20000225",
    "forestId": "20000225",
    "isForest100": true,
    "top20Rank": null,
    "name": "무등산",
    "subTitle": "빛고을 광주의 얼굴 (산림청 100대 명산)",
    "location": "광주광역시 동구, 전라남도 담양군 남면ㆍ화순군 이서면",
    "altitude": 1186.8,
    "gain": 857,
    "difficulty": "상급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.8,
    "duration": "4시간",
    "rating": 4.75,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Gwangju_Mudeungsan.jpg/1280px-Gwangju_Mudeungsan.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1186.8m] 최고봉인 천왕봉 가까이에는 원기둥 모양의 절리(節理)가 발달하여 기암괴석의 경치가 뛰어나고, 도시민의 휴식처이며, 도립공원으로 지정(1972년)된 점 등을 고려하여 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 최고봉인 천왕봉 가까이에는 원기둥 모양의 절리(節理)가 발달하여 기암괴석의 경치가 뛰어나고, 도시민의 휴식처이며, 도립공원으로 지정(1972년)된 점 등을 고려하여 선정보물 제131호인 철조비로자나불좌상 등이 있는 증심사(證心寺)와 원효사(元曉寺)가 유명 무등산은 산줄기와 골짜기가 뚜렷하지 않고 마치 커다란 둔덕과 같은 산세를 지닌 홑산이다. 가장 큰 특징은 너덜지대로, 천왕봉 남쪽의 지공너덜과 증심사 동쪽의 덕산너덜은 장관을 자랑한다. 천태만상의 암석들이 운집한 정상, 천왕봉을 중심으로 펼쳐지는 바위들의 웅장함은 남도민의 신앙대상이 되어온 신산임을 반증한다. 특히 입석대, 서석대, 규봉의 바위군상은 보는 이를 압도할 만큼 대단하다. 허나 무등산은 전반적으로 완만한 산세이며 대부분이 흙산으로 이루어져 있다. 멀리서 본 전경은 뫼 '山'자를 연상케 하며 호남정맥 흐름의 중심에 솟아 있다. 골짜기들은 맑고 깊은 물을 품어 광주의 젖줄 노릇을 해 왔으며, 위치나 산세 면면이 남도의 으뜸이라 할 만한지라 빛고을 광주를 품기에 부족...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 330,
        "label": "천왕봉 들머리"
      },
      {
        "km": 1.9,
        "alt": 604,
        "label": "증심사"
      },
      {
        "km": 3.7,
        "alt": 913,
        "label": "원효사"
      },
      {
        "km": 4.8,
        "alt": 1186.8,
        "label": "정상"
      },
      {
        "km": 6.7,
        "alt": 716,
        "label": "너덜지대"
      },
      {
        "km": 8.8,
        "alt": 330,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "천왕봉 들머리",
        "alt": 330,
        "dist": 0,
        "note": "광주광역시 동구 산행 기점"
      },
      {
        "name": "증심사",
        "alt": 604,
        "dist": 1.9,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "원효사",
        "alt": 913,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "무등산 정상 (1186.8m)",
        "alt": 1186.8,
        "dist": 4.8,
        "note": "산림청 100대 명산 무등산 최고봉"
      },
      {
        "name": "너덜지대",
        "alt": 716,
        "dist": 6.7,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.3,
      "windSpeed": 5.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%AC%B4%EB%93%B1%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424510&fileSn=1"
  },
  {
    "id": "forest_20000422",
    "forestId": "20000422",
    "isForest100": true,
    "top20Rank": null,
    "name": "신불산",
    "subTitle": "광활한 억새밭이 펼쳐진 영남 알프스 (산림청 100대 명산)",
    "location": "울산광역시 울주군 삼남면ㆍ상북면",
    "altitude": 1159.3,
    "gain": 839,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.7,
    "duration": "4시간 30분",
    "rating": 4.88,
    "image": "https://thumb.wikimedia.org/wikipedia/ko/thumb/7/74/%EC%8B%A0%EB%B6%88%EC%82%B0_%EB%B0%B0%EB%82%B4%EA%B3%A0%EA%B0%9C_%EC%A0%95%EC%83%81_2.jpg/1280px-%EC%8B%A0%EB%B6%88%EC%82%B0_%EB%B0%B0%EB%82%B4%EA%B3%A0%EA%B0%9C_%EC%A0%95%EC%83%81_2.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1159.3m] 영남알프스 산군에 속하는 산으로 능선에는 광활한 억새와 바위절벽, 완만한 지대가 조화를 이루고 있으며 작천계곡, 파래소폭포 등이 있고 군립공원인 점 등을 고려하여 선....",
    "fullDesc": "[산림청 100대 명산 선정이유] 영남알프스 산군에 속하는 산으로 능선에는 광활한 억새와 바위절벽, 완만한 지대가 조화를 이루고 있으며 작천계곡, 파래소폭포 등이 있고 군립공원인 점 등을 고려하여 선정, 신불산 폭포자연휴양림 등이 유명 영취산과의 사이에 신불평원이라는 광활한 산상 억새초원을 펼친 이색지대다. 동쪽으로는 공룡능선이라는 긴 암봉릉이 뻗어나가 산록 육덕(肉德) 자랑만 하는 주변 산들과 구별된다. 그럼에도 썩 튀지는 않아 간월, 가지, 상운, 고헌의 천미터급 산으로 계속 이어지며 읍성 품은 오랜 고을 언양의 장대한 병풍을 이룬다. 동쪽의 홍류폭포, 서쪽의 파래소폭포 또한 이웃 산들에는 없는 이채로움이다. 파래소폭포 하류에는 널따란 암반계류를 펼쳐 아름다운 2층 누각 작천정이 자리잡았다. 그리고 산 위에는 단조산성이 쌓여있으니 다섯 병풍축 가운데서도 특별히 선택받은 언양의 진산이다. 다섯 병풍축에 운문·재약산을 합하면 소위 \"영남알프스\"다. 유럽의 용마루 알프스를 본따 붙인 일본의 남북알프스가 다...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 320,
        "label": "작천계곡 들머리"
      },
      {
        "km": 1.9,
        "alt": 588,
        "label": "파래소폭포"
      },
      {
        "km": 3.7,
        "alt": 891,
        "label": "폭포자연휴양림"
      },
      {
        "km": 4.8,
        "alt": 1159.3,
        "label": "정상"
      },
      {
        "km": 6.6,
        "alt": 698,
        "label": "이색지대"
      },
      {
        "km": 8.7,
        "alt": 320,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "작천계곡 들머리",
        "alt": 320,
        "dist": 0,
        "note": "울산광역시 울주군 삼남면ㆍ상북면 산행 기점"
      },
      {
        "name": "파래소폭포",
        "alt": 588,
        "dist": 1.9,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "폭포자연휴양림",
        "alt": 891,
        "dist": 3.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "신불산 정상 (1159.3m)",
        "alt": 1159.3,
        "dist": 4.8,
        "note": "산림청 100대 명산 신불산 최고봉"
      },
      {
        "name": "이색지대",
        "alt": 698,
        "dist": 6.6,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.5,
      "windSpeed": 5.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%8B%A0%EB%B6%88%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423920&fileSn=1"
  },
  {
    "id": "forest_20000476",
    "forestId": "20000476",
    "isForest100": true,
    "top20Rank": null,
    "name": "용문산",
    "subTitle": "조선 개국으로 다시 태어난 미지산 (산림청 100대 명산)",
    "location": "경기도 양평군 용문면ㆍ옥천면",
    "altitude": 1157.1,
    "gain": 837,
    "difficulty": "상급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "종주 코스"
    ],
    "distance": 8.6,
    "duration": "4시간",
    "rating": 4.96,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423572&fileSn=1",
    "shortDesc": "[산림청 공식 1157.1m] 옛부터 경기의 금강산이라 불리워질 만큼 기암괴석과 고산준령을 고루 갖춘 경관이 뛰어난 산이며, 특히 신라 선덕여왕때 창건한 용문사와 높이 62m, 둘레 14m에 달하....",
    "fullDesc": "[산림청 100대 명산 선정이유] 옛부터 경기의 금강산이라 불리워질 만큼 기암괴석과 고산준령을 고루 갖춘 경관이 뛰어난 산이며, 특히 신라 선덕여왕때 창건한 용문사와 높이 62m, 둘레 14m에 달하는 은행나무(천연기념물 제30호)가 있는 등 역사, 문화적 가치가 높은 점을 고려하여 선정, 경기도에서 네 번째로 높은 산으로 미지산이라는 이름으로 불리었는데 조선을 개국한 이태조가 등극하면서 `용문산\"이라 바꿔 부르게 되었다는 전설이 있음 용문산은 경인지역에서 설악산 갈 때 보게되는 큰 산이다. 44번 국도변에는 이보다 더 높은 산도 많지만 대개는 골짜기를 따라 이어진 도로에서 올려다보게 되어있어 규모를 느낄 수 없다. 그러나 용문산은 비산비야의 용문면 북쪽 끝에 병풍처럼 솟아있는 까닭에 위용이 쉽사리 잡힌다. 하지만 상봉은 바람을 넣어 부풀린 여의도 종합전시장처럼 두루뭉실, 장엄한 느낌밖에 없다. 반면 뾰족한 삼각뿔이 하늘을 찌르는 남릉의 백운봉은 두고두고 지워지지 않는 인상을 남긴다. 가을이나 겨울 이른 새벽에 물안개 위로 보이는 그 모습은 정말 소슬하다. 가파른 바위투성이 남면과 달리 부드러운 육산을 이루는 북면은 풀꽃 천지다. 이른 봄의 얼레지, 5월의 피나물 꽃밭을 인적 없는 호젓함 속에 만끽할 수...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 320,
        "label": "고산준령 들머리"
      },
      {
        "km": 1.9,
        "alt": 588,
        "label": "용문사"
      },
      {
        "km": 3.6,
        "alt": 889,
        "label": "백운봉"
      },
      {
        "km": 4.7,
        "alt": 1157.1,
        "label": "정상"
      },
      {
        "km": 6.5,
        "alt": 697,
        "label": "하산 능선 갈림"
      },
      {
        "km": 8.6,
        "alt": 320,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "고산준령 들머리",
        "alt": 320,
        "dist": 0,
        "note": "경기도 양평군 용문면ㆍ옥천면 산행 기점"
      },
      {
        "name": "용문사",
        "alt": 588,
        "dist": 1.9,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "백운봉",
        "alt": 889,
        "dist": 3.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "용문산 정상 (1157.1m)",
        "alt": 1157.1,
        "dist": 4.7,
        "note": "산림청 100대 명산 용문산 최고봉"
      },
      {
        "name": "하산 능선 갈림길",
        "alt": 697,
        "dist": 6.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.5,
      "windSpeed": 5.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9A%A9%EB%AC%B8%EC%82%B0_%28%EA%B2%BD%EA%B8%B0%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423572&fileSn=1"
  },
  {
    "id": "forest_20000495",
    "forestId": "20000495",
    "isForest100": true,
    "top20Rank": null,
    "name": "운장산",
    "subTitle": "금강과 만경강의 발원지 (산림청 100대 명산)",
    "location": "전라북도 진안군 주천면ㆍ부귀면ㆍ정천면, 완주군 동상면",
    "altitude": 1125.8,
    "gain": 806,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.5,
    "duration": "4시간 30분",
    "rating": 4.92,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424031&fileSn=1",
    "shortDesc": "[산림청 공식 1125.8m] 운일암(雲日岩), 반일암(半日岩)으로 유명한 대불천(大佛川) 계곡이 있으며, 물이 맑고 암벽과 숲으로 둘러싸여 경관이 아름답고 자연휴양림이 있는 점 등을 고려하여 선....",
    "fullDesc": "[산림청 100대 명산 선정이유] 운일암(雲日岩), 반일암(半日岩)으로 유명한 대불천(大佛川) 계곡이 있으며, 물이 맑고 암벽과 숲으로 둘러싸여 경관이 아름답고 자연휴양림이 있는 점 등을 고려하여 선정, 북두칠성의 전설이 담겨있는 `칠성대\"와 조선시대 송익필의 전설이 얽혀 있는 `오성대\"가 유명 금남정맥의 최고봉이면서 전라북도 내륙 최고봉이다. 본이름은 구절산이었는데 조선 중기에 서인의 막후실력자 송익필의 자(字) 운장을 따라 운장산으로 바뀌었다. 그가 배후조종했다고 하는 기축옥사로 정여립과 그 추종자(대부분이 전라북도 선비들이었다) 천여 명이 죽임을 당했는 바 그 통에 산이름까지 창씨개명한 듯하다. 정상 좌우에 서봉과 동봉이 있는데 서봉 아래 오성대는, 천민으로서 주인이 역모를 꾀했다고 거짓 밀고해 일약 종3품까지 올라간 송익필의 아버지가 다시 천민이 되면서 도피생활에 들어간 송익필이 머물렀던 곳이라고 한다. 그는 거기서, 빤히 보이는 죽도의 정여립을 얽어맬 음모를 완성했던 듯하다. 산 동쪽의 가장 빼어난 부분은 송익필의 호와 음이 같은 구봉산이다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 320,
        "label": "운일암 들머리"
      },
      {
        "km": 1.9,
        "alt": 578,
        "label": "반일암"
      },
      {
        "km": 3.6,
        "alt": 868,
        "label": "칠성대"
      },
      {
        "km": 4.7,
        "alt": 1125.8,
        "label": "정상"
      },
      {
        "km": 6.5,
        "alt": 683,
        "label": "조선시대"
      },
      {
        "km": 8.5,
        "alt": 320,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "운일암 들머리",
        "alt": 320,
        "dist": 0,
        "note": "전라북도 진안군 주천면ㆍ부귀면ㆍ정천면 산행 기점"
      },
      {
        "name": "반일암",
        "alt": 578,
        "dist": 1.9,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "칠성대",
        "alt": 868,
        "dist": 3.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "운장산 정상 (1125.8m)",
        "alt": 1125.8,
        "dist": 4.7,
        "note": "산림청 100대 명산 운장산 최고봉"
      },
      {
        "name": "조선시대",
        "alt": 683,
        "dist": 6.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.7,
      "windSpeed": 5.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9A%B4%EC%9E%A5%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424031&fileSn=1"
  },
  {
    "id": "forest_20000545",
    "forestId": "20000545",
    "isForest100": true,
    "top20Rank": null,
    "name": "재약산",
    "subTitle": "하늘거리는 억새 품에 나를 맡긴다 (산림청 100대 명산)",
    "location": "경상남도 밀양시 단장면ㆍ산내면, 울산광역시 울주군 상북면",
    "altitude": 1119.1,
    "gain": 809,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "단풍"
    ],
    "distance": 8.4,
    "duration": "4시간",
    "rating": 4.96,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424021&fileSn=1",
    "shortDesc": "[산림청 공식 1119.1m] 산세가 부드러우면서도 정상 일대에는 거대한 암벽을 갖추고 있어 경관이 아름다우며 우리나라에서 가장 넓은 억새밭인 사자평이 있는 점 등을 고려하여 선정, 삼복 더위에 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 산세가 부드러우면서도 정상 일대에는 거대한 암벽을 갖추고 있어 경관이 아름다우며 우리나라에서 가장 넓은 억새밭인 사자평이 있는 점 등을 고려하여 선정, 삼복 더위에 얼음이 어는 천연기념물 제224호 얼음골이 있음. 신라 진덕여왕때 창건하고 서산대사가 의병을 모집한 곳인 표충사가 유명 왼손으로 쓴 下자 형국 영남알프스의 점에 해당하는 산이다. 그만큼 깊이 숨어있는 산중 속의 산으로 빙 둘러 타원형 능선이 길지를 품고있다. 표충사. 국보 75호 청동함은향완(含銀香玩)과 보물 467호 삼층석탑, 사명대사 유물 200여점을 보관하고있는 절이다. 산은 흡사 이 길지와 거기 있는 보물을 지키기 위해 생겨난 듯하다. 필봉, 상투봉, 상봉 사자봉(1189m), 수미봉(1108m), 코끼리봉(899m), 재약봉(953.8m), 향로산(979.1m), 쌍봉(821.8m)의 여덟 봉만(峰巒)이 알 품은 새우의 모양을 하고있는 것이다. 800미터 등고선을 이어보면 자궁 속의 아이처럼 보이기도 한다. 인간을 감동시키는, 절묘한 자연의 생김이다. 120만평의 억새초원 사자평으...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 310,
        "label": "서산대사 들머리"
      },
      {
        "km": 1.8,
        "alt": 569,
        "label": "표충사"
      },
      {
        "km": 3.5,
        "alt": 860,
        "label": "삼층석탑"
      },
      {
        "km": 4.6,
        "alt": 1119.1,
        "label": "정상"
      },
      {
        "km": 6.4,
        "alt": 674,
        "label": "사명대사"
      },
      {
        "km": 8.4,
        "alt": 310,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "서산대사 들머리",
        "alt": 310,
        "dist": 0,
        "note": "경상남도 밀양시 단장면ㆍ산내면 산행 기점"
      },
      {
        "name": "표충사",
        "alt": 569,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "삼층석탑",
        "alt": 860,
        "dist": 3.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "재약산 정상 (1119.1m)",
        "alt": 1119.1,
        "dist": 4.6,
        "note": "산림청 100대 명산 재약산 최고봉"
      },
      {
        "name": "사명대사",
        "alt": 674,
        "dist": 6.4,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.7,
      "windSpeed": 5.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9E%AC%EC%95%BD%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424021&fileSn=1"
  },
  {
    "id": "forest_20000684",
    "forestId": "20000684",
    "isForest100": true,
    "top20Rank": null,
    "name": "황매산",
    "subTitle": "목장길 따라 가는 세 봉우리 (산림청 100대 명산)",
    "location": "경상남도 합천군 대병면, 가회면, 산청군 차황면.",
    "altitude": 1113.1,
    "gain": 803,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 8.4,
    "duration": "4시간",
    "rating": 4.97,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/Hwangmaesan_Mountain_in_autumn.jpg/1280px-Hwangmaesan_Mountain_in_autumn.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1113.1m] 화강암 기암괴석과 소나무, 철쭉, 활엽수림이 어우러져 경관이 아름다운 점 등을 고려하여 선정, 합천호 푸른물에 하봉, 중봉, 상봉의 산 그림자가 잠기면 세송이 매화꽃....",
    "fullDesc": "[산림청 100대 명산 선정이유] 화강암 기암괴석과 소나무, 철쭉, 활엽수림이 어우러져 경관이 아름다운 점 등을 고려하여 선정, 합천호 푸른물에 하봉, 중봉, 상봉의 산 그림자가 잠기면 세송이 매화꽃이 물에 잠긴 것 같다고 하여 수중매라는 별칭으로도 불림. 산 아래의 황매평전에는 목장지대와 고산 철쭉 자생지가 있으며, 통일신라시대의 고찰인 염암사지(사적131호)가 유명 합천호반을 지나다 보면 남쪽 하늘금에 굉장한 산 하나가 솟아있다. 이 근처에도 저런 높은 산이 있었나 싶을 만큼 준걸한 암봉이 호숫물에 어린다. 지도를 펴보면… 황매산이다. 자료를 찾아보면… 하늘금만 이쁜 게 아니고 억새와 철쭉도 유명한 군립공원이다. 얼마나 대단한 산이면 영화를 두 편이나 찍었다. 공전의 히트를 기록했던 [태극기 휘날리며]와 [단적비연수]다. 전자는 낙동강 방어선과 두밀리 전투장면이었으니 가장 한국적인 지형을 품고있다는 얘기고 후자는 환타지 무협영화니 풍광이 환상적이어서였으리라. 주릉 위에는 신불평원보다 더 너른 황매평전이 있다. 열두목장이 둘만 남아 대부분이 황무지처럼 버려져있지만 엘리어트의 '황무지'를 좋아하는 이라면 오히려 이런 풍경이 더 마음에 들...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 310,
        "label": "합천호 들머리"
      },
      {
        "km": 1.8,
        "alt": 567,
        "label": "황매평전"
      },
      {
        "km": 3.5,
        "alt": 856,
        "label": "목장지대"
      },
      {
        "km": 4.6,
        "alt": 1113.1,
        "label": "정상"
      },
      {
        "km": 6.4,
        "alt": 671,
        "label": "통일신라시대"
      },
      {
        "km": 8.4,
        "alt": 310,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "합천호 들머리",
        "alt": 310,
        "dist": 0,
        "note": "경상남도 합천군 대병면 산행 기점"
      },
      {
        "name": "황매평전",
        "alt": 567,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "목장지대",
        "alt": 856,
        "dist": 3.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "황매산 정상 (1113.1m)",
        "alt": 1113.1,
        "dist": 4.6,
        "note": "산림청 100대 명산 황매산 최고봉"
      },
      {
        "name": "통일신라시대",
        "alt": 671,
        "dist": 6.4,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.8,
      "windSpeed": 5.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%99%A9%EB%A7%A4%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424014&fileSn=1"
  },
  {
    "id": "forest_20000687",
    "forestId": "20000687",
    "isForest100": true,
    "top20Rank": null,
    "name": "황악산",
    "subTitle": "학이 먼저 알아 본 국민 관광지 (산림청 100대 명산)",
    "location": "경상북도 김천시 대항면 운수리",
    "altitude": 1111.4,
    "gain": 801,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "종주 코스"
    ],
    "distance": 8.4,
    "duration": "4시간",
    "rating": 4.77,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423857&fileSn=1",
    "shortDesc": "[산림청 공식 1111.4m] 전체적인 산세는 특징 없이 완만한 편이나 산림이 울창하고 산 동쪽으로 흘러내리는 계곡은 곳곳에 폭포와 소를 이뤄 계곡미가 아름다운 점 등을 고려하여 선정, 특히 직지....",
    "fullDesc": "[산림청 100대 명산 선정이유] 전체적인 산세는 특징 없이 완만한 편이나 산림이 울창하고 산 동쪽으로 흘러내리는 계곡은 곳곳에 폭포와 소를 이뤄 계곡미가 아름다운 점 등을 고려하여 선정, 특히 직지사 서쪽 200m 지점에 있는 천룡대부터 펼쳐지는 능여계곡은 대표적인 계곡으로 봄철에는 진달래, 벚꽃, 산목련이 유명. 황악산은 비로봉(1111.4m)을 중심으로 백운봉(770m), 신선봉(944m), 운수봉(740m)이 치솟아 직지사를 포근히 감싸고 있다. 산세는 평평하고 완만하여 비단같이 부드러운 편이며, 초입 일대 계곡 양쪽으로 늘어선 노송과 참나무가 하늘을 가려 장관을 이룬다. 이 산은 김천시에서 서쪽으로 12km 떨어진 백두대간 가운데 위치한다. 예부터 학이 많이 찾아와 황학산이라고도 불렀으나, 직지사 현판과 택리지에는 황악산으로 표기되어 있다. 울창한 숲과 깊은 계곡에 옥처럼 맑은 물, 가을 단풍과 겨울 설화가 아름답다. 정상에 서면 서쪽으로 민주지산, 남쪽으로 수도산과 가야산, 동쪽으로 금오산, 북쪽으로 포성봉이 보인다. 황악산의 주봉을 비롯한 봉우리들은 저마다 산줄기를 동쪽으...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 310,
        "label": "직지사 들머리"
      },
      {
        "km": 1.8,
        "alt": 566,
        "label": "천룡대"
      },
      {
        "km": 3.5,
        "alt": 855,
        "label": "능여계곡"
      },
      {
        "km": 4.6,
        "alt": 1111.4,
        "label": "정상"
      },
      {
        "km": 6.4,
        "alt": 670,
        "label": "비로봉"
      },
      {
        "km": 8.4,
        "alt": 310,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "직지사 들머리",
        "alt": 310,
        "dist": 0,
        "note": "경상북도 김천시 대항면 운수리 산행 기점"
      },
      {
        "name": "천룡대",
        "alt": 566,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "능여계곡",
        "alt": 855,
        "dist": 3.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "황악산 정상 (1111.4m)",
        "alt": 1111.4,
        "dist": 4.6,
        "note": "산림청 100대 명산 황악산 최고봉"
      },
      {
        "name": "비로봉",
        "alt": 670,
        "dist": 6.4,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.8,
      "windSpeed": 5.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%99%A9%EC%95%85%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423857&fileSn=1"
  },
  {
    "id": "forest_20000575",
    "forestId": "20000575",
    "isForest100": true,
    "top20Rank": null,
    "name": "주흘산",
    "subTitle": "삼각산과 다툴 만큼 빼어난 명산 (산림청 100대 명산)",
    "location": "경상북도 문경시 문경읍",
    "altitude": 1108.4,
    "gain": 798,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 8.4,
    "duration": "4시간",
    "rating": 4.8,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423559&fileSn=1",
    "shortDesc": "[산림청 공식 1108.4m] .",
    "fullDesc": "서울의 진산 자리를 놓고 삼각산과 다투다가 휘적휘적 내려와 버렸다는 전설이 있을 만큼 빼어난 산이다. 정상에서 남봉으로 뻗어내린 1000m를 넘나드는 능선이 특히 준걸해 흡사 삼각산 백운대에서 보현봉에 이르는 장쾌한 능선을 빼다 놓은 듯하다. 일반등산로는 정상으로 알려진 1075봉을 중심으로 6방으로 나있는데 이 중 상봉인 주흘영봉과 부봉을 지나 동화원로 이어지는 줄기의 능선미가 일품이다. 월항삼봉으로 해서 하늘재로 내려서는 코스도 좋은데 월악산에서는 이 둘의 하늘금이 리듬체조의 리본처럼 역동적으로 보인다. 산이 솟음이 우세한 형국이라 썩 발달한 계곡은 없다. 대신 곡충골의 여궁폭포와 파랑소, 조곡골의 꽃밭서덜이 이채롭다. 너덜 사이를 듬성듬성 뚫고 올라온 진달래가 꽃을 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 310,
        "label": "백운대 들머리"
      },
      {
        "km": 1.8,
        "alt": 565,
        "label": "보현봉"
      },
      {
        "km": 3.5,
        "alt": 853,
        "label": "주흘영봉"
      },
      {
        "km": 4.6,
        "alt": 1108.4,
        "label": "정상"
      },
      {
        "km": 6.4,
        "alt": 669,
        "label": "월항삼봉"
      },
      {
        "km": 8.4,
        "alt": 310,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "백운대 들머리",
        "alt": 310,
        "dist": 0,
        "note": "경상북도 문경시 문경읍 산행 기점"
      },
      {
        "name": "보현봉",
        "alt": 565,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "주흘영봉",
        "alt": 853,
        "dist": 3.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "주흘산 정상 (1108.4m)",
        "alt": 1108.4,
        "dist": 4.6,
        "note": "산림청 100대 명산 주흘산 최고봉"
      },
      {
        "name": "월항삼봉",
        "alt": 669,
        "dist": 6.4,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.8,
      "windSpeed": 5.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%A3%BC%ED%9D%98%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423559&fileSn=1"
  },
  {
    "id": "forest_20000505",
    "forestId": "20000505",
    "isForest100": true,
    "top20Rank": null,
    "name": "월악산",
    "subTitle": "병화가 미치지 않는 심산유곡 (산림청 100대 명산)",
    "location": "충청북도 제천시 한수면, 덕산면",
    "altitude": 1095.3,
    "gain": 785,
    "difficulty": "상급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 8.3,
    "duration": "4시간 30분",
    "rating": 4.79,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Mount_Worak_Korea_242.jpg/1280px-Mount_Worak_Korea_242.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1095.3m] 산세가 험준하고 기암이 어우러져 예로부터 신령스런 산으로 여겨졌으며 송계 8경과 용하 9곡이 있고 국립공원으로 지정(1984년)된 점 등을 고려하여 선정, 신라말 마....",
    "fullDesc": "[산림청 100대 명산 선정이유] 산세가 험준하고 기암이 어우러져 예로부터 신령스런 산으로 여겨졌으며 송계 8경과 용하 9곡이 있고 국립공원으로 지정(1984년)된 점 등을 고려하여 선정, 신라말 마의태자와 덕주공주가 마주보고 망국의 한을 달래고 있다는 미륵사지의 석불입상, 덕주사의 마애불 및 덕주산성 등이 유명 월악산 국립공원은 충북 제천시 한수면과 덕산면의 경계를 이루는 산으로 백두대간이 이화령을 지나 조령산, 조령, 마패봉, 부봉, 월항삼봉, 하늘재, 포암산을 거쳐 대미산으로 이어지는 중간선 북쪽에 솟아있는 봉우리이다. 넓이 373㎢에 걸쳐 있는 월악산 능선은 백두대간보다 높고 무엇보다도 바위와 암릉으로 형성되어 있어 대간에 비해 능선이 훨씬 두드러져 있다. 제천시 한수면과 충주시 살미면의 경계를 이루는 지점에 자리한 월악수리봉은 일반인들에게는 생소한 이름이지만 알고보면 숨겨진 비경들이 많은 명산이다. 산행을 나선 후 곳곳에서 펼쳐지는 기암절벽의 변화무쌍함은 산악인들의 탄성을 자아낸다. 숨은 절경들은 둘러보며 정상에 오르면 어느새 월악수리봉에 대한 애정이 듬뿍 생겨 다시한번 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 310,
        "label": "미륵사 들머리"
      },
      {
        "km": 1.8,
        "alt": 561,
        "label": "덕주사"
      },
      {
        "km": 3.5,
        "alt": 844,
        "label": "덕주산성"
      },
      {
        "km": 4.6,
        "alt": 1095.3,
        "label": "정상"
      },
      {
        "km": 6.3,
        "alt": 663,
        "label": "백두대"
      },
      {
        "km": 8.3,
        "alt": 310,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "미륵사 들머리",
        "alt": 310,
        "dist": 0,
        "note": "충청북도 제천시 한수면 산행 기점"
      },
      {
        "name": "덕주사",
        "alt": 561,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "덕주산성",
        "alt": 844,
        "dist": 3.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "월악산 정상 (1095.3m)",
        "alt": 1095.3,
        "dist": 4.6,
        "note": "산림청 100대 명산 월악산 최고봉"
      },
      {
        "name": "백두대",
        "alt": 663,
        "dist": 6.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 6.9,
      "windSpeed": 5.6,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9B%94%EC%95%85%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424195&fileSn=1"
  },
  {
    "id": "forest_20000329",
    "forestId": "20000329",
    "isForest100": true,
    "top20Rank": null,
    "name": "비슬산",
    "subTitle": "대구 남쪽에 품 넓게 우뚝 솟은 산 (산림청 100대 명산)",
    "location": "대구광역시 달성군 옥포면ㆍ유가면ㆍ가창면, 경상북도 청도군 각북면",
    "altitude": 1083.4,
    "gain": 783,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 8.2,
    "duration": "4시간",
    "rating": 4.87,
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/da/Korea-Mount_Biseul-Azalea_Valley-01.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 1083.4m] 봄에는 진달래, 가을에는 억새 등 경관이 아름다우며, 조망이 좋고 군립공원으로 지정된 점 등을 고려하여 선정, 북쪽의 팔공산과 함께 대구분지를 형성하며 낙동강을 끼고 있음.",
    "fullDesc": "[산림청 100대 명산 선정이유] 봄에는 진달래, 가을에는 억새 등 경관이 아름다우며, 조망이 좋고 군립공원으로 지정된 점 등을 고려하여 선정, 북쪽의 팔공산과 함께 대구분지를 형성하며 낙동강을 끼고 있음. 고려말 공민왕 7년(1358년) 진보법사가 창건한 소재사(消災寺) 등이 유명 대구를 분지로 만드는 두 산은 팔공산과 비슬산이다. 화강암질의 팔공산이 산세가 웅장하여 아버지 산이라면 안산암질의 비슬산은 온화하고 부드러워 어머니 산이라 할 만하다. 비슬산은 우리나라에서 다섯 손가락에 꼽는 진달래 명산이다. 평탄한 정상부에 위치한 진달래 군락지는 봄이면 꽃바다를 이룬다. 진달래와 더불어 비슬산이 갖춘 명품은 바위다. 비슬산의 바위는 아름다울뿐만 아니라 신기하다. 절벽 밑에 부채꼴 모양으로 쌓인 돌무더기와 암괴류가 만들어내는 풍경은 과히 돌의 바다라 할 만하다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 300,
        "label": "진보법사 들머리"
      },
      {
        "km": 1.8,
        "alt": 551,
        "label": "소재사"
      },
      {
        "km": 3.4,
        "alt": 832,
        "label": "안산암"
      },
      {
        "km": 4.5,
        "alt": 1083.4,
        "label": "정상"
      },
      {
        "km": 6.2,
        "alt": 652,
        "label": "대건봉"
      },
      {
        "km": 8.2,
        "alt": 300,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "진보법사 들머리",
        "alt": 300,
        "dist": 0,
        "note": "대구광역시 달성군 옥포면ㆍ유가면ㆍ가창면 산행 기점"
      },
      {
        "name": "소재사",
        "alt": 551,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "안산암",
        "alt": 832,
        "dist": 3.4,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "비슬산 정상 (1083.4m)",
        "alt": 1083.4,
        "dist": 4.5,
        "note": "산림청 100대 명산 비슬산 최고봉"
      },
      {
        "name": "대건봉",
        "alt": 652,
        "dist": 6.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.0,
      "windSpeed": 5.6,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B9%84%EC%8A%AC%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423750&fileSn=1"
  },
  {
    "id": "forest_20000688",
    "forestId": "20000688",
    "isForest100": true,
    "top20Rank": null,
    "name": "황장산",
    "subTitle": "옛 대궐 지었던 황장목 주산지 (산림청 100대 명산)",
    "location": "경상북도 문경시 동로면",
    "altitude": 1078.9,
    "gain": 779,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "단풍",
      "종주 코스"
    ],
    "distance": 8.2,
    "duration": "4시간",
    "rating": 4.78,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423720&fileSn=1",
    "shortDesc": "[산림청 공식 1078.9m] 울창한 산림이 암벽과 어우러져 경관이 아름다우며 황장목이 유명하고 조선시대 봉산 표지석이 있는 등 경관 및 산림문화적 측면을 고려하여 선정, 동국여지승람, 대동지지,....",
    "fullDesc": "[산림청 100대 명산 선정이유] 울창한 산림이 암벽과 어우러져 경관이 아름다우며 황장목이 유명하고 조선시대 봉산 표지석이 있는 등 경관 및 산림문화적 측면을 고려하여 선정, 동국여지승람, 대동지지, 예천군 읍지 등에는 작성산으로 표기 백두대간의 한 뼈대를 이루며 높이 솟아있는 이 산은 이름이 여럿 있다. 황정산(黃庭山)이라고도 하고 작성산(鵲城山), 또는 황장봉산 등으로 표기되고 있으나 황장목이 많아 황장산으로 통칭되고 있다. 소나무의 한 종류인 황장목은 균열이 적고 단단해 임금의 관(棺)이나 대궐을 만드는데 많이 쓰인 귀한 나무이다. 이 때문에 조선조 숙종 때인 1680년에 이 산에서의 벌목과 개간을 금지하는 봉산(封山) 표석이 동로면 명전리 벌천계곡 하류에 세워졌다. 또 산 깊숙한 문안골 계곡에는 우람한 석문이 있는 작성산성이 있는데 축조방식으로 보아 고구려 시대 것으로 추정된다. 산 아래 금천에는 버들치 등 1급수 어류가 살고 있다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 300,
        "label": "조선시대 들머리"
      },
      {
        "km": 1.8,
        "alt": 549,
        "label": "백두대"
      },
      {
        "km": 3.4,
        "alt": 830,
        "label": "황장봉"
      },
      {
        "km": 4.5,
        "alt": 1078.9,
        "label": "정상"
      },
      {
        "km": 6.2,
        "alt": 651,
        "label": "벌천계곡"
      },
      {
        "km": 8.2,
        "alt": 300,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "조선시대 들머리",
        "alt": 300,
        "dist": 0,
        "note": "경상북도 문경시 동로면 산행 기점"
      },
      {
        "name": "백두대",
        "alt": 549,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "황장봉",
        "alt": 830,
        "dist": 3.4,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "황장산 정상 (1078.9m)",
        "alt": 1078.9,
        "dist": 4.5,
        "note": "산림청 100대 명산 황장산 최고봉"
      },
      {
        "name": "벌천계곡",
        "alt": 651,
        "dist": 6.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.0,
      "windSpeed": 5.6,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%99%A9%EC%9E%A5%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423720&fileSn=1"
  },
  {
    "id": "forest_20000149",
    "forestId": "20000149",
    "isForest100": true,
    "top20Rank": null,
    "name": "덕항산",
    "subTitle": "태고적 신비를 간직한 환선굴속으로 (산림청 100대 명산)",
    "location": "강원도 삼척시 신기면ㆍ태백시 하사미동",
    "altitude": 1072.9,
    "gain": 773,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "종주 코스"
    ],
    "distance": 8.1,
    "duration": "4시간 30분",
    "rating": 4.91,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423453&fileSn=1",
    "shortDesc": "[산림청 공식 1072.9m] 전형적인 경동지괴(傾動地塊) 지형으로 기암절벽과 초원이 어우러져 있으며 갈매굴, 제암풍혈, 양터목세굴, 덕발세굴, 큰재세굴 등 석회동굴이 많이 소재하고, 대이동굴 군....",
    "fullDesc": "[산림청 100대 명산 선정이유] 전형적인 경동지괴(傾動地塊) 지형으로 기암절벽과 초원이 어우러져 있으며 갈매굴, 제암풍혈, 양터목세굴, 덕발세굴, 큰재세굴 등 석회동굴이 많이 소재하고, 대이동굴 군립공원(1996년 지정) 구역내인 점 등을 고려하여 선정, 약 4∼5억년 전에 이루어진 길이 6.9㎞, 천장높이 30m에 이르는 동양최대의 동굴인 환선굴(幻仙窟 : 천연기념물 제178호)이 유명 어느 산객이 \"\"우리나라에서 그랜드캐년을 닮은 곳이 있다면 거기는 바로 덕항산 자암골\"\"이라고 설파했던 기경(奇景)의 산이다. 경동지괴(傾動地塊)의 표본을 이루는 곳으로 동쪽은 깎아지른 석회암 사면, 서쪽은 1000미터 전후의 고위평탄면을 이룬다. 석회암 사면에는 환선굴, 바람굴, 관음굴 같은 동굴들과 촛대봉, 사다리바위, 나한봉, 수리봉, 금강봉, 미륵봉 같은 기암들이 즐비하다. 골짜기는 거의 언제나 안개에 차있고 그 사이로 언뜻언뜻 험산과 기암이 드러나는 환상적인 풍경이다. 원래 이름은 덕메기[산]이었다. 삼척쪽에서 부르던 것으로 \"\"저 너머에 화전하기 좋은 더기(고원)가 있는 뫼\"\"라는 뜻이라고 한다. 그것이 덕목이로 변해 '목 항'자 덕항산으로 표기된 듯하다. 그 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 300,
        "label": "갈매굴 들머리"
      },
      {
        "km": 1.8,
        "alt": 547,
        "label": "양터목세굴"
      },
      {
        "km": 3.4,
        "alt": 826,
        "label": "덕발세굴"
      },
      {
        "km": 4.5,
        "alt": 1072.9,
        "label": "정상"
      },
      {
        "km": 6.2,
        "alt": 648,
        "label": "큰재세굴"
      },
      {
        "km": 8.1,
        "alt": 300,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "갈매굴 들머리",
        "alt": 300,
        "dist": 0,
        "note": "강원도 삼척시 신기면ㆍ태백시 하사미동 산행 기점"
      },
      {
        "name": "양터목세굴",
        "alt": 547,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "덕발세굴",
        "alt": 826,
        "dist": 3.4,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "덕항산 정상 (1072.9m)",
        "alt": 1072.9,
        "dist": 4.5,
        "note": "산림청 100대 명산 덕항산 최고봉"
      },
      {
        "name": "큰재세굴",
        "alt": 648,
        "dist": 6.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.0,
      "windSpeed": 5.6,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%8D%95%ED%95%AD%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423453&fileSn=1"
  },
  {
    "id": "forest_20000399",
    "forestId": "20000399",
    "isForest100": true,
    "top20Rank": null,
    "name": "속리산",
    "subTitle": "속세를 등진 이들의 회심처 (산림청 100대 명산)",
    "location": "경상북도 상주시 화북면, 충청북도 보은군 내속리면",
    "altitude": 1058.4,
    "gain": 758,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 8.1,
    "duration": "4시간 30분",
    "rating": 4.88,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Songnisan_as_seen_from_Cheonwangbong_%28cropped%29.jpg/1280px-Songnisan_as_seen_from_Cheonwangbong_%28cropped%29.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1058.4m] 예로부터 산세가 수려하여 제2금강 또는 소금강이라고도 불리울 정도로 경관이 아름답고 망개나무, 미선나무 등 1,000여 종이 넘는 동식물이 서식하고 있으며, 국립공원....",
    "fullDesc": "[산림청 100대 명산 선정이유] 예로부터 산세가 수려하여 제2금강 또는 소금강이라고도 불리울 정도로 경관이 아름답고 망개나무, 미선나무 등 1,000여 종이 넘는 동식물이 서식하고 있으며, 국립공원으로 지정(1970년)된 점 등을 고려하여 선정, 법주사(法住寺), 문장대, 천연기념물 제103호인 정이품송(正二品松) 및 천연기념물 제207호인 망개나무가 유명 속리산은 1970년 국립공원으로 지정된 대한팔경 중 하나다. 주봉인 천황봉(1058.4m)을 비롯해 비로봉, 길상봉, 문수봉 등 8봉과 입석대, 문장대, 신선대 같이 빼어난 자태를 자랑하며 우뚝 솟은 8대8석문이 활처럼 휘어져 자리하고 있다. 이러한 화강암의 기봉(奇峰)과 산 전체를 뒤덮은 울창한 산림은 천년고찰 법주사와 잘 조화되어 승경을 이룬다. 가파른 화북면 쪽에 비해 산자락이 너른 내속리면 쪽에는 법주사, 복천암, 중사자암, 상환암 같은 명승고적을 품고 있다. 첩첩 봉우리들 사이엔 은폭동계곡, 용유동계곡, 쌍룡폭포, 오송폭포 등이 있으며, 1016가지의 동식물이 서식하고 있는 자연자원의 보고이다. 천황봉은 조선 3대명수(삼파수, 달천수, 우통수)중 하나인 삼파수의 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 300,
        "label": "법주사 들머리"
      },
      {
        "km": 1.8,
        "alt": 543,
        "label": "문장대"
      },
      {
        "km": 3.4,
        "alt": 815,
        "label": "천황봉"
      },
      {
        "km": 4.5,
        "alt": 1058.4,
        "label": "정상"
      },
      {
        "km": 6.2,
        "alt": 641,
        "label": "비로봉"
      },
      {
        "km": 8.1,
        "alt": 300,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "법주사 들머리",
        "alt": 300,
        "dist": 0,
        "note": "경상북도 상주시 화북면 산행 기점"
      },
      {
        "name": "문장대",
        "alt": 543,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "천황봉",
        "alt": 815,
        "dist": 3.4,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "속리산 정상 (1058.4m)",
        "alt": 1058.4,
        "dist": 4.5,
        "note": "산림청 100대 명산 속리산 최고봉"
      },
      {
        "name": "비로봉",
        "alt": 641,
        "dist": 6.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.1,
      "windSpeed": 5.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%86%8D%EB%A6%AC%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424069&fileSn=1"
  },
  {
    "id": "forest_20000004",
    "forestId": "20000004",
    "isForest100": true,
    "top20Rank": null,
    "name": "가리산",
    "subTitle": "소양호에서 폭포 따라 정상까지 (산림청 100대 명산)",
    "location": "강원도 홍천군 두촌면·화촌면, 춘천시 북산면",
    "altitude": 1050.9,
    "gain": 761,
    "difficulty": "상급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 8.0,
    "duration": "4시간",
    "rating": 4.84,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424375&fileSn=1",
    "shortDesc": "[산림청 공식 1050.9m] 강원도에서 진달래가 가장 많이 피는 산으로 알려져 있고, 참나무 중심의 울창한 산림과 부드러운 산줄기 등 우리나라 산의 전형적인 모습을 갖추고 있으며, 홍천강의 발원....",
    "fullDesc": "[산림청 100대 명산 선정이유] 강원도에서 진달래가 가장 많이 피는 산으로 알려져 있고, 참나무 중심의 울창한 산림과 부드러운 산줄기 등 우리나라 산의 전형적인 모습을 갖추고 있으며, 홍천강의 발원지 및 소양강의 수원(水源)을 이루고 있는 점 등을 고려하여 선정암봉이 솟아있는 정상에서 소양호를 조망할 수 있고, 야생화가 많이 서식하여 자연학습관찰에도 좋은 여건을 갖추고 있음. \"98년 강원도에서 자연휴양림으로 지정. 강원도 춘천시와 홍천군의 경계를 이루는 산으로, 산 정상에 서면 탁 트인 시야와 발 아래로 펼쳐진 소양호의 풍경이 등산객들의 발걸음을 멈추게 하는 곳이다. 산자락을 감싸 흐르는 조그마한 폭포의 물소리가 사람들의 마음을 시원하게 해주는 가리산은 우거진 숲과 노송들이 어루러져 비경을 이루고 있다. 소양호 쪽으로 하산하여 물노리 선착장에서 유람선을 타고 소양댐 선착장까지 나올 수 있어, 산행도 하고 배를 타는 재미가 있다. 산이름인 가리는 '단으로 묶은 곡식이나 땔나무 따위를 차곡차곡 쌓아둔 큰 더미'를 뜻하는 순우리말로서, 산봉우리가 노적가리처럼 고깔 모양으로 생긴 데서 유래한다. 태백산맥 중 내지(內地) 산맥의 일부를 이룬다. 제1봉 남쪽에서 홍천강이 발원하여 북한강의 지류...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 290,
        "label": "선정암봉 들머리"
      },
      {
        "km": 1.8,
        "alt": 534,
        "label": "소양호"
      },
      {
        "km": 3.4,
        "alt": 807,
        "label": "전망대"
      },
      {
        "km": 4.4,
        "alt": 1050.9,
        "label": "정상"
      },
      {
        "km": 6.1,
        "alt": 632,
        "label": "향로봉"
      },
      {
        "km": 8.0,
        "alt": 290,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "선정암봉 들머리",
        "alt": 290,
        "dist": 0,
        "note": "강원도 홍천군 두촌면·화촌면 산행 기점"
      },
      {
        "name": "소양호",
        "alt": 534,
        "dist": 1.8,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "전망대",
        "alt": 807,
        "dist": 3.4,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "가리산 정상 (1050.9m)",
        "alt": 1050.9,
        "dist": 4.4,
        "note": "산림청 100대 명산 가리산 최고봉"
      },
      {
        "name": "향로봉",
        "alt": 632,
        "dist": 6.1,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.2,
      "windSpeed": 5.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B0%80%EB%A6%AC%EC%82%B0_%28%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424375&fileSn=1"
  },
  {
    "id": "forest_20000548",
    "forestId": "20000548",
    "isForest100": true,
    "top20Rank": null,
    "name": "적상산",
    "subTitle": "단풍이 아름다운 산 (산림청 100대 명산)",
    "location": "전라북도 무주군 적상면",
    "altitude": 1030.6,
    "gain": 741,
    "difficulty": "상급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 7.9,
    "duration": "4시간 30분",
    "rating": 4.76,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/MJ-JS-JSG14.jpg/1280px-MJ-JS-JSG14.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 1030.6m] 가을에 마치 온 산이 빨간 치마를 입은 여인네의 모습과 같다 하여 이름이 붙여질 정도로 경관이 뛰어나며 덕유산 국립공원구역인 점 등을 고려하여 선정, 고려 공민왕 2....",
    "fullDesc": "[산림청 100대 명산 선정이유] 가을에 마치 온 산이 빨간 치마를 입은 여인네의 모습과 같다 하여 이름이 붙여질 정도로 경관이 뛰어나며 덕유산 국립공원구역인 점 등을 고려하여 선정, 고려 공민왕 23년(1374) 최영 장군이 탐라를 토벌한 후 귀경길에 이 곳을 지나다가 산의 형세가 요새로서 적지임을 알고 왕에게 건의하여 축성된 적상산성(사적 제146호)과 안국사 등이 유명 천미터가 넘는, 낮지 않은 산 정상 일대가 평평한 특이지형이다. 서쪽 사면은 또 붉은 화강암 절벽이 띠를 둘러 예나 오늘이나 사람들의 관심을 끌어왔다. 옛날에는 거기 산성을 쌓고 왕조실록을 두었으며 오늘은 양수발전소 윗저수지를 만들어 원자력발전소 하나 만큼의 전기를 생산한다(사실은 그 하나가 멈췄을 경우를 대비한 예비용이다). 상봉 기봉과 북쪽의 향로봉이 밋밋하게 이어져 봉만미는 없다. 장군바위, 장도바위 등의 기암에다 천일폭포, 송대폭포가 있지만 계류미로 연결되지는 않는다. 산 위의 절 안국사는 또 저수지를 만들면서 자리를 옮겨 볼만한 구석이 없다. 윗저수지가 있는 까닭에 정상부까지 포장도로는 잘 나있다. 그래 거기까지 차를 타고 올라가 덕유산 바라보기는 좋다. 가을 단...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 290,
        "label": "적상산성 들머리"
      },
      {
        "km": 1.7,
        "alt": 527,
        "label": "안국사"
      },
      {
        "km": 3.3,
        "alt": 794,
        "label": "붉은화강암"
      },
      {
        "km": 4.3,
        "alt": 1030.6,
        "label": "정상"
      },
      {
        "km": 6.0,
        "alt": 623,
        "label": "전망대"
      },
      {
        "km": 7.9,
        "alt": 290,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "적상산성 들머리",
        "alt": 290,
        "dist": 0,
        "note": "전라북도 무주군 적상면 산행 기점"
      },
      {
        "name": "안국사",
        "alt": 527,
        "dist": 1.7,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "붉은화강암",
        "alt": 794,
        "dist": 3.3,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "적상산 정상 (1030.6m)",
        "alt": 1030.6,
        "dist": 4.3,
        "note": "산림청 100대 명산 적상산 최고봉"
      },
      {
        "name": "전망대",
        "alt": 623,
        "dist": 6.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.3,
      "windSpeed": 5.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%A0%81%EC%83%81%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423867&fileSn=1"
  },
  {
    "id": "forest_20000803",
    "forestId": "20000803",
    "isForest100": true,
    "top20Rank": null,
    "name": "태화산",
    "subTitle": "태화산성에서 영월읍을 두루 굽어보니 (산림청 100대 명산)",
    "location": "강원도 영월군 영월읍, 충청북도 단양군 영춘면",
    "altitude": 1027.5,
    "gain": 738,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 7.9,
    "duration": "4시간 30분",
    "rating": 4.78,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423525&fileSn=1",
    "shortDesc": "[산림청 공식 1027.5m] 경관이 아름답고 고구려 시대에 쌓았던 토성인 태화산성 등 역사적 유적이 있고, 고씨동굴(高氏洞窟 : 천연기념물 제219호) 등이 소재하고 있는 점 등을 고려하여 선정.",
    "fullDesc": "[산림청 100대 명산 선정이유] 경관이 아름답고 고구려 시대에 쌓았던 토성인 태화산성 등 역사적 유적이 있고, 고씨동굴(高氏洞窟 : 천연기념물 제219호) 등이 소재하고 있는 점 등을 고려하여 선정 신증동국여지승람에 대화산이라 지칭한 태화산은 강원 영월군 영월읍 남쪽에 자리해 있다. 정상에서 북서쪽으로 뻗은 능선 끝에는 남한강이 굽이쳐 흐르고 정상으로 향하는 길에 영월읍을 두루 굽어볼 수 있는 태화산성터가 남아 있다. 고구려 시대에 쌓았던 토성, 태화산성에서는 간혹 당시의 기와 파편이 발견되기도 한다. 태화산 정상에서는 멀리 남으로 소백산과 백두대간 줄기가 조망된다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 290,
        "label": "태화산성 들머리"
      },
      {
        "km": 1.7,
        "alt": 526,
        "label": "고씨동굴"
      },
      {
        "km": 3.3,
        "alt": 792,
        "label": "백두대"
      },
      {
        "km": 4.3,
        "alt": 1027.5,
        "label": "정상"
      },
      {
        "km": 6.0,
        "alt": 622,
        "label": "하산 능선 갈림"
      },
      {
        "km": 7.9,
        "alt": 290,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "태화산성 들머리",
        "alt": 290,
        "dist": 0,
        "note": "강원도 영월군 영월읍 산행 기점"
      },
      {
        "name": "고씨동굴",
        "alt": 526,
        "dist": 1.7,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "백두대",
        "alt": 792,
        "dist": 3.3,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "태화산 정상 (1027.5m)",
        "alt": 1027.5,
        "dist": 4.3,
        "note": "산림청 100대 명산 태화산 최고봉"
      },
      {
        "name": "하산 능선 갈림길",
        "alt": 622,
        "dist": 6.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.3,
      "windSpeed": 5.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%83%9C%ED%99%94%EC%82%B0_%28%EA%B0%95%EC%9B%90/%EC%B6%A9%EB%B6%81%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423525&fileSn=1"
  },
  {
    "id": "forest_20000091",
    "forestId": "20000091",
    "isForest100": true,
    "top20Rank": null,
    "name": "금수산",
    "subTitle": "눈 시린 가을 비단산 (산림청 100대 명산)",
    "location": "충청북도 제천시 수산면ㆍ단양군 적성면",
    "altitude": 1015.8,
    "gain": 736,
    "difficulty": "상급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "일출 명소"
    ],
    "distance": 7.8,
    "duration": "4시간",
    "rating": 4.79,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424368&fileSn=1",
    "shortDesc": "[산림청 공식 1015.8m] 월악산국립공원 북단에 위치하고 울창한 소나무 숲과 맑고 깨끗한 계류 등 경관이 뛰어난 점을 고려하여 선정, 봄철의 철쭉과 가을철의 단풍이 특히 유명하고 능강계곡과 얼....",
    "fullDesc": "[산림청 100대 명산 선정이유] 월악산국립공원 북단에 위치하고 울창한 소나무 숲과 맑고 깨끗한 계류 등 경관이 뛰어난 점을 고려하여 선정, 봄철의 철쭉과 가을철의 단풍이 특히 유명하고 능강계곡과 얼음골이 있음. 정상에서 소백산의 웅장한 산줄기와 충주호를 조망할 수 있음 금수산(1015.8m)은 산세가 수려하고, 골이 깊고 기암절벽이 절경을 이뤄 사철 등산인들의 발길이 이어지는 곳이다. 비단폭을 깔아놓은 듯한 녹음 속에 계곡의 맑은 물소리, 물확에 떨어지는 폭포소리, 꽃, 녹음, 단풍, 설경 등 어느 한계절도 빼놓지 않고 아름다움을 자랑한다. 금수산은 본디 백운산이었다. 단양군수를 지낸 퇴계 이황이 '비단에 수 놓은 것처럼 아름답다'며 감탄, 금수산이라고 했다고 한다. 청풍호반을 끼고 있는 금수산은 북쪽으로는 제천시내까지, 남쪽으로는 단양 말목산까지 뻗어내린 제법 긴 산줄기다. 주능선에는 작성산, 동산, 말목산 등 해발 700~800미터 산들이 여럿이다. 중간마다 서쪽으로 뻗은 지릉에는 중봉, 신선봉, 저승봉, 망덕봉 등 수려한 산들을 거...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 280,
        "label": "능강계곡 들머리"
      },
      {
        "km": 1.7,
        "alt": 516,
        "label": "충주호"
      },
      {
        "km": 3.3,
        "alt": 780,
        "label": "청풍호"
      },
      {
        "km": 4.3,
        "alt": 1015.8,
        "label": "정상"
      },
      {
        "km": 5.9,
        "alt": 611,
        "label": "신선봉"
      },
      {
        "km": 7.8,
        "alt": 280,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "능강계곡 들머리",
        "alt": 280,
        "dist": 0,
        "note": "충청북도 제천시 수산면ㆍ단양군 적성면 산행 기점"
      },
      {
        "name": "충주호",
        "alt": 516,
        "dist": 1.7,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "청풍호",
        "alt": 780,
        "dist": 3.3,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "금수산 정상 (1015.8m)",
        "alt": 1015.8,
        "dist": 4.3,
        "note": "산림청 100대 명산 금수산 최고봉"
      },
      {
        "name": "신선봉",
        "alt": 611,
        "dist": 5.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.4,
      "windSpeed": 5.4,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B8%88%EC%88%98%EC%82%B0_%28%EC%B6%A9%EB%B6%81%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424368&fileSn=1"
  },
  {
    "id": "forest_20000522",
    "forestId": "20000522",
    "isForest100": true,
    "top20Rank": null,
    "name": "응봉산",
    "subTitle": "헤아릴수 없는 계곡 줄줄이 이어져 (산림청 100대 명산)",
    "location": "강원도 삼척시 가곡면ㆍ원덕읍, 경상북도 울진군 북면",
    "altitude": 999.7,
    "gain": 720,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "단풍",
      "일출 명소"
    ],
    "distance": 7.7,
    "duration": "4시간 30분",
    "rating": 4.96,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000020028023&fileSn=1",
    "shortDesc": "[산림청 공식 999.7m] 아름다운 여러 계곡들을 끼고 있어 계곡탐험코스로 적합하며, 산림이 울창하고 천연노천온천인 덕구온천과 용소골의 폭포와 소가 많은 등 경관이 아름다운 점을 고려하여 선정....",
    "fullDesc": "[산림청 100대 명산 선정이유] 아름다운 여러 계곡들을 끼고 있어 계곡탐험코스로 적합하며, 산림이 울창하고 천연노천온천인 덕구온천과 용소골의 폭포와 소가 많은 등 경관이 아름다운 점을 고려하여 선정, 울진조씨가 매사냥을 하다가 잃어버린 매를 이 산에서 찾고는 산 이름을 응봉이라 한 뒤 근처에 부모의 묘자리를 쓰자 집안이 번성하였다는 전설이 전해지고 있음. 정상에서 멀리 백암산, 통고산, 함백산, 태백산을 조망할 수 있는 곳으로 유명 응봉산은 강원도 삼척군과 경북 울진군의 경계를 이루며 산 주변에 전인미답의 여러 계곡들을 끼고 계곡탐험코스로 적합한 산이다. 응봉산을 중심으로 북쪽의 기곡천과 재랑박골, 서쪽의 용소골, 문지골, 갱이골, 보리골 등이 있으며 남쪽 울진군내에 대광천과 동해안쪽 폭포골, 성우골등이 즐비하게 들어서 있다. 호산에서 버스종점을 지나 1km쯤 들어서면 폐광터가 나오는데 여기서 조금 더 올라가면 연이어진 2개의 폭포가 힘차게 흐른다. 조금 더 올라가면 오른쪽 깊은 계곡 아래로 헤아릴 수 없는 폭포지대를 만날 수 있다. 금강산의 축소판을 연상케 하는 이곳은 3단까지는 시야에 들어오나 그 아래로는 워낙 협곡이어서 몇단까지 폭포가 꺽어져 내리는지 셀 수 없을 정도다. 용소골을 탐험할 경우에...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 280,
        "label": "폭포지대 들머리"
      },
      {
        "km": 1.7,
        "alt": 510,
        "label": "위험지대"
      },
      {
        "km": 3.2,
        "alt": 770,
        "label": "주능선 전망대"
      },
      {
        "km": 4.2,
        "alt": 999.7,
        "label": "정상"
      },
      {
        "km": 5.9,
        "alt": 604,
        "label": "하산 능선 갈림"
      },
      {
        "km": 7.7,
        "alt": 280,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "폭포지대 들머리",
        "alt": 280,
        "dist": 0,
        "note": "강원도 삼척시 가곡면ㆍ원덕읍 산행 기점"
      },
      {
        "name": "위험지대",
        "alt": 510,
        "dist": 1.7,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "주능선 전망대",
        "alt": 770,
        "dist": 3.2,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "응봉산 정상 (999.7m)",
        "alt": 999.7,
        "dist": 4.2,
        "note": "산림청 100대 명산 응봉산 최고봉"
      },
      {
        "name": "하산 능선 갈림길",
        "alt": 604,
        "dist": 5.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.5,
      "windSpeed": 5.4,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9D%91%EB%B4%89%EC%82%B0_%28%EA%B2%BD%EB%B6%81/%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000020028023&fileSn=1"
  },
  {
    "id": "forest_20000699",
    "forestId": "20000699",
    "isForest100": true,
    "top20Rank": null,
    "name": "희양산",
    "subTitle": "설악산 울산바위에 필적할 거대한 바위산 (산림청 100대 명산)",
    "location": "경상북도 문경시 가은읍, 충청북도 괴산군 연풍면,",
    "altitude": 996.4,
    "gain": 716,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 7.7,
    "duration": "4시간 30분",
    "rating": 4.89,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424015&fileSn=1",
    "shortDesc": "[산림청 공식 996.4m] 산 전체가 하나의 바위처럼 보이고 바위 낭떠러지들이 하얗게 드러나 있어 주변의 산에서뿐만 아니라 먼 산에서도 쉽게 알아볼 수 있으며 기암괴석과 풍부한 수량이 어우러진....",
    "fullDesc": "[산림청 100대 명산 선정이유] 산 전체가 하나의 바위처럼 보이고 바위 낭떠러지들이 하얗게 드러나 있어 주변의 산에서뿐만 아니라 먼 산에서도 쉽게 알아볼 수 있으며 기암괴석과 풍부한 수량이 어우러진 백운곡 등 경관이 수려하고 마애본좌상 등 역사유적이 있는 점 등을 고려하여 선정 희양산(999m)은 경북 문경시 가은읍과 충북 괴산군 연풍면의 경계를 이루며 백두대간에 우뚝 솟은 신령스런 암봉이다. 인근의 조령산(1026m)이나 백화산(1064m)보다 낮으나 빼어나기로 보자면 단연 으뜸이다. 희양산 봉암사 개산조인 신라시대의 승려 지증대사(824~884년)는 \"\"산은 사방에 병풍처럼 둘러쳐져 있으니 마치 봉황의 날개가 구름을 치며 올라가는 듯하고, 계곡물은 백겹으로 띠처럼 되어있으니 용의 허리가 돌에 엎드려 있는 듯하다\"\"고 희양산 자태를 칭송했다고 전한다. 정상에서 조망은 장쾌하고 아름답다. 발 아래로 봉암사와 봉암용곡이 보이고, 그 너머로 대야산과 속리산 줄기가 날카롭게 솟아있다. 서쪽으로는 장성봉, 악희봉, 군자산 등 충북 내륙의 산들이 병풍처럼...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 280,
        "label": "백두대 들머리"
      },
      {
        "km": 1.7,
        "alt": 509,
        "label": "봉암사"
      },
      {
        "km": 3.2,
        "alt": 767,
        "label": "신라시대"
      },
      {
        "km": 4.2,
        "alt": 996.4,
        "label": "정상"
      },
      {
        "km": 5.9,
        "alt": 602,
        "label": "지증대사"
      },
      {
        "km": 7.7,
        "alt": 280,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "백두대 들머리",
        "alt": 280,
        "dist": 0,
        "note": "경상북도 문경시 가은읍 산행 기점"
      },
      {
        "name": "봉암사",
        "alt": 509,
        "dist": 1.7,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "신라시대",
        "alt": 767,
        "dist": 3.2,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "희양산 정상 (996.4m)",
        "alt": 996.4,
        "dist": 4.2,
        "note": "산림청 100대 명산 희양산 최고봉"
      },
      {
        "name": "지증대사",
        "alt": 602,
        "dist": 5.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.5,
      "windSpeed": 5.4,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%9D%AC%EC%96%91%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424015&fileSn=1"
  },
  {
    "id": "forest_20000389",
    "forestId": "20000389",
    "isForest100": true,
    "top20Rank": null,
    "name": "성인봉",
    "subTitle": "풍랑을 이겨낸 겨레의 기상 (산림청 100대 명산)",
    "location": "경상북도 울릉군 울릉읍 서면ㆍ북면",
    "altitude": 986.5,
    "gain": 706,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "일출 명소"
    ],
    "distance": 7.6,
    "duration": "4시간",
    "rating": 4.78,
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Ulleung_island_from_above.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 986.5m] 휴화산인 울릉도의 최고봉으로서 울릉도 모든 하천의 수원을 이루고, 식생이 특이한 원시림이 잘 보전되어 있는 점 등을 감안하여 선정, 울릉도에서는 유일하게 평지를 이룬....",
    "fullDesc": "[산림청 100대 명산 선정이유] 휴화산인 울릉도의 최고봉으로서 울릉도 모든 하천의 수원을 이루고, 식생이 특이한 원시림이 잘 보전되어 있는 점 등을 감안하여 선정, 울릉도에서는 유일하게 평지를 이룬 나리분지(羅里盆地)와 천연기념물 제189호로 지정(1967년)된 원시림에 유명. 나리동의 울릉국화 섬백리향의 군락은 천연기념물 제52호(1962년)로 지정되어 있음 면적 72평방 킬로미터에 둘레가 44.12킬로미터인 울릉도는 포항에서 뱃길로 188킬로미터 떨어진 섬으로 독도를 포함해서 본토에서 가장 멀리 있는 섬이다. 섬 주변은 대부분 화산암의 해안절벽으로 되어 있는데 바로 이 섬 중심부에 성인봉이 자리해 있다. 작은 땅, 울릉도 위에 하나의 봉우리가 솟아 있으니 성인봉이 곧 울릉도인 셈이다. 울릉도는 오래전부터 왕조들의 정책에 의해 백성들을 살 수 없게 하였던 곳이나 백성들이 몰래 숨어 들어 끝끝내 우리 땅으로 지켜낸 우리 민족의 기상이라고 할 수 있다. 울릉도에 관한 기록은 신라시대로 거슬러 올라간다. 〈삼국사기〉와 〈삼국유사〉에 신라 22대 지증왕 때 울릉도에 관한 기록이 있다. 〈삼국사기〉에는 지증왕 13년에 우산국(于山國)이...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 280,
        "label": "화산암 들머리"
      },
      {
        "km": 1.7,
        "alt": 506,
        "label": "신라시대"
      },
      {
        "km": 3.2,
        "alt": 760,
        "label": "삼국사"
      },
      {
        "km": 4.2,
        "alt": 986.5,
        "label": "정상"
      },
      {
        "km": 5.8,
        "alt": 598,
        "label": "삼국유사"
      },
      {
        "km": 7.6,
        "alt": 280,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "화산암 들머리",
        "alt": 280,
        "dist": 0,
        "note": "경상북도 울릉군 울릉읍 서면ㆍ북면 산행 기점"
      },
      {
        "name": "신라시대",
        "alt": 506,
        "dist": 1.7,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "삼국사",
        "alt": 760,
        "dist": 3.2,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "성인봉 정상 (986.5m)",
        "alt": 986.5,
        "dist": 4.2,
        "note": "산림청 100대 명산 성인봉 최고봉"
      },
      {
        "name": "삼국유사",
        "alt": 598,
        "dist": 5.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.6,
      "windSpeed": 5.4,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%84%B1%EC%9D%B8%EB%B4%89",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424234&fileSn=1"
  },
  {
    "id": "forest_20000092",
    "forestId": "20000092",
    "isForest100": true,
    "top20Rank": null,
    "name": "금오산",
    "subTitle": "마애보살입상이 지키는 남숭산 (산림청 100대 명산)",
    "location": "경상북도 구미시, 칠곡군 북삼읍, 김천시 남면",
    "altitude": 976.5,
    "gain": 706,
    "difficulty": "상급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행"
    ],
    "distance": 7.6,
    "duration": "4시간",
    "rating": 4.8,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Geumomtcablecar.jpg/1280px-Geumomtcablecar.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 976.5m] 기암절벽과 울창한 산림이 조화되어 경관이 수려하며, 문화유산이 많고 도립공원으로 지정(1970년)된 점 등을 고려하여 선정, 높이 38m의 명금폭포가 있으며, 정상부....",
    "fullDesc": "[산림청 100대 명산 선정이유] 기암절벽과 울창한 산림이 조화되어 경관이 수려하며, 문화유산이 많고 도립공원으로 지정(1970년)된 점 등을 고려하여 선정, 높이 38m의 명금폭포가 있으며, 정상부근에는 자연암벽을 이용해 축성한 길이 2㎞의 금오산성이 있음. 해운사, 약사암 등의 고찰과 금오산마애보살입상(보물 제490호), 선봉사대각국사비(보물 제251호), 석조석가여래좌상(보물 제245호) 등이 유명 금오산은 신화다. 태양 속에 산다는 세 발 달린 까마귀가 금빛 날개를 펼친 모습이다. 때는 석양이었으리라. 본 자리는 동쪽이었을 거고. 이름지은 사람은 고구려인이었을 터. 그렇다면 그는 분명 낙동강 건너 도리사의 아도였을 것이다. 신화가 입혀진 산은 그에 걸맞는 풍모를 지녔다. 하늘 장막을 쳐들고 솟아오른 봉만의 무쌍함이 있고 바윗골 안통 범접 못하게 폭포를 배치했다. 2.5km의 골짜기 물이 대혜담에 머무르다 명금폭포로 떨어지게 만들었다. 이걸 활용해 사람들은 또 성을 쌓았으니… 빼어난 자연과 인위가 어우러진 최초의 도립공원이다. 상봉 현월봉과 그 옆의 약사봉(958m), 용비늘바위라고 하는 보봉(933m)이 900미터를 웃돈다. 남문 옆에는 남봉(873m)이, 현월봉 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 270,
        "label": "명금폭포 들머리"
      },
      {
        "km": 1.7,
        "alt": 496,
        "label": "자연암"
      },
      {
        "km": 3.2,
        "alt": 750,
        "label": "금오산성"
      },
      {
        "km": 4.2,
        "alt": 976.5,
        "label": "정상"
      },
      {
        "km": 5.8,
        "alt": 588,
        "label": "해운사"
      },
      {
        "km": 7.6,
        "alt": 270,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "명금폭포 들머리",
        "alt": 270,
        "dist": 0,
        "note": "경상북도 구미시 산행 기점"
      },
      {
        "name": "자연암",
        "alt": 496,
        "dist": 1.7,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "금오산성",
        "alt": 750,
        "dist": 3.2,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "금오산 정상 (976.5m)",
        "alt": 976.5,
        "dist": 4.2,
        "note": "산림청 100대 명산 금오산 최고봉"
      },
      {
        "name": "해운사",
        "alt": 588,
        "dist": 5.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.7,
      "windSpeed": 5.3,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B8%88%EC%98%A4%EC%82%B0_%28%EA%B2%BD%EB%B6%81%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424516&fileSn=1"
  },
  {
    "id": "forest_20000152",
    "forestId": "20000152",
    "isForest100": true,
    "top20Rank": null,
    "name": "도락산",
    "subTitle": "도를 깨닫고 스스로 즐길만한 산 (산림청 100대 명산)",
    "location": "충청북도 단양군 단성면, 대강면",
    "altitude": 965.3,
    "gain": 695,
    "difficulty": "상급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행"
    ],
    "distance": 7.5,
    "duration": "4시간 30분",
    "rating": 4.94,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424521&fileSn=1",
    "shortDesc": "[산림청 공식 965.3m] 소백산과 월악산 중간에 위치하며, 단양8경인 하선암, 중선암과 사인암 등이 산재해 있는 바위산으로 경관이 수려한 점 등을 고려하여 선정, 남한강 지류인 단양천 10여....",
    "fullDesc": "[산림청 100대 명산 선정이유] 소백산과 월악산 중간에 위치하며, 단양8경인 하선암, 중선암과 사인암 등이 산재해 있는 바위산으로 경관이 수려한 점 등을 고려하여 선정, 남한강 지류인 단양천 10여km 구간에 있는 하선암(下仙岩)과 쌍룡폭포,옥렴대,명경대 등 웅장한 바위가 있는 중선암(中仙岩), 경천벽, 와룡암, 일사대, 명경담 등이 있는 상선암(上仙岩)이 특히 유명 도락산(965.3m)은 월악산국립공원 끄트머리, 소백산국립공원과 이웃한 곳에 있다. '깨달음을 얻는 데는 나름대로 길이 있어야 하고 거기에는 또한 즐거움이 뒤따라야 한다'라는 뜻에서 우암 송시열이 산이름을 지었다고 전한다. 정상은 단양군 단성면과 대강면의 경계이다. 산세가 월악산과 비슷하여 곳곳에 암봉이 솟아있고 사방으로 뻗어나간 능선마루는 마치 성벽을 쌓은 것처럼 암릉이 이어져 장관이다. 특히 정상에서 북동쪽으로 이어진 능선에는 신선봉, 채운봉, 검봉 등의 암봉이 줄지어 있어 경관이 좋고, 암릉을 오르내리는 재미 또한 각별하다. 다만 초보자들에게는 도락산 암릉길이 결코 만만치 않다. 산행경험이 풍부한 안내자와 함께 가는 것이 좋으며 눈이 올 경우엔 각별히 주의해야 한다....",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 270,
        "label": "하선암 들머리"
      },
      {
        "km": 1.6,
        "alt": 492,
        "label": "중선암"
      },
      {
        "km": 3.1,
        "alt": 743,
        "label": "사인암"
      },
      {
        "km": 4.1,
        "alt": 965.3,
        "label": "정상"
      },
      {
        "km": 5.7,
        "alt": 583,
        "label": "쌍룡폭포"
      },
      {
        "km": 7.5,
        "alt": 270,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "하선암 들머리",
        "alt": 270,
        "dist": 0,
        "note": "충청북도 단양군 단성면 산행 기점"
      },
      {
        "name": "중선암",
        "alt": 492,
        "dist": 1.6,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "사인암",
        "alt": 743,
        "dist": 3.1,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "도락산 정상 (965.3m)",
        "alt": 965.3,
        "dist": 4.1,
        "note": "산림청 100대 명산 도락산 최고봉"
      },
      {
        "name": "쌍룡폭포",
        "alt": 583,
        "dist": 5.7,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.7,
      "windSpeed": 5.3,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%8F%84%EB%9D%BD%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424521&fileSn=1"
  },
  {
    "id": "forest_20000493",
    "forestId": "20000493",
    "isForest100": true,
    "top20Rank": null,
    "name": "운악산",
    "subTitle": "구름을 뚫고 솟은 경기의 소금강 (산림청 100대 명산)",
    "location": "경기도 가평군 하면, 포천시 화현면",
    "altitude": 934.7,
    "gain": 675,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 7.3,
    "duration": "4시간 30분",
    "rating": 4.9,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423574&fileSn=1",
    "shortDesc": "[산림청 공식 934.7m] 주봉인 망경대를 둘러싼 경관이 경기 소금강이라고 불리울 만큼 뛰어난 점 등을 고려하여 선정, 천년고찰인 현등사 및 백년폭포, 오랑캐소, 눈썹바위, 코끼리바위, 망경대....",
    "fullDesc": "[산림청 100대 명산 선정이유] 주봉인 망경대를 둘러싼 경관이 경기 소금강이라고 불리울 만큼 뛰어난 점 등을 고려하여 선정, 천년고찰인 현등사 및 백년폭포, 오랑캐소, 눈썹바위, 코끼리바위, 망경대, 무우폭포, 큰골내치기암벽, 노채애기소 등 운악8경이 유명 경기5악의 하나인 운악산은 이름에 드러나 있듯 바위가 많은 명산이다. 산봉과 능선이 정상으로 수렴하는 산의 구도도 좋고 바위와 가을 단풍이 어우러진 모양도 아름답다. 그래서 '경기의 금강'으로 불린다. 동쪽 기슭에는 보조국사 지눌의 사리탑이 있는 현등사가 자리했다. 서쪽에는 수직의 소꼬리폭포, 30m 길이의 무지개폭포가 있어 빙벽등반을 즐기는 산악인들이 즐겨 찾는다. 한북정맥의 마지막 900m급으로 이 서남쪽으로는 기껏해야 600m급의 죽엽산, 계명산이 있을 뿐이다(산경표가 아니라 대동여지도를 따를 경우다). 아래쪽 경기도에도 이만한 산이 없다. 수계(水系)는 동쪽이 청평 안전유원지를 이루다 북한강으로 흘러드는 조종천, 서쪽은 포천천의 지류 명덕천이다. 따라서 조종천 유역...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 260,
        "label": "망경대 들머리"
      },
      {
        "km": 1.6,
        "alt": 476,
        "label": "현등사"
      },
      {
        "km": 3.1,
        "alt": 719,
        "label": "백년폭포"
      },
      {
        "km": 4.0,
        "alt": 934.7,
        "label": "정상"
      },
      {
        "km": 5.5,
        "alt": 564,
        "label": "눈썹바위"
      },
      {
        "km": 7.3,
        "alt": 260,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "망경대 들머리",
        "alt": 260,
        "dist": 0,
        "note": "경기도 가평군 하면 산행 기점"
      },
      {
        "name": "현등사",
        "alt": 476,
        "dist": 1.6,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "백년폭포",
        "alt": 719,
        "dist": 3.1,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "운악산 정상 (934.7m)",
        "alt": 934.7,
        "dist": 4.0,
        "note": "산림청 100대 명산 운악산 최고봉"
      },
      {
        "name": "눈썹바위",
        "alt": 564,
        "dist": 5.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.9,
      "windSpeed": 5.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9A%B4%EC%95%85%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423574&fileSn=1"
  },
  {
    "id": "forest_20000138",
    "forestId": "20000138",
    "isForest100": true,
    "top20Rank": null,
    "name": "대야산",
    "subTitle": "신선 노닐던 영험한 산 (일명 대하산) (산림청 100대 명산)",
    "location": "경상북도 문경시 가은읍, 충청북도 괴산군 청천면",
    "altitude": 931,
    "gain": 671,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 7.3,
    "duration": "4시간 30분",
    "rating": 4.8,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424372&fileSn=1",
    "shortDesc": "[산림청 공식 931m] 기암괴석과 폭포·소(沼)가 어우러져 수려한 경관을 이루고 있으며, 속리산 국립공원구역에 포함되어 있는 점 등을 감안하여 선정, 용추폭포와 촛대바위가 있는 선유동계곡 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 기암괴석과 폭포·소(沼)가 어우러져 수려한 경관을 이루고 있으며, 속리산 국립공원구역에 포함되어 있는 점 등을 감안하여 선정, 용추폭포와 촛대바위가 있는 선유동계곡 및 `월영대\"가 유명 백화산과 희양산을 지나 속리산 사이에 솟은 대야산은 속리산국립공원내에 포함되며, 백두대간 상의 산으로 경북과 충북 양쪽에 내외 선유동을 두고 있을 정도로 계곡이 특히 유명하다. 대야산 자락에서 흘러내린 물은 용추계곡을 형성, 문경 8경의 하나가 된다. 용추골은 대야산과 이웃한 둔덕산에서 흘러내린 물과 합류하여 넓은 암반이 아름다운 선유동 계곡을 빚어 놓았다. 특히 깎아지른 암봉과 기암괴석이 산세를 더욱 아름답게 한다. 문경 8경중의 하나인 용추의 모습은 대야산 제일의 명소로 친다. 거대한 화강암반을 뚫고 쏟아지는 폭포 아래에 하트형으로 패인 소(沼)가 매끈한 암반을 타고 흘러내리면서 여러개의 소를 만들어 놨다. 또한 달 뜨는 밤이면, 바위와 계곡에 달빛이 비친다 해서 월영...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 260,
        "label": "용추폭포 들머리"
      },
      {
        "km": 1.6,
        "alt": 475,
        "label": "촛대바위"
      },
      {
        "km": 3.1,
        "alt": 716,
        "label": "선유동계곡"
      },
      {
        "km": 4.0,
        "alt": 931,
        "label": "정상"
      },
      {
        "km": 5.5,
        "alt": 562,
        "label": "월영대"
      },
      {
        "km": 7.3,
        "alt": 260,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "용추폭포 들머리",
        "alt": 260,
        "dist": 0,
        "note": "경상북도 문경시 가은읍 산행 기점"
      },
      {
        "name": "촛대바위",
        "alt": 475,
        "dist": 1.6,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "선유동계곡",
        "alt": 716,
        "dist": 3.1,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "대야산 정상 (931m)",
        "alt": 931,
        "dist": 4.0,
        "note": "산림청 100대 명산 대야산 최고봉"
      },
      {
        "name": "월영대",
        "alt": 562,
        "dist": 5.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 7.9,
      "windSpeed": 5.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%8C%80%EC%95%BC%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424372&fileSn=1"
  },
  {
    "id": "forest_20000217",
    "forestId": "20000217",
    "isForest100": true,
    "top20Rank": null,
    "name": "명성산",
    "subTitle": "마의태자를 따라 울었던 울음산 (산림청 100대 명산)",
    "location": "강원도 철원군 갈말읍, 경기도 포천시 영북면ㆍ이동면",
    "altitude": 922,
    "gain": 662,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 7.2,
    "duration": "4시간",
    "rating": 4.9,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424042&fileSn=1",
    "shortDesc": "[산림청 공식 922m] 도평천(都坪川), 영평천(永平川), 한탄강의 수계를 이루며, 산세가 가파르고 곳곳에 바위가 어우러져 경관이 아름다운 점 등을 고려하여 선정, 산 북쪽으로 삼부연폭포와....",
    "fullDesc": "[산림청 100대 명산 선정이유] 도평천(都坪川), 영평천(永平川), 한탄강의 수계를 이루며, 산세가 가파르고 곳곳에 바위가 어우러져 경관이 아름다운 점 등을 고려하여 선정, 산 북쪽으로 삼부연폭포와 남쪽으로 산정호수를 끼고 있음. 전설에 의하면 왕건(王建)에게 쫓기던 궁예(弓裔)가 피살되었던 곳으로 유명 명성산 산자락에 걸쳐있는 산정호수와 더불어 명승지로서 유명하다. ‘울음산’을 뜻하는 명성산(鳴聲山)이란 이름은 궁예가 자신의 부하였던 고려 태조 왕건에서 패한 후 이곳으로 피신와 크게 울었다는 전설에서 비롯되었다. 그리하여 명성산 산자락에는 궁예봉을 비롯해 궁예가 도망쳤다는 패주골, 왕건의 군사가 쫓아오는 것을 살피던 곳이라 하려 이름 붙여진 망무봉 등, 명성산 곳곳에는 궁예의 전설이 아직 남아 있다. 경기도 포천과 강원도 철원에 걸쳐 빚어진 명성산은 궁예왕굴을 비롯하여 자인사, 책바위, 등룡폭포 등의 경치가 뛰어난 곳이 많다. 특히 정상과 연결된 능선은 억새군락지를 이루고 있어 포천시에서는 매년 10월 둘째주 토, 일 양일간 억새축제를 열고 있다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 260,
        "label": "삼부연폭포 들머"
      },
      {
        "km": 1.6,
        "alt": 472,
        "label": "산정호"
      },
      {
        "km": 3.0,
        "alt": 710,
        "label": "궁예봉"
      },
      {
        "km": 4.0,
        "alt": 922,
        "label": "정상"
      },
      {
        "km": 5.5,
        "alt": 558,
        "label": "망무봉"
      },
      {
        "km": 7.2,
        "alt": 260,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "삼부연폭포 들머리",
        "alt": 260,
        "dist": 0,
        "note": "강원도 철원군 갈말읍 산행 기점"
      },
      {
        "name": "산정호",
        "alt": 472,
        "dist": 1.6,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "궁예봉",
        "alt": 710,
        "dist": 3.0,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "명성산 정상 (922m)",
        "alt": 922,
        "dist": 4.0,
        "note": "산림청 100대 명산 명성산 최고봉"
      },
      {
        "name": "망무봉",
        "alt": 558,
        "dist": 5.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.0,
      "windSpeed": 5.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%AA%85%EC%84%B1%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424042&fileSn=1"
  },
  {
    "id": "forest_20000601",
    "forestId": "20000601",
    "isForest100": true,
    "top20Rank": null,
    "name": "천성산",
    "subTitle": "기암괴석이 조각한 금강산의 축소판 (산림청 100대 명산)",
    "location": "경상남도 양산시 하북면, 상북면, 웅상읍",
    "altitude": 920.2,
    "gain": 660,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 7.2,
    "duration": "4시간",
    "rating": 4.83,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Cheonsung.JPG/1280px-Cheonsung.JPG?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 920.2m] 금강산의 축소판이라고 불릴 정도로 경관이 뛰어나고, 특히 산정상부에 드넓은 초원과 산지습지가 발달하여 끈끈이주걱 등 희귀식물과 수서곤충이 서식하는 등 생태적 가치가 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 금강산의 축소판이라고 불릴 정도로 경관이 뛰어나고, 특히 산정상부에 드넓은 초원과 산지습지가 발달하여 끈끈이주걱 등 희귀식물과 수서곤충이 서식하는 등 생태적 가치가 높은 점을 고려하여 선정, 봄에는 진달래와 철쭉, 가을에는 능선의 억새가 장관을 이루며, 원효대사가 창건했다는 내원사가 있음 \"\"가파른 연봉들 첩첩이요 깊고 깊은 골짜기 굴 같다(連峰疊 洞府深邃)\"\"는 산이다. 웅상쪽에서 보면 깎아지른 듯한 산세가 단순·웅장한 홑산인데 양산쪽으로는 힘찬 산줄기를 여럿 뻗어내리면서 그 위에 수많은 암봉을 올려놓았다. 능선들 사이 골짜기들은 암반계류 담소(潭沼)가 즐비하다. [신증동국여지승람]의 저 표현이 하나도 어긋남 없는, 봉만미와 계류미가 다 같이 뛰어난 명산인 것이다. 예전 지도에 \"\"천성산\"\"이 붙어있었던 북봉(약 830m) 일대는 또 억새의 천국이다. 그 천국 여기저기 벌여있는 고층습원에는 나라를 떠들썩하게 했던 꼬리치레도롱뇽과 끈끈이주걱 같은 희귀 동식물이 산다. T자 모양으로 흐르는 특이지형 법수계곡 상류의 이색지대다. 이땅에서 일출을 가장 먼저 볼 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 260,
        "label": "원효대사 들머리"
      },
      {
        "km": 1.6,
        "alt": 471,
        "label": "내원사"
      },
      {
        "km": 3.0,
        "alt": 709,
        "label": "법수계곡"
      },
      {
        "km": 4.0,
        "alt": 920.2,
        "label": "정상"
      },
      {
        "km": 5.5,
        "alt": 557,
        "label": "이색지대"
      },
      {
        "km": 7.2,
        "alt": 260,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "원효대사 들머리",
        "alt": 260,
        "dist": 0,
        "note": "경상남도 양산시 하북면 산행 기점"
      },
      {
        "name": "내원사",
        "alt": 471,
        "dist": 1.6,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "법수계곡",
        "alt": 709,
        "dist": 3.0,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "천성산 정상 (920.2m)",
        "alt": 920.2,
        "dist": 4.0,
        "note": "산림청 100대 명산 천성산 최고봉"
      },
      {
        "name": "이색지대",
        "alt": 557,
        "dist": 5.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.0,
      "windSpeed": 5.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B2%9C%EC%84%B1%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424339&fileSn=1"
  },
  {
    "id": "forest_20000370",
    "forestId": "20000370",
    "isForest100": true,
    "top20Rank": null,
    "name": "서대산",
    "subTitle": "배필을 찾아주는 직녀탄금대 약수 (산림청 100대 명산)",
    "location": "충청남도 금산군 추부면ㆍ군북면, 충청북도 옥천군 군서면",
    "altitude": 905.3,
    "gain": 655,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "일출 명소"
    ],
    "distance": 7.1,
    "duration": "3시간 30분",
    "rating": 4.82,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423463&fileSn=1",
    "shortDesc": "[산림청 공식 905.3m] 충청남도에서는 제일 높은 산으로 곳곳에 기암괴석과 바위 절벽이 있어 중부의 금강이라고 일컬을 정도로 경관이 아름다우며, 산정에서의 조망이 좋은 점 등을 고려하여 선정....",
    "fullDesc": "[산림청 100대 명산 선정이유] 충청남도에서는 제일 높은 산으로 곳곳에 기암괴석과 바위 절벽이 있어 중부의 금강이라고 일컬을 정도로 경관이 아름다우며, 산정에서의 조망이 좋은 점 등을 고려하여 선정, 용굴, 사자굴, 견우장년대, 직녀탄금대, 북두칠성바위 등이 유명 900미터가 넘는, 큰 산이 많지 않은 충남에서 가장 높은 산이다. 남북으로 길고 동서로 얇으며 홀로 우뚝, 우람한 비래산(飛來山)이다. 그러나 기슭에 개활지를 이루는 평야가 없으며 동쪽으로는 장룡산(654.5m), 매봉(599.5m), 대성산(705.9m)이, 서쪽은 도덕봉(372.8m), 지봉산(464.3m), 만인산(537.8m)이 가로막고있어서 산세를 드러낼 수 없다. 이중환이 말한 명산의 두번째 조건 \"\"큰 강이나 바다를 끼고있을 것\"\"이 새삼스럽게 떠오르는 둔산인 것이다. 산 모양 또한 여의도종합전시장 같아 별로인데 능선 위에 견우탄금대와 옥녀직금대, 닭벼슬바위, 마당바위, 선바위, 남근바위, 쌀바위 등 기암이 많다. 용굴이나 사자굴 같은 동굴, 개덕폭포 같은 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 250,
        "label": "사자굴 들머리"
      },
      {
        "km": 1.6,
        "alt": 460,
        "label": "견우장년대"
      },
      {
        "km": 3.0,
        "alt": 695,
        "label": "직녀탄금대"
      },
      {
        "km": 3.9,
        "alt": 905.3,
        "label": "정상"
      },
      {
        "km": 5.4,
        "alt": 545,
        "label": "북두칠성바위"
      },
      {
        "km": 7.1,
        "alt": 250,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "사자굴 들머리",
        "alt": 250,
        "dist": 0,
        "note": "충청남도 금산군 추부면ㆍ군북면 산행 기점"
      },
      {
        "name": "견우장년대",
        "alt": 460,
        "dist": 1.6,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "직녀탄금대",
        "alt": 695,
        "dist": 3.0,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "서대산 정상 (905.3m)",
        "alt": 905.3,
        "dist": 3.9,
        "note": "산림청 100대 명산 서대산 최고봉"
      },
      {
        "name": "북두칠성바위",
        "alt": 545,
        "dist": 5.4,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.1,
      "windSpeed": 5.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%84%9C%EB%8C%80%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423463&fileSn=1"
  },
  {
    "id": "forest_20000279",
    "forestId": "20000279",
    "isForest100": true,
    "top20Rank": null,
    "name": "백운산(포천)",
    "subTitle": "경기도와 강원도의 경계, 카라멜고개 (산림청 100대 명산)",
    "location": "경기도 포천시 이동면, 강원도 화천군 사내면",
    "altitude": 903,
    "gain": 653,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 7.1,
    "duration": "3시간 30분",
    "rating": 4.83,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424389&fileSn=1",
    "shortDesc": "[산림청 공식 903m] 수려한 계곡미를 가지고 있으며 광덕산, 국망봉, 박달봉 등과 같은 높은 봉우리들과 무리를 이뤄 계곡 단애(斷崖) 등 독특한 경관을 가지고 있는 점 등을 고려하여 선정....",
    "fullDesc": "[산림청 100대 명산 선정이유] 수려한 계곡미를 가지고 있으며 광덕산, 국망봉, 박달봉 등과 같은 높은 봉우리들과 무리를 이뤄 계곡 단애(斷崖) 등 독특한 경관을 가지고 있는 점 등을 고려하여 선정, 백운동 계곡 및 신라 말 도선이 창건하였다고 전하는 흥룡사(興龍寺)가 유명 하얀 구름을 머리에 이고 있는 산, 이름만 들어도 마음 설레이는 산이 백운산이다. 우리나라에는 백운산이 많다. 광양의 백운산, 함양의 백운산을 비롯해 남한에만 23개의 백운산이 있다. 그 중 경기도 포천의 백운산은 산자수명하기로 이름난 산이다. 경기의 최고봉인 화악산이 동남쪽으로 맥이 닿아 있고 북쪽의 광덕산과는 광덕고개(일명 카라멜고개)를 사이에 두었다. 백운계곡은 영평팔경의 하나로 꼽힐 만큼 계곡미가 뛰어나며 가을 단풍도 절경이다. 일동 온천타운에 들러 온천욕을 즐길 수도 있다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 250,
        "label": "국망봉 들머리"
      },
      {
        "km": 1.6,
        "alt": 459,
        "label": "박달봉"
      },
      {
        "km": 3.0,
        "alt": 694,
        "label": "흥룡사"
      },
      {
        "km": 3.9,
        "alt": 903,
        "label": "정상"
      },
      {
        "km": 5.4,
        "alt": 544,
        "label": "백운계곡"
      },
      {
        "km": 7.1,
        "alt": 250,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "국망봉 들머리",
        "alt": 250,
        "dist": 0,
        "note": "경기도 포천시 이동면 산행 기점"
      },
      {
        "name": "박달봉",
        "alt": 459,
        "dist": 1.6,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "흥룡사",
        "alt": 694,
        "dist": 3.0,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "백운산(포천) 정상 (903m)",
        "alt": 903,
        "dist": 3.9,
        "note": "산림청 100대 명산 백운산(포천) 최고봉"
      },
      {
        "name": "백운계곡",
        "alt": 544,
        "dist": 5.4,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.1,
      "windSpeed": 5.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%B1%EC%9A%B4%EC%82%B0_%28%EA%B2%BD%EA%B8%B0/%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424389&fileSn=1"
  },
  {
    "id": "forest_20000058",
    "forestId": "20000058",
    "isForest100": true,
    "top20Rank": null,
    "name": "공작산",
    "subTitle": "암봉과 노송이 한폭 동양화로 걸려 있어 (산림청 100대 명산)",
    "location": "강원도 홍천군 동면, 화촌면",
    "altitude": 887.4,
    "gain": 637,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산"
    ],
    "distance": 7.0,
    "duration": "3시간",
    "rating": 4.92,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424398&fileSn=1",
    "shortDesc": "[산림청 공식 887.4m] 울창한 산림과 수타계곡 등 경관이 수려한 점 등을 고려하여 선정산의 형세가 마치 한 마리의 공작이 날개를 펼친 듯하다는데서 산 이름이 유래.",
    "fullDesc": "[산림청 100대 명산 선정이유] 울창한 산림과 수타계곡 등 경관이 수려한 점 등을 고려하여 선정산의 형세가 마치 한 마리의 공작이 날개를 펼친 듯하다는데서 산 이름이 유래. 보물 제745호인 월인석보 제17권과 18권이 보존되어 있는 수타사(壽陀寺)와 수타사에서 노천리에 이르는 20리계곡인 수타계곡이 특히 유명 산이 동물 모습을 빼다박으면 영기가 있다고 한다. 영취산, 사자산, 정상부를 봉정이라 불렀던 설악산…. 그래서 자장율사는 이들 기슭에 진신사리를 묻었다. 하지만 진신사리가 다 떨어졌을 때 그런 산이 발견되었다면 무릎을 칠 수밖에 없었을 것이다. 공작산이 그 대표적 사례다. 홍천강 양쪽에 벌여있는 화촌면의 동부 전역을 물받이로 삼고있는 군업천을 거슬러가며 보면 산 머리가 영락없이 새 모양이다. 양 날개를 내삼포리와 응봉산 경계까지 펼치고있는. 안공작재 이서(以西)의 산줄기들은 소용돌이처럼 돌아가면서 홍천강으로 긴 꼬리를 흔들고있다. 이를 발견한 산 감정사의 안타까운 마음이 손에 잡히는 순간이다. 남쪽 경계를 이루는 수타사계곡으로 더 잘 알려져있다. 들판을 흐르던 물이 산 속...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 250,
        "label": "수타계곡 들머리"
      },
      {
        "km": 1.5,
        "alt": 454,
        "label": "수타사"
      },
      {
        "km": 2.9,
        "alt": 683,
        "label": "자장율사"
      },
      {
        "km": 3.9,
        "alt": 887.4,
        "label": "정상"
      },
      {
        "km": 5.3,
        "alt": 537,
        "label": "진신사"
      },
      {
        "km": 7.0,
        "alt": 250,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "수타계곡 들머리",
        "alt": 250,
        "dist": 0,
        "note": "강원도 홍천군 동면 산행 기점"
      },
      {
        "name": "수타사",
        "alt": 454,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "자장율사",
        "alt": 683,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "공작산 정상 (887.4m)",
        "alt": 887.4,
        "dist": 3.9,
        "note": "산림청 100대 명산 공작산 최고봉"
      },
      {
        "name": "진신사",
        "alt": 537,
        "dist": 5.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.2,
      "windSpeed": 5.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B3%B5%EC%9E%91%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424398&fileSn=1"
  },
  {
    "id": "forest_20000559",
    "forestId": "20000559",
    "isForest100": true,
    "top20Rank": null,
    "name": "조계산",
    "subTitle": "산세가 부드러운 산 (산림청 100대 명산)",
    "location": "전라남도 순천시 승주읍ㆍ송광면",
    "altitude": 887.3,
    "gain": 637,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "단풍"
    ],
    "distance": 7.0,
    "duration": "3시간",
    "rating": 4.87,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424332&fileSn=1",
    "shortDesc": "[산림청 공식 887.3m] 예로부터 소강남(小江南)이라 부른 명산으로 깊은 계곡과 울창한 숲, 폭포, 약수 등 자연경관이 아름답고, 불교 사적지가 많으며, 도립공원으로 지정(1979년)된 점 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 예로부터 소강남(小江南)이라 부른 명산으로 깊은 계곡과 울창한 숲, 폭포, 약수 등 자연경관이 아름답고, 불교 사적지가 많으며, 도립공원으로 지정(1979년)된 점 등을 고려하여 선정, 목조삼존불감(국보 제42호), 고려고종제서(高麗高宗制書 : 국보 제43호), 송광사국사전(국보 제56호) 등 많은 국보를 보유한 송광사와 곱향나무(천연기념물 제88호)가 유명 드물게도 좌우가 대칭인 산이다. 가운데의 장막골을 축으로 양쪽 산줄기와 물줄기들이 반대방향으로, 같은 수로 뻗어있다. 그 기슭에는 가람이 둘 있다. 승보사찰 송광사와 태고총림 선암사다. 상봉 장군봉 코밑의 선암사는 옥 같은 미녀가 잔을 올리는 옥녀헌배형(玉女獻杯形) 명당이라고 한다. 그래 들머리 유천부락 앞에는 옥녀봉이, 뒤에는 배봉(盃峯)이 있는데 근래 주암댐이 건설되면서 동네 앞에 조정지댐의 상사호가 만들어져 전설이 더욱 설득력있게 되었다. 반면 송광사는 선암사를 둘러싼 대칭 저쪽 산들까지 외연으로 포괄하는 겹산 명당에 자리잡았다고 한다. 가까운 울타리 망수봉, 연산봉, 대장봉, 조계봉이 내산(內山), 선암사의 울타리 시루산, 장군봉, 깃대봉, 고동산을 외산으로 여기는...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 250,
        "label": "송광사국사 들머"
      },
      {
        "km": 1.5,
        "alt": 454,
        "label": "송광사"
      },
      {
        "km": 2.9,
        "alt": 683,
        "label": "승보사"
      },
      {
        "km": 3.9,
        "alt": 887.3,
        "label": "정상"
      },
      {
        "km": 5.3,
        "alt": 537,
        "label": "선암사"
      },
      {
        "km": 7.0,
        "alt": 250,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "송광사국사 들머리",
        "alt": 250,
        "dist": 0,
        "note": "전라남도 순천시 승주읍ㆍ송광면 산행 기점"
      },
      {
        "name": "송광사",
        "alt": 454,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "승보사",
        "alt": 683,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "조계산 정상 (887.3m)",
        "alt": 887.3,
        "dist": 3.9,
        "note": "산림청 100대 명산 조계산 최고봉"
      },
      {
        "name": "선암사",
        "alt": 537,
        "dist": 5.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.2,
      "windSpeed": 5.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%A1%B0%EA%B3%84%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424332&fileSn=1"
  },
  {
    "id": "forest_20000623",
    "forestId": "20000623",
    "isForest100": true,
    "top20Rank": null,
    "name": "축령산",
    "subTitle": "남이장이 심신을 닦던 남이 바위 (산림청 100대 명산)",
    "location": "경기도 남양주시 수동면, 가평군 상면",
    "altitude": 887.1,
    "gain": 637,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 7.0,
    "duration": "3시간",
    "rating": 4.82,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423568&fileSn=1",
    "shortDesc": "[산림청 공식 887.1m] 소나무와 잣나무 장령림이 울창한 숲을 이루고 단애가 형성되어 있으며, 산 정상에서 북으로는 운악산, 명지산, 화악산이 보이고, 동남쪽으로 청평호가 보이는 등 조망이 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 소나무와 잣나무 장령림이 울창한 숲을 이루고 단애가 형성되어 있으며, 산 정상에서 북으로는 운악산, 명지산, 화악산이 보이고, 동남쪽으로 청평호가 보이는 등 조망이 뛰어난 점을 고려하여 선정, 가평 7경의 하나인 축령백림과 남이장군의 전설이 깃든 남이바위, 수리바위 축령백림 등이 유명. 자연휴양림이 있음 경춘가도 마석을 지나 새터고개를 넘으면 잊었던 전설처럼 북한강이 나타난다. 이어 정태춘 노래 '대성리에서'의 대성리가 나오는데 그 직전 군계를 지날 때 보면 꽤 큰 내를 건너고있다. 수동유원지로 알려진 수동천이다. 이 수동천과 가평 조종천 사이에 있는 축령산은 국도에서 보이지 않고 교통도 불편해 오래도록 알려지지 않은 산이었다. 그러다 80년대 민주산악회 같은, 사람이 별로 없는 호젓한 대상지만 찾던 이들이 즐겨 다니면서 발길이 잦아지기 시작했다. 수동계곡으로 들어가 보면 축령산은 육산 줄기 위로 쑥 올라선, 준걸한 모습이다. 정상부가 바위로 되어있기 때문이다. 그래 암릉산행의 아슬아슬한 묘미가 있고 정상 조망도 좋다. 경기 중북부의 거의 모든 산과 삼각산, 도봉산의 파노...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 250,
        "label": "청평호 들머리"
      },
      {
        "km": 1.5,
        "alt": 454,
        "label": "남이바위"
      },
      {
        "km": 2.9,
        "alt": 683,
        "label": "수리바위"
      },
      {
        "km": 3.9,
        "alt": 887.1,
        "label": "정상"
      },
      {
        "km": 5.3,
        "alt": 537,
        "label": "수동계곡"
      },
      {
        "km": 7.0,
        "alt": 250,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "청평호 들머리",
        "alt": 250,
        "dist": 0,
        "note": "경기도 남양주시 수동면 산행 기점"
      },
      {
        "name": "남이바위",
        "alt": 454,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "수리바위",
        "alt": 683,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "축령산 정상 (887.1m)",
        "alt": 887.1,
        "dist": 3.9,
        "note": "산림청 100대 명산 축령산 최고봉"
      },
      {
        "name": "수동계곡",
        "alt": 537,
        "dist": 5.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.2,
      "windSpeed": 5.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B6%95%EB%A0%B9%EC%82%B0_%28%EA%B2%BD%EA%B8%B0%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423568&fileSn=1"
  },
  {
    "id": "forest_20001076",
    "forestId": "20001076",
    "isForest100": true,
    "top20Rank": null,
    "name": "백운산(정선)",
    "subTitle": "태고의 신비를 간직한 천혜의 비경 (산림청 100대 명산)",
    "location": "강원도 정선군 신동읍, 평창군 미탄면",
    "altitude": 883.5,
    "gain": 634,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "일출 명소"
    ],
    "distance": 7.0,
    "duration": "3시간",
    "rating": 4.75,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423472&fileSn=1",
    "shortDesc": "[산림청 공식 883.5m] 동강의 가운데에 위치하고 있어 경관이 아름답고, 조망이 좋으며 생태계보존지역으로 지정되어있는 점 등을 고려하여 선정 흰구름이 늘 끼어 있는데서 산 이름이 유래, 오대....",
    "fullDesc": "[산림청 100대 명산 선정이유] 동강의 가운데에 위치하고 있어 경관이 아름답고, 조망이 좋으며 생태계보존지역으로 지정되어있는 점 등을 고려하여 선정 흰구름이 늘 끼어 있는데서 산 이름이 유래, 오대산에서 발원하는 오대천과 조양강(朝陽江)을 모아 남한강으로 흐르는 동강 및 천연기념물 제260호로 지정(1979년)된 백룡동굴(白龍洞窟)이 유명 댐이 건설된다고 나라를 떠들썩하게 했던 동강변의, 동강이 보이는 산이다. 산간 감입곡류(嵌入曲流)의 극치를 내려다볼 수 있으며 산행 전후에 래프팅을 즐길 수도 있다. 남쪽으로 뻗어내리는 용가능선, 서남향의 칠족령능선이 강 건너 소동마을의 누더기 같은 밭자락들, 구하도(舊河道)가 만들어놓은 섬 아닌 섬을 움켜쥐고 있는 듯한 형세다. 용가능선은 개발처럼, 갈수록 낮아지고 좁아지다 끝부분이 넙적한 모양인데 칠족령능선은 여섯 봉우리들이 담장 위 유리조각처럼 뾰족뾰족하다. 정상에 서면 굽이지는 동강의 흐름이 속속들이 보인다. 건너편의 완택산, 고고산, 계봉, 곰봉은 물론 멀리 함백산까지 조망된다. 하지만 석회암 산이어서 칼로 자른 듯한 벼랑이 많다. 지역 사투리로 뼝대라고 부르는데...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 250,
        "label": "백룡동굴 들머리"
      },
      {
        "km": 1.5,
        "alt": 453,
        "label": "용가능선"
      },
      {
        "km": 2.9,
        "alt": 681,
        "label": "칠족령능선"
      },
      {
        "km": 3.9,
        "alt": 883.5,
        "label": "정상"
      },
      {
        "km": 5.3,
        "alt": 535,
        "label": "실족사"
      },
      {
        "km": 7.0,
        "alt": 250,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "백룡동굴 들머리",
        "alt": 250,
        "dist": 0,
        "note": "강원도 정선군 신동읍 산행 기점"
      },
      {
        "name": "용가능선",
        "alt": 453,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "칠족령능선",
        "alt": 681,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "백운산(정선) 정상 (883.5m)",
        "alt": 883.5,
        "dist": 3.9,
        "note": "산림청 100대 명산 백운산(정선) 최고봉"
      },
      {
        "name": "실족사",
        "alt": 535,
        "dist": 5.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.3,
      "windSpeed": 5.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%B1%EC%9A%B4%EC%82%B0_%28%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423472&fileSn=1"
  },
  {
    "id": "daedunsan",
    "forestId": "20000131",
    "isForest100": true,
    "top20Rank": null,
    "name": "대둔산 (마천대)",
    "subTitle": "원효대사가 춤 추던 천하의 승지, 기암 마천대와 호남의 금강 (산림청 100대 명산)",
    "location": "충청남도 논산시 벌곡면ㆍ금산군 진산면, 전라북도 완주군 운주면",
    "altitude": 879.1,
    "gain": 579,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 5.4,
    "duration": "3시간 30분",
    "rating": 4.82,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Chilseongbong_at_Daedunsan.jpg/1280px-Chilseongbong_at_Daedunsan.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 879.1m] 임금바위와 입석대를 잇는 높이 70m·길이 50m 금강구름다리와 마천대·낙조대.",
    "fullDesc": "대둔산(산림청 공식 879.1m)은 \"큰 두메의 산\"이라는 뜻으로 충남 논산시 벌곡면·금산군 진산면과 전북 완주군 운주면에 걸쳐 두 도에서 각각 도립공원(1980년)으로 지정한 명산입니다. 최고봉인 마천대(879.1m)에서 낙조대에 이르는 바위능선과 일몰이 뛰어나 \"호남의 금강\"이라 불립니다. 남쪽 완주 방면은 임금바위, 장군봉, 동심바위, 신선바위와 높이 70m·길이 50m·폭 50cm의 금강구름다리 및 삼선구름다리가 아찔한 석림을 이루며, 북쪽 논산·금산 방면은 군지골(제1폭포·화랑폭포·금강폭포)과 태고사(太古寺)의 울창한 협곡이 장관을 이룹니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 300,
        "label": "완주 주차장"
      },
      {
        "km": 1.2,
        "alt": 580,
        "label": "금강구름다리(높이70m)"
      },
      {
        "km": 1.8,
        "alt": 720,
        "label": "삼선구름다리"
      },
      {
        "km": 2.5,
        "alt": 879.1,
        "label": "마천대(879.1m)"
      },
      {
        "km": 3.5,
        "alt": 850,
        "label": "낙조대/태고사 갈림길"
      },
      {
        "km": 5.4,
        "alt": 300,
        "label": "주차장 회귀"
      }
    ],
    "waypoints": [
      {
        "name": "대둔산 도립공원 입구",
        "alt": 300,
        "dist": 0,
        "note": "전북 완주군 운주면 들머리"
      },
      {
        "name": "금강구름다리 (높이 70m, 길이 50m)",
        "alt": 580,
        "dist": 1.2,
        "note": "임금바위와 입석대를 잇는 대둔산의 상징"
      },
      {
        "name": "삼선구름다리 (삼선계단)",
        "alt": 720,
        "dist": 1.8,
        "note": "일방통행 가파른 공중 철계단"
      },
      {
        "name": "마천대 정상 (879.1m) & 낙조대",
        "alt": 879.1,
        "dist": 2.5,
        "note": "개척탑 및 낙조대의 일몰 절경"
      }
    ],
    "checklist": [
      "접지력 좋은 등산화",
      "장갑 및 스틱 (구름다리·철계단 구간 배낭 결착)",
      "물 1L"
    ],
    "weather": {
      "baseTemp": 15,
      "peakTemp": 9.3,
      "windSpeed": 3.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%8C%80%EB%91%94%EC%82%B0_%28%EC%B6%A9%EB%82%A8/%EC%A0%84%EB%B6%81%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424371&fileSn=1"
  },
  {
    "id": "forest_20000484",
    "forestId": "20000484",
    "isForest100": true,
    "top20Rank": null,
    "name": "용화산",
    "subTitle": "이야기가 있는 바위 전시장 (산림청 100대 명산)",
    "location": "강원도 화천군 간동면ㆍ하남면, 춘천시 사북면",
    "altitude": 877.8,
    "gain": 628,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 7.0,
    "duration": "3시간",
    "rating": 4.81,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423748&fileSn=1",
    "shortDesc": "[산림청 공식 877.8m] 파로호, 춘천호, 소양호 등과 연접해 있으며 산림과 기암괴석이 어우러져 경관이 아름다우며 조망이 좋은 점 등을 고려하여 선정, 성불사터가 있으며 광바위, 주전자바위,....",
    "fullDesc": "[산림청 100대 명산 선정이유] 파로호, 춘천호, 소양호 등과 연접해 있으며 산림과 기암괴석이 어우러져 경관이 아름다우며 조망이 좋은 점 등을 고려하여 선정, 성불사터가 있으며 광바위, 주전자바위, 바둑바위 등 갖가지 전설을 간직한 실물을 닮은 바위가 유명 용화산은 강원도 춘천시 사북면과 화천군 하남면 경계에 솟은 바위산이자 춘천의 의암댐, 소양댐, 춘천댐, 화천댐에 포위된 천혜의 성벽이다. 보통 들머리로 잡는 고성2리 양통골로 용화산에 들어서면 가장 먼저 바위봉우리들이 눈에 들어온다. 춘천시 방면으로는 깎아지른 바위 절벽을 이루고 있는데, ‘새가 난다’하여 이름 붙여진 새남바우를 비롯해 하늘벽 촛대바위, 층층바위, 득남바위 등의 기암과 함께 용화산 정상에서 서쪽으로 흘러내리는 만장봉 일원의 암골미는 용화산의 백미라 할 수 있다. 특히 노송군락을 품고 있는 만장봉 너럭바위에서 바라보는 하늘벽 촛대바위의 경치가 일품이다. 만장봉에는 1976년도에 암벽등반 코스가 개척되어 지금도 등반가들이 종종 찾고 있다. 만장봉과 정상 사이의...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 250,
        "label": "파로호 들머리"
      },
      {
        "km": 1.5,
        "alt": 451,
        "label": "춘천호"
      },
      {
        "km": 2.9,
        "alt": 677,
        "label": "소양호"
      },
      {
        "km": 3.9,
        "alt": 877.8,
        "label": "정상"
      },
      {
        "km": 5.3,
        "alt": 533,
        "label": "성불사"
      },
      {
        "km": 7.0,
        "alt": 250,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "파로호 들머리",
        "alt": 250,
        "dist": 0,
        "note": "강원도 화천군 간동면ㆍ하남면 산행 기점"
      },
      {
        "name": "춘천호",
        "alt": 451,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "소양호",
        "alt": 677,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "용화산 정상 (877.8m)",
        "alt": 877.8,
        "dist": 3.9,
        "note": "산림청 100대 명산 용화산 최고봉"
      },
      {
        "name": "성불사",
        "alt": 533,
        "dist": 5.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.3,
      "windSpeed": 5.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9A%A9%ED%99%94%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423748&fileSn=1"
  },
  {
    "id": "forest_20000073",
    "forestId": "20000073",
    "isForest100": true,
    "top20Rank": null,
    "name": "구병산",
    "subTitle": "아홉 개 봉우리가 병풍처럼 (산림청 100대 명산)",
    "location": "경상북도 상주시 화북면,  충청북도 보은군 마로면ㆍ속리산면",
    "altitude": 876.3,
    "gain": 626,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 7.0,
    "duration": "3시간",
    "rating": 4.84,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423618&fileSn=1",
    "shortDesc": "[산림청 공식 876.3m] 주능선의 북쪽 지역이 속리산 국립공원에 속해 있고 서원계곡(書院溪谷) 등 경관이 수려한 점 등을 고려하여 선정웅장한 아홉 개의 바위봉이 병풍처럼 연이어 솟아 예로부터....",
    "fullDesc": "[산림청 100대 명산 선정이유] 주능선의 북쪽 지역이 속리산 국립공원에 속해 있고 서원계곡(書院溪谷) 등 경관이 수려한 점 등을 고려하여 선정웅장한 아홉 개의 바위봉이 병풍처럼 연이어 솟아 예로부터 구봉산이라고 불리어 왔으며, 정상에서의 조망이 좋음. 예로부터 보은지방에서는 속리산 천황봉은 지아비 산, 구병산은 지어미 산, 금적산은 아들 산이라 하여 이들을 `삼산(三山)\"이라 일컬어왔음 구병산(876.3m)은 충북 보은군과 경북 상주시의 속리산국립공원 남쪽 국도 25호선 변에 자리잡고 있다. 속리산에서 뚝 떨어져나와 보은군 마로면 적암리와 경북과의 도계에 웅장하고 수려한 아홉 개 봉우리로 이루어진 산이라 '구봉산'으로도 불린다. 주능선이 동쪽에서 서쪽으로 길게 이어지면서 마치 병풍을 두른 듯 아홉 봉우리가 연이어져 매우 아름다운 경치를 이루고 있으며 연중 많은 등산인들이 찾는다. 구병산은 숲이 우거져 있어 물도 맑아 여름철 산행지로 적격이며 가을 단풍 또한 볼 만하다. 예로부터 보은 지방에서는 속리산 천황봉, 구병산, 금적산을 지아비산, 지어미산, 아들산으로 불러오고 있다. 보은군청에서는 1999년 구병산에서 속리산을 잇는 43.9km구간을 충북알프스로 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 250,
        "label": "서원계곡 들머리"
      },
      {
        "km": 1.5,
        "alt": 450,
        "label": "바위봉"
      },
      {
        "km": 2.9,
        "alt": 676,
        "label": "천황봉"
      },
      {
        "km": 3.9,
        "alt": 876.3,
        "label": "정상"
      },
      {
        "km": 5.3,
        "alt": 532,
        "label": "토골사"
      },
      {
        "km": 7.0,
        "alt": 250,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "서원계곡 들머리",
        "alt": 250,
        "dist": 0,
        "note": "경상북도 상주시 화북면 산행 기점"
      },
      {
        "name": "바위봉",
        "alt": 450,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "천황봉",
        "alt": 676,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "구병산 정상 (876.3m)",
        "alt": 876.3,
        "dist": 3.9,
        "note": "산림청 100대 명산 구병산 최고봉"
      },
      {
        "name": "토골사",
        "alt": 532,
        "dist": 5.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.3,
      "windSpeed": 5.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B5%AC%EB%B3%91%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423618&fileSn=1"
  },
  {
    "id": "forest_20000613",
    "forestId": "20000613",
    "isForest100": true,
    "top20Rank": null,
    "name": "청량산",
    "subTitle": "아름다운 관광자원의 보고 (산림청 100대 명산)",
    "location": "경상북도 봉화군 명호면",
    "altitude": 869.7,
    "gain": 630,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.9,
    "duration": "3시간 30분",
    "rating": 4.95,
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Korea-Bonghwa_County-Mount_Cheongnyangsan-01.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 869.7m] 산세는 크지 않으나 연이어 솟는 바위 봉우리와 기암절벽이 어우러져 예로부터 소금강으로 꼽힐 만큼 산세가 수려하고, 도립공원으로 지정(1982년)된 점 등을 고려하여 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 산세는 크지 않으나 연이어 솟는 바위 봉우리와 기암절벽이 어우러져 예로부터 소금강으로 꼽힐 만큼 산세가 수려하고, 도립공원으로 지정(1982년)된 점 등을 고려하여 선정, 원효대사가 창건한 유리보전, 신라시대의외청량사, 최치원의 유적지인 고운대와 독서당, 공민왕이 홍건적의 난을 피해 은신한 오마대(五馬臺)와 청량산성, 김생이 글씨를 공부하던 김생굴, 퇴계 이황이 수도하며 성리학을 집대성한 오산당(청량정사) 등 역사적 유적지로 유명 한송이 연꽃으로 일컬어지는 낙동강변의 명산이다. 이런 비유는 흔히 과장이기 일쑨데 이 산만큼은 허투루 한 소리로 여겨지지 않는다. 금탑봉의 술대를 사방에서 에워싼 축융봉, 경일봉, 보살봉, 정상 장인봉의 꽃잎들 가운데 앉혀진 청량사가 더할 나위 없이 포근하다. 높이가 서울 삼각산보다 더 높다. 게다가 주요 봉우리들이 얇은 푸나무옷을 걸친 듯한 바윗덩이라 봉만미(峰巒美)가 그만이다. 보살봉의 경우 암벽등반 장비 없이는 오를 수 없을 정도로 가파르다. 그럼에도 산역이 좁아 반나절이면 돌아볼 수 있다. 능선을 반시계방향으로 돌 때 종착지가 되는 정상에서의 낙동강 경치가 시원스럽다. 발 아래 광석나루는 옛날은 물론 다리가 놓인 지금도 낙동강 최고 절경으로 꼽힌다. 밖에서 보는 산...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 240,
        "label": "원효대사 들머리"
      },
      {
        "km": 1.5,
        "alt": 442,
        "label": "신라시대"
      },
      {
        "km": 2.9,
        "alt": 668,
        "label": "의외청량사"
      },
      {
        "km": 3.8,
        "alt": 869.7,
        "label": "정상"
      },
      {
        "km": 5.2,
        "alt": 524,
        "label": "고운대"
      },
      {
        "km": 6.9,
        "alt": 240,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "원효대사 들머리",
        "alt": 240,
        "dist": 0,
        "note": "경상북도 봉화군 명호면 산행 기점"
      },
      {
        "name": "신라시대",
        "alt": 442,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "의외청량사",
        "alt": 668,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "청량산 정상 (869.7m)",
        "alt": 869.7,
        "dist": 3.8,
        "note": "산림청 100대 명산 청량산 최고봉"
      },
      {
        "name": "고운대",
        "alt": 524,
        "dist": 5.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.3,
      "windSpeed": 5.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B2%AD%EB%9F%89%EC%82%B0_%28%EA%B2%BD%EB%B6%81%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424341&fileSn=1"
  },
  {
    "id": "forest_20000514",
    "forestId": "20000514",
    "isForest100": true,
    "top20Rank": null,
    "name": "유명산",
    "subTitle": "기암괴석과 하늘을 덮는 수풀림의 조화 (산림청 100대 명산)",
    "location": "경기도 가평군 설악면, 양평군 옥천면",
    "altitude": 864,
    "gain": 624,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 6.9,
    "duration": "3시간 30분",
    "rating": 4.88,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Peak_of_Yumyeong_Mountain.JPG/1280px-Peak_of_Yumyeong_Mountain.JPG?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 864m] 능선이 완만하고 부드러우며, 수량이 풍부한 계곡과 기암괴석 및 울창한 숲이 어우러져 경관이 아름다운 점 등을 고려하여 선정, 신라 법흥왕 27년(540년)에 인도에서....",
    "fullDesc": "[산림청 100대 명산 선정이유] 능선이 완만하고 부드러우며, 수량이 풍부한 계곡과 기암괴석 및 울창한 숲이 어우러져 경관이 아름다운 점 등을 고려하여 선정, 신라 법흥왕 27년(540년)에 인도에서 불법을 우리나라에 들여온 마라가미 스님에게 법흥왕이 하사한 사찰인 현등사가 유명, 자연휴양림이 있음 대동여지도에 마유산으로 나오는 산인데 언제부턴가 유명산으로 불리게 되었다. 소문으로는, 산이름이 알려지지 않았을 때 이 산을 찾은 사람들이 일행 중 김유명이라는 여자 이름을 따서 붙였다고 한다. '입구에 있는 가지계곡'이라는 뜻의 입구지(入口枝)계곡도 그들의 작명인 듯하다. 바로 그 입구지계곡이 널리 알려져 있다. 용문산에서 흘러오는 그 계곡에 마당소, 용소, 박쥐소 같은 명소가 여럿 있기 때문이다. 억새밭이 펼쳐지는 정상에서의 전망도 좋은데 나무가 거의 없는 까닭에 패러글라이딩 활공장으로 각광받고 있다. 패러글라이더들은 설매재 자연휴양림쪽(동쪽)에서 올라오는 산판도로를 이용한다. 550미터쯤의 선어치고개로 이어지는 능선코스는 정상과의 고도차가 300m 남짓밖에 안 된다....",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 240,
        "label": "현등사 들머리"
      },
      {
        "km": 1.5,
        "alt": 440,
        "label": "가지계곡"
      },
      {
        "km": 2.9,
        "alt": 664,
        "label": "입구지계곡"
      },
      {
        "km": 3.8,
        "alt": 864,
        "label": "정상"
      },
      {
        "km": 5.2,
        "alt": 521,
        "label": "설매재"
      },
      {
        "km": 6.9,
        "alt": 240,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "현등사 들머리",
        "alt": 240,
        "dist": 0,
        "note": "경기도 가평군 설악면 산행 기점"
      },
      {
        "name": "가지계곡",
        "alt": 440,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "입구지계곡",
        "alt": 664,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "유명산 정상 (864m)",
        "alt": 864,
        "dist": 3.8,
        "note": "산림청 100대 명산 유명산 최고봉"
      },
      {
        "name": "설매재",
        "alt": 521,
        "dist": 5.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.4,
      "windSpeed": 5.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9C%A0%EB%AA%85%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423882&fileSn=1"
  },
  {
    "id": "forest_20000040",
    "forestId": "20000040",
    "isForest100": true,
    "top20Rank": null,
    "name": "계룡산",
    "subTitle": "정감록에서 예언한 왕도가 들어설 산 (산림청 100대 명산)",
    "location": "대전광역시, 충청남도 공주시 계룡면ㆍ논산시 상월면ㆍ계룡시 신도안면",
    "altitude": 846.5,
    "gain": 606,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 6.8,
    "duration": "3시간",
    "rating": 4.97,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Mount_Gyeryong_from_Jang-gun_peak.jpg/1280px-Mount_Gyeryong_from_Jang-gun_peak.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 846.5m] 예로부터 신라 5악의 하나인 서악(西岳)으로 지칭되었고, 조선시대에는 3악 중 중악(中岳)으로 불리운 산으로서 국립공원으로 지정(1968년)된 점 등을 고려하여 선정....",
    "fullDesc": "[산림청 100대 명산 선정이유] 예로부터 신라 5악의 하나인 서악(西岳)으로 지칭되었고, 조선시대에는 3악 중 중악(中岳)으로 불리운 산으로서 국립공원으로 지정(1968년)된 점 등을 고려하여 선정산 능선이 마치 닭의 벼슬을 쓴 용의 모습과 닮았다고 하여 계룡산이라는 이름이 유래되었으며, \"정감록(鄭鑑錄)\"에 언급된 십승지지(十勝之地)중 하나임. 신라 성덕왕 2년(724년) 회의화상이 창건한 동학사(東鶴寺)와 백제 구이신왕(420년)때 고구려의 아도화상에 의하여 창건된 갑사(甲寺)등이 유명 계룡산은 수려한 산세와 승지 신도안, 여러 고찰들을 품은 충남 제일의 명산이다. 이미 신라시대 5악의 하나였고 조선시대에는 묘향산, 지리산과 함께 산신제를 올리던 영산이었다. 주봉인 천황봉에서 쌀개봉으로 이어지는 능선미가 타의 추종을 불허한다. 이 맨드라미 같은 용머리가 오종종하니 가운데가 높은 암탉 벼슬처럼 보인다 하여 계룡이라는 이름이 붙었다. 용유소, 이일천, 백룡강, 달문택, 군자택, 명월담, 계룡명암, 수정봉 등의 명소가 곳곳에 벌여있다. 계룡10경의 하나인 은선폭포, 영험함 때문에 무속행사 장소로 각광받는(혹은 받았던) 갑사계곡의 용문폭포, 신도안 용추폭포로 드러나듯 계곡미 또한 빼어나다. 폭포와 기암절벽이 조화를 이룬 계룡산은 단풍으로도 유명하다. 10월 하순...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 240,
        "label": "조선시대 들머리"
      },
      {
        "km": 1.5,
        "alt": 434,
        "label": "동학사"
      },
      {
        "km": 2.9,
        "alt": 652,
        "label": "신라시대"
      },
      {
        "km": 3.7,
        "alt": 846.5,
        "label": "정상"
      },
      {
        "km": 5.2,
        "alt": 513,
        "label": "천황봉"
      },
      {
        "km": 6.8,
        "alt": 240,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "조선시대 들머리",
        "alt": 240,
        "dist": 0,
        "note": "대전광역시 산행 기점"
      },
      {
        "name": "동학사",
        "alt": 434,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "신라시대",
        "alt": 652,
        "dist": 2.9,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "계룡산 정상 (846.5m)",
        "alt": 846.5,
        "dist": 3.7,
        "note": "산림청 100대 명산 계룡산 최고봉"
      },
      {
        "name": "천황봉",
        "alt": 513,
        "dist": 5.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.5,
      "windSpeed": 5.0,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B3%84%EB%A3%A1%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423615&fileSn=1"
  },
  {
    "id": "bukhansan",
    "forestId": "20000317",
    "isForest100": true,
    "top20Rank": null,
    "name": "북한산 (백운대)",
    "subTitle": "가거라 삼각산아, 다시 보자 한강수야 — 수도의 진산 바위 성채 (산림청 100대 명산)",
    "location": "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구, 경기도 고양시ㆍ양주시",
    "altitude": 835.6,
    "gain": 675,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 7.2,
    "duration": "4시간",
    "rating": 4.89,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Insoo_peak.jpg/1280px-Insoo_peak.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 835.6m] 백운대·인수봉·만경대 삼각산과 숙종 37년(1711년) 축성된 10km 북한산성.",
    "fullDesc": "북한산(산림청 공식 835.6m)은 최고봉인 백운대(835.6m)를 위시하여 인수봉, 만경대 세 봉우리가 뿔처럼 솟아 있어 조선 초기부터 삼각산(三角山), 화산(華山), 신라시대에는 부아악(負兒岳)이라 불린 서울의 진산입니다. 1983년 국립공원으로 지정되었으며, 백제 온조왕·개루왕의 성터를 바탕으로 조선 숙종 37년(1711년)에 원효봉~염초봉~백운대~만경대~문수봉~의상봉을 연결해 완공한 총 길이 10km, 14개 성문의 북한산성이 남아 있습니다. 도선사, 태고사, 화계사, 문수사, 진관사 등 수많은 고찰을 품고 있습니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 160,
        "label": "밤골/산성 입구"
      },
      {
        "km": 1.8,
        "alt": 420,
        "label": "숨은벽 전망대"
      },
      {
        "km": 2.7,
        "alt": 680,
        "label": "V자 안부"
      },
      {
        "km": 3.4,
        "alt": 750,
        "label": "백운봉암문(위문)"
      },
      {
        "km": 3.8,
        "alt": 835.6,
        "label": "백운대(835.6m)"
      },
      {
        "km": 7.2,
        "alt": 210,
        "label": "북한산성 대서문"
      }
    ],
    "waypoints": [
      {
        "name": "밤골 / 북한산성 들머리",
        "alt": 160,
        "dist": 0,
        "note": "6대 대표 기점(우이동·정릉·불광동·산성 등) 중 하나"
      },
      {
        "name": "숨은벽 암릉 전망대",
        "alt": 420,
        "dist": 1.8,
        "note": "인수봉·백운대 화강암 거벽 조망"
      },
      {
        "name": "백운봉암문 (위문)",
        "alt": 750,
        "dist": 3.4,
        "note": "숙종 37년(1711년) 완공된 10km 북한산성 성문"
      },
      {
        "name": "백운대 정상 (835.6m)",
        "alt": 835.6,
        "dist": 3.8,
        "note": "북한산 최고봉 및 한강·서울 도심 파노라마"
      }
    ],
    "checklist": [
      "화강암 슬립 방지 릿지화/등산화",
      "와이어 로프용 장갑",
      "물 1L 및 방풍 자켓"
    ],
    "weather": {
      "baseTemp": 14,
      "peakTemp": 8.5,
      "windSpeed": 4.2,
      "condition": "쾌청"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B6%81%ED%95%9C%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424203&fileSn=1"
  },
  {
    "id": "forest_20000507",
    "forestId": "20000507",
    "isForest100": true,
    "top20Rank": null,
    "name": "월출산",
    "subTitle": "웅장하고 섬세한 기암괴석 진열대 (산림청 100대 명산)",
    "location": "전라남도 영암군 영암읍ㆍ군서면ㆍ학산면, 강진군 성전면",
    "altitude": 810.7,
    "gain": 581,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 6.6,
    "duration": "3시간",
    "rating": 4.81,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Wolchulsan_mountain_peak.jpg/1280px-Wolchulsan_mountain_peak.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 810.7m] 경관이 아름다우며 난대림과 온대림이 혼생하여 생태적 가치가 크고 국립공원으로 지정(1988년)된 점 등을 고려하여 선정, 천황봉을 중심으로 무위사 극락보전(국보 제1....",
    "fullDesc": "[산림청 100대 명산 선정이유] 경관이 아름다우며 난대림과 온대림이 혼생하여 생태적 가치가 크고 국립공원으로 지정(1988년)된 점 등을 고려하여 선정, 천황봉을 중심으로 무위사 극락보전(국보 제13호), 도갑사 해탈문(국보 제50호)가 있음. 구정봉 밑 용암사터 근처에는 우리나라에서 가장 높은 곳에 위치한 국보 제144호인 마애여래좌상이 유명 프랑스의 세계문화유산 몽쌩미쉘(Mont Saint-Michel) 같은 산이다. 정상 천황봉만 떼어 보면 피라밋 같기도 하다. 천황사쪽 평균경사 37도. 이땅에서 이보다 가파른 산은 없다. 천황봉은 물론이고 향로봉, 양자봉, 시루봉, 문필봉(월각산) 등 주요 봉우리들이 모두 돌로 되었고 불꽃처럼 하늘로 치솟아오르고 있다. 나무는 보이지 않고 산죽이나 덤불이 먼지처럼 얹혀 희미한 푸른기를 띠고있을 뿐이다. 풍수에서 말하는 이른바 석화성(石火星), 정상부가 돌로 된 것을 넘어 예리함의 상징 화성까지 띠었다. 나무보다 많고 별보다도 많은 바위는 저마다 무언가를 닮았다. 음굴, 남근바위, 통천문 등 동서로 기암이 늘어서 있어 바위 전시장을 이룬다. 미왕재 등성이에는 억새밭이 이채롭...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 230,
        "label": "천황봉 들머리"
      },
      {
        "km": 1.5,
        "alt": 416,
        "label": "무위사"
      },
      {
        "km": 2.8,
        "alt": 625,
        "label": "도갑사"
      },
      {
        "km": 3.6,
        "alt": 810.7,
        "label": "정상"
      },
      {
        "km": 5.0,
        "alt": 491,
        "label": "구정봉"
      },
      {
        "km": 6.6,
        "alt": 230,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "천황봉 들머리",
        "alt": 230,
        "dist": 0,
        "note": "전라남도 영암군 영암읍ㆍ군서면ㆍ학산면 산행 기점"
      },
      {
        "name": "무위사",
        "alt": 416,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "도갑사",
        "alt": 625,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "월출산 정상 (810.7m)",
        "alt": 810.7,
        "dist": 3.6,
        "note": "산림청 100대 명산 월출산 최고봉"
      },
      {
        "name": "구정봉",
        "alt": 491,
        "dist": 5.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.7,
      "windSpeed": 4.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%9B%94%EC%B6%9C%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424349&fileSn=1"
  },
  {
    "id": "forest_20000597",
    "forestId": "20000597",
    "isForest100": true,
    "top20Rank": null,
    "name": "천마산",
    "subTitle": "스키장으로, 청소년 심신수련장으로 (산림청 100대 명산)",
    "location": "경기도 남양주시 오남읍, 화도읍",
    "altitude": 810.3,
    "gain": 580,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산"
    ],
    "distance": 6.6,
    "duration": "3시간",
    "rating": 4.79,
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a7/%EC%B2%9C%EB%A7%88%EC%82%B0%EC%9D%84_%EB%B0%B0%EA%B2%BD%EC%9C%BC%EB%A1%9C_%ED%95%9C_%EA%B2%BD%EC%B6%98_%ED%95%98%EC%9D%B4%ED%82%B9_%EC%BD%94%EC%8A%A4.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 810.3m] 산꼭대기를 중심으로 능선이 사방에 뻗어있어 어느 지점에서나 정상을 볼수 있는 특이한 산세와 식물상이 풍부하여 식물관찰 산행지로 이름나 있는 점 등을 고려하여 선정, ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 산꼭대기를 중심으로 능선이 사방에 뻗어있어 어느 지점에서나 정상을 볼수 있는 특이한 산세와 식물상이 풍부하여 식물관찰 산행지로 이름나 있는 점 등을 고려하여 선정, 산 남쪽에 천마산스키장이 있음 천마산은 하늘 높이 솟아오른 산세가 빼어난 명산이다. 경춘국도를 타고 서울로 갈 때나 양평 서종면의 북한강변길을 가면서 보면 가히 군계일학이다. 자락의 평내와 마석, 오남리에 아파트숲이 들어차 호젓한 맛은 사라졌지만 본바탕은 어느 산에 대도 꿀리지 않을 만큼 준수하다. 그래 이곳을 지나던 이성계 \"\"가는 곳마다 청산은 많지만 저건 꼭 푸른 하늘에 홀(笏)을 꽂아놓은 것 같도다. 손이 석 자만 더 길다면 저 끝에서 하늘을 만질 수 있겠다(手長三尺可摩天)\"\"고 읊었다. 천마산이라는 넘치는 이름을 얻게 된 유래다. 정상부는 바위로 되어있지만 자락은 육산이라 봄철 신록과 가을 단풍이 곱다. \"\"화려한 슬픔\"\"이라고 할 만큼 아름다운 단풍이다. 스키장이 들어섰을 정도로 눈이 많아 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 230,
        "label": "산꼭대 들머리"
      },
      {
        "km": 1.5,
        "alt": 416,
        "label": "계곡 쉼터"
      },
      {
        "km": 2.8,
        "alt": 624,
        "label": "주능선 전망대"
      },
      {
        "km": 3.6,
        "alt": 810.3,
        "label": "정상"
      },
      {
        "km": 5.0,
        "alt": 491,
        "label": "하산 능선 갈림"
      },
      {
        "km": 6.6,
        "alt": 230,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "산꼭대 들머리",
        "alt": 230,
        "dist": 0,
        "note": "경기도 남양주시 오남읍 산행 기점"
      },
      {
        "name": "계곡 쉼터",
        "alt": 416,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "주능선 전망대",
        "alt": 624,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "천마산 정상 (810.3m)",
        "alt": 810.3,
        "dist": 3.6,
        "note": "산림청 100대 명산 천마산 최고봉"
      },
      {
        "name": "하산 능선 갈림길",
        "alt": 491,
        "dist": 5.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.7,
      "windSpeed": 4.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B2%9C%EB%A7%88%EC%82%B0_%28%EB%82%A8%EC%96%91%EC%A3%BC%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423739&fileSn=1"
  },
  {
    "id": "forest_20000094",
    "forestId": "20000094",
    "isForest100": true,
    "top20Rank": null,
    "name": "금정산",
    "subTitle": "부산 시민의 1일 등산코스 (산림청 100대 명산)",
    "location": "부산광역시 금정구ㆍ북구, 경상남도 양산시",
    "altitude": 800.8,
    "gain": 581,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 6.5,
    "duration": "3시간 30분",
    "rating": 4.82,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/%EA%B8%88%EC%A0%95%EC%82%B0.jpg/1280px-%EA%B8%88%EC%A0%95%EC%82%B0.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 800.8m] 산림이 울창하고 산세가 비교적 웅장하며 도심지 가까이 위치한 시민들의 휴식처인 점 등을 고려하여 선정, 역사적으로 나라를 지키는 호국의 산으로서 호국사찰 범어사와 우....",
    "fullDesc": "[산림청 100대 명산 선정이유] 산림이 울창하고 산세가 비교적 웅장하며 도심지 가까이 위치한 시민들의 휴식처인 점 등을 고려하여 선정, 역사적으로 나라를 지키는 호국의 산으로서 호국사찰 범어사와 우리나라 5대 산성의 하나인 금정산성이 있음. 낙동강 지류와 수영강의 분수계(分水界)를 이루고, 금강공원 및 성지곡공원 등이 있음 항도 부산의 진산 금정산은 시원한 조망과 아기자기한 산성, 명찰 범어사가 어우러진 산이다. 금정산이란 이름은 산꼭대기에 금빛을 띤, 샘이 있다는 데서 유래한다. 수많은 부산시민이 찾는 금정산은 높은 산세에다 동래온천장, 금강공원, 산성유원지 등 각종 위락시설들까지 있어 휴식처로 손색 없는 산이다. 병풍바위, 은벽, 대륙봉암장 등 부산 클라이머들을 키워낸 좋은 바위들도 많다. 또 금정산성은 비교적 잘 보존되어 훌륭한 역사교육의 장이기도 하다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 220,
        "label": "호국사 들머리"
      },
      {
        "km": 1.4,
        "alt": 406,
        "label": "범어사"
      },
      {
        "km": 2.7,
        "alt": 615,
        "label": "금정산성"
      },
      {
        "km": 3.6,
        "alt": 800.8,
        "label": "정상"
      },
      {
        "km": 4.9,
        "alt": 481,
        "label": "산꼭대"
      },
      {
        "km": 6.5,
        "alt": 220,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "호국사 들머리",
        "alt": 220,
        "dist": 0,
        "note": "부산광역시 금정구ㆍ북구 산행 기점"
      },
      {
        "name": "범어사",
        "alt": 406,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "금정산성",
        "alt": 615,
        "dist": 2.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "금정산 정상 (800.8m)",
        "alt": 800.8,
        "dist": 3.6,
        "note": "산림청 100대 명산 금정산 최고봉"
      },
      {
        "name": "산꼭대",
        "alt": 481,
        "dist": 4.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.8,
      "windSpeed": 4.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B8%88%EC%A0%95%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424517&fileSn=1"
  },
  {
    "id": "forest_20000219",
    "forestId": "20000219",
    "isForest100": true,
    "top20Rank": null,
    "name": "모악산",
    "subTitle": "호남사경의 하나 (산림청 100대 명산)",
    "location": "전라북도 김제시 금산면ㆍ전주시 완산구ㆍ완주군 구이면",
    "altitude": 795.2,
    "gain": 575,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "종주 코스"
    ],
    "distance": 6.5,
    "duration": "3시간 30분",
    "rating": 4.92,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/%EB%AA%A8%EC%95%85%EC%82%B0.jpg/1280px-%EB%AA%A8%EC%95%85%EC%82%B0.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 795.2m] 진달래와 철쭉이 유명한 호남 4경의 하나이며, 도립공원으로 지정(1971년)된 점 등을 고려하여 선정, 신라 말에 견훤이 이 곳을 근거로 후백제를 일으켰다고 전해짐.",
    "fullDesc": "[산림청 100대 명산 선정이유] 진달래와 철쭉이 유명한 호남 4경의 하나이며, 도립공원으로 지정(1971년)된 점 등을 고려하여 선정, 신라 말에 견훤이 이 곳을 근거로 후백제를 일으켰다고 전해짐. 국보 제62호인 미륵전을 비롯하여 대적광전(보물 제467호) 혜덕왕사응탑비(보물 제24호) 5층석탑(보물 제27호)등 많은 문화재가 있는 금산사(金山寺)가 있음. 특히 미륵전에 있는 높이 11.82m나 되는 미륵불이 유명 이름처럼 포근한 어머니산이다. 안으로 들어가보면 안다. 구성산(489.7m), 청도재, 상봉, 안덕봉(617m)을 잇는 마름모꼴 산릉이 물, 불, 바람 삼재(三災)를 막아주는 형세다. 이런 까닭에 강증산은 동학 난리 끝의 어수선한 상황에서 민중의 상처를 쓰다듬어주는 증산교를 창시할 수 있었다. 마름모꼴 가운데는 금산사가 있다. 국보 하나에다 보물을 무려 여덟이나 품었다. 모악산이 삼재불입지지임을 증명하는 절이다. 아름드리 벚나무 도열한 산사로 가는 길 들머리에는 일주문이 아니라 웬 성문이 길을 막고있다. 큰 마름모 안 가장 깊숙한 곳에 있는 작은 마름모의 꼭지점이다. 그렇게 경내로 들어가 바라보는 국보 미륵전. 그 안의 대불(大佛)은 \"\"불쌍한 중생들이여, 57억년 뒤 나...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 220,
        "label": "혜덕왕사응탑 들"
      },
      {
        "km": 1.4,
        "alt": 404,
        "label": "층석탑"
      },
      {
        "km": 2.7,
        "alt": 611,
        "label": "문화재"
      },
      {
        "km": 3.6,
        "alt": 795.2,
        "label": "정상"
      },
      {
        "km": 4.9,
        "alt": 479,
        "label": "금산사"
      },
      {
        "km": 6.5,
        "alt": 220,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "혜덕왕사응탑 들머리",
        "alt": 220,
        "dist": 0,
        "note": "전라북도 김제시 금산면ㆍ전주시 완산구ㆍ완주군 구이면 산행 기점"
      },
      {
        "name": "층석탑",
        "alt": 404,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "문화재",
        "alt": 611,
        "dist": 2.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "모악산 정상 (795.2m)",
        "alt": 795.2,
        "dist": 3.6,
        "note": "산림청 100대 명산 모악산 최고봉"
      },
      {
        "name": "금산사",
        "alt": 479,
        "dist": 4.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.8,
      "windSpeed": 4.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%AA%A8%EC%95%85%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423442&fileSn=1"
  },
  {
    "id": "forest_20000456",
    "forestId": "20000456",
    "isForest100": true,
    "top20Rank": null,
    "name": "오봉산",
    "subTitle": "동양화속에 다섯 개 바위 (산림청 100대 명산)",
    "location": "강원도 춘천시 북산면, 화천군 간동면",
    "altitude": 777.9,
    "gain": 558,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산",
      "일출 명소"
    ],
    "distance": 6.4,
    "duration": "3시간",
    "rating": 4.76,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/20241108%EC%9D%B4%EB%AF%B8%EC%84%A0%EC%98%A4%EB%B4%89%EC%82%B0.jpg/1280px-20241108%EC%9D%B4%EB%AF%B8%EC%84%A0%EC%98%A4%EB%B4%89%EC%82%B0.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 777.9m] 산세는 크지 않으나 바위와 수목이 어우러진 경관이 아름다운 점 등을 고려하여 선정, 다섯 개의 바위 봉이 연이어 솟아있는 데서 산이름이 유래.",
    "fullDesc": "[산림청 100대 명산 선정이유] 산세는 크지 않으나 바위와 수목이 어우러진 경관이 아름다운 점 등을 고려하여 선정, 다섯 개의 바위 봉이 연이어 솟아있는 데서 산이름이 유래. 신라때 아도화상이 창건하였다고 전해지는 청평사(淸平寺)와 구성폭포가 유명. 청평사 경내에 있는 보물 제164호인 회전문이 유명 봉만미와 계곡미가 뛰어난 데다 남으로 소양호, 북으로는 파로호가 보이는 명당에 자리잡았다. 고려시대 조경을 자랑한다는 절 청평사와 회전문(回轉門)이라는 특이한 이름의 문도 있다. 이 북쪽으로는 갈 수 있는 산이 없는 막장, 북위 38도다. 명산의 조건을 두루 갖춘 데다 호기심까지 자극하는 대상지가 아닐 수 없다. 춘천에서 양구로 향하는 46번 국도상의 배후령을 들머리로 하면 산행 또한 쉽다. 그러면서도 1봉 나한봉, 2봉 관음봉, 3봉 문수봉, 4봉 보현봉, 그리고 정상 비로봉의 핵심부를 놓치지 않는다. 다음 비경의 선동(仙洞)계곡으로 하산, 아홉 가지 소리를 낸다는 구성(九聲)폭포와 청평사를 구경하고 보물 146호의 회전문이 정말 돌아가는지 이름만 그런 문인지를 확인할 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 220,
        "label": "청평사 들머리"
      },
      {
        "km": 1.4,
        "alt": 399,
        "label": "구성폭포"
      },
      {
        "km": 2.7,
        "alt": 599,
        "label": "소양호"
      },
      {
        "km": 3.5,
        "alt": 777.9,
        "label": "정상"
      },
      {
        "km": 4.9,
        "alt": 471,
        "label": "파로호"
      },
      {
        "km": 6.4,
        "alt": 220,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "청평사 들머리",
        "alt": 220,
        "dist": 0,
        "note": "강원도 춘천시 북산면 산행 기점"
      },
      {
        "name": "구성폭포",
        "alt": 399,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "소양호",
        "alt": 599,
        "dist": 2.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "오봉산 정상 (777.9m)",
        "alt": 777.9,
        "dist": 3.5,
        "note": "산림청 100대 명산 오봉산 최고봉"
      },
      {
        "name": "파로호",
        "alt": 471,
        "dist": 4.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 8.9,
      "windSpeed": 4.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%98%A4%EB%B4%89%EC%82%B0_%28%EC%B6%98%EC%B2%9C%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423469&fileSn=1"
  },
  {
    "id": "forest_20000112",
    "forestId": "20000112",
    "isForest100": true,
    "top20Rank": null,
    "name": "내장산",
    "subTitle": "불타는 호남의 금강 (산림청 100대 명산)",
    "location": "전라북도 정읍시 내장동, 순창군 복흥면ㆍ쌍치면",
    "altitude": 763.5,
    "gain": 554,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.3,
    "duration": "3시간 30분",
    "rating": 4.77,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/%EB%82%B4%EC%9E%A5%EC%82%B0_%EB%82%A8%EC%B0%BD%EA%B3%84%EA%B3%A1.jpg/1280px-%EB%82%B4%EC%9E%A5%EC%82%B0_%EB%82%A8%EC%B0%BD%EA%B3%84%EA%B3%A1.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 763.5m] 기암괴석과 울창한 산림, 맑은 계류가 어울어진 호남 5대 명산의 하나로 국립공원으로 지정(1971년)되어 있는 점 등을 고려하여 선정, 내장사를 중심으로 서래봉에서 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 기암괴석과 울창한 산림, 맑은 계류가 어울어진 호남 5대 명산의 하나로 국립공원으로 지정(1971년)되어 있는 점 등을 고려하여 선정, 내장사를 중심으로 서래봉에서 불출봉, 연지봉, 까치봉, 신선봉, 장군봉에 이르기까지 산줄기가 말발굽처럼 둘러쳐져 마치 철옹성 같은 특이지형을 이룸. 내장사(內藏寺) 부속암자인 원적암 일대에 있는 비자림(천연기념물 제153호)이 특히 유명 우리나라에서 \"\"단풍\"\" 하면 제일 먼저 떠오르는 산이 바로 내장산이다. 동구부터 내장사까지 3킬로미터 남짓 되는 길가가 온통 단풍나무밭이다. 그래 단풍철이면 산 안통이 사람들로 인산인해를 이룬다. 단풍놀이를 온 사람들은 대개 골짜기 단풍만 구경하고 돌아간다. 그러나 진짜는 말굽형의 운두를 돌며 안통의 붉은 카핏을 내려다보는 것이다. 월영봉, 서래봉, 망해봉, 연지봉, 까치봉, 상봉 신선봉, 연자봉(문필봉), 장군봉이다. 써레처럼 생겼다 하여 서래봉이 된 톱날 같은 암봉은 내장산의 최고 명경이다. 그 경치를 감상할 데는 벽련암 중문으로 소설가 문순태 선생이 가장 아끼는 풍경이기도 하다. 서래봉 중턱에는 수령이 700살이나 되는 단풍나무가 있다. 높이가 20m, 둘레는 4m...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 210,
        "label": "내장사 들머리"
      },
      {
        "km": 1.4,
        "alt": 387,
        "label": "서래봉"
      },
      {
        "km": 2.6,
        "alt": 587,
        "label": "불출봉"
      },
      {
        "km": 3.5,
        "alt": 763.5,
        "label": "정상"
      },
      {
        "km": 4.8,
        "alt": 459,
        "label": "연지봉"
      },
      {
        "km": 6.3,
        "alt": 210,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "내장사 들머리",
        "alt": 210,
        "dist": 0,
        "note": "전라북도 정읍시 내장동 산행 기점"
      },
      {
        "name": "서래봉",
        "alt": 387,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "불출봉",
        "alt": 587,
        "dist": 2.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "내장산 정상 (763.5m)",
        "alt": 763.5,
        "dist": 3.5,
        "note": "산림청 100대 명산 내장산 최고봉"
      },
      {
        "name": "연지봉",
        "alt": 459,
        "dist": 4.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.0,
      "windSpeed": 4.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%82%B4%EC%9E%A5%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424370&fileSn=1"
  },
  {
    "id": "forest_20000227",
    "forestId": "20000227",
    "isForest100": true,
    "top20Rank": null,
    "name": "무학산",
    "subTitle": "산세를 보아하니 춤추는 학 같아 (산림청 100대 명산)",
    "location": "경상남도 창원시 교방동",
    "altitude": 761.4,
    "gain": 551,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 6.3,
    "duration": "3시간 30분",
    "rating": 4.77,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Naknamjeongmaek.jpg/1280px-Naknamjeongmaek.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 761.4m] 도시민의 휴식처로서 경관이 좋은 아기자기한 능선과 다도해를 바라다보는 조망이 좋은 점 등을 고려하여 선정정상 북서쪽에 있는 시루봉 일대의 바위는 좋은 암벽등반 훈련장임.",
    "fullDesc": "[산림청 100대 명산 선정이유] 도시민의 휴식처로서 경관이 좋은 아기자기한 능선과 다도해를 바라다보는 조망이 좋은 점 등을 고려하여 선정정상 북서쪽에 있는 시루봉 일대의 바위는 좋은 암벽등반 훈련장임. 예전부터 양조업이 성할 정도로 수질이 좋음 서원골 입구에 최치원의 제자들이 세운 관해정(觀海亭)이 있고 부근 원각사, 백운사 등이 유명 백두대간의 끝자락인 지리산 삼신봉에서 시작되는 낙남정맥의 상좌격인 무학봉은 마산의 진산(鎭山)으로 마산만과 진해만을 굽어보며 바다를 향해 학이 날개를 펼친 듯 아름다운 형상을 하고 있다. 명산이 갖추어야 할 면모를 두루 갖추고 있는 이 산은 바닷가에 위치한 산답게 시원한 조망을 만끽할 수 있으며 주능선 등로엔 억새밭과 암봉 전망대가 있어 편안한 느낌을 준다. 대곡산 아래쪽에는 `만날고개'가 있는데 이곳은 가정형편이 어려워 댓가를 받고 시집 보낸 딸을 그리워하던 어미와 그 딸이 그리움을 참지 못해 고갯마루에 올랐다가 우연히 만났다는 애틋한 전설이 전해지는 고개다. 무학산의 옛이름은 풍장산이었는데 신라말 최치원이 이곳에 머물면서 산세를 보니 학이 나는 형세같다하여 무학산이라 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 210,
        "label": "시루봉 들머리"
      },
      {
        "km": 1.4,
        "alt": 386,
        "label": "원각사"
      },
      {
        "km": 2.6,
        "alt": 585,
        "label": "백운사"
      },
      {
        "km": 3.5,
        "alt": 761.4,
        "label": "정상"
      },
      {
        "km": 4.8,
        "alt": 458,
        "label": "백두대"
      },
      {
        "km": 6.3,
        "alt": 210,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "시루봉 들머리",
        "alt": 210,
        "dist": 0,
        "note": "경상남도 창원시 교방동 산행 기점"
      },
      {
        "name": "원각사",
        "alt": 386,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "백운사",
        "alt": 585,
        "dist": 2.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "무학산 정상 (761.4m)",
        "alt": 761.4,
        "dist": 3.5,
        "note": "산림청 100대 명산 무학산 최고봉"
      },
      {
        "name": "백두대",
        "alt": 458,
        "dist": 4.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.1,
      "windSpeed": 4.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%AC%B4%ED%95%99%EC%82%B0_%28%EA%B2%BD%EB%82%A8%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424044&fileSn=1"
  },
  {
    "id": "forest_20000681",
    "forestId": "20000681",
    "isForest100": true,
    "top20Rank": null,
    "name": "화왕산",
    "subTitle": "봄에는 철쭉 화원, 가을에는 억새꽃밭 (산림청 100대 명산)",
    "location": "경상남도 창녕군 창녕읍 옥천리 일대",
    "altitude": 757.7,
    "gain": 548,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "단풍",
      "설산"
    ],
    "distance": 6.2,
    "duration": "3시간",
    "rating": 4.94,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423719&fileSn=1",
    "shortDesc": "[산림청 공식 757.7m] 억새밭과 진달래 군락 등 경관이 아름다우며 화왕산성, 목마산성 등이 있고 군립공원인 점 등을 고려하여 선정, 해마다 정월대보름이 되면 정상 일대의 억새평전에서 달맞이....",
    "fullDesc": "[산림청 100대 명산 선정이유] 억새밭과 진달래 군락 등 경관이 아름다우며 화왕산성, 목마산성 등이 있고 군립공원인 점 등을 고려하여 선정, 해마다 정월대보름이 되면 정상 일대의 억새평전에서 달맞이 행사가 열림. 정상에 화산활동으로 생긴 분화구 못(용지)이 3개 있음. 송현동 고분군 및 석불좌상, 대웅전 등 4점의 보물이 있는 관룡사 등이 유명 창녕읍의 진산으로 관룡산과 더불어 화왕산 군립공원을 이룬다. 화왕산 하면 억새를 떠올릴 만큼 억새의 대명사이기도 하다. ６만여평의 대평원에 십리 억새밭. 억새의 크기가 사람 키 높이를 훨씬 넘는다. 이것을 한 바퀴 도는 데 한 시간 남짓 걸린다． 가을에는 이곳에서 국내 최대의 야간축제가 벌어진다. 전국 각지에서 1만여명이 운집한 가운데 산신제와 의병추모제를 비롯, 통일기원 횃불행진을 펼쳐 일대 장관을 이룬다. 화왕산은 진달래 명산이기도 하다. 관룡산 정상으로 이어지는 6.5km 능선 등산로를 따라 진달래가 이어진다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 210,
        "label": "화왕산성 들머리"
      },
      {
        "km": 1.4,
        "alt": 385,
        "label": "목마산성"
      },
      {
        "km": 2.6,
        "alt": 583,
        "label": "정월대"
      },
      {
        "km": 3.4,
        "alt": 757.7,
        "label": "정상"
      },
      {
        "km": 4.7,
        "alt": 457,
        "label": "억새평전"
      },
      {
        "km": 6.2,
        "alt": 210,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "화왕산성 들머리",
        "alt": 210,
        "dist": 0,
        "note": "경상남도 창녕군 창녕읍 옥천리 일대 산행 기점"
      },
      {
        "name": "목마산성",
        "alt": 385,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "정월대",
        "alt": 583,
        "dist": 2.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "화왕산 정상 (757.7m)",
        "alt": 757.7,
        "dist": 3.4,
        "note": "산림청 100대 명산 화왕산 최고봉"
      },
      {
        "name": "억새평전",
        "alt": 457,
        "dist": 4.7,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.1,
      "windSpeed": 4.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%99%94%EC%99%95%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423719&fileSn=1"
  },
  {
    "id": "forest_20000276",
    "forestId": "20000276",
    "isForest100": true,
    "top20Rank": null,
    "name": "백암산",
    "subTitle": "산하면 내장, 고적하면 백암 (산림청 100대 명산)",
    "location": "전라북도 순창군 복흥면, 전라남도 장성군 북하면",
    "altitude": 741.2,
    "gain": 531,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.7,
    "duration": "3시간 30분",
    "rating": 4.8,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Baekyangsan.JPG/1280px-Baekyangsan.JPG?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 741.2m] 봄이면 백양, 가을이면 내장이라 하듯이 경관이 수려하고 천연기념물인 비자나무와 굴거리나무가 집단분포하고 있으며, 내장산국립공원구역에 포함되어 있는 점 등을 고려하여 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 봄이면 백양, 가을이면 내장이라 하듯이 경관이 수려하고 천연기념물인 비자나무와 굴거리나무가 집단분포하고 있으며, 내장산국립공원구역에 포함되어 있는 점 등을 고려하여 선정, 학바위, 백양산 12경, 영천굴 등이 있음. 소요대사부도, 대웅전, 극락보전, 사천왕문을 포함하여 청류암의 관음전, 경관이 아름다운 쌍계루 등 수많은 문화유산들을 보존하고 있는 백양사(白羊寺)가 유명 백암산은 드넓은 호남평야를 마주하고 솟아오른 높이 741.2m의 산으로 내장산 국립공원에 속한다. 옛부터 봄이면 백양, 가을이면 내장이라 했듯이 산하면 내장, 고적하면 백암이라 할 정도로 백암산의 절경은 내장산에 뒤지지 않는다. 백학봉과 상왕봉, 사자봉, 등의 기암괴석이 곳곳에 있으며, 산세가 험준한 편이다. 특히 비자나무숲과 회색 줄무늬 다람쥐가 유명한 이곳에는 대한 불교 조계종 18교구 본산인 대사찰 백양사도 있다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 210,
        "label": "영천굴 들머리"
      },
      {
        "km": 1.5,
        "alt": 380,
        "label": "소요대사"
      },
      {
        "km": 2.8,
        "alt": 571,
        "label": "청류암"
      },
      {
        "km": 3.7,
        "alt": 741.2,
        "label": "정상"
      },
      {
        "km": 5.1,
        "alt": 449,
        "label": "백양사"
      },
      {
        "km": 6.7,
        "alt": 210,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "영천굴 들머리",
        "alt": 210,
        "dist": 0,
        "note": "전라북도 순창군 복흥면 산행 기점"
      },
      {
        "name": "소요대사",
        "alt": 380,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "청류암",
        "alt": 571,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "백암산 정상 (741.2m)",
        "alt": 741.2,
        "dist": 3.7,
        "note": "산림청 100대 명산 백암산 최고봉"
      },
      {
        "name": "백양사",
        "alt": 449,
        "dist": 5.1,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.2,
      "windSpeed": 4.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%B1%EC%95%94%EC%82%B0_%28%EC%A0%84%EB%9D%BC%EB%8F%84%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424239&fileSn=1"
  },
  {
    "id": "dobongsan",
    "forestId": "20000155",
    "isForest100": true,
    "top20Rank": null,
    "name": "도봉산 (자운봉)",
    "subTitle": "거미줄처럼 얽힌 미로의 산, 푸른 하늘 깎아세운 만 길 화강암 봉우리 (산림청 100대 명산)",
    "location": "서울특별시 도봉구, 경기도 의정부시 호원동ㆍ양주시 장흥면",
    "altitude": 740.2,
    "gain": 620,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.8,
    "duration": "4시간",
    "rating": 4.85,
    "image": "https://upload.wikimedia.org/wikipedia/ko/b/be/Dobongsan.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 740.2m] 최고봉 자운봉(740.2m)과 만장봉·선인봉·오봉, 포대능선과 3대 계곡의 암산.",
    "fullDesc": "도봉산(산림청 공식 740.2m)은 우이령을 경계로 북한산과 나란히 솟아 북한산국립공원(1983년 지정)을 이루는 명산입니다. 최고봉인 자운봉(740.2m)을 중심으로 만장봉, 선인봉, 주봉, 신선봉과 서쪽의 오봉까지 모두 빛나는 화강암 첨봉으로 이루어져 봉만미(峰巒美)가 탁월합니다. 대공포진지가 있었다 하여 이름 붙은 포대능선~자운봉~칼바위~우이암 능선이 등뼈를 이루며, 3대 계곡(문사동계곡, 망월사계곡/원도봉계곡, 보문사계곡/무수골)과 송추계곡, 그리고 회룡사·망월사·천축사·보문사가 유명합니다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 120,
        "label": "도봉유원지/망월사"
      },
      {
        "km": 1.8,
        "alt": 350,
        "label": "문사동/천축사"
      },
      {
        "km": 2.6,
        "alt": 520,
        "label": "마당바위"
      },
      {
        "km": 3.4,
        "alt": 740.2,
        "label": "자운봉·신선대(740.2m)"
      },
      {
        "km": 4.1,
        "alt": 710,
        "label": "포대능선"
      },
      {
        "km": 6.8,
        "alt": 120,
        "label": "원도봉/회룡사"
      }
    ],
    "waypoints": [
      {
        "name": "도봉유원지 / 원도봉계곡 들머리",
        "alt": 120,
        "dist": 0,
        "note": "도봉산 7대 산행 기점 중 대표 진입로"
      },
      {
        "name": "마당바위 & 천축사",
        "alt": 520,
        "dist": 2.6,
        "note": "선인봉·만장봉 암벽 조망 쉼터"
      },
      {
        "name": "자운봉 (740.2m) & 신선봉",
        "alt": 740.2,
        "dist": 3.4,
        "note": "도봉산 최고봉(740.2m)과 암봉 파노라마"
      },
      {
        "name": "포대능선 & Y계곡",
        "alt": 710,
        "dist": 4.1,
        "note": "대공포진지 포대에서 유래한 주능선 암릉"
      }
    ],
    "checklist": [
      "미끄럼 방지 암릉화(릿지화)",
      "철 난간 파지용 장갑",
      "물 1L 및 등산 지도 (갈림길이 100여 개로 많음)"
    ],
    "weather": {
      "baseTemp": 14.5,
      "peakTemp": 9.7,
      "windSpeed": 3.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%8F%84%EB%B4%89%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424374&fileSn=1"
  },
  {
    "id": "forest_20000261",
    "forestId": "20000261",
    "isForest100": true,
    "top20Rank": null,
    "name": "방장산",
    "subTitle": "나그네의 봇짐을 털던 도적떼의 은둔지 (산림청 100대 명산)",
    "location": "전라남도 장성군, 전라북도 고창군 신림면ㆍ정읍시 입암면",
    "altitude": 733.6,
    "gain": 524,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 6.7,
    "duration": "3시간 30분",
    "rating": 4.88,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423605&fileSn=1",
    "shortDesc": "[산림청 공식 733.6m] 옛부터 지리산, 무등산과 함께 호남의 삼신산으로 불려져 왔으며, 전북과 전남을 양분하는 산으로서 산세가 웅장하고 자연휴양림인 점 등을 고려하여 선정.",
    "fullDesc": "[산림청 100대 명산 선정이유] 옛부터 지리산, 무등산과 함께 호남의 삼신산으로 불려져 왔으며, 전북과 전남을 양분하는 산으로서 산세가 웅장하고 자연휴양림인 점 등을 고려하여 선정. 옛이름은 방등산으로 백제가요중 \"방등산가\"의 방등산이 바로 방장산임. 정상에서 멀리 서해바다와 동쪽으로 무등산이 보임 호남고속국도를 타고 남으로 가다보면 호남평야가 끝나면서 길이 산으로 들어간다. 왼쪽에서는 입암산 정상의 농바위가 문인화처럼 인상적인데 오른쪽으로는 포장(布帳)처럼 장대한 산이 솟아있다. 방장산이다. 평지에서 불쑥 솟구친 데다 능선들이 일필휘지로 그린 듯 단순하다. 그만큼 전망이 좋아 고창읍내와 주변 평야는 물론이고 그곳의 명소 모양성까지, 그림지도처럼 생생하게 보인다. '절집의 원로'라는 뜻의 이름이지만 관련은 없다. 백제때는 방등산(方等山)으로 불렸다고 하는데 그게 구개음화되어 방증산, 모음동화되어 방장산으로 바뀐 듯하다. '모 방'자니 원래는 모등이었을 것이다. 고창의 옛이름이 모양부리니 '모양의 등'이라는 뜻이었겠다. 상봉 서남쪽의 벽오봉을 방문산이라고도 하는데 어처...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 210,
        "label": "벽오봉 들머리"
      },
      {
        "km": 1.5,
        "alt": 378,
        "label": "의상봉"
      },
      {
        "km": 2.8,
        "alt": 566,
        "label": "기상봉"
      },
      {
        "km": 3.7,
        "alt": 733.6,
        "label": "정상"
      },
      {
        "km": 5.1,
        "alt": 446,
        "label": "덕유산자연휴양림"
      },
      {
        "km": 6.7,
        "alt": 210,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "벽오봉 들머리",
        "alt": 210,
        "dist": 0,
        "note": "전라남도 장성군 산행 기점"
      },
      {
        "name": "의상봉",
        "alt": 378,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "기상봉",
        "alt": 566,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "방장산 정상 (733.6m)",
        "alt": 733.6,
        "dist": 3.7,
        "note": "산림청 100대 명산 방장산 최고봉"
      },
      {
        "name": "덕유산자연휴양림",
        "alt": 446,
        "dist": 5.1,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.2,
      "windSpeed": 4.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B0%A9%EC%9E%A5%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423605&fileSn=1"
  },
  {
    "id": "forest_20000622",
    "forestId": "20000622",
    "isForest100": true,
    "top20Rank": null,
    "name": "추월산",
    "subTitle": "마르지 않는 약수터를 품은 산 (산림청 100대 명산)",
    "location": "전라남도 담양군 용면, 전라북도 순창군 복흥면",
    "altitude": 731.2,
    "gain": 531,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.7,
    "duration": "3시간 30분",
    "rating": 4.81,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424027&fileSn=1",
    "shortDesc": "[산림청 공식 731.2m] 울창한 산림과 담양호가 어우려져 경관이 아름다우며 추월난이 자생하는 점 등을 고려하여 선정, 산 정상에서 65m 정도 아래 지점에 있는 보리암(菩提庵)과 전라북도 순....",
    "fullDesc": "[산림청 100대 명산 선정이유] 울창한 산림과 담양호가 어우려져 경관이 아름다우며 추월난이 자생하는 점 등을 고려하여 선정, 산 정상에서 65m 정도 아래 지점에 있는 보리암(菩提庵)과 전라북도 순창을 경계로 한 산록에 있는 용추사가 유명 가을이면 산봉우리가 보름달에 맞닿을 정도로 높다고 해 이름지어진 추월산은 마치 충북의 월악산을 담양에 옮겨놓은 듯 기암절벽의 절경과 함게 절벽끝에 아슬아슬 매달린 듯한 보리암은 보는 것만으로도 가슴이 움츠러들게 만든다. 보리암의 창건자나 연대는 분명하지 않지만 전설에 따르면 보조국사 지눌이 지리산 천왕봉에서 나무로 깎은 세마리의 새 중 한마리가 날아와 앉은 곳이 추월산 보리암이라고 한다. 또한 임진왜란때 절명한 김덕령 장군의 부인 흥양 이씨가 왜병에게 쫓기자 보리암의 절벽 아래로 몸을 던져 순절했다는 곳이다. 지명에서 알 수 있듯이 단풍나무가 많아 온산이 붉게 물드는 가을이 가장 아름다우며 산을 오르다 아래로 보이는 담양호의 푸른 물결은 보는 이의 가슴을 시원하게 뚫어준다...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 200,
        "label": "담양호 들머리"
      },
      {
        "km": 1.5,
        "alt": 370,
        "label": "보리암"
      },
      {
        "km": 2.8,
        "alt": 561,
        "label": "용추사"
      },
      {
        "km": 3.7,
        "alt": 731.2,
        "label": "정상"
      },
      {
        "km": 5.1,
        "alt": 439,
        "label": "보조국사"
      },
      {
        "km": 6.7,
        "alt": 200,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "담양호 들머리",
        "alt": 200,
        "dist": 0,
        "note": "전라남도 담양군 용면 산행 기점"
      },
      {
        "name": "보리암",
        "alt": 370,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "용추사",
        "alt": 561,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "추월산 정상 (731.2m)",
        "alt": 731.2,
        "dist": 3.7,
        "note": "산림청 100대 명산 추월산 최고봉"
      },
      {
        "name": "보조국사",
        "alt": 439,
        "dist": 5.1,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.2,
      "windSpeed": 4.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B6%94%EC%9B%94%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424027&fileSn=1"
  },
  {
    "id": "forest_20000591",
    "forestId": "20000591",
    "isForest100": true,
    "top20Rank": null,
    "name": "천관산",
    "subTitle": "하늘을 찌르는 듯한 산 (산림청 100대 명산)",
    "location": "전라남도 장흥군 관산읍, 대덕읍",
    "altitude": 724.3,
    "gain": 524,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 6.7,
    "duration": "3시간",
    "rating": 4.96,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424338&fileSn=1",
    "shortDesc": "[산림청 공식 724.3m] 호남의 5대 명산으로 꼽을 만큼 경관이 아름다우며 조망이 좋고 도립공원으로 지정(1998년)된 점 등을 고려하여 선정, 신라시대에 세워진 천관사와 동백숲이 유명하고,....",
    "fullDesc": "[산림청 100대 명산 선정이유] 호남의 5대 명산으로 꼽을 만큼 경관이 아름다우며 조망이 좋고 도립공원으로 지정(1998년)된 점 등을 고려하여 선정, 신라시대에 세워진 천관사와 동백숲이 유명하고, 자연휴양림이 있음 비사릿대로 만든 닭의장태 모양의 산이다. 400미터 등고선을 기준으로 하여 산의 얼개를 파악해보면 그 비사릿대, 능선이 스무 개나 된다. 하여 전체적으로 거대한 돔을 이루어 보는 이를 압도한다. 시월 첫째주말에 억새제를 열 만큼 억새를 자랑한다. 바닷바람 때문에 나무가 자라지 못하기 때문이리라. 상봉 연대봉에서 환희대 사이의 주릉 등서리에만 있을 뿐인데도 전국의 인파가 몰려든다. 육지에서 찾아갈 때는 관산읍이 들머리가 되는 까닭에 관산의 산으로 알려져있지만 애초에는 대덕읍 회진(會津)과의 인연이 더 깊었을 듯하다. 하늬바람산이라는 뜻의 천풍산(天風山)으로도 불렸기 때문이다. 장흥반도 끝머리의 이 포구는 아주 오랜 옛날부터 남해항로의 중요 거점이었다. 그래 백제 근초고왕이 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 200,
        "label": "신라시대 들머리"
      },
      {
        "km": 1.5,
        "alt": 368,
        "label": "천관사"
      },
      {
        "km": 2.8,
        "alt": 556,
        "label": "비사릿대"
      },
      {
        "km": 3.7,
        "alt": 724.3,
        "label": "정상"
      },
      {
        "km": 5.1,
        "alt": 436,
        "label": "연대봉"
      },
      {
        "km": 6.7,
        "alt": 200,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "신라시대 들머리",
        "alt": 200,
        "dist": 0,
        "note": "전라남도 장흥군 관산읍 산행 기점"
      },
      {
        "name": "천관사",
        "alt": 368,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "비사릿대",
        "alt": 556,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "천관산 정상 (724.3m)",
        "alt": 724.3,
        "dist": 3.7,
        "note": "산림청 100대 명산 천관산 최고봉"
      },
      {
        "name": "연대봉",
        "alt": 436,
        "dist": 5.1,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.3,
      "windSpeed": 4.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B2%9C%EA%B4%80%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424338&fileSn=1"
  },
  {
    "id": "forest_20000573",
    "forestId": "20000573",
    "isForest100": true,
    "top20Rank": null,
    "name": "주왕산",
    "subTitle": "후주천왕의 은둔지 (산림청 100대 명산)",
    "location": "경상북도 청송군 청송읍ㆍ부동면, 영덕군 지품면ㆍ달산면",
    "altitude": 722.1,
    "gain": 522,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.7,
    "duration": "3시간",
    "rating": 4.78,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/%EC%A3%BC%EC%99%95%EC%82%B0_%28_2_%29.jpg/1280px-%EC%A3%BC%EC%99%95%EC%82%B0_%28_2_%29.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 722.1m] 석병산으로 불리울 만큼 기암괴봉과 석벽이 병풍처럼 둘러서 경관이 아름다우며 국립공원으로 지정(1976년)된 점 등을 고려하여 선정, 대전사(大典寺), 주왕암이 있음.",
    "fullDesc": "[산림청 100대 명산 선정이유] 석병산으로 불리울 만큼 기암괴봉과 석벽이 병풍처럼 둘러서 경관이 아름다우며 국립공원으로 지정(1976년)된 점 등을 고려하여 선정, 대전사(大典寺), 주왕암이 있음. 주왕굴을 중심으로 남아있는 자하성의 잔해는 주왕과 고려군의 싸움의 전설이 깃들여 있는 곳으로 유명 하늘을 나는 재주 없이는 들어갈 수 없는 동천(洞天). 협곡의 입구로는 급류가 쏟아나오고 깎아지른 양쪽 절벽은 높이를 가늠할 수 없다. 무협소설에나 등장함직한 풍경. 그렇지만 이땅에도 그런 산이 있었다. 70년대의 어리석은 사람들이 제1폭포 앞뒤 절벽을 파 길을 내지 않았더라면 주왕동천은 아직껏 들어가본 사람이 없었으리라. 금은광이나 가메봉 옆 잘루목을 넘어갈 수는 있었어도 정면 동구로 들어간 이는 전무했을 것이다. 엄청난 가뭄으로 주왕계곡 물이 모두 말라붙기 전에는. 그래서 전설 어린 명소들은 모두 동구 아래 모여있다. 전설의 시대가 끝난 뒤에 발견된 터라 폭포 이름 또한 그냥 제1·제2·제3폭포다. 나아가 계곡 끝의 907봉을 무시하고 아직껏 721봉에 대표성을 부여하...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 200,
        "label": "기암괴봉 들머리"
      },
      {
        "km": 1.5,
        "alt": 367,
        "label": "대전사"
      },
      {
        "km": 2.8,
        "alt": 555,
        "label": "주왕암"
      },
      {
        "km": 3.7,
        "alt": 722.1,
        "label": "정상"
      },
      {
        "km": 5.1,
        "alt": 435,
        "label": "주왕굴"
      },
      {
        "km": 6.7,
        "alt": 200,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "기암괴봉 들머리",
        "alt": 200,
        "dist": 0,
        "note": "경상북도 청송군 청송읍ㆍ부동면 산행 기점"
      },
      {
        "name": "대전사",
        "alt": 367,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "주왕암",
        "alt": 555,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "주왕산 정상 (722.1m)",
        "alt": 722.1,
        "dist": 3.7,
        "note": "산림청 100대 명산 주왕산 최고봉"
      },
      {
        "name": "주왕굴",
        "alt": 435,
        "dist": 5.1,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.3,
      "windSpeed": 4.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%A3%BC%EC%99%95%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423561&fileSn=1"
  },
  {
    "id": "forest_20000606",
    "forestId": "20000606",
    "isForest100": true,
    "top20Rank": null,
    "name": "천태산",
    "subTitle": "홍건적의 난을 평정한 산 (산림청 100대 명산)",
    "location": "충청북도 영동군 양산면, 충청남도 금산면 제원면",
    "altitude": 714.3,
    "gain": 514,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.6,
    "duration": "3시간",
    "rating": 4.88,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424340&fileSn=1",
    "shortDesc": "[산림청 공식 714.3m] 충북의 설악산으로 불려질 만큼 경관이 아름다운 점 등을 고려하여 선정, 고려시대 대각국사 의천이 창건한 영국사와 수령이 약 500년 된 은행나무(천연기념물 제223호....",
    "fullDesc": "[산림청 100대 명산 선정이유] 충북의 설악산으로 불려질 만큼 경관이 아름다운 점 등을 고려하여 선정, 고려시대 대각국사 의천이 창건한 영국사와 수령이 약 500년 된 은행나무(천연기념물 제223호), 3층석탑(보물 제533호), 원각국사비(보물 제534호) 등이 유명 천태산(715.2m)은 기암괴석이 도처에 기기묘묘한 형상을 이루며 일대 장관을 연출하는 산이다. 비단으로 수놓은 듯한 기암괴석을 밧줄을 타고 오르는 암벽등반코스 등 여러 곳의 등산로가 개설되어 있어 많은 등산동호인들의 발길이 끊이지 않고, 가족산행지로도 각광받고 있다. 특히 양산팔경이 이곳 영국사를 제1경으로 시작되고 많은 문화유적들이 그 신비함을 더해주는 산이다. 영국사를 오르는 골짜기 풍경이 매우 아름다우며, 기암절벽에서 쏟아져 내리는 용추폭포(3단)와 천년 정도로 추정되는 은행나무가 천태산을 찾는 등산인들을 맞이한다. 천태산에는 보물 4점, 지방유형문화재 2점, 천연기념물 1점 등이 있어 역사가 살아 숨쉬는 곳이기도 하다. 이밖에도 공민왕이 옥새를 숨겨두었다는 옥새봉...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 200,
        "label": "고려시대 들머리"
      },
      {
        "km": 1.5,
        "alt": 364,
        "label": "대각국사"
      },
      {
        "km": 2.8,
        "alt": 550,
        "label": "영국사"
      },
      {
        "km": 3.6,
        "alt": 714.3,
        "label": "정상"
      },
      {
        "km": 5.0,
        "alt": 431,
        "label": "층석탑"
      },
      {
        "km": 6.6,
        "alt": 200,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "고려시대 들머리",
        "alt": 200,
        "dist": 0,
        "note": "충청북도 영동군 양산면 산행 기점"
      },
      {
        "name": "대각국사",
        "alt": 364,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "영국사",
        "alt": 550,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "천태산 정상 (714.3m)",
        "alt": 714.3,
        "dist": 3.6,
        "note": "산림청 100대 명산 천태산 최고봉"
      },
      {
        "name": "층석탑",
        "alt": 431,
        "dist": 5.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.4,
      "windSpeed": 4.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B2%9C%ED%83%9C%EC%82%B0_%28%EC%B6%A9%EC%B2%AD%EB%8F%84%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424340&fileSn=1"
  },
  {
    "id": "forest_20000111",
    "forestId": "20000111",
    "isForest100": true,
    "top20Rank": null,
    "name": "내연산",
    "subTitle": "신비의 거울을 묻은 흙산 (산림청 100대 명산)",
    "location": "경상북도 포항시 송라면ㆍ청하면ㆍ죽장면, 영덕군 남정면",
    "altitude": 711.3,
    "gain": 511,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "종주 코스"
    ],
    "distance": 6.6,
    "duration": "3시간 30분",
    "rating": 4.76,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424369&fileSn=1",
    "shortDesc": "[산림청 공식 711.3m] 남쪽의 천령산 줄기와 마주하면서 그 사이에 험준한 협곡을 형성하고 있는 청하골이 유명.",
    "fullDesc": "[산림청 100대 명산 선정이유] 남쪽의 천령산 줄기와 마주하면서 그 사이에 험준한 협곡을 형성하고 있는 청하골이 유명. 원진국사사리탑(보물 제430호)과 원진국사비(보물 제252호)가 보존된 보경사(寶鏡寺) 등이 있음 낙동정맥 줄기가 주왕산을 옆으로 지나쳐 내려오다가 동해안 쪽으로 뻗어가 솟은 산이 바로 내연산이다. 경상북도 포항시와 영덕군의 경계에 있는 내연산은 문수산(622m), 삼지봉(내연산 정상, 711.3m), 향로봉(932.4m), 우척봉(천령산, 774.8m)으로 능선이 이어져 있다. 완만하게 능선이 이어지는 육산이라 밋밋한듯 보이기도 하지만, 굽이굽이 20리나 되는 긴 골에는 12폭포가 자리하고 있다. 내연산의 백미는 기암절벽과 조화를 이뤄 절경을 자랑하는 청하골의 12폭포이다. 청하골(내연골) 초입의 상생폭포를 제1폭포로 하여 보현폭, 삼보폭, 잠룡폭, 무룡폭을 거쳐 제6폭포인 관음폭과 제7폭포인 연산폭 일대에서 계곡미의 진수를 보여준다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 200,
        "label": "원진국사사리탑 "
      },
      {
        "km": 1.5,
        "alt": 364,
        "label": "원진국사"
      },
      {
        "km": 2.8,
        "alt": 547,
        "label": "보경사"
      },
      {
        "km": 3.6,
        "alt": 711.3,
        "label": "정상"
      },
      {
        "km": 5.0,
        "alt": 430,
        "label": "삼지봉"
      },
      {
        "km": 6.6,
        "alt": 200,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "원진국사사리탑 들머리",
        "alt": 200,
        "dist": 0,
        "note": "경상북도 포항시 송라면ㆍ청하면ㆍ죽장면 산행 기점"
      },
      {
        "name": "원진국사",
        "alt": 364,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "보경사",
        "alt": 547,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "내연산 정상 (711.3m)",
        "alt": 711.3,
        "dist": 3.6,
        "note": "산림청 100대 명산 내연산 최고봉"
      },
      {
        "name": "삼지봉",
        "alt": 430,
        "dist": 5.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.4,
      "windSpeed": 4.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%82%B4%EC%97%B0%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424369&fileSn=1"
  },
  {
    "id": "forest_20000934",
    "forestId": "20000934",
    "isForest100": true,
    "top20Rank": null,
    "name": "금산",
    "subTitle": "이성계가 비단으로 덮겠다던 산 (산림청 100대 명산)",
    "location": "경상남도 남해군 상주면ㆍ이동면ㆍ삼동면",
    "altitude": 704.9,
    "gain": 505,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "일출 명소"
    ],
    "distance": 6.6,
    "duration": "3시간",
    "rating": 4.94,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/38/Geumsan_of_Namhae%2C_Korea.jpg/1280px-Geumsan_of_Namhae%2C_Korea.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 704.9m] ? 한려해상국립공원의 유일한 산악공원으로 경관이 수려하고, 바다와 섬, 일출을 조망할 수 있으며 경상남도 기념물로 지정(1974년)된 점 등을 고려하여 선정본래 보광....",
    "fullDesc": "[산림청 100대 명산 선정이유] ? 한려해상국립공원의 유일한 산악공원으로 경관이 수려하고, 바다와 섬, 일출을 조망할 수 있으며 경상남도 기념물로 지정(1974년)된 점 등을 고려하여 선정본래 보광산이라고 불리다가 조선 태조와 관련된 전설에 따라 금산으로 이름이 바뀌었다고 함. 조선 태조가 기도했다는 이씨기단을 비롯하여, 사자암, 촉대봉, 향로봉 등 38경이 유명하며, 정상에는 우리나라 3대 기도처의 하나인 보리암이 소재 남해에는 비단으로 몸을 감싼 산이 있다. 비단 금(錦)자에 뫼 산(山)자를 이름으로 한 금산이다. 금산은 원래 원효대사가 산자락에 보광사라는 사찰을 지음으로 해서 보광산이라 불렸다고 한다. 그런데 이성계가 임금이 되기 전 이 산에서 기도를 하며 임금이 되게 해주면 금산 전체를 비단으로 둘러주기로 약속했다. 그러나 막상 그 넓은 산을 비단으로 두를 일을 걱정하다 진짜 비단이 아닌 비단 금자를 사용해 금산이라 이름을 지어줌으로 약속을 지켰다고 한다. 금산에 오르면 원효대사가 신라 신문왕 3년에 창건했다는 보리암과 가야의 김수로왕의 부인인 허태후가 인도 아유타국에서 가지고 온 돌로 만들었다고 전해지는 삼층석탑뿐 아니라 관음봉, 화엄봉, 일월봉, 자라바위, 좌선대, 상사바위, 부...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 200,
        "label": "사자암 들머리"
      },
      {
        "km": 1.5,
        "alt": 362,
        "label": "촉대봉"
      },
      {
        "km": 2.8,
        "alt": 543,
        "label": "향로봉"
      },
      {
        "km": 3.6,
        "alt": 704.9,
        "label": "정상"
      },
      {
        "km": 5.0,
        "alt": 427,
        "label": "보리암"
      },
      {
        "km": 6.6,
        "alt": 200,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "사자암 들머리",
        "alt": 200,
        "dist": 0,
        "note": "경상남도 남해군 상주면ㆍ이동면ㆍ삼동면 산행 기점"
      },
      {
        "name": "촉대봉",
        "alt": 362,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "향로봉",
        "alt": 543,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "금산 정상 (704.9m)",
        "alt": 704.9,
        "dist": 3.6,
        "note": "산림청 100대 명산 금산 최고봉"
      },
      {
        "name": "보리암",
        "alt": 427,
        "dist": 5.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.4,
      "windSpeed": 4.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B8%88%EC%82%B0_%28%EA%B2%BD%EB%82%A8%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423709&fileSn=1"
  },
  {
    "id": "forest_20000165",
    "forestId": "20000165",
    "isForest100": true,
    "top20Rank": null,
    "name": "두륜산",
    "subTitle": "삼재가 들지 않는 천하의 요새 (산림청 100대 명산)",
    "location": "전라남도 해남군 삼산면ㆍ북일면ㆍ북평면ㆍ현산면",
    "altitude": 700,
    "gain": 500,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "단풍",
      "설산",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 6.6,
    "duration": "3시간",
    "rating": 4.84,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424361&fileSn=1",
    "shortDesc": "[산림청 공식 700m] 한반도의 최남단 해남반도에 솟아 있는 산으로서 왕벚나무의 자생지가 있으며, 다도해를 조망하기에 적합하고 도립공원으로 지정(1972년)된 점 등을 감안하여 선정, 봄의....",
    "fullDesc": "[산림청 100대 명산 선정이유] 한반도의 최남단 해남반도에 솟아 있는 산으로서 왕벚나무의 자생지가 있으며, 다도해를 조망하기에 적합하고 도립공원으로 지정(1972년)된 점 등을 감안하여 선정, 봄의 춘백, 여름의 녹음, 가을의 단풍, 겨울의 동백 등으로 유명하며 유자(柚子), 차(茶)의 산지로 알려져 있음. 보물 제320호인 삼층석탑을 비롯하여 많은 문화재를 보존하고 있는 대흥사(大興寺)가 있음 가장 남쪽의 '산이라 할 만한 것'이다. 육산 덩어리여서 듬직하기는 하나 잘났다고 할 수는 없다. 그런데도 산 보는 데 일가견이 있던 서산대사가 자신의 의발(衣鉢)―옷가지와 밥그릇을 여기 갖다노라 한 것을 보면 뭔가 있기는 한 듯하다. 그냥 들어가서는 발견할 수가 없다. 봄 긴 골짜기 장춘(長春)계곡을 걸어가봐야 한다. 다음, 정상이 아니라 반대편으로 올라가봐야 한다. 향로봉(469m). 그리고, 가부좌를 틀고 앉아 산의 형세를 살펴봐야 한다. 좌청룡은 도솔봉(673.2m)에서 내려오고 있다. 우백호는 고계봉(638m) 줄기다. 입수(入首)는 두륜봉(629.3m)에서 비롯했는 바 모두 대흥사 앞 계곡에서 머리를 맞대고있다. 그 입수가 솟구쳤다 내려앉은 가랑이 사이의 명당에...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 200,
        "label": "삼층석탑 들머리"
      },
      {
        "km": 1.5,
        "alt": 360,
        "label": "문화재"
      },
      {
        "km": 2.8,
        "alt": 540,
        "label": "대흥사"
      },
      {
        "km": 3.6,
        "alt": 700,
        "label": "정상"
      },
      {
        "km": 5.0,
        "alt": 425,
        "label": "바닷가재"
      },
      {
        "km": 6.6,
        "alt": 200,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "삼층석탑 들머리",
        "alt": 200,
        "dist": 0,
        "note": "전라남도 해남군 삼산면ㆍ북일면ㆍ북평면ㆍ현산면 산행 기점"
      },
      {
        "name": "문화재",
        "alt": 360,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "대흥사",
        "alt": 540,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "두륜산 정상 (700m)",
        "alt": 700,
        "dist": 3.6,
        "note": "산림청 100대 명산 두륜산 최고봉"
      },
      {
        "name": "바닷가재",
        "alt": 425,
        "dist": 5.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.4,
      "windSpeed": 4.7,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%91%90%EB%A5%9C%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424361&fileSn=1"
  },
  {
    "id": "forest_20000176",
    "forestId": "20000176",
    "isForest100": true,
    "top20Rank": null,
    "name": "마이산",
    "subTitle": "음양의 궁합을 맞춘 암수봉우리 (산림청 100대 명산)",
    "location": "전라북도 진안군 진안읍ㆍ마령면",
    "altitude": 687.4,
    "gain": 497,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "설산"
    ],
    "distance": 6.6,
    "duration": "3시간 30분",
    "rating": 4.95,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Maisan.jpg/1280px-Maisan.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 687.4m] 특이한 지형을 이루고 있으며, 섬진강과 금강(錦江) 발원지이고 도립공원(1979년)으로 지정된 점 등을 고려하여 선정, 중생대 백악기에 습곡운동을 받아 융기된 역암이....",
    "fullDesc": "[산림청 100대 명산 선정이유] 특이한 지형을 이루고 있으며, 섬진강과 금강(錦江) 발원지이고 도립공원(1979년)으로 지정된 점 등을 고려하여 선정, 중생대 백악기에 습곡운동을 받아 융기된 역암이 침식작용에 의하여 형성된 산으로 산의 형상이 마치 말의 귀를 닮았다 하여 마이산으로 불려짐. 암마이산 남쪽 절벽 밑에 있는 80여개의 크고 작은 돌탑이 있는 탑사(塔寺)와 금당사(金塘寺)가 유명 산이라기보다는 탑으로 부르는 게 더 맞을 기경이다. 영어의 타워와는 완전히 부합한다. 서봉 암마이산과 동봉 숫마이산이 나란히 서있는데 그 모습이 꼭 말의 귀처럼 보인다. 남북으로 높은 산이 없어 더욱 장관으로 진안 우주들이나 사양제 수면에 비친 모습은 특히 환상적이다. 타포니 지형으로도 유명하다. 바위 표면이 폭격을 맞은 것처럼 패어있는 현상으로 남한 내륙에서는 최대 규모라고 한다. 주성분인 역암이 풍화작용으로 속에서부터 부스러져 생겼다. 신라때는 '섰다산'과 가까운 이두 서다산(西多山), 고려시대에는 '솟을 용'자 용출산(聳出山)이었고 조선시대부터 마이산이라 불렸다. 계절에 따라서도 달라 봄에는 안개 속에 신기루처럼 솟은 봉우리가 쌍돛대 같다 하여 돛대봉, 여름에는 야산...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 190,
        "label": "중생대 들머리"
      },
      {
        "km": 1.5,
        "alt": 349,
        "label": "금당사"
      },
      {
        "km": 2.8,
        "alt": 528,
        "label": "고려시대"
      },
      {
        "km": 3.6,
        "alt": 687.4,
        "label": "정상"
      },
      {
        "km": 5.0,
        "alt": 414,
        "label": "조선시대"
      },
      {
        "km": 6.6,
        "alt": 190,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "중생대 들머리",
        "alt": 190,
        "dist": 0,
        "note": "전라북도 진안군 진안읍ㆍ마령면 산행 기점"
      },
      {
        "name": "금당사",
        "alt": 349,
        "dist": 1.5,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "고려시대",
        "alt": 528,
        "dist": 2.8,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "마이산 정상 (687.4m)",
        "alt": 687.4,
        "dist": 3.6,
        "note": "산림청 100대 명산 마이산 최고봉"
      },
      {
        "name": "조선시대",
        "alt": 414,
        "dist": 5.0,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑",
      "동계 산행 시 아이젠, 스패츠 및 보온병"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.5,
      "windSpeed": 4.6,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%A7%88%EC%9D%B4%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424039&fileSn=1"
  },
  {
    "id": "forest_20000024",
    "forestId": "20000024",
    "isForest100": true,
    "top20Rank": null,
    "name": "감악산",
    "subTitle": "의적 임꺽정이 쉬어 가던 산 (산림청 100대 명산)",
    "location": "경기도 양주시 남면, 연천군 전곡읍, 파주시 적성면",
    "altitude": 674.9,
    "gain": 485,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 6.5,
    "duration": "3시간",
    "rating": 4.81,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Gamaksan_Bridge_1.jpg/1280px-Gamaksan_Bridge_1.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 674.9m] 예로부터 경기 5악의 하나로서 폭포·계곡·암벽 등을 고루 갖추고 있으며, 임진강·개성 송악산 등의 조망이 좋은 점 등을 고려하여 선정수량이 풍부한 운계폭포가 있고, ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 예로부터 경기 5악의 하나로서 폭포·계곡·암벽 등을 고루 갖추고 있으며, 임진강·개성 송악산 등의 조망이 좋은 점 등을 고려하여 선정수량이 풍부한 운계폭포가 있고, 정상에는 글자가 모두 마멸되어 판독이 불가능한 비뜰대왕비(파주군 향토유적 제8호)가 있는데 \"설인귀(薛人貴)\"설과 \"진흥왕 순수비\"설이 나뉘어 속전되고 있음. 임꺽정이 관군의 추격을 피하기 위해 숨어 지냈다는 장군봉 아래 임꺽정 굴이 있음. 감악산은 경기 파주시 적성면과 양주군 남면 연천군 전곡읍에 걸쳐있다. 에 의하면 한북정맥의 한강봉과 연결되어 그 지맥을 이루고 있다. 예로부터 개성 송악산, 가평 화악산, 과천 관악산, 포천 운악산과 함께 경기 5악의 하나로 알려져 왔으나 일반인에게는 그리 잘 알려져 있지 않았다. 휴전선에 인접해 있는 탓에 입산금지구역으로 묶여 있다가 몇 년 전부터 통제가 다소 완화되었기 때문이다. 그러나 여전히 등산로가 제한된다. 정상을 중심으로 산행이 가능한 등산로는 범륜사, 신암리, 원당리 방면이다. 감악사, 운계사, 범륜사, 운림사 등의 4개 사찰이 있었다는데 현재는 1970년 옛 운계사 터에 재창건한 범륜사만 남아있다. 장군봉 아래는 조선 명종 때 의적 임꺽정이 관군의 추적을 피...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 190,
        "label": "운계폭포 들머리"
      },
      {
        "km": 1.4,
        "alt": 345,
        "label": "비뜰대"
      },
      {
        "km": 2.7,
        "alt": 520,
        "label": "장군봉"
      },
      {
        "km": 3.6,
        "alt": 674.9,
        "label": "정상"
      },
      {
        "km": 4.9,
        "alt": 408,
        "label": "감색바위"
      },
      {
        "km": 6.5,
        "alt": 190,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "운계폭포 들머리",
        "alt": 190,
        "dist": 0,
        "note": "경기도 양주시 남면 산행 기점"
      },
      {
        "name": "비뜰대",
        "alt": 345,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "장군봉",
        "alt": 520,
        "dist": 2.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "감악산 정상 (674.9m)",
        "alt": 674.9,
        "dist": 3.6,
        "note": "산림청 100대 명산 감악산 최고봉"
      },
      {
        "name": "감색바위",
        "alt": 408,
        "dist": 4.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.6,
      "windSpeed": 4.6,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B0%90%EC%95%85%EC%82%B0_%28%EA%B2%BD%EA%B8%B0%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423872&fileSn=1"
  },
  {
    "id": "forest_20000702",
    "forestId": "20000702",
    "isForest100": true,
    "top20Rank": null,
    "name": "삼악산",
    "subTitle": "물, 나무, 골짜기가 연출하는 풍류의 산 (산림청 100대 명산)",
    "location": "강원도 춘천시 서면",
    "altitude": 655.8,
    "gain": 476,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 6.5,
    "duration": "3시간 30분",
    "rating": 4.92,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/%EC%82%BC%EC%95%85%EC%82%B0_%EC%A0%95%EC%83%81_1.jpg/1280px-%EC%82%BC%EC%95%85%EC%82%B0_%EC%A0%95%EC%83%81_1.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 655.8m] 고고시대에 형성된 등선계곡과 맥국시대의 산성터가 있는 유서깊은 산으로 기암괴석의 경관이 아름답고, 의암호와 북한강을 굽어보는 조망이 좋은 점 등을 고려하여 선정, 남....",
    "fullDesc": "[산림청 100대 명산 선정이유] 고고시대에 형성된 등선계곡과 맥국시대의 산성터가 있는 유서깊은 산으로 기암괴석의 경관이 아름답고, 의암호와 북한강을 굽어보는 조망이 좋은 점 등을 고려하여 선정, 남쪽 골짜기 초입의 협곡과 등선폭포(登仙瀑布)가 특히 유명하고, 흥국사(興國寺), 금선사(金仙寺), 상원사(上院寺) 등 7개 사찰이 있음 삼악산은 등선봉, 청운봉에서 이어지는 한 봉우리다. 강촌의 대표적인 산으로 하나의 독립봉으로 사람들이 즐겨 찾고 있으며 접근이 용이하여 당일산행지로서 각광받고 있다. 거대한 성을 연상시키는 등선폭포 매표소를 지나 깎아지른 절벽 사이로 난 폭포길을 들머리로 삼거나 의암댐 매표소에서 산행을 시작해도 무방하다. 폭포길은 철계단이 만들어져 있어 가까이에서 폭포의 웅장함을 엿볼 수 있으며 따스한 햇빛의 호위를 받으며 산행할 수 있다. 반면 의암댐 길은 청정한 노송과 바위들이 어우러진 절경이 빼어난 바윗길이다. 바위능선으로 구성된 삼악산 정상에 서면 북서쪽으로 화악산(1468.3m)이, 그 오른쪽으로 북배산(869.6m)과 계관산(736m)의 능선이 이어진다. 북동쪽으로는 북한강과 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 180,
        "label": "고고시대 들머리"
      },
      {
        "km": 1.4,
        "alt": 332,
        "label": "등선계곡"
      },
      {
        "km": 2.7,
        "alt": 504,
        "label": "맥국시대"
      },
      {
        "km": 3.6,
        "alt": 655.8,
        "label": "정상"
      },
      {
        "km": 4.9,
        "alt": 394,
        "label": "의암호"
      },
      {
        "km": 6.5,
        "alt": 180,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "고고시대 들머리",
        "alt": 180,
        "dist": 0,
        "note": "강원도 춘천시 서면 산행 기점"
      },
      {
        "name": "등선계곡",
        "alt": 332,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "맥국시대",
        "alt": 504,
        "dist": 2.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "삼악산 정상 (655.8m)",
        "alt": 655.8,
        "dist": 3.6,
        "note": "산림청 100대 명산 삼악산 최고봉"
      },
      {
        "name": "의암호",
        "alt": 394,
        "dist": 4.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.7,
      "windSpeed": 4.6,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%82%BC%EC%95%85%EC%82%B0_%28%EA%B0%95%EC%9B%90%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424483&fileSn=1"
  },
  {
    "id": "forest_20000059",
    "forestId": "20000059",
    "isForest100": true,
    "top20Rank": null,
    "name": "관악산",
    "subTitle": "수차례 화마가 쓸고 갔던 불의 산 (산림청 100대 명산)",
    "location": "서울특별시 관악구ㆍ금천구, 경기도 안양시ㆍ과천시",
    "altitude": 632.2,
    "gain": 452,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 6.4,
    "duration": "3시간",
    "rating": 4.93,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Gwanaksan_Seoul_KR.jpg/1280px-Gwanaksan_Seoul_KR.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 632.2m] 예로부터 경기 5악의 하나로서 경관이 수려하며, 도심지 가까이 위치한 도시자연공원(1968년 지정)으로 수도권 주민들의 휴식처인 점 등을 고려하여 선정주봉은 연주대(....",
    "fullDesc": "[산림청 100대 명산 선정이유] 예로부터 경기 5악의 하나로서 경관이 수려하며, 도심지 가까이 위치한 도시자연공원(1968년 지정)으로 수도권 주민들의 휴식처인 점 등을 고려하여 선정주봉은 연주대(戀主臺)로서 정상에 기상 레이더 시설이 있음. 신라시대 의상이 창건하고 조선 태조가 중수(1392년)한 연주암과 약사여래입상이 유명 옛 과천현의 진산이지만 정면은 서울쪽이다. 거기다 산세가 화성(火星)의 극치를 이뤄 불꽃 너울이 상봉으로 수렴, 하늘을 태우는 듯하다. 해질녁에 뚝섬쪽에서 보면 정말 불 붙은 듯한 바 광화문 앞에 해태상을 둔 이유는 그 불기운이 경복궁으로 옮겨붙을까 우려해서다. 과천쪽은 그러나 지릉들의 기세가 너무 센 중구난방의 산세다. 올려다보는 시선이 급해 벌떼에 쏘인 까까머리 같다. 그렇지만 들판이 좁아 저으기 바라볼 수도 없다. 봉만미가 너무 빼어나 계곡미는 별로다. 남북에 암반계류는 있으나 수량이 적어 폭포와 담소(潭沼)를 이루지 못한다. 북쪽 서울대 입구에서 신림사거리까지는 굽이굽이 계곡에 간간이 암반이 드러나지만 주변이 일찌기 개간되고 시가화되면서 자취를 감춰버렸다. 반면 한...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 180,
        "label": "선정주봉 들머리"
      },
      {
        "km": 1.4,
        "alt": 325,
        "label": "연주대"
      },
      {
        "km": 2.7,
        "alt": 487,
        "label": "신라시대"
      },
      {
        "km": 3.5,
        "alt": 632.2,
        "label": "정상"
      },
      {
        "km": 4.9,
        "alt": 383,
        "label": "연주암"
      },
      {
        "km": 6.4,
        "alt": 180,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "선정주봉 들머리",
        "alt": 180,
        "dist": 0,
        "note": "서울특별시 관악구ㆍ금천구 산행 기점"
      },
      {
        "name": "연주대",
        "alt": 325,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "신라시대",
        "alt": 487,
        "dist": 2.7,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "관악산 정상 (632.2m)",
        "alt": 632.2,
        "dist": 3.5,
        "note": "산림청 100대 명산 관악산 최고봉"
      },
      {
        "name": "연주암",
        "alt": 383,
        "dist": 4.9,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 9.9,
      "windSpeed": 4.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B4%80%EC%95%85%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424246&fileSn=1"
  },
  {
    "id": "forest_20000654",
    "forestId": "20000654",
    "isForest100": true,
    "top20Rank": null,
    "name": "팔영산",
    "subTitle": "대마도를 조망하는 천리안 (산림청 100대 명산)",
    "location": "전남 고흥군 영남면 우천리",
    "altitude": 606.9,
    "gain": 437,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 6.3,
    "duration": "3시간",
    "rating": 4.9,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423434&fileSn=1",
    "shortDesc": "[산림청 공식 606.9m] 여덟개의 암봉으로 이루어진 산세가 험준하고 기암괴석이 많으며 조망이 좋고 도립공원으로 지정(1998년)된 점 등을 고려하여 선정, 예전에 화엄사, 송광사, 대흥사와 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 여덟개의 암봉으로 이루어진 산세가 험준하고 기암괴석이 많으며 조망이 좋고 도립공원으로 지정(1998년)된 점 등을 고려하여 선정, 예전에 화엄사, 송광사, 대흥사와 함께 호남 4대 사찰로 꼽히던 능가사가 있음. 신선대, 강산폭포 및 자연휴양림이 있음. 정상에서 대마도까지 보일 정도로 조망이 좋음 터질 듯한 봉만미를 자랑하는 산이다. '팔'자 들어간 산 치고 봉만미 뛰어나지 않은 것이 없지만 홍천이나 서산 팔봉산은 작아서 웅장함이 없는데 600미터의 높이에 여덟 암봉이 솟은 이 고흥 최고봉은 빼어난 위에 웅장하기까지 하다. 2봉의 동북동릉과 8봉 남릉의 균형 잡힌 양 어깨에다 앞에는 삼각뿔 천주봉이 지키고있어 구도 또한 완벽하다. 경인지역에서 가장 멀리 있는 산 중 하나인데도 사람들이 끊임없이 찾는 이유다. 고흥군에서 1봉에는 유영봉(幼影峯), 2봉은 성주봉, 3봉 생황봉, 4봉 사자봉, 5봉 오로봉, 6봉 두루봉, 7봉 칠성봉, 8봉 적취봉이라고 돌명패를 세워놓았는데 순서와 이름의 상관관계에서 보듯 다분히 작위적이다. 원래는 좀 떨어진 1봉에만 이름이 있었고 나머...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 170,
        "label": "화엄사 들머리"
      },
      {
        "km": 1.4,
        "alt": 310,
        "label": "송광사"
      },
      {
        "km": 2.6,
        "alt": 467,
        "label": "대흥사"
      },
      {
        "km": 3.5,
        "alt": 606.9,
        "label": "정상"
      },
      {
        "km": 4.8,
        "alt": 367,
        "label": "능가사"
      },
      {
        "km": 6.3,
        "alt": 170,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "화엄사 들머리",
        "alt": 170,
        "dist": 0,
        "note": "전남 고흥군 영남면 우천리 산행 기점"
      },
      {
        "name": "송광사",
        "alt": 310,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "대흥사",
        "alt": 467,
        "dist": 2.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "팔영산 정상 (606.9m)",
        "alt": 606.9,
        "dist": 3.5,
        "note": "산림청 100대 명산 팔영산 최고봉"
      },
      {
        "name": "능가사",
        "alt": 367,
        "dist": 4.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 10.1,
      "windSpeed": 4.5,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%8C%94%EC%98%81%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423434&fileSn=1"
  },
  {
    "id": "forest_20000398",
    "forestId": "20000398",
    "isForest100": true,
    "top20Rank": null,
    "name": "소요산",
    "subTitle": "말발굽 모양을 한 경기도의 소금강 (산림청 100대 명산)",
    "location": "경기도 동두천시, 포천시 신북면",
    "altitude": 587.5,
    "gain": 428,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.3,
    "duration": "3시간 30분",
    "rating": 4.87,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0a/Soyosan.jpg/1280px-Soyosan.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 587.5m] 규모는 작으나 상백운대, 하백운대, 중백운대 등 경관이 아름답고, 등산인의 선호도가 높아 \"81년 국민관광지로 지정된 점을 고려하여 선정, 원효폭포, 청량폭포, 선녀....",
    "fullDesc": "[산림청 100대 명산 선정이유] 규모는 작으나 상백운대, 하백운대, 중백운대 등 경관이 아름답고, 등산인의 선호도가 높아 \"81년 국민관광지로 지정된 점을 고려하여 선정, 원효폭포, 청량폭포, 선녀탕절벽과 가을철 단풍이 유명하며, 신라 무열왕 1년(654년)에 원효대사가 창건하였다고 전해지는 자재암이 있음 소요산은 영국 기준으로는 산 축에도 못 드는 언덕이다. 그들은 2000피트, 609.6미터부터 마운틴으로 보기 때문이다. 그렇지만 이 풍수지리의 땅 사람들은 50미터 높이의 독립봉조차도 혈맥이 흐르는 곳이라면서 산 대접을 해주었다. 소요산처럼 바위가 불뚝불뚝 솟은 데는 더 말할 나위가 없다. 게다가 폭포와 탕, 소까지 즐비하니 격을 높여 명산으로 쳤다. 원효폭포, 청량폭포, 선녀탕이 대표적 명승이다. 뒤집어진 C자 모양의 산 운두를 다 돈다 해도 서너 시간밖에 안 걸린다. 당나라 유학도 가다 말았던 원효가 여기까지 왔을 리 만무하지만 곳곳에 전설이 서려있는 까닭은 가까운 임진강이 백여 년 가량 신라의 국경이었기 때문일 것이다. 그래 산 속에 최전방 장졸들을 위한 절이 들어...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 160,
        "label": "상백운대 들머리"
      },
      {
        "km": 1.4,
        "alt": 297,
        "label": "하백운대"
      },
      {
        "km": 2.6,
        "alt": 451,
        "label": "중백운대"
      },
      {
        "km": 3.5,
        "alt": 587.5,
        "label": "정상"
      },
      {
        "km": 4.8,
        "alt": 353,
        "label": "원효폭포"
      },
      {
        "km": 6.3,
        "alt": 160,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "상백운대 들머리",
        "alt": 160,
        "dist": 0,
        "note": "경기도 동두천시 산행 기점"
      },
      {
        "name": "하백운대",
        "alt": 297,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "중백운대",
        "alt": 451,
        "dist": 2.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "소요산 정상 (587.5m)",
        "alt": 587.5,
        "dist": 3.5,
        "note": "산림청 100대 명산 소요산 최고봉"
      },
      {
        "name": "원효폭포",
        "alt": 353,
        "dist": 4.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 10.2,
      "windSpeed": 4.4,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%86%8C%EC%9A%94%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424236&fileSn=1"
  },
  {
    "id": "forest_20000028",
    "forestId": "20000028",
    "isForest100": true,
    "top20Rank": null,
    "name": "강천산",
    "subTitle": "국내 최초의 군립공원 (산림청 100대 명산)",
    "location": "전라북도 순창군 팔덕면, 전라남도 담양군 용면",
    "altitude": 585.8,
    "gain": 426,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 6.3,
    "duration": "3시간 30분",
    "rating": 4.85,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424337&fileSn=1",
    "shortDesc": "[산림청 공식 585.8m] 군립공원(1981년 지정)으로 지정되어 있으며, 강천계곡 등 경관이 수려하고 조망이 좋은 점 등을 고려하여 선정신라 진성여왕때(887년) 도선국사가 개창한 강천사(剛....",
    "fullDesc": "[산림청 100대 명산 선정이유] 군립공원(1981년 지정)으로 지정되어 있으며, 강천계곡 등 경관이 수려하고 조망이 좋은 점 등을 고려하여 선정신라 진성여왕때(887년) 도선국사가 개창한 강천사(剛泉寺)가 있으며, 산 이름도 강천사(剛泉寺)에서 유래. 삼국시대에 축조된 것으로 추정되는 금성산성(金城山城)이 유명 순창읍에서 10km의 가까운 거리에 있는 강천산은 호남의 소금강이라고 불릴 정도로 도처에 기봉이 솟아 있고, 크고 작은 수많은 바위 사이로 폭포를 이루고 있으며, 4km에 이르는 깊은 계곡과 계곡을 뒤덮은 울창한 숲은 자연 그대로의 아름다움을 고이 간직하고 있다. 원래는 생김새가 용이 꼬리를 치며 승천하는 모습과 닮았다 하여 용천산(龍天山)이라 불렸다. 또한 유서깊은 강천사와 삼인대 5층 석탑, 금성산성 등 문화유적이 산재하고, 비경이 많이 숨겨져 있다. 일명 광덕산이라고도 불리는 강천산은 1981년 국내에서 최초로 군립공원으로 지정된 곳이기도 하며, 길이 76m의 현수교가 지상 50m 높이에 설치돼 있어 웅장함을 더해주고 있다. 볼거리는 11월 초순에 절정을 이루는 단풍...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 160,
        "label": "강천계곡 들머리"
      },
      {
        "km": 1.4,
        "alt": 296,
        "label": "도선국사"
      },
      {
        "km": 2.6,
        "alt": 450,
        "label": "강천사"
      },
      {
        "km": 3.5,
        "alt": 585.8,
        "label": "정상"
      },
      {
        "km": 4.8,
        "alt": 352,
        "label": "삼국시대"
      },
      {
        "km": 6.3,
        "alt": 160,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "강천계곡 들머리",
        "alt": 160,
        "dist": 0,
        "note": "전라북도 순창군 팔덕면 산행 기점"
      },
      {
        "name": "도선국사",
        "alt": 296,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "강천사",
        "alt": 450,
        "dist": 2.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "강천산 정상 (585.8m)",
        "alt": 585.8,
        "dist": 3.5,
        "note": "산림청 100대 명산 강천산 최고봉"
      },
      {
        "name": "삼국시대",
        "alt": 352,
        "dist": 4.8,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 10.2,
      "windSpeed": 4.4,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B0%95%EC%B2%9C%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424337&fileSn=1"
  },
  {
    "id": "forest_20000629",
    "forestId": "20000629",
    "isForest100": true,
    "top20Rank": null,
    "name": "칠갑산",
    "subTitle": "손 대지 않은 자연 그대로의 산 (산림청 100대 명산)",
    "location": "충청남도 청양군 대치면, 정산면, 장평면",
    "altitude": 559.7,
    "gain": 400,
    "difficulty": "초급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "단풍"
    ],
    "distance": 6.2,
    "duration": "3시간 30분",
    "rating": 4.88,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Map_of_Chilgap_mountain.JPG/1280px-Map_of_Chilgap_mountain.JPG?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 559.7m] 백운동 계곡 등 경관이 아름다우며 도립공원으로 지정(1973년)된 점 등을 고려하여 선정, 계곡은 깊고 급하며 지천과 계곡을 싸고 돌아 7곳에 명당이 생겼다는 데서 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 백운동 계곡 등 경관이 아름다우며 도립공원으로 지정(1973년)된 점 등을 고려하여 선정, 계곡은 깊고 급하며 지천과 계곡을 싸고 돌아 7곳에 명당이 생겼다는 데서 산이름이 유래. 신라 문성왕 때 보조(普照) 승려가 창건한 장곡사(長谷寺)에 있는 철조약사여래좌상(보물 제174호) 등이 유명 칠갑산. 유장한 능선 골골에 명당갑터 일곱을 감추고있다는 산이다. 600미터도 안 되는 높이에 수더분한 육산인데도 이렇게 대단한 잠재력을 지녔다는 것이다. 주릉이 5방으로 뻗어나간 산세나 청양 분지에서 비롯하는 아흔아홉골 지천(芝川)이 범상해보이지는 않는다. 그 청양은 임진왜란과 남북전쟁때 총소리 한 번 나지 않았고 승지로 이름난 마곡사의 유구천을 이웃에 둔 것을 보면 일단은 고개가 끄덕여진다. 국보 둘과 보물 셋을 품은 장곡사에 이르면 확신에 가까워진다. 일곱 중 여섯은 몰라도 적어도 하나는 분명하기 때문이다. 국보 58호의 철조약사여래좌상(석조 대좌 포함), 철조비로자나불좌상(보물 174호), 이들이 들어있는 상대웅전(보물 162호), 금동약사여래좌상(보물 337호)과...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 160,
        "label": "장곡사 들머리"
      },
      {
        "km": 1.4,
        "alt": 288,
        "label": "철조약사"
      },
      {
        "km": 2.6,
        "alt": 432,
        "label": "마곡사"
      },
      {
        "km": 3.4,
        "alt": 559.7,
        "label": "정상"
      },
      {
        "km": 4.7,
        "alt": 340,
        "label": "금동약사"
      },
      {
        "km": 6.2,
        "alt": 160,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "장곡사 들머리",
        "alt": 160,
        "dist": 0,
        "note": "충청남도 청양군 대치면 산행 기점"
      },
      {
        "name": "철조약사",
        "alt": 288,
        "dist": 1.4,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "마곡사",
        "alt": 432,
        "dist": 2.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "칠갑산 정상 (559.7m)",
        "alt": 559.7,
        "dist": 3.4,
        "note": "산림청 100대 명산 칠갑산 최고봉"
      },
      {
        "name": "금동약사",
        "alt": 340,
        "dist": 4.7,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 10.4,
      "windSpeed": 4.3,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%B9%A0%EA%B0%91%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423431&fileSn=1"
  },
  {
    "id": "forest_20000451",
    "forestId": "20000451",
    "isForest100": true,
    "top20Rank": null,
    "name": "연화산",
    "subTitle": "병을 고치는 신비의 옥천샘 (산림청 100대 명산)",
    "location": "경상남도 고성군 개천면ㆍ영현면",
    "altitude": 524,
    "gain": 374,
    "difficulty": "초급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "일출 명소"
    ],
    "distance": 6.1,
    "duration": "3시간",
    "rating": 4.94,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423776&fileSn=1",
    "shortDesc": "[산림청 공식 524m] 경관이 아름답고 오래된 사찰과 문화재가 많으며 도립공원으로 지정(1983년)된 점 등을 고려하여 선정, 산 중턱에 큰 대밭이 있음.",
    "fullDesc": "[산림청 100대 명산 선정이유] 경관이 아름답고 오래된 사찰과 문화재가 많으며 도립공원으로 지정(1983년)된 점 등을 고려하여 선정, 산 중턱에 큰 대밭이 있음. 유서 깊은 옥천사(玉泉寺)와 연대암,백련암, 청연암 등이 유명 연꽃을 닮았다고 해 이름지어진 연화산은 고성의 산을 대표함에 부족함이 없다. 고성읍 서북쪽에 위치했으며 1989년 개천면과 영현면을 포함한 일대가 도립공원으로 지정되었다. 옥천사는 천년고찰 가람의 배치가 섬세한 화엄 10대 사찰의 하나다. 연화산에 오르면 동쪽으로 쪽빛 바다의 당항포가 한눈에 들어오고 연봉속에 파묻힌 옥천사의 전경과 불교유물전시관을 볼 수 있다. 산세가 순탄하고 길이 잘 닦인 산이어서 가벼운 마음으로 산행을 즐길 수 있다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 150,
        "label": "문화재 들머리"
      },
      {
        "km": 1.3,
        "alt": 270,
        "label": "옥천사"
      },
      {
        "km": 2.6,
        "alt": 404,
        "label": "연대암"
      },
      {
        "km": 3.4,
        "alt": 524,
        "label": "정상"
      },
      {
        "km": 4.6,
        "alt": 318,
        "label": "백련암"
      },
      {
        "km": 6.1,
        "alt": 150,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "문화재 들머리",
        "alt": 150,
        "dist": 0,
        "note": "경상남도 고성군 개천면ㆍ영현면 산행 기점"
      },
      {
        "name": "옥천사",
        "alt": 270,
        "dist": 1.3,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "연대암",
        "alt": 404,
        "dist": 2.6,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "연화산 정상 (524m)",
        "alt": 524,
        "dist": 3.4,
        "note": "산림청 100대 명산 연화산 최고봉"
      },
      {
        "name": "백련암",
        "alt": 318,
        "dist": 4.6,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "발목 보호 등산화 및 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 10.6,
      "windSpeed": 4.3,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%97%B0%ED%99%94%EC%82%B0_%28%EA%B2%BD%EB%82%A8%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423776&fileSn=1"
  },
  {
    "id": "forest_20000143",
    "forestId": "20000143",
    "isForest100": true,
    "top20Rank": null,
    "name": "덕숭산(수덕산)",
    "subTitle": "품은 작아도 도량은 넓어 (산림청 100대 명산)",
    "location": "충청남도 예산군 덕산면",
    "altitude": 495.2,
    "gain": 355,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "일출 명소"
    ],
    "distance": 6.0,
    "duration": "3시간 30분",
    "rating": 4.85,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Insoo_peak.jpg/1280px-Insoo_peak.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 495.2m] 지역 주민들이 소금강이라고 할 만큼 기암괴석과 어우러진 경관이 수려하고, 도립공원으로 지정(1973년)되어 있는 점 등을 감안하여 선정, 백제 제29대 법왕 원년(5....",
    "fullDesc": "[산림청 100대 명산 선정이유] 지역 주민들이 소금강이라고 할 만큼 기암괴석과 어우러진 경관이 수려하고, 도립공원으로 지정(1973년)되어 있는 점 등을 감안하여 선정, 백제 제29대 법왕 원년(599년) 지명법사가 창건한 수덕사(修德寺), 보물 제355호인 마애불과 덕산온천이 유명 충남 예산에 자리잡은 덕숭산은 기기묘묘한 형상의 괴석들이 많아 절묘한 산세를 뽐내며 1973년 3월 6일 도립공원으로 지정되었다. 호서의 금강산이라 불릴 만큼 아름다운 경관을 갖추고 있는데다 아담한 산세 곳곳에 유명한 암자들이 배치되어 있어 찾는 이들의 발길이 끊이지 않는 곳이다. 그 중 비구니의 도량으로 알려진 수덕사는 고려 충렬왕 34년(1308)에 창건된 사찰로 국보 제 49호로 지정된 대웅전이 있는데 이 건물은 무량수전과 더불어 현존하는 목조건물 중 가장 오래된 것이다. 부처님의 진본사리가 안치된 황화루를 비롯, 김일엽 스님의 거쳐였던 환희대, 만공스님을 기리기 위한 미륵불상등 수행의 역사를 조망할 수 있는 흔적들이 눈길을 끈다. 수덕사와 창건연대가 같은 정혜사는 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 140,
        "label": "지명법사 들머리"
      },
      {
        "km": 1.3,
        "alt": 254,
        "label": "수덕사"
      },
      {
        "km": 2.5,
        "alt": 381,
        "label": "진본사"
      },
      {
        "km": 3.3,
        "alt": 495.2,
        "label": "정상"
      },
      {
        "km": 4.6,
        "alt": 300,
        "label": "환희대"
      },
      {
        "km": 6.0,
        "alt": 140,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "지명법사 들머리",
        "alt": 140,
        "dist": 0,
        "note": "충청남도 예산군 덕산면 산행 기점"
      },
      {
        "name": "수덕사",
        "alt": 254,
        "dist": 1.3,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "진본사",
        "alt": 381,
        "dist": 2.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "덕숭산(수덕산) 정상 (495.2m)",
        "alt": 495.2,
        "dist": 3.3,
        "note": "산림청 100대 명산 덕숭산(수덕산) 최고봉"
      },
      {
        "name": "환희대",
        "alt": 300,
        "dist": 4.6,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 10.8,
      "windSpeed": 4.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%8D%95%EC%88%AD%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424222&fileSn=1"
  },
  {
    "id": "forest_20000108",
    "forestId": "20000108",
    "isForest100": true,
    "top20Rank": null,
    "name": "남산",
    "subTitle": "신라의 천년 역사가 숨쉬는 산 (산림청 100대 명산)",
    "location": "경상북도 경주시 남산동ㆍ내남면",
    "altitude": 495.1,
    "gain": 355,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍"
    ],
    "distance": 6.0,
    "duration": "3시간 30분",
    "rating": 4.96,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/%EA%B2%BD%EC%A3%BC_%EB%82%A8%EC%82%B0.JPG/1280px-%EA%B2%BD%EC%A3%BC_%EB%82%A8%EC%82%B0.JPG?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 495.1m] 길이 약 8km, 폭 약 4㎞의 산줄기안에 불상 80여체, 탑 60여기, 절터 110여 개소가 산재하여 경주국립공원으로 지정되어 있는 등 신라시대 역사 유물·유적의 ....",
    "fullDesc": "[산림청 100대 명산 선정이유] 길이 약 8km, 폭 약 4㎞의 산줄기안에 불상 80여체, 탑 60여기, 절터 110여 개소가 산재하여 경주국립공원으로 지정되어 있는 등 신라시대 역사 유물·유적의 보고인 점 등을 고려하여 선정, `경주남산불적지\"로 마애여래좌상(보물 제913호), 칠불암마애석불 등이 유명. 동쪽에는 남산산성 등이 있음 경주 남쪽에 솟은 남산은 신라인들의 신앙의 대상이었다. 금오산(495.1m)과 고위봉(494m) 두 봉우리에서 흘러내리는 40여 개의 계곡과 산줄기로 이루어졌으며 동서 4km, 남북 8km로 길게 뻗어내린 타원형이다. 100여 곳의 절터, 80여 구의 석불, 60여 기의 석탑이 산재해 있는 노천박물관으로 신라 태동의 성지 서남산, 미륵골·탑골·부처골 등 수많은 돌부처가 있는 동남산으로 구분된다. 자연경관도 뛰어나 변화무쌍한 많은 계곡이 있고 기암괴석들이 만물상을 이루어 등산객의 발길만큼이나 수많은 등산로가 있다. 그래서 남산을 아는 사람들은 \"\"남산에 오르지 않고서는 경주를 보았다고 말할 수 없다\"\"고 한다. 남산은 자연의 아름다움에다 신라의 오랜 역사, 신라인의 미의식과...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 140,
        "label": "신라시대 들머리"
      },
      {
        "km": 1.3,
        "alt": 254,
        "label": "칠불암"
      },
      {
        "km": 2.5,
        "alt": 381,
        "label": "남산산성"
      },
      {
        "km": 3.3,
        "alt": 495.1,
        "label": "정상"
      },
      {
        "km": 4.6,
        "alt": 300,
        "label": "고위봉"
      },
      {
        "km": 6.0,
        "alt": 140,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "신라시대 들머리",
        "alt": 140,
        "dist": 0,
        "note": "경상북도 경주시 남산동ㆍ내남면 산행 기점"
      },
      {
        "name": "칠불암",
        "alt": 254,
        "dist": 1.3,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "남산산성",
        "alt": 381,
        "dist": 2.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "남산 정상 (495.1m)",
        "alt": 495.1,
        "dist": 3.3,
        "note": "산림청 100대 명산 남산 최고봉"
      },
      {
        "name": "고위봉",
        "alt": 300,
        "dist": 4.6,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 10.8,
      "windSpeed": 4.2,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%82%A8%EC%82%B0_%28%EA%B2%BD%EC%A3%BC%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423590&fileSn=1"
  },
  {
    "id": "forest_20000171",
    "forestId": "20000171",
    "isForest100": true,
    "top20Rank": null,
    "name": "마니산",
    "subTitle": "역대 왕들이 하늘제를 올리던 산 (산림청 100대 명산)",
    "location": "인천광역시 강화군 화도면",
    "altitude": 472.1,
    "gain": 342,
    "difficulty": "중급",
    "region": "수도권",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "일출 명소"
    ],
    "distance": 5.9,
    "duration": "3시간",
    "rating": 4.9,
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Mt_mani_2.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled",
    "shortDesc": "[산림청 공식 472.1m] 단군시조의 전설이 간직된 산으로 역사,문화적 가치 등을 고려하여 선정, 사적 제136호인 참성단(塹星壇), 함허동천, 사적 제130호인 삼랑산성이 있음.",
    "fullDesc": "[산림청 100대 명산 선정이유] 단군시조의 전설이 간직된 산으로 역사,문화적 가치 등을 고려하여 선정, 사적 제136호인 참성단(塹星壇), 함허동천, 사적 제130호인 삼랑산성이 있음. 또한 많은 보물을 보존하고 있는 정수사(淨水寺) 및 전등사(傳燈寺)등이 있으며, 성화를 채화하는 장소이기도 함 경기도 최대의 섬 강화도에서 최고 높은 산이다. 단군왕검이 세 봉우리 중 가운데것에 참성단(사적 136호)을 세우고 하늘에 제사를 지내며 고조선의 안녕을 기원했다는 산으로 몇 해 전 풍수들이 마니산을 가장 기가 센 곳으로 지목하기도 했다. 신증동국여지승람에 있는 전설인데, 이 산이 쓰기로는 마니산이지만 부르기로는 마리산인 데 근거했을 것이다. 1977년에 국민관광지로 지정되었으며, 참성단의 유명세로 많은 이들이 오래 전부터 즐겨 찾는 명승지다. 암골미가 뛰어난 데다 이중환의 명산 제2조건 \"\"큰 바다를 끼고있을 것\"\"을 갖춰 전망을 따를 데가 없다. 염하(鹽河)나 석모도와의 사이 개(浦)처럼 강 같은 바다, 장봉도와 사이의 호수 같은 바다, 서쪽의 망망대해가 가슴을 탁 트...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 130,
        "label": "삼랑산성 들머리"
      },
      {
        "km": 1.3,
        "alt": 239,
        "label": "정수사"
      },
      {
        "km": 2.5,
        "alt": 363,
        "label": "전등사"
      },
      {
        "km": 3.2,
        "alt": 472.1,
        "label": "정상"
      },
      {
        "km": 4.5,
        "alt": 284,
        "label": "전망대"
      },
      {
        "km": 5.9,
        "alt": 130,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "삼랑산성 들머리",
        "alt": 130,
        "dist": 0,
        "note": "인천광역시 강화군 화도면 산행 기점"
      },
      {
        "name": "정수사",
        "alt": 239,
        "dist": 1.3,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "전등사",
        "alt": 363,
        "dist": 2.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "마니산 정상 (472.1m)",
        "alt": 472.1,
        "dist": 3.2,
        "note": "산림청 100대 명산 마니산 최고봉"
      },
      {
        "name": "전망대",
        "alt": 284,
        "dist": 4.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 10.9,
      "windSpeed": 4.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%A7%88%EB%8B%88%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423751&fileSn=1"
  },
  {
    "id": "forest_20000775",
    "forestId": "20000775",
    "isForest100": true,
    "top20Rank": null,
    "name": "변산",
    "subTitle": "호남정맥에서 독립된 산군 형성 (산림청 100대 명산)",
    "location": "전라북도 부안군 변산면, 상서면, 진서면",
    "altitude": 459,
    "gain": 329,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소",
      "종주 코스"
    ],
    "distance": 5.9,
    "duration": "3시간 30분",
    "rating": 4.96,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Mt._Byeonsan_Peninsula_National_Park_-_panoramio.jpg/1280px-Mt._Byeonsan_Peninsula_National_Park_-_panoramio.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 459m] 울창한 산과 계곡, 모래해안과 암석해안 및 사찰 등이 어울려 뛰어난 경관을 이루고 있으며 국립공원으로 지정(1988년)된 점 등을 고려하여 선정, 산이면서 바다와 직....",
    "fullDesc": "[산림청 100대 명산 선정이유] 울창한 산과 계곡, 모래해안과 암석해안 및 사찰 등이 어울려 뛰어난 경관을 이루고 있으며 국립공원으로 지정(1988년)된 점 등을 고려하여 선정, 산이면서 바다와 직접 닿아 있는 특징이 있음. 직소폭포, 가마소, 봉래구곡, 채석강, 적벽강 및 내소사, 개암사 등 사찰과 호랑가시나무, 꽝꽝나무 등 희귀동.식물이 서식 부안읍에서 서해를 향해 내민 변산반도는 방방곳곳이 좋은 명승지다. 바다를 원하면 해수욕장, 산을 오르고 싶으면 내변산, 도보여행의 맛에 빠진 이는 부안호의 맑은 물을 즐길 수 있는 곳, 바로 변산(邊山)이다. 용마루에서 서까래 뻗어나가듯 하는 여느 산과는 달리 바깥에 산을 세우고 안은 비운 형태다. 상봉 의상봉(509m)에서 시작한 산줄기는 시계방향으로 돌며 우금산성, 상여봉(398m), 옥녀봉(433m), 용각봉, 세봉(403m), 관음봉(424m), 신선봉(488m), 쌍선봉(459m)을 만들다가 그 안의 부안댐 물이 서해로 들어가는 어귀 해창(海倉) 앞에서 의상봉을 바라보며 맺음한다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 130,
        "label": "직소폭포 들머리"
      },
      {
        "km": 1.3,
        "alt": 235,
        "label": "내소사"
      },
      {
        "km": 2.5,
        "alt": 354,
        "label": "개암사"
      },
      {
        "km": 3.2,
        "alt": 459,
        "label": "정상"
      },
      {
        "km": 4.5,
        "alt": 278,
        "label": "부안호"
      },
      {
        "km": 5.9,
        "alt": 130,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "직소폭포 들머리",
        "alt": 130,
        "dist": 0,
        "note": "전라북도 부안군 변산면 산행 기점"
      },
      {
        "name": "내소사",
        "alt": 235,
        "dist": 1.3,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "개암사",
        "alt": 354,
        "dist": 2.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "변산 정상 (459m)",
        "alt": 459,
        "dist": 3.2,
        "note": "산림청 100대 명산 변산 최고봉"
      },
      {
        "name": "부안호",
        "alt": 278,
        "dist": 4.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 11.0,
      "windSpeed": 4.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%B3%80%EC%82%B0%EB%B0%98%EB%8F%84",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423556&fileSn=1"
  },
  {
    "id": "forest_20000242",
    "forestId": "20000242",
    "isForest100": true,
    "top20Rank": null,
    "name": "미륵산",
    "subTitle": "봉화대 자취 간직한 미륵신앙의 본산 (산림청 100대 명산)",
    "location": "경상남도 통영시 산양읍ㆍ봉평동",
    "altitude": 458.4,
    "gain": 328,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 5.9,
    "duration": "3시간",
    "rating": 4.92,
    "image": "https://thumb.wikimedia.org/wikipedia/ko/thumb/2/21/Tongyeong_Miruksan.jpg/1280px-Tongyeong_Miruksan.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 458.4m] 충무시와 연육교로 이어지는 미륵도(彌勒島)의 복판에 솟은 산으로 한려해상국립공원의 아름다운 경관을 한눈에 조망할 수 있는 등 경관이 아름다운 점 등을 고려하여 선정지....",
    "fullDesc": "[산림청 100대 명산 선정이유] 충무시와 연육교로 이어지는 미륵도(彌勒島)의 복판에 솟은 산으로 한려해상국립공원의 아름다운 경관을 한눈에 조망할 수 있는 등 경관이 아름다운 점 등을 고려하여 선정지형도에는 용화산(龍華山)으로 표기되어 있으며, 석조여래상(경남유형문화재 43호)과 고려중기의 작품인 지장보살상과 시왕상 등이 보존되어 있는 용화사(龍華寺)가 있음. 도솔선사(兜率禪師)가 창건한 도솔암, 관음사(觀音寺), 봉수대터 등이 유명 통영시 남쪽, 미륵도 중앙에 우뚝 솟은 위풍당당한 산이다. 용화산이라고도 하는데 이 산에 고찰 용화사가 있어 그렇게 부른다고도 하고, 미륵불이 당래에 강림할 용화회상이라 해서 미륵산과 용화산을 함께 쓴다고도 한다. 자락에는 고찰 용화사와 산내 암자 관음암, 도솔암이 있고 효봉 문중의 발상지 미래사가 있다. 그리 높은 산은 아니지만 명산으로서 덕목을 두루 갖추고 있으며 울창한 수림 사이로 맑은 물이 흐르는 계곡이 있고 갖가지 모양의 기암 괴석과 바위굴이 있다. 고찰과 약수, 봄 진달래와 가을 단풍이 빼어나고 산정에 오르면 한려해상의 다도해 조망이 표현할 수 없을 정도로 아름답게 보이며, 청명한 날에는 일본 대마도가 바라다 보인다.",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 130,
        "label": "경남유형문화재 "
      },
      {
        "km": 1.3,
        "alt": 235,
        "label": "용화사"
      },
      {
        "km": 2.5,
        "alt": 353,
        "label": "도솔선사"
      },
      {
        "km": 3.2,
        "alt": 458.4,
        "label": "정상"
      },
      {
        "km": 4.5,
        "alt": 278,
        "label": "도솔암"
      },
      {
        "km": 5.9,
        "alt": 130,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "경남유형문화재 들머리",
        "alt": 130,
        "dist": 0,
        "note": "경상남도 통영시 산양읍ㆍ봉평동 산행 기점"
      },
      {
        "name": "용화사",
        "alt": 235,
        "dist": 1.3,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "도솔선사",
        "alt": 353,
        "dist": 2.5,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "미륵산 정상 (458.4m)",
        "alt": 458.4,
        "dist": 3.2,
        "note": "산림청 100대 명산 미륵산 최고봉"
      },
      {
        "name": "도솔암",
        "alt": 278,
        "dist": 4.5,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 11.0,
      "windSpeed": 4.1,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%A5%B5%EC%82%B0_%28%EA%B2%BD%EB%82%A8%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423756&fileSn=1"
  },
  {
    "id": "forest_20001322",
    "forestId": "20001322",
    "isForest100": true,
    "top20Rank": null,
    "name": "지리산(통영)",
    "subTitle": "경상남도 통영시 사량면(蛇梁面)에 있는 산 (산림청 100대 명산)",
    "location": "경상남도 통영시 사량면",
    "altitude": 399.3,
    "gain": 289,
    "difficulty": "중급",
    "region": "경상",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "일출 명소"
    ],
    "distance": 5.7,
    "duration": "2시간 30분",
    "rating": 4.91,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Korea-Mountain-Jirisan-15.jpg/1280px-Korea-Mountain-Jirisan-15.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 399.3m] 한려수도의 빼어난 경관과 조화를 이루고 특히 불모산, 가마봉, 향봉, 옥녀봉 등 산 정상부의 바위산이 기암괴석을 형성하고 조망이 좋은 점 등을 고려하여 선정,\"지리산....",
    "fullDesc": "[산림청 100대 명산 선정이유] 한려수도의 빼어난 경관과 조화를 이루고 특히 불모산, 가마봉, 향봉, 옥녀봉 등 산 정상부의 바위산이 기암괴석을 형성하고 조망이 좋은 점 등을 고려하여 선정,\"지리산이 바라 보이는 산\"이란 뜻에서 산이름이 유래하였으며, 현지에서는 지리산이라고도 불리워지고 있음. 다도해의 섬을 조망할 수 있으며 기묘한 바위 능선이 특히 유명 지리산은 한려해상국립공원에 있는 사량도에 위치한 산으로 본래 이름은 지리망산이다. 이 명칭은 국립공원 1호인 지리산이 조망된다는 뜻으로 붙여졌다고 한다. 윗섬과 아랫섬으로 나뉘어져 있는데 이들 두 섬 사이를 동강이라고 부른다. 지리산은 사량도의 주섬인 윗섬에 자리하고 있다. 지리산의 여러 봉우리 중 옥녀봉이 빼어난 산세와 조망을 제공해 가장 유명하다. 그러나 암봉으로 이어진 능선길은 다소 위험한데 초보자를 위해 우회로가 있다. 옥녀봉은 유명한 전설을 간직한 봉우리기도 하다. 어릴 때 어머니를 여읜 옥녀가 예쁘게 성장하자 천륜을 저버린 아버지가 옥녀를 범하려 해 옥녀가 험한 봉우리에서 몸을 바다로 던졌다고 한다. 봉긋한 산봉우리 형상이 여인의 가슴을 닮았을 뿐 아니라 풍수지...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 110,
        "label": "가마봉 들머리"
      },
      {
        "km": 1.3,
        "alt": 202,
        "label": "옥녀봉"
      },
      {
        "km": 2.4,
        "alt": 307,
        "label": "넘실대"
      },
      {
        "km": 3.1,
        "alt": 399.3,
        "label": "정상"
      },
      {
        "km": 4.3,
        "alt": 240,
        "label": "하산 능선 갈림"
      },
      {
        "km": 5.7,
        "alt": 110,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "가마봉 들머리",
        "alt": 110,
        "dist": 0,
        "note": "경상남도 통영시 사량면 산행 기점"
      },
      {
        "name": "옥녀봉",
        "alt": 202,
        "dist": 1.3,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "넘실대",
        "alt": 307,
        "dist": 2.4,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "지리산(통영) 정상 (399.3m)",
        "alt": 399.3,
        "dist": 3.1,
        "note": "산림청 100대 명산 지리산(통영) 최고봉"
      },
      {
        "name": "하산 능선 갈림길",
        "alt": 240,
        "dist": 4.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 11.4,
      "windSpeed": 4.0,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%A7%80%EB%A6%AC%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423870&fileSn=1"
  },
  {
    "id": "forest_20001254",
    "forestId": "20001254",
    "isForest100": true,
    "top20Rank": null,
    "name": "깃대봉",
    "subTitle": "전라남도 신안 흑산면 홍도의 대표 명산 (산림청 100대 명산)",
    "location": "전라남도 신안 흑산면 홍도",
    "altitude": 367.8,
    "gain": 268,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "일출 명소"
    ],
    "distance": 5.6,
    "duration": "2시간 30분",
    "rating": 4.92,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423995&fileSn=1",
    "shortDesc": "[산림청 공식 367.8m] 덩굴사철, 식나무 및 동백림 등이 자생하는 등 생태적 가치가 커 섬 전체가 천연보호구역으로 지정(1965년)되어 있으며, 다도해해상국립공원으로 지정(1981년)된 점....",
    "fullDesc": "[산림청 100대 명산 선정이유] 덩굴사철, 식나무 및 동백림 등이 자생하는 등 생태적 가치가 커 섬 전체가 천연보호구역으로 지정(1965년)되어 있으며, 다도해해상국립공원으로 지정(1981년)된 점 등을 고려하여 선정, 이름 그대로 깃대처럼 생긴 암봉이며, 홍도의 최고봉임. 깃대봉은 독립문, 석화굴 등 해안경관과 조화를 이뤄 홍도의 수려한 경관을 이루고 있음. 다도해해상국립공원의 작은 섬이자 섬 전체가 천연기념물(170호)인 홍도는 360.7미터 높이의 깃대봉과 231.8미터의 양산봉이 개미처럼 떠있는 섬이다. 섬 전체가 홍갈색 규암질 바위여서 홍도(紅島)인데 바다 위에 떠있는 매화꽃 같다고 해서 매가도로도 불렸다. 홍도는 해수욕, 스쿠버다이빙, 유람선 일주, 등산까지 모든 것을 즐길 수 있는 천혜의 관광지이다. 그러나 해안선 길이가 20.8킬로미터밖에 안돼 등산은 홍도 1구와 2구 주민들이 왕래하던 루트, 깃대봉 넘는 것이 고작이다. 하지만 유람선을 타고 빠돌(자갈)해수욕장을 출발하면 섬 전체를 돌며 깃대봉을 바라볼 수 있다. 섬인 관계로 태풍 등 기상조건에 좌우되어 배가 출항을 못하는 경우도 많으니 2박3일에 플러스 알파가 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 100,
        "label": "덩굴사 들머리"
      },
      {
        "km": 1.2,
        "alt": 186,
        "label": "천연보호"
      },
      {
        "km": 2.4,
        "alt": 282,
        "label": "석화굴"
      },
      {
        "km": 3.1,
        "alt": 367.8,
        "label": "정상"
      },
      {
        "km": 4.3,
        "alt": 221,
        "label": "양산봉"
      },
      {
        "km": 5.6,
        "alt": 100,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "덩굴사 들머리",
        "alt": 100,
        "dist": 0,
        "note": "전라남도 신안 흑산면 홍도 산행 기점"
      },
      {
        "name": "천연보호",
        "alt": 186,
        "dist": 1.2,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "석화굴",
        "alt": 282,
        "dist": 2.4,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "깃대봉 정상 (367.8m)",
        "alt": 367.8,
        "dist": 3.1,
        "note": "산림청 100대 명산 깃대봉 최고봉"
      },
      {
        "name": "양산봉",
        "alt": 221,
        "dist": 4.3,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 11.6,
      "windSpeed": 3.9,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EA%B9%83%EB%8C%80%EB%B4%89_%28%ED%99%8D%EB%8F%84%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000423995&fileSn=1"
  },
  {
    "id": "forest_20000383",
    "forestId": "20000383",
    "isForest100": true,
    "top20Rank": null,
    "name": "선운산",
    "subTitle": "구름속에 선을 닦는 동백산 (산림청 100대 명산)",
    "location": "전라북도 고창군 아산면ㆍ심원면ㆍ해리면",
    "altitude": 334.7,
    "gain": 245,
    "difficulty": "중급",
    "region": "충청/전라",
    "themes": [
      "100대 명산",
      "암릉 산행",
      "단풍",
      "일출 명소"
    ],
    "distance": 5.5,
    "duration": "2시간",
    "rating": 4.95,
    "image": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/%EC%84%A0%EC%9A%B4%EC%82%B0.jpg/1280px-%EC%84%A0%EC%9A%B4%EC%82%B0.jpg?utm_source=ko.wikipedia.org&utm_campaign=api&utm_content=thumbnail",
    "shortDesc": "[산림청 공식 334.7m] 산세는 별로 크지 않으나 숲이 울창하고 곳곳이 기암괴석으로 이루어져 있어 경관이 빼어나며 천연기념물 제184호인 동백나무 숲이 있는 등 생태적 가치가 크고 도립공원으....",
    "fullDesc": "[산림청 100대 명산 선정이유] 산세는 별로 크지 않으나 숲이 울창하고 곳곳이 기암괴석으로 이루어져 있어 경관이 빼어나며 천연기념물 제184호인 동백나무 숲이 있는 등 생태적 가치가 크고 도립공원으로 지정(1979년)된 점 등을 고려하여 선정, 백제 위덕왕 24년(577년) 검단선사가 창건한 선운사(禪雲寺)와 수령 5백년의 동백나무 ３천여 그루가 군락을 이루고 있는 선운사 동백 숲이 유명 구름 속에 누워 선을 닦는다는 참선와운(參禪臥雲)의 산이다. 선이란 것이 본래 구름 잡는 것이니 콕 찝어 무엇을 어쩐다는 건지는 모르겠지만 이 산에 가보면 막연히, 그럼직도 하다는 느낌이 든다. 산형이 벌레 잡는 풀 통발처럼 생겼다. 상봉 경수산에서 시작, 도솔산(334.7m), 개이빨산(346.6m), 청룡산(315m), 비학산(308.5m), 구황봉(297.9m)으로 이어지는 운두가 고작 300미터 안팎의 낮은 산인데도 7킬로미터나 되는 평평한 긴 골이 선적 분위기에 젖어들게 한다. 걸음도 마음도 차분해지는 것이다. 대낮에도 어둑한 아름드리 고목 아래를 걷고있어서만은 아니다. 가을이면 그 붉은 잎들 봇물 위에 화엄경을 연출해서도 아니다. 눈밭 속에 이채로운 동백꽃이나 ...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 90,
        "label": "검단선사 들머리"
      },
      {
        "km": 1.2,
        "alt": 168,
        "label": "선운사"
      },
      {
        "km": 2.3,
        "alt": 257,
        "label": "구황봉"
      },
      {
        "km": 3.0,
        "alt": 334.7,
        "label": "정상"
      },
      {
        "km": 4.2,
        "alt": 200,
        "label": "안장바위"
      },
      {
        "km": 5.5,
        "alt": 90,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "검단선사 들머리",
        "alt": 90,
        "dist": 0,
        "note": "전라북도 고창군 아산면ㆍ심원면ㆍ해리면 산행 기점"
      },
      {
        "name": "선운사",
        "alt": 168,
        "dist": 1.2,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "구황봉",
        "alt": 257,
        "dist": 2.3,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "선운산 정상 (334.7m)",
        "alt": 334.7,
        "dist": 3.0,
        "note": "산림청 100대 명산 선운산 최고봉"
      },
      {
        "name": "안장바위",
        "alt": 200,
        "dist": 4.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 11.8,
      "windSpeed": 3.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%EC%84%A0%EC%9A%B4%EC%82%B0",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424537&fileSn=1"
  },
  {
    "id": "forest_20000652",
    "forestId": "20000652",
    "isForest100": true,
    "top20Rank": null,
    "name": "팔봉산",
    "subTitle": "산세와 암릉에 두 번 놀라는 산 (산림청 100대 명산)",
    "location": "강원도 홍천군 서면 팔봉리",
    "altitude": 328.2,
    "gain": 238,
    "difficulty": "중급",
    "region": "강원",
    "themes": [
      "100대 명산",
      "암릉 산행"
    ],
    "distance": 5.5,
    "duration": "2시간",
    "rating": 4.88,
    "image": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424192&fileSn=1",
    "shortDesc": "[산림청 공식 328.2m] 산은 나지막하고 규모도 작으나 여덟개의 바위봉이 팔짱 낀 8형제처럼 이여져 있고 홍천강과 연접하여 경관이 아름다운 점 등을 고려하여 선정, 국민관광지로 지정되어 있음.",
    "fullDesc": "[산림청 100대 명산 선정이유] 산은 나지막하고 규모도 작으나 여덟개의 바위봉이 팔짱 낀 8형제처럼 이여져 있고 홍천강과 연접하여 경관이 아름다운 점 등을 고려하여 선정, 국민관광지로 지정되어 있음 팔봉산은 산 같지도 않은, 300미터가 조금 넘는 동산이다. 그럼에도 같은 이름의 어떤 산보다 사람들이 많이 찾는, 유명한 산이다. 여덟 봉우리가 모두 바위로 되어있어 하늘금이 둥근 톱날처럼 역동적이고 스릴이 넘치기 때문이다. 그래 작은 산이지만 대개의 등산객들은 팔봉 넘기를 다 하지 못한다. 철계단과 쇠줄까지 쳐있는데도 마지막 봉우리는 포기하고 돌아서기 일쑤다. 작아도 강단(剛斷) 있는 산이다. 발치 3면은 홍천강이 싸고돈다. 강물은 깊푸르나 물가에는 모래벌이 펼쳐졌다. 그냥 모래 하얀 수반(水盤)에 물이 잘박거리는 수석(壽石)인 것이다. 요산요수를 겸하기에 이보다 나은 데가 있겠는가? 강 건너 서쪽의, 늪둔지라는 우각호(牛角湖) 가에는 밤나무숲이 울창하다. 근래 오토캠...",
    "elevationProfile": [
      {
        "km": 0,
        "alt": 90,
        "label": "바위봉 들머리"
      },
      {
        "km": 1.2,
        "alt": 166,
        "label": "우각호"
      },
      {
        "km": 2.3,
        "alt": 252,
        "label": "주능선 전망대"
      },
      {
        "km": 3.0,
        "alt": 328.2,
        "label": "정상"
      },
      {
        "km": 4.2,
        "alt": 197,
        "label": "하산 능선 갈림"
      },
      {
        "km": 5.5,
        "alt": 90,
        "label": "하산완료"
      }
    ],
    "waypoints": [
      {
        "name": "바위봉 들머리",
        "alt": 90,
        "dist": 0,
        "note": "강원도 홍천군 서면 팔봉리 산행 기점"
      },
      {
        "name": "우각호",
        "alt": 166,
        "dist": 1.2,
        "note": "주요 경유 명소 및 휴식처"
      },
      {
        "name": "주능선 전망대",
        "alt": 252,
        "dist": 2.3,
        "note": "주능선 진입 및 조망 포인트"
      },
      {
        "name": "팔봉산 정상 (328.2m)",
        "alt": 328.2,
        "dist": 3.0,
        "note": "산림청 100대 명산 팔봉산 최고봉"
      },
      {
        "name": "하산 능선 갈림길",
        "alt": 197,
        "dist": 4.2,
        "note": "하산 코스 분기점"
      }
    ],
    "checklist": [
      "접지력이 우수한 등산화 및 등산 스틱",
      "충분한 식수 (1.0L ~ 1.5L) 및 고열량 행동식",
      "기상 변화 대비 방풍 재킷 (윈드브레이커)",
      "산림청 공식 등산로 지도 및 보조배터리",
      "바위·로프 구간용 미끄럼 방지 장갑"
    ],
    "weather": {
      "baseTemp": 14.0,
      "peakTemp": 11.9,
      "windSpeed": 3.8,
      "condition": "맑음"
    },
    "wikiUrl": "https://ko.wikipedia.org/wiki/%ED%8C%94%EB%B4%89%EC%82%B0_%28%ED%99%8D%EC%B2%9C%29",
    "fallbackImage": "https://www.forest.go.kr/kfsweb/cmm/fms/FileDown.do?atchFileId=FILE_000000000424192&fileSn=1"
  }
];
