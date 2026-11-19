/**
 * JowonPlace Travel Blog - Main Application Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const header = document.querySelector(".site-header");
  const landingSection = document.getElementById("landing-section");
  const blogViewSection = document.getElementById("blog-view-section");
  const destGrid = document.getElementById("dest-grid");
  const searchInput = document.getElementById("search-input");
  const searchForm = document.getElementById("search-form");
  const quickTags = document.querySelectorAll(".quick-tag-chip");
  const searchLoadingModal = document.getElementById("search-loading-modal");
  const loadingStatusText = document.getElementById("loading-status");
  const loadingDetailText = document.getElementById("loading-detail");
  const btnBookmarkNav = document.getElementById("btn-bookmark-nav");

  // State
  let currentDestination = null;
  let bookmarkedIds = JSON.parse(localStorage.getItem("jowonplace_bookmarks") || "[]");

  // 1. 헤더 스크롤 효과
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 2. 초기 인기 여행지 큐레이션 그리드 렌더링
  function renderCurationGrid() {
    if (!destGrid) return;
    const items = window.INITIAL_DESTINATIONS || [];
    destGrid.innerHTML = items.map(dest => `
      <article class="dest-card" data-id="${dest.id}">
        <div class="card-img-wrap">
          <img src="${dest.heroImage}" alt="${dest.keyword}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';">
          <span class="card-badge">${dest.badge || dest.region}</span>
          <span class="card-likes">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            ${dest.likes}
          </span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${dest.keyword} : ${dest.title}</h3>
          <p class="card-desc">${dest.subtitle}</p>
          <div class="card-footer">
            <div class="author-info">
              <img src="${dest.author.avatar}" alt="${dest.author.name}">
              <span>${dest.author.name}</span>
            </div>
            <span>${dest.author.readTime}</span>
          </div>
        </div>
      </article>
    `).join("");

    // 카드 클릭 이벤트
    destGrid.querySelectorAll(".dest-card").forEach(card => {
      card.addEventListener("click", () => {
        const destId = card.getAttribute("data-id");
        const found = items.find(d => d.id === destId);
        if (found) {
          openBlogPost(found);
        }
      });
    });
  }

  // 3. 검색 처리 및 로딩 시뮬레이션
  async function handleSearch(query) {
    const trimmed = (query || "").trim();
    if (!trimmed) {
      alert("찾고 싶은 여행지나 도시 이름을 입력해주세요! (예: 제주도, 부산, 강릉, 속초 등)");
      searchInput.focus();
      return;
    }

    // 로딩 모달 띄우기
    showLoading(trimmed);

    try {
      // 1단계 로딩 메시지
      await delay(400);
      loadingStatusText.textContent = `'${trimmed}' 인기 명소 웹 검색 중...`;
      loadingDetailText.textContent = "최신 리뷰, 평점, 대중적 선호도 데이터를 분석하고 있습니다.";

      await delay(600);
      loadingStatusText.textContent = `많은 사람들이 좋아하는 장소 명소 5곳 5대 핫스팟 선별 중...`;
      loadingDetailText.textContent = "풍경, 미식, 힐링, 야경 밸런스를 맞춘 최적의 여행 코스를 구성합니다.";

      // 실제 검색 및 생성 엔진 실행
      const result = await window.travelSearchEngine.searchOrGenerate(trimmed);

      await delay(500);
      loadingStatusText.textContent = `생생한 1인칭 여행 블로그 포스팅 완성!`;
      loadingDetailText.textContent = "현장감 넘치는 사진과 꿀팁을 로드하고 있습니다.";

      await delay(400);
      hideLoading();

      if (result && result.data) {
        openBlogPost(result.data);
      } else {
        alert(`'${trimmed}'에 대한 여행지 정보를 찾지 못했습니다. 다른 장소를 입력해 보세요!`);
      }
    } catch (err) {
      console.error("검색 중 오류 발생:", err);
      hideLoading();
      alert("여행지 정보를 검색하는 도중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  function showLoading(destName) {
    loadingStatusText.textContent = `'${destName}' 여행지 탐색 시작`;
    loadingDetailText.textContent = "웹 정보 및 현지 여행기 데이터를 수집하고 있습니다.";
    searchLoadingModal.classList.add("active");
  }

  function hideLoading() {
    searchLoadingModal.classList.remove("active");
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 4. 블로그 포스트 렌더링 및 뷰 전환
  function openBlogPost(destination) {
    currentDestination = destination;
    const isBookmarked = bookmarkedIds.includes(destination.id);

    // 블로그 뷰 HTML 구성
    blogViewSection.innerHTML = `
      <div class="container">
        <!-- 상단 내비게이션 바 -->
        <div class="blog-nav-bar">
          <button class="btn-back" id="btn-back-to-list">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            전체 여행지 목록으로
          </button>
          
          <div class="blog-action-group">
            <button class="btn-action btn-like ${isBookmarked ? 'liked' : ''}" id="btn-toggle-bookmark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <span id="bookmark-label">${isBookmarked ? '북마크 저장됨' : '여행지 북마크'}</span>
            </button>
            <button class="btn-action" id="btn-share-post">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/>
              </svg>
              공유하기
            </button>
            <button class="btn-action" id="btn-print-post">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              인쇄/저장
            </button>
            <button class="btn-action btn-extra" id="btn-toggle-spots" title="추천한 5곳 이외에 또다른 추천지 5곳을 확인합니다">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span id="spots-toggle-label">추가 추천지</span>
            </button>
            <button class="btn-action btn-photo-edit" id="btn-edit-photos" title="웹 검색을 통해 여행장소에 알맞는 사진을 찾아 교체합니다">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span>사진 수정</span>
            </button>
          </div>
        </div>

        <!-- 아티클 헤더 (히어로 배너) -->
        <article class="article-header">
          <div class="article-hero-media">
            <img src="${destination.heroImage}" alt="${destination.keyword}" id="article-hero-img" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80';">
            <div class="hero-gradient-overlay"></div>
            <div class="hero-meta-overlay">
              <span class="hero-category-tag">${destination.region || '추천 여행'} · 5대 명소 완벽 정복</span>
              <h1 class="article-main-title">${destination.title}</h1>
              <p class="article-subtitle">${destination.subtitle}</p>
            </div>
          </div>
          <div class="article-author-bar">
            <img class="author-avatar" src="${destination.author.avatar}" alt="${destination.author.name}">
            <div class="author-text">
              <h4>${destination.author.name}</h4>
              <p>작성일: ${destination.author.date} · ${destination.author.readTime} · 조회수 ${destination.likes * 3 + 120}회</p>
            </div>
          </div>
        </article>

        <!-- 프롤로그 여행 에세이 -->
        <div class="prologue-box">
          <div class="prologue-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            여행을 시작하며 (Prologue)
          </div>
          <p class="prologue-text">${destination.introStory}</p>
        </div>

        <!-- 5대 명소 코스 타임라인 요약 바 -->
        <div class="timeline-nav-wrapper">
          <div class="timeline-nav-title" id="timeline-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span id="timeline-title-text">추천 5대 명소 당일/1박2일 꿀코스</span>
          </div>
          <div class="timeline-steps" id="timeline-steps-container">
            <!-- 렌더링 함수에서 동적 삽입 -->
          </div>
        </div>

        <!-- 핵심 명소 상세 블로그 피드 -->
        <div class="spots-container" id="spots-cards-container">
          <!-- 렌더링 함수에서 동적 삽입 -->
        </div>

        <!-- 에필로그 및 총평 -->
        <div class="epilogue-box">
          <span class="epilogue-badge">여행의 마무리 (Epilogue)</span>
          <h3>${destination.keyword} 여행을 마치며</h3>
          <p>${destination.epilogue}</p>
          <div class="epilogue-actions">
            <button class="btn-primary-action" id="btn-re-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              다른 여행지 또 찾아보기
            </button>
            <button class="btn-action" id="btn-scroll-top">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 15l-6-6-6 6"/>
              </svg>
              맨 위로 가기
            </button>
          </div>
        </div>
      </div>
    `;

    // 뷰 전환
    landingSection.style.display = "none";
    blogViewSection.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 스팟 및 타임라인 동적 렌더링 헬퍼
    let showingExtra = false;
    function renderSpotsList(list, isExtra) {
      const stepsContainer = document.getElementById("timeline-steps-container");
      const cardsContainer = document.getElementById("spots-cards-container");
      const titleText = document.getElementById("timeline-title-text");

      if (titleText) {
        titleText.textContent = isExtra 
          ? "✨ 또 다른 매력! 추가 추천지 5곳 코스" 
          : "추천 5대 명소 당일/1박2일 꿀코스";
      }

      if (stepsContainer) {
        stepsContainer.innerHTML = list.map(spot => `
          <a href="#spot-${spot.order}" class="step-item">
            <div class="step-number">${isExtra ? '추천' + spot.order : spot.order}</div>
            <div class="step-name">${spot.name}</div>
            <div class="step-cat">${spot.category}</div>
          </a>
        `).join("");
      }

      if (cardsContainer) {
        cardsContainer.innerHTML = list.map(spot => `
          <section class="spot-card" id="spot-${spot.order}">
            <div class="spot-img-container">
              <img src="${spot.image}" alt="${spot.name}" id="spot-img-${spot.order}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80';">
              <span class="spot-order-pill">${isExtra ? '추천 0' + spot.order : '스팟 0' + spot.order}</span>
              <span class="spot-rating-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                평점 ${spot.rating}
              </span>
            </div>
            <div class="spot-content-body">
              <div class="spot-meta-category">${spot.category}</div>
              <h2 class="spot-main-name">${spot.name}</h2>
              <p class="spot-highlight-quote">"${spot.shortDesc}"</p>
              <p class="spot-first-person-story">${spot.story}</p>

              <!-- 인생샷 & 여행자 꿀팁 그리드 -->
              <div class="spot-tips-grid">
                <div class="tip-box tip-box-photo">
                  <h5>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    포토그래퍼 인생샷 명당 스팟
                  </h5>
                  <p>${spot.photoTip}</p>
                </div>
                <div class="tip-box tip-box-traveler">
                  <h5>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="16" x2="12" y2="12"/>
                      <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                    여행자 필독 현지인 꿀팁 & 동선
                  </h5>
                  <p>${spot.travelerTip}</p>
                </div>
              </div>

              <!-- 부가 정보 칩 -->
              <div class="spot-info-footer">
                <div class="info-chip">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  권장 소요시간: ${spot.timeRequired}
                </div>
                <div class="info-chip">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  위치: ${spot.location}
                </div>
              </div>
            </div>
          </section>
        `).join("");
      }
    }

    // 기본 5곳 렌더링
    renderSpotsList(destination.spots, false);

    // 추가 추천지 탭 버튼 이벤트
    const btnToggleSpots = document.getElementById("btn-toggle-spots");
    const spotsToggleLabel = document.getElementById("spots-toggle-label");
    if (btnToggleSpots) {
      btnToggleSpots.addEventListener("click", () => {
        showingExtra = !showingExtra;
        const currentList = showingExtra ? (destination.extraSpots || destination.spots) : destination.spots;
        renderSpotsList(currentList, showingExtra);

        if (showingExtra) {
          btnToggleSpots.classList.add("active");
          if (spotsToggleLabel) spotsToggleLabel.textContent = "대표 추천 5곳 보기";
        } else {
          btnToggleSpots.classList.remove("active");
          if (spotsToggleLabel) spotsToggleLabel.textContent = "추가 추천지";
        }

        const timelineWrapper = document.querySelector(".timeline-nav-wrapper");
        if (timelineWrapper) {
          timelineWrapper.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // 내부 이벤트 바인딩
    document.getElementById("btn-back-to-list").addEventListener("click", showLandingView);
    document.getElementById("btn-re-search").addEventListener("click", () => {
      showLandingView();
      searchInput.focus();
    });
    document.getElementById("btn-scroll-top").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 북마크 토글
    const btnBookmark = document.getElementById("btn-toggle-bookmark");
    btnBookmark.addEventListener("click", () => {
      if (bookmarkedIds.includes(destination.id)) {
        bookmarkedIds = bookmarkedIds.filter(id => id !== destination.id);
        btnBookmark.classList.remove("liked");
        btnBookmark.querySelector("#bookmark-label").textContent = "여행지 북마크";
      } else {
        bookmarkedIds.push(destination.id);
        btnBookmark.classList.add("liked");
        btnBookmark.querySelector("#bookmark-label").textContent = "북마크 저장됨";
      }
      localStorage.setItem("jowonplace_bookmarks", JSON.stringify(bookmarkedIds));
    });

    // 공유하기
    document.getElementById("btn-share-post").addEventListener("click", () => {
      if (navigator.share) {
        navigator.share({
          title: destination.title,
          text: destination.subtitle,
          url: window.location.href
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("여행 블로그 페이지 링크가 클립보드에 복사되었습니다!");
      }
    });

    // 인쇄
    document.getElementById("btn-print-post").addEventListener("click", () => {
      window.print();
    });

    // 사진 수정 탭메뉴 버튼 이벤트 바인딩
    const btnEditPhotos = document.getElementById("btn-edit-photos");
    if (btnEditPhotos) {
      btnEditPhotos.addEventListener("click", () => {
        openPhotoEditModal(destination, showingExtra);
      });
    }
  }

  // 4-1. 사진 수정 & 실시간 웹 검색 모달 제어 함수
  function openPhotoEditModal(destination, isExtra = false) {
    const modalOverlay = document.getElementById("photo-modal-overlay");
    const modalTitle = document.getElementById("photo-modal-title");
    const modalSubtitle = document.getElementById("photo-modal-subtitle");
    const modalList = document.getElementById("photo-modal-list");
    const btnCloseModal = document.getElementById("btn-close-photo-modal");
    const btnDoneModal = document.getElementById("btn-done-photo-modal");
    const btnAutoSearchAll = document.getElementById("btn-auto-search-all");

    if (!modalOverlay || !modalList) return;

    modalTitle.textContent = `'${destination.keyword}' 여행 사진 수정 & 웹 검색`;
    modalSubtitle.textContent = `웹 검색을 통해 각 명소에 가장 잘 어울리는 실제 사진을 찾아 교체하거나 직접 업로드할 수 있습니다.`;

    const activeSpots = isExtra ? (destination.extraSpots || destination.spots) : destination.spots;

    // 편집 대상 아이템 리스트 (0: 대표 히어로 이미지, 1~5: 각 명소)
    const editItems = [
      {
        id: "hero",
        type: "hero",
        order: 0,
        title: `[대표 배너] ${destination.keyword} 메인 사진`,
        currentImage: destination.heroImage,
        searchTerm: `${destination.keyword} 명소`,
        category: "메인 랜드마크"
      },
      ...activeSpots.map(s => ({
        id: `spot_${s.order}`,
        type: "spot",
        order: s.order,
        title: `스팟 0${s.order}: ${s.name}`,
        currentImage: s.image,
        searchTerm: s.name.replace(/&.*/, '').trim(),
        category: s.category,
        spotRef: s
      }))
    ];

    // 카드 목록 렌더링
    function renderEditCards() {
      modalList.innerHTML = editItems.map(item => `
        <div class="photo-edit-card" data-item-id="${item.id}">
          <div class="photo-edit-card-header">
            <div class="photo-edit-spot-name">
              <span>${item.order === 0 ? '🌟' : '📍'}</span>
              <span>${item.title}</span>
            </div>
            <span class="photo-edit-tag">${item.category}</span>
          </div>

          <div class="photo-edit-content-grid">
            <!-- 현재 적용된 사진 프리뷰 -->
            <div class="photo-current-wrap">
              <span class="photo-current-label">현재 적용된 사진</span>
              <div class="photo-current-img-box">
                <img id="preview-img-${item.id}" src="${item.currentImage}" alt="${item.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80';">
              </div>
            </div>

            <!-- 웹 검색 및 업로드 제어부 -->
            <div class="photo-controls-wrap">
              <div class="search-input-group">
                <input type="text" class="search-photo-input" id="input-query-${item.id}" value="${item.searchTerm}" placeholder="명소 검색어 또는 웹/이미지 URL(https://...) 입력">
                <button type="button" class="btn-trigger-search" data-item-id="${item.id}">
                  🔍 웹 검색
                </button>
              </div>

              <div class="upload-trigger-row">
                <label class="btn-upload-file">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  <span>내 PC 사진 업로드</span>
                  <input type="file" accept="image/*" class="file-input-${item.id}" style="display:none;">
                </label>
                <span style="font-size: 0.72rem; color: #94a3b8;">명소 검색어나 사진이 있는 웹 URL을 넣고 '🔍 웹 검색'을 눌러보세요.</span>
              </div>

              <!-- 웹 검색 결과 썸네일 그리드 -->
              <div class="web-results-container" id="results-container-${item.id}">
                <div class="web-results-label">
                  <span>추천 사진 후보</span>
                  <span style="font-size:0.7rem; color:#94a3b8; font-weight:normal;">(클릭 시 즉시 적용)</span>
                </div>
                <div class="web-results-grid" id="results-grid-${item.id}">
                  <div style="grid-column: 1 / -1; font-size: 0.78rem; color: #94a3b8; padding: 0.5rem 0;">
                    명소 이름 또는 웹 URL을 넣고 '🔍 웹 검색'을 누르면 실시간 사진 후보들을 불러옵니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join("");

      // 각 카드별 이벤트 리스너 바인딩
      editItems.forEach(item => {
        const cardEl = modalList.querySelector(`[data-item-id="${item.id}"]`);
        if (!cardEl) return;

        const btnSearch = cardEl.querySelector(".btn-trigger-search");
        const inputQuery = cardEl.querySelector(`#input-query-${item.id}`);
        const resultsGrid = cardEl.querySelector(`#results-grid-${item.id}`);
        const fileInput = cardEl.querySelector(`.file-input-${item.id}`);

        // 1) 웹 검색 버튼 클릭 (키워드 또는 웹 URL 접속 이미지 추출)
        if (btnSearch && inputQuery && resultsGrid) {
          const runSearch = async () => {
            const query = inputQuery.value.trim();
            if (!query) return;

            const isUrl = /^https?:\/\//i.test(query) || /^www\./i.test(query);

            btnSearch.disabled = true;
            btnSearch.textContent = isUrl ? "URL 분석 중..." : "검색 중...";
            resultsGrid.innerHTML = `
              <div style="grid-column: 1 / -1; font-size: 0.78rem; color: #2563eb; padding: 0.5rem 0;">
                ${isUrl ? `🌐 웹 URL에 접속하여 사진들을 분석하고 있습니다...` : `위키미디어 및 웹에서 '${query}' 실사 사진을 찾고 있습니다...`}
              </div>
            `;

            try {
              let images = [];
              if (isUrl) {
                images = await window.travelSearchEngine.extractImagesFromWebUrl(query);
              } else {
                images = await window.travelSearchEngine.searchMultipleSpotImages(query, 6);
              }

              if (images.length === 0) {
                if (isUrl) {
                  resultsGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; color:#e11d48; font-size:0.75rem; line-height:1.5;">
                      해당 웹페이지에서 접근 가능한 이미지를 찾지 못했거나 보안(CORS) 제한이 있습니다.<br>
                      직접 이미지 파일 링크(.jpg/.png)를 입력하시거나 일반 명소 이름으로 검색해 보세요.
                    </div>
                  `;
                  return;
                } else {
                  const fallbackImg = window.travelSearchEngine.getCategoryFallbackPhoto("landscape");
                  images.push(fallbackImg);
                }
              }

              resultsGrid.innerHTML = images.slice(0, 8).map((imgUrl, i) => `
                <div class="result-photo-thumb" data-url="${imgUrl}" title="이 사진으로 교체하기">
                  <img src="${imgUrl}" alt="추천 사진 후보 ${i + 1}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80';">
                </div>
              `).join("");

              // 썸네일 클릭 시 교체 이벤트
              resultsGrid.querySelectorAll(".result-photo-thumb").forEach(thumb => {
                thumb.addEventListener("click", () => {
                  const selectedUrl = thumb.getAttribute("data-url");
                  applyNewImage(item, selectedUrl);

                  resultsGrid.querySelectorAll(".result-photo-thumb").forEach(t => t.classList.remove("selected"));
                  thumb.classList.add("selected");
                });
              });
            } catch (err) {
              resultsGrid.innerHTML = `<div style="grid-column: 1 / -1; color:#ef4444; font-size:0.75rem;">사진을 가져오는 중 오류가 발생했습니다.</div>`;
            } finally {
              btnSearch.disabled = false;
              btnSearch.textContent = "🔍 웹 검색";
            }
          };

          btnSearch.addEventListener("click", runSearch);
          inputQuery.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              runSearch();
            }
          });
        }

        // 2) 내 PC 파일 업로드
        if (fileInput) {
          fileInput.addEventListener("change", (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                const base64Url = event.target?.result;
                if (base64Url) {
                  applyNewImage(item, base64Url);
                  alert(`'${item.title}' 사진이 성공적으로 업로드되어 교체되었습니다!`);
                }
              };
              reader.readAsDataURL(file);
            }
          });
        }
      });
    }

    // 사진 교체 적용 함수
    function applyNewImage(item, newUrl) {
      if (!newUrl) return;

      // 1) 모달 프리뷰 갱신
      const previewImg = document.getElementById(`preview-img-${item.id}`);
      if (previewImg) previewImg.src = newUrl;
      item.currentImage = newUrl;

      // 2) 데이터 객체 갱신
      if (item.type === "hero") {
        destination.heroImage = newUrl;
        const mainHeroImg = document.getElementById("article-hero-img");
        if (mainHeroImg) mainHeroImg.src = newUrl;
      } else if (item.spotRef) {
        item.spotRef.image = newUrl;
        const spotDomImg = document.getElementById(`spot-img-${item.spotRef.order}`);
        if (spotDomImg) spotDomImg.src = newUrl;
      }

      // 3) 로컬 스토리지에 변경사항 영구 저장
      if (window.travelSearchEngine) {
        window.travelSearchEngine.saveCustomToStorage(destination);
      }
    }

    // 전체 사진 실시간 자동 웹 검색 & 일괄 교체
    btnAutoSearchAll.onclick = async () => {
      btnAutoSearchAll.disabled = true;
      btnAutoSearchAll.innerHTML = `
        <span class="loading-spinner" style="width:14px; height:14px; border-width:2px; display:inline-block; vertical-align:middle; margin-right:6px;"></span>
        <span>웹에서 5대 명소 실제 사진 검색 및 일괄 최적화 중...</span>
      `;

      try {
        for (const item of editItems) {
          const query = item.searchTerm || `${destination.keyword} ${item.title}`;
          const bestImg = await window.travelSearchEngine.fetchSpotImage(query, "landmark");
          if (bestImg) {
            applyNewImage(item, bestImg);
          }
        }
        renderEditCards();
        alert(`'${destination.keyword}' 5대 명소의 실제 사진이 웹 검색을 통해 모두 최신 사진으로 일괄 교체되었습니다!`);
      } catch (e) {
        console.warn("일괄 사진 교체 실패:", e);
        alert("사진 검색 중 일부 오류가 발생했습니다.");
      } finally {
        btnAutoSearchAll.disabled = false;
        btnAutoSearchAll.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
          <span>5대 명소 전체 사진 실시간 웹 검색 자동 추천 & 일괄 교체</span>
        `;
      }
    };

    // 모달 닫기
    const closeModal = () => {
      modalOverlay.classList.remove("active");
    };

    btnCloseModal.onclick = closeModal;
    btnDoneModal.onclick = closeModal;
    modalOverlay.onclick = (e) => {
      if (e.target === modalOverlay) closeModal();
    };

    // 모달 활성화 및 초기 카드 렌더링
    renderEditCards();
    modalOverlay.classList.add("active");
  }

  function showLandingView() {
    blogViewSection.classList.remove("active");
    landingSection.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 5. 검색 폼 이벤트 리스너
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch(searchInput.value);
  });

  // 6. 빠른 추천 태그 클릭
  quickTags.forEach(tag => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      const place = tag.getAttribute("data-place");
      if (place) {
        searchInput.value = place;
        handleSearch(place);
      }
    });
  });

  // 7. 내 북마크 모아보기 버튼
  if (btnBookmarkNav) {
    btnBookmarkNav.addEventListener("click", () => {
      if (bookmarkedIds.length === 0) {
        alert("아직 북마크한 여행지가 없습니다. 마음에 드는 여행지를 찾아 북마크해 보세요!");
        return;
      }
      const allDests = window.travelSearchEngine.cachedDestinations;
      const firstBookmarked = allDests.find(d => bookmarkedIds.includes(d.id));
      if (firstBookmarked) {
        openBlogPost(firstBookmarked);
      }
    });
  }

  // 초기 실행
  renderCurationGrid();
});
