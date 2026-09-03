document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProfile();
  renderSkills();
  renderProjects('all');
  renderExperiences();
  setupFilterButtons();
  setupEmailCopy();
  lucide.createIcons();
});

// 1. 다크 모드 토글
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });

  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  const iconContainer = document.getElementById('theme-icon');
  if (iconContainer) {
    iconContainer.innerHTML = isDark 
      ? `<i data-lucide="sun" class="w-5 h-5 text-amber-400"></i>`
      : `<i data-lucide="moon" class="w-5 h-5 text-slate-700"></i>`;
    lucide.createIcons();
  }
}

// 2. 프로필 렌더링
function renderProfile() {
  const p = portfolioData.profile;
  document.getElementById('profile-name').textContent = p.name;
  document.getElementById('profile-title').textContent = p.title;
  document.getElementById('profile-tagline').textContent = p.tagline;
  document.getElementById('profile-bio').textContent = p.bio;
  document.getElementById('profile-status').textContent = p.status;
  document.getElementById('profile-avatar').src = p.avatar || 'assets/profile.jpg';

  const socialContainer = document.getElementById('social-links');
  socialContainer.innerHTML = `
    <a href="${p.socials.github}" target="_blank" rel="noreferrer" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200" title="GitHub">
      <i data-lucide="github" class="w-5 h-5"></i>
    </a>
    <a href="${p.socials.linkedin}" target="_blank" rel="noreferrer" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200" title="LinkedIn">
      <i data-lucide="linkedin" class="w-5 h-5"></i>
    </a>
    <a href="${p.socials.blog}" target="_blank" rel="noreferrer" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200" title="Tech Blog">
      <i data-lucide="book-open" class="w-5 h-5"></i>
    </a>
  `;
}

// 3. 기술 스택 렌더링
function renderSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = portfolioData.skills.map(group => `
    <div class="p-5 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 shadow-sm">
      <h3 class="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3 uppercase tracking-wider">${group.category}</h3>
      <div class="flex flex-wrap gap-2">
        ${group.items.map(item => `
          <span class="px-3 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
            ${item}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// 4. 프로젝트 렌더링 및 필터링
function renderProjects(category) {
  const container = document.getElementById('projects-container');
  const filtered = category === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(p => p.category === category);

  container.innerHTML = filtered.map(proj => `
    <div class="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/70 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="text-xs font-medium text-slate-400 dark:text-slate-400">${proj.period}</span>
          ${proj.badge ? `<span class="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">${proj.badge}</span>` : ''}
        </div>
        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">${proj.title}</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">${proj.description}</p>
        <div class="flex flex-wrap gap-1.5 mb-5">
          ${proj.tags.map(t => `<span class="px-2.5 py-0.5 text-xs rounded-md bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 font-medium">#${t}</span>`).join('')}
        </div>
      </div>
      <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/50">
        <a href="${proj.demoUrl}" target="_blank" rel="noreferrer" class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
          <span>Live Demo</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
        <a href="${proj.githubUrl}" target="_blank" rel="noreferrer" class="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200" title="GitHub Code">
          <i data-lucide="github" class="w-4 h-4"></i>
        </a>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function setupFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm');
        b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });
      btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-sm');

      renderProjects(btn.dataset.category);
    });
  });
}

// 5. 경력 타임라인 렌더링
function renderExperiences() {
  const container = document.getElementById('experience-timeline');
  container.innerHTML = portfolioData.experiences.map(exp => `
    <div class="relative pl-6 pb-8 last:pb-2 border-l-2 border-slate-200 dark:border-slate-700">
      <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-600 border-4 border-slate-50 dark:border-slate-900"></div>
      <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
        <h3 class="text-base font-bold text-slate-900 dark:text-white">${exp.role}</h3>
        <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">${exp.period}</span>
      </div>
      <div class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">${exp.company}</div>
      <ul class="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        ${exp.description.map(item => `
          <li class="flex items-start gap-2">
            <span class="text-indigo-500 font-bold">•</span>
            <span>${item}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
}

// 6. 이메일 클립보드 복사 및 피드백 토스트
function setupEmailCopy() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(portfolioData.profile.email).then(() => {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('show'), 10);

        setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.classList.add('hidden'), 300);
        }, 2500);
      });
    });
  });
}