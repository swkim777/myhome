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
    <a href="${p.socials.github}" target="_blank" rel="noreferrer" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors" title="GitHub">
      <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
    </a>
    <a href="${p.socials.notion}" target="_blank" rel="noreferrer" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors" title="Notion">
      <i data-lucide="notebook-pen" class="w-5 h-5"></i>
    </a>
    <a href="${p.socials.home}" target="_blank" rel="noreferrer" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors" title="Jowon Home">
      <i data-lucide="home" class="w-5 h-5"></i>
    </a>
    <a href="${p.socials.email}" class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors" title="Email">
      <i data-lucide="mail" class="w-5 h-5"></i>
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
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
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