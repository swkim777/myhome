/**
 * VERTEX Mountain Explorer & Trail Lab
 * Core Application Logic & Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==================== 1. App State ====================
  const state = {
    filters: {
      search: '',
      difficulty: 'all',
      region: 'all',
      theme: 'all',
      sort: 'altitude-desc'
    },
    currentMountain: null,
    bookmarks: JSON.parse(localStorage.getItem('vertex_bookmarks') || '[]'),
    checklists: JSON.parse(localStorage.getItem('vertex_checklists') || '{}'),
    simParams: {
      altitude: 1708,
      baseTemp: 15,
      windSpeed: 6.0
    }
  };

  // ==================== 2. DOM Elements Cache ====================
  const elements = {
    themeToggle: document.getElementById('theme-toggle'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    parallaxBg: document.getElementById('parallax-bg'),
    mountainGrid: document.getElementById('mountain-grid'),
    mountainCount: document.getElementById('mountain-count'),
    noResults: document.getElementById('no-results'),
    searchInput: document.getElementById('mountain-search'),
    sortSelect: document.getElementById('sort-select'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    // Modal
    modal: document.getElementById('mountain-modal'),
    modalBackdrop: document.getElementById('modal-backdrop'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    modalImg: document.getElementById('modal-img'),
    modalTitle: document.getElementById('modal-title'),
    modalRegion: document.getElementById('modal-region'),
    modalDiff: document.getElementById('modal-badge-diff'),
    modalAlt: document.getElementById('modal-alt'),
    modalDur: document.getElementById('modal-dur'),
    modalDist: document.getElementById('modal-dist'),
    modalDesc: document.getElementById('modal-desc'),
    modalElevationSvg: document.getElementById('modal-elevation-svg'),
    elevationTooltip: document.getElementById('elevation-tooltip'),
    modalWaypoints: document.getElementById('modal-waypoints'),
    modalChecklist: document.getElementById('modal-checklist'),
    checklistProgress: document.getElementById('checklist-progress'),
    modalActionBtn: document.getElementById('modal-action-btn'),
    // Simulator
    altitudeSlider: document.getElementById('altitude-slider'),
    altitudeVal: document.getElementById('altitude-val'),
    baseTempSlider: document.getElementById('base-temp-slider'),
    baseTempVal: document.getElementById('base-temp-val'),
    windSlider: document.getElementById('wind-slider'),
    windVal: document.getElementById('wind-val'),
    calcTemp: document.getElementById('calc-temp'),
    calcTempDrop: document.getElementById('calc-temp-drop'),
    calcWindchill: document.getElementById('calc-windchill'),
    calcRiskLevel: document.getElementById('calc-risk-level'),
    calcPressure: document.getElementById('calc-pressure'),
    calcOxygen: document.getElementById('calc-oxygen'),
    mountainSvgShape: document.getElementById('mountain-svg-shape'),
    svgIndicatorLine: document.getElementById('svg-indicator-line'),
    svgIndicatorDot: document.getElementById('svg-indicator-dot'),
    svgTextPeak: document.getElementById('svg-text-peak'),
    diagramAltLabel: document.getElementById('diagram-alt-label'),
    recommendationTitle: document.getElementById('recommendation-title'),
    recommendationDesc: document.getElementById('recommendation-desc'),
    presetBtns: document.querySelectorAll('.preset-btn'),
    // Accordion
    accordionToggles: document.querySelectorAll('.accordion-toggle'),
    // Lightbox
    lightboxModal: document.getElementById('lightbox-modal'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxTitle: document.getElementById('lightbox-title'),
    lightboxDesc: document.getElementById('lightbox-desc'),
    lightboxClose: document.getElementById('lightbox-close'),
    galleryItems: document.querySelectorAll('.gallery-item'),
    heroPeakCards: document.querySelectorAll('.hero-peak-card')
  };

  // ==================== 3. Theme Toggle & Init ====================
  function initTheme() {
    const savedTheme = localStorage.getItem('vertex_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('vertex_theme', isDark ? 'dark' : 'light');
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  elements.themeToggle.addEventListener('click', toggleTheme);

  // 모바일 메뉴 토글
  elements.mobileMenuBtn.addEventListener('click', () => {
    elements.mobileMenu.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      elements.mobileMenu.classList.add('hidden');
    });
  });

  // ==================== 4. Parallax Scroll Effect ====================
  let lastScrollY = 0;
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    if (elements.parallaxBg && scrollY < window.innerHeight * 1.5) {
      elements.parallaxBg.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0) scale(1.05)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  // ==================== 5. Mountain Cards Render & Filtering ====================
  function getDifficultyBadge(diff) {
    switch (diff) {
      case '초급':
        return '<span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">초급 (Easy)</span>';
      case '중급':
        return '<span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">중급 (Moderate)</span>';
      case '상급':
        return '<span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30">상급 (Hard)</span>';
      default:
        return `<span class="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-slate-500/20 text-slate-400">${diff}</span>`;
    }
  }

  function filterAndSortMountains() {
    let list = [...MOUNTAIN_DATA];

    // 1. 검색어 필터
    if (state.filters.search.trim() !== '') {
      const q = state.filters.search.toLowerCase().trim();
      list = list.filter(m => 
        m.name.toLowerCase().includes(q) ||
        m.subTitle.toLowerCase().includes(q) ||
        m.shortDesc.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q) ||
        (m.location && m.location.toLowerCase().includes(q)) ||
        m.themes.some(t => t.toLowerCase().includes(q)) ||
        m.waypoints.some(w => w.name.toLowerCase().includes(q))
      );
    }

    // 2. 난이도 필터
    if (state.filters.difficulty !== 'all') {
      list = list.filter(m => m.difficulty === state.filters.difficulty);
    }

    // 3. 지역 필터
    if (state.filters.region !== 'all') {
      list = list.filter(m => m.region === state.filters.region);
    }

    // 4. 테마 필터
    if (state.filters.theme !== 'all') {
      list = list.filter(m => m.themes.includes(state.filters.theme));
    }

    // 5. 정렬
    switch (state.filters.sort) {
      case 'altitude-desc':
        list.sort((a, b) => b.altitude - a.altitude);
        break;
      case 'altitude-asc':
        list.sort((a, b) => a.altitude - b.altitude);
        break;
      case 'distance-desc':
        list.sort((a, b) => b.distance - a.distance);
        break;
      case 'duration-desc':
        list.sort((a, b) => b.distance - a.distance); // 대략적인 난이도/거리 연동
        break;
      case 'popular':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return list;
  }

  function renderMountains() {
    const list = filterAndSortMountains();
    elements.mountainCount.textContent = list.length;

    if (list.length === 0) {
      elements.mountainGrid.innerHTML = '';
      elements.noResults.classList.remove('hidden');
      return;
    }

    elements.noResults.classList.add('hidden');
    elements.mountainGrid.innerHTML = list.map(m => {
      const isBookmarked = state.bookmarks.includes(m.id);
      const rankBadge = m.top20Rank
        ? `<span class="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-amber-500/90 text-slate-950 backdrop-blur-md shadow-sm">🏆 TOP ${m.top20Rank}</span>`
        : '';
      const forest100Badge = m.isForest100
        ? `<span class="px-2 py-1 rounded-lg text-[11px] font-mono font-semibold bg-emerald-600/85 text-white backdrop-blur-md shadow-sm">🌲 100대명산</span>`
        : '';
      const themeTags = m.themes.map(t => 
        `<span class="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">#${t}</span>`
      ).join(' ');

      return `
        <article class="mountain-card group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm cursor-pointer" data-id="${m.id}">
          <!-- 카드 상단 이미지 -->
          <div class="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-800">
            <img src="${m.image}" alt="${m.name}" loading="lazy" referrerpolicy="no-referrer" onerror="if(this.dataset.fallback && this.src!==this.dataset.fallback){this.src=this.dataset.fallback;}" data-fallback="${m.fallbackImage || ''}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20"></div>
            
            <!-- 지역, TOP 20 순위 및 북마크 뱃지 -->
            <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div class="flex flex-wrap items-center gap-1.5">
                ${rankBadge}
                ${forest100Badge}
                <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-black/40 text-white backdrop-blur-md border border-white/20">
                  ${m.region}
                </span>
              </div>
              <button class="bookmark-btn w-9 h-9 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors hover:bg-black/60" data-id="${m.id}" title="버킷리스트">
                <i data-lucide="bookmark" class="w-4 h-4 ${isBookmarked ? 'fill-sunset-orange text-sunset-orange' : ''}"></i>
              </button>
            </div>

            <!-- 하단 핵심 스펙 오버레이 -->
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <div class="flex items-center gap-2 mb-1">
                ${getDifficultyBadge(m.difficulty)}
                <span class="text-xs font-mono text-slate-300">★ ${m.rating}</span>
              </div>
              <h3 class="text-xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors">${m.name}</h3>
            </div>
          </div>

          <!-- 카드 본문 -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
            <div>
              <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                ${m.shortDesc}
              </p>
              
              <!-- 테마 태그 -->
              <div class="flex flex-wrap gap-1.5 mt-3">
                ${themeTags}
              </div>
            </div>

            <!-- 스펙 그리드 (고도, 소요시간, 거리) -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center font-mono">
              <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60">
                <span class="text-[10px] text-slate-400 block uppercase">해발 고도</span>
                <span class="text-sm font-bold text-forest-800 dark:text-alpine-mint">${m.altitude.toLocaleString()}m</span>
              </div>
              <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60">
                <span class="text-[10px] text-slate-400 block uppercase">예상 시간</span>
                <span class="text-sm font-bold text-slate-800 dark:text-slate-200">${m.duration.replace('시간', 'h').replace('분', 'm')}</span>
              </div>
              <div class="p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60">
                <span class="text-[10px] text-slate-400 block uppercase">총 거리</span>
                <span class="text-sm font-bold text-sunset-orange">${m.distance}km</span>
              </div>
            </div>

            <!-- CTA 액션 버튼 -->
            <button class="view-detail-btn w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-forest-800 hover:text-white dark:hover:bg-alpine-mint dark:hover:text-forest-950 text-slate-800 dark:text-slate-200 text-xs font-semibold font-mono transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md" data-id="${m.id}">
              <span>상세 코스 & 고도표 보기</span>
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>
        </article>
      `;
    }).join('');

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // 필터 버튼 클릭 핸들러
  elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      const val = btn.dataset.val;

      // 같은 그룹의 다른 버튼 active 제거
      document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      state.filters[group] = val;
      renderMountains();
    });
  });

  // 검색 입력 핸들러
  elements.searchInput.addEventListener('input', (e) => {
    state.filters.search = e.target.value;
    renderMountains();
  });

  // 정렬 셀렉트 핸들러
  elements.sortSelect.addEventListener('change', (e) => {
    state.filters.sort = e.target.value;
    renderMountains();
  });

  // 필터 초기화 버튼
  elements.resetFiltersBtn.addEventListener('click', () => {
    state.filters = {
      search: '',
      difficulty: 'all',
      region: 'all',
      theme: 'all',
      sort: 'altitude-desc'
    };
    elements.searchInput.value = '';
    elements.sortSelect.value = 'altitude-desc';
    elements.filterBtns.forEach(btn => {
      if (btn.dataset.val === 'all') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    renderMountains();
  });

  // 카드 클릭 시 모달 열기 위임
  elements.mountainGrid.addEventListener('click', (e) => {
    const bookmarkBtn = e.target.closest('.bookmark-btn');
    if (bookmarkBtn) {
      e.stopPropagation();
      const id = bookmarkBtn.dataset.id;
      toggleBookmark(id);
      return;
    }

    const card = e.target.closest('.mountain-card');
    if (card) {
      const id = card.dataset.id;
      openMountainModal(id);
    }
  });

  // 상단 히어로 명산 카드 클릭 시에도 모달 오픈
  elements.heroPeakCards.forEach(card => {
    card.addEventListener('click', () => {
      const peakId = card.dataset.peakId;
      openMountainModal(peakId);
    });
  });

  function toggleBookmark(id) {
    if (state.bookmarks.includes(id)) {
      state.bookmarks = state.bookmarks.filter(b => b !== id);
    } else {
      state.bookmarks.push(id);
    }
    localStorage.setItem('vertex_bookmarks', JSON.stringify(state.bookmarks));
    renderMountains();
  }

  // ==================== 6. Modal & Elevation SVG Chart Rendering ====================
  function openMountainModal(id) {
    const mountain = MOUNTAIN_DATA.find(m => m.id === id);
    if (!mountain) return;

    state.currentMountain = mountain;

    // 모달 데이터 채우기
    elements.modalImg.src = mountain.image;
    elements.modalTitle.textContent = mountain.name;
    elements.modalRegion.textContent = `${mountain.region} · ${mountain.subTitle}`;
    elements.modalDiff.className = 'px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold ';
    if (mountain.difficulty === '초급') {
      elements.modalDiff.className += 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      elements.modalDiff.textContent = '초급 코스';
    } else if (mountain.difficulty === '중급') {
      elements.modalDiff.className += 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      elements.modalDiff.textContent = '중급 코스';
    } else {
      elements.modalDiff.className += 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
      elements.modalDiff.textContent = '상급 코스';
    }

    elements.modalAlt.textContent = `${mountain.altitude.toLocaleString()}m`;
    elements.modalDur.textContent = mountain.duration;
    elements.modalDist.textContent = `${mountain.distance}km`;
    elements.modalDesc.textContent = mountain.fullDesc;

    const modalLocationEl = document.getElementById('modal-location');
    if (modalLocationEl) {
      const forestLink = mountain.forestId
        ? ` · <a href="https://www.forest.go.kr/kfsweb/kfi/kfs/foreston/main/contents/ClbngManage/selectMntnInfoDetail.do?mntnId=${mountain.forestId}&mn=AR02_02_05_01" target="_blank" rel="noopener noreferrer" class="underline text-forest-800 dark:text-alpine-mint font-semibold">산림청 공식정보 ↗</a>`
        : '';
      const wikiLink = mountain.wikiUrl
        ? ` · <a href="${mountain.wikiUrl}" target="_blank" rel="noopener noreferrer" class="underline text-forest-800 dark:text-alpine-mint font-semibold">위키백과 ↗</a>`
        : '';
      modalLocationEl.innerHTML = `📍 소재지: ${mountain.location || mountain.region}${forestLink}${wikiLink}`;
    }

    // 웨이포인트 렌더링
    elements.modalWaypoints.innerHTML = mountain.waypoints.map((w, idx) => `
      <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
        <div class="w-6 h-6 rounded-full bg-forest-800 dark:bg-alpine-mint text-white dark:text-slate-950 font-mono text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
          ${idx + 1}
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h5 class="font-bold text-xs text-slate-800 dark:text-slate-200">${w.name}</h5>
            <span class="text-[11px] font-mono text-forest-800 dark:text-alpine-mint font-semibold">${w.alt}m</span>
          </div>
          <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">${w.note} (${w.dist}km 지점)</p>
        </div>
      </div>
    `).join('');

    // 체크리스트 렌더링
    renderChecklist(mountain);

    // SVG 고도 프로필 렌더링
    renderElevationSvg(mountain);

    // 북마크 버튼 상태 동기화
    updateModalBookmarkBtn(mountain.id);

    // 모달 표시 애니메이션
    elements.modal.classList.remove('opacity-0', 'pointer-events-none');
    elements.modal.querySelector('.transform').classList.remove('scale-95');
    elements.modal.querySelector('.transform').classList.add('scale-100');
    document.body.style.overflow = 'hidden';

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeModal() {
    elements.modal.classList.add('opacity-0', 'pointer-events-none');
    elements.modal.querySelector('.transform').classList.add('scale-95');
    elements.modal.querySelector('.transform').classList.remove('scale-100');
    document.body.style.overflow = '';
  }

  elements.modalCloseBtn.addEventListener('click', closeModal);
  elements.modalBackdrop.addEventListener('click', closeModal);

  // ESC 키로 모달 닫기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });

  function updateModalBookmarkBtn(id) {
    const isBookmarked = state.bookmarks.includes(id);
    if (isBookmarked) {
      elements.modalActionBtn.innerHTML = `
        <i data-lucide="bookmark-check" class="w-4 h-4 text-sunset-orange"></i>
        <span>내 버킷리스트에 저장됨</span>
      `;
    } else {
      elements.modalActionBtn.innerHTML = `
        <i data-lucide="bookmark" class="w-4 h-4"></i>
        <span>내 등산 버킷리스트 저장</span>
      `;
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  elements.modalActionBtn.addEventListener('click', () => {
    if (!state.currentMountain) return;
    toggleBookmark(state.currentMountain.id);
    updateModalBookmarkBtn(state.currentMountain.id);
  });

  // 체크리스트 렌더링 & 상태 저장
  function renderChecklist(mountain) {
    const saved = state.checklists[mountain.id] || [];
    
    elements.modalChecklist.innerHTML = mountain.checklist.map((item, idx) => {
      const isChecked = saved.includes(idx);
      return `
        <label class="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-forest-800 dark:hover:border-alpine-mint transition-colors">
          <input type="checkbox" class="trail-checkbox checklist-item" data-idx="${idx}" ${isChecked ? 'checked' : ''}>
          <span class="text-slate-700 dark:text-slate-300 text-xs font-medium leading-snug select-none ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}">
            ${item}
          </span>
        </label>
      `;
    }).join('');

    updateChecklistProgress(mountain);

    // 체크박스 클릭 리스너
    elements.modalChecklist.querySelectorAll('.checklist-item').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        let list = state.checklists[mountain.id] || [];
        if (e.target.checked) {
          if (!list.includes(idx)) list.push(idx);
        } else {
          list = list.filter(i => i !== idx);
        }
        state.checklists[mountain.id] = list;
        localStorage.setItem('vertex_checklists', JSON.stringify(state.checklists));
        renderChecklist(mountain);
      });
    });
  }

  function updateChecklistProgress(mountain) {
    const saved = state.checklists[mountain.id] || [];
    const total = mountain.checklist.length;
    elements.checklistProgress.textContent = `${saved.length} / ${total} 완료 (${Math.round((saved.length / total) * 100)}%)`;
  }

  // 동적 SVG 고도 프로필 렌더링
  function renderElevationSvg(mountain) {
    const profile = mountain.elevationProfile;
    if (!profile || profile.length === 0) return;

    const width = 700;
    const height = 200;
    const padding = { top: 30, right: 30, bottom: 40, left: 50 };

    const minAlt = Math.min(...profile.map(p => p.alt)) * 0.85;
    const maxAlt = Math.max(...profile.map(p => p.alt)) * 1.08;
    const maxKm = profile[profile.length - 1].km;

    const scaleX = (km) => padding.left + (km / maxKm) * (width - padding.left - padding.right);
    const scaleY = (alt) => height - padding.bottom - ((alt - minAlt) / (maxAlt - minAlt)) * (height - padding.top - padding.bottom);

    // 포인트 좌표 계산
    const points = profile.map(p => ({
      x: scaleX(p.km),
      y: scaleY(p.alt),
      alt: p.alt,
      km: p.km,
      label: p.label
    }));

    // SVG Path (Area & Line)
    let pathD = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev.x + curr.x) / 2;
      pathD += ` C ${midX},${prev.y} ${midX},${curr.y} ${curr.x},${curr.y}`;
    }

    const areaD = `${pathD} L ${points[points.length - 1].x},${height - padding.bottom} L ${points[0].x},${height - padding.bottom} Z`;

    // 수평 고도 기준선 (Grid lines)
    const gridLines = [
      Math.round(minAlt),
      Math.round((minAlt + maxAlt) / 2),
      Math.round(maxAlt)
    ];

    const gridSvg = gridLines.map(alt => {
      const y = scaleY(alt);
      return `
        <line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="currentColor" stroke-dasharray="3 3" class="text-slate-200 dark:text-slate-800" stroke-width="1" />
        <text x="${padding.left - 8}" y="${y + 4}" text-anchor="end" font-size="10" font-family="JetBrains Mono" fill="#94A3B8">${alt}m</text>
      `;
    }).join('');

    // 포인트 원 (Dots) & 이벤트
    const dotsSvg = points.map((p, i) => `
      <g class="waypoint-group" data-label="${p.label}" data-alt="${p.alt}" data-km="${p.km}" data-x="${p.x}" data-y="${p.y}">
        <circle cx="${p.x}" cy="${p.y}" r="5" fill="#10B981" stroke="#ffffff" stroke-width="2" class="waypoint-dot transition-all" />
        <text x="${p.x}" y="${height - padding.bottom + 20}" text-anchor="middle" font-size="10" font-family="Pretendard" fill="#64748B">${p.km}k</text>
      </g>
    `).join('');

    elements.modalElevationSvg.innerHTML = `
      <defs>
        <linearGradient id="elevationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#10B981" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#10B981" stop-opacity="0.02" />
        </linearGradient>
      </defs>
      
      <!-- 기준선 -->
      ${gridSvg}

      <!-- 영역 채우기 -->
      <path d="${areaD}" fill="url(#elevationGrad)" />

      <!-- 곡선 라인 -->
      <path d="${pathD}" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="chart-path" />

      <!-- 웨이포인트 닷 -->
      ${dotsSvg}
    `;

    // 툴팁 인터랙션
    const groups = elements.modalElevationSvg.querySelectorAll('.waypoint-group');
    groups.forEach(g => {
      g.addEventListener('mouseenter', (e) => {
        const label = g.dataset.label;
        const alt = g.dataset.alt;
        const km = g.dataset.km;
        const x = parseFloat(g.dataset.x);
        const y = parseFloat(g.dataset.y);

        elements.elevationTooltip.innerHTML = `<strong>${label}</strong> · ${alt}m (${km}km)`;
        elements.elevationTooltip.classList.remove('hidden');

        // SVG 좌표를 컨테이너 상대 좌표로 변환
        const svgRect = elements.modalElevationSvg.getBoundingClientRect();
        const tooltipX = (x / width) * svgRect.width;
        const tooltipY = (y / height) * svgRect.height;

        elements.elevationTooltip.style.left = `${tooltipX}px`;
        elements.elevationTooltip.style.top = `${tooltipY - 35}px`;
        elements.elevationTooltip.style.transform = 'translateX(-50%)';
      });

      g.addEventListener('mouseleave', () => {
        elements.elevationTooltip.classList.add('hidden');
      });
    });
  }

  // ==================== 7. Elevation & Weather Physics Simulator ====================
  function updateSimulator() {
    const h = state.simParams.altitude;
    const t0 = state.simParams.baseTemp;
    const wind = state.simParams.windSpeed;

    // 1. 단열 감률에 따른 예상 정상 기온: 100m당 0.65°C 하강
    const tempDrop = (h / 100) * 0.65;
    const peakTemp = t0 - tempDrop;

    // 2. 윈드칠 체감 온도 공식 (Wind Chill Index)
    // T_wc = 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16) (V in km/h)
    const windKmh = wind * 3.6;
    let windchill = peakTemp;
    if (windKmh > 4.8) {
      windchill = 13.12 + 0.6215 * peakTemp - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * peakTemp * Math.pow(windKmh, 0.16);
    }

    // 3. 대기압 (ISA 표준 공식)
    const pressure = Math.round(1013.25 * Math.pow(1 - 0.0000225577 * h, 5.25588));

    // 4. 유효 산소 비율
    const oxygen = Math.max(65, Math.round(100 - (h / 3000) * 30));

    // UI 텍스트 업데이트
    elements.altitudeVal.textContent = `${h.toLocaleString()} m`;
    elements.baseTempVal.textContent = `${t0.toFixed(1)} °C`;
    elements.windVal.textContent = `${wind.toFixed(1)} m/s`;

    elements.calcTemp.textContent = `${peakTemp.toFixed(1)}°C`;
    elements.calcTempDrop.textContent = `-${tempDrop.toFixed(1)}°C 하강`;

    elements.calcWindchill.textContent = `${windchill.toFixed(1)}°C`;
    elements.calcPressure.textContent = `${pressure} hPa`;
    elements.calcOxygen.textContent = `${oxygen}%`;

    // 위험도 및 추천 장비 설정
    if (windchill < -10) {
      elements.calcRiskLevel.textContent = '극심 위험 (동상 위험)';
      elements.calcRiskLevel.className = 'text-[10px] text-rose-500 font-mono font-bold';
      elements.recommendationTitle.textContent = '극동계 익스트림 보온 장비 필수';
      elements.recommendationDesc.textContent = '체감 온도가 -10°C 이하입니다. 노출된 피부 동상 발생 위험이 매우 높습니다. 방한 고글, 바라클라바, 헤비 다운 우모복, 핫팩 다량 구비 필수.';
    } else if (windchill < 0) {
      elements.calcRiskLevel.textContent = '경고 (저체온증 주의)';
      elements.calcRiskLevel.className = 'text-[10px] text-amber-500 font-mono font-bold';
      elements.recommendationTitle.textContent = '방풍 및 윈드스토퍼 레이어링 필수';
      elements.recommendationDesc.textContent = '영하권의 체감 온도로 땀이 식을 때 급격한 체온 저하가 일어납니다. 보온 플리스와 방풍 하드쉘을 즉시 착용하세요.';
    } else if (windchill < 12) {
      elements.calcRiskLevel.textContent = '주의 (서늘한 능선)';
      elements.calcRiskLevel.className = 'text-[10px] text-slate-400 font-mono';
      elements.recommendationTitle.textContent = '경량 바람막이 및 속건성 이너웨어';
      elements.recommendationDesc.textContent = '활동 시 쾌적하나 능선 휴식 시 한기가 들 수 있습니다. 얇은 방풍 윈드브레이커를 상시 휴대하세요.';
    } else {
      elements.calcRiskLevel.textContent = '쾌적 (온화한 산행)';
      elements.calcRiskLevel.className = 'text-[10px] text-emerald-500 font-mono font-bold';
      elements.recommendationTitle.textContent = '자외선 차단 및 수분 보충';
      elements.recommendationDesc.textContent = '기온이 온화하지만 자외선 지수가 높습니다. 챙이 넓은 모자와 1.5L 이상의 충분한 수분을 준비하세요.';
    }

    // SVG 산 지형 인디케이터 동적 연동
    // max altitude 3000m -> Y mapping (150 -> 20)
    const norm = Math.min(1, Math.max(0, h / 3000));
    const targetY = 150 - norm * 130;
    const targetX = 180 + norm * 180;

    elements.svgIndicatorDot.setAttribute('cy', targetY);
    elements.svgIndicatorDot.setAttribute('cx', targetX);
    elements.svgIndicatorLine.setAttribute('y1', targetY);
    elements.svgIndicatorLine.setAttribute('x1', targetX);
    elements.svgIndicatorLine.setAttribute('x2', targetX);
    elements.svgTextPeak.setAttribute('y', Math.max(15, targetY - 10));
    elements.svgTextPeak.setAttribute('x', targetX);
    elements.svgTextPeak.textContent = `${h.toLocaleString()}m (${peakTemp.toFixed(1)}°C)`;
  }

  // 시뮬레이터 이벤트 리스너
  elements.altitudeSlider.addEventListener('input', (e) => {
    state.simParams.altitude = parseInt(e.target.value, 10);
    elements.diagramAltLabel.textContent = `고도 (${state.simParams.altitude}m)`;
    updateSimulator();
  });

  elements.baseTempSlider.addEventListener('input', (e) => {
    state.simParams.baseTemp = parseFloat(e.target.value);
    updateSimulator();
  });

  elements.windSlider.addEventListener('input', (e) => {
    state.simParams.windSpeed = parseFloat(e.target.value);
    updateSimulator();
  });

  // 프리셋 버튼 리스너
  elements.presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const alt = parseFloat(btn.dataset.alt);
      const name = btn.dataset.name;
      state.simParams.altitude = alt;
      elements.altitudeSlider.value = Math.round(alt);
      elements.diagramAltLabel.textContent = `${name} (${alt}m)`;
      updateSimulator();
    });
  });

  // ==================== 8. Accordion Logic ====================
  elements.accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const chevron = toggle.querySelector('[data-lucide="chevron-down"]');
      const isExpanded = !content.classList.contains('hidden');

      if (isExpanded) {
        content.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        content.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });
  });

  // ==================== 9. Gallery & Bento Grid Lightbox ====================
  function openLightbox(imgSrc, title, loc, alt) {
    elements.lightboxImg.src = imgSrc;
    elements.lightboxTitle.textContent = title;
    elements.lightboxDesc.textContent = `${loc} · 해발 ${alt}`;
    elements.lightboxModal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    elements.lightboxModal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  elements.galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.dataset.img;
      const title = item.dataset.title;
      const loc = item.dataset.loc;
      const alt = item.dataset.alt;
      openLightbox(imgSrc, title, loc, alt);
    });
  });

  elements.lightboxClose.addEventListener('click', closeLightbox);
  elements.lightboxModal.addEventListener('click', (e) => {
    if (e.target === elements.lightboxModal) {
      closeLightbox();
    }
  });

  // ==================== 10. Initial Application Run ====================
  initTheme();
  renderMountains();
  updateSimulator();

  // 상단 히어로 실시간 기온 미세 변동 애니메이션 (현실감 부여)
  setInterval(() => {
    document.querySelectorAll('.peak-temp-live').forEach(el => {
      const base = parseFloat(el.dataset.base);
      const delta = (Math.random() * 0.4 - 0.2);
      const newTemp = (base + delta).toFixed(1);
      el.textContent = `${newTemp}°C`;
    });
  }, 4000);

  if (window.lucide) {
    lucide.createIcons();
  }
});
