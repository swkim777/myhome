/**
 * main.js - Interactive client-side logic for the personal blog SPA.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE ---
  let activeCategory = 'All';
  let searchQuery = '';
  
  // --- ELEMENTS ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const postsGrid = document.getElementById('posts-grid');
  const categoriesContainer = document.getElementById('categories-filter');
  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const emptyState = document.getElementById('empty-state');
  
  // Modal details
  const articleDetailModal = document.getElementById('article-detail');
  const detailBackdrop = document.getElementById('detail-backdrop');
  const closeDetailBtn = document.getElementById('close-detail-btn');
  const detailTitle = document.getElementById('detail-title');
  const detailCategory = document.getElementById('detail-category');
  const detailDate = document.getElementById('detail-date');
  const detailReadTime = document.getElementById('detail-readtime');
  const detailTags = document.getElementById('detail-tags');
  const detailCover = document.getElementById('detail-cover');
  const detailContent = document.getElementById('detail-content');

  // --- INITIALIZATION ---
  initTheme();
  renderProfile();
  renderCategories();
  renderArticles();
  
  // Listen for navigation router
  window.addEventListener('hashchange', router);
  router(); // Initial page load route checking

  // --- THEME MANAGEMENT ---
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const activeTheme = savedTheme || systemTheme;
    
    document.documentElement.setAttribute('data-theme', activeTheme);
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- PROFILE LOADING ---
  function renderProfile() {
    const profile = BLOG_DATA.profile;
    
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-title').textContent = profile.title;
    document.getElementById('profile-bio').textContent = profile.bio;
    document.getElementById('profile-avatar').src = profile.avatar;
    document.getElementById('profile-avatar').alt = profile.name;
    
    // Build social links dynamically
    const socialsContainer = document.getElementById('profile-socials');
    socialsContainer.innerHTML = '';
    
    const icons = {
      github: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>',
      linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
      twitter: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>',
      email: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>'
    };

    Object.entries(profile.socials).forEach(([platform, url]) => {
      if (icons[platform]) {
        const link = document.createElement('a');
        link.href = url;
        link.target = url.startsWith('mailto:') ? '_self' : '_blank';
        link.rel = 'noopener';
        link.className = 'social-icon';
        link.ariaLabel = platform.charAt(0).toUpperCase() + platform.slice(1);
        link.innerHTML = icons[platform];
        socialsContainer.appendChild(link);
      }
    });
  }

  // --- RENDER FILTERS ---
  function renderCategories() {
    categoriesContainer.innerHTML = '';
    BLOG_DATA.categories.forEach(category => {
      const btn = document.createElement('button');
      btn.className = `category-btn ${category === activeCategory ? 'active' : ''}`;
      btn.textContent = category;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = category;
        renderArticles();
      });
      categoriesContainer.appendChild(btn);
    });
  }

  // --- SEARCH EVENTS ---
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderArticles();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    activeCategory = 'All';
    renderCategories();
    renderArticles();
  });

  // --- ARTICLE RENDERING ---
  function renderArticles() {
    postsGrid.innerHTML = '';
    
    const filteredPosts = BLOG_DATA.posts.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery) ||
        post.summary.toLowerCase().includes(searchQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        
      return matchesCategory && matchesSearch;
    });

    if (filteredPosts.length === 0) {
      emptyState.classList.remove('hidden');
      postsGrid.classList.add('hidden');
    } else {
      emptyState.classList.add('hidden');
      postsGrid.classList.remove('hidden');
      
      filteredPosts.forEach(post => {
        const card = document.createElement('article');
        card.className = 'post-card';
        card.id = `card-${post.id}`;
        card.setAttribute('tabindex', '0');
        
        // Tags markup
        const tagsHtml = post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('');
        
        card.innerHTML = `
          <div class="post-cover-wrapper">
            <img src="${post.coverImage}" alt="${post.title}" class="post-cover" loading="lazy">
          </div>
          <div class="post-card-content">
            <div class="post-meta">
              <span class="post-card-category">${post.category}</span>
              <span class="post-divider">•</span>
              <span class="post-card-date">${post.date}</span>
              <span class="post-divider">•</span>
              <span class="post-card-readtime">${post.readTime}</span>
            </div>
            <h2 class="post-card-title">${post.title}</h2>
            <p class="post-card-summary">${post.summary}</p>
            <div class="post-card-footer">
              <div class="post-tags">
                ${tagsHtml}
              </div>
            </div>
          </div>
        `;
        
        // Navigation handle
        const handleNavigation = () => {
          window.location.hash = `post/${post.id}`;
        };
        
        card.addEventListener('click', handleNavigation);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleNavigation();
          }
        });
        
        postsGrid.appendChild(card);
      });
    }
  }

  // --- SPA ROUTER & MODAL POPULATOR ---
  function router() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#post/')) {
      const postId = hash.replace('#post/', '');
      openArticleModal(postId);
    } else {
      closeArticleModal();
    }
    
    // Update navigation active states
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkHash = link.getAttribute('href');
      if (linkHash === '#home' && (!hash || hash === '#home')) {
        link.classList.add('active');
      } else if (linkHash !== '#home' && hash.startsWith(linkHash)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function openArticleModal(postId) {
    const post = BLOG_DATA.posts.find(p => p.id === postId);
    if (!post) {
      // Post doesn't exist, route back to home
      window.location.hash = '#home';
      return;
    }
    
    // Populate Modal Content
    detailTitle.textContent = post.title;
    detailCategory.textContent = post.category;
    detailDate.textContent = post.date;
    detailReadTime.textContent = post.readTime;
    detailCover.src = post.coverImage;
    detailCover.alt = post.title;
    
    detailTags.innerHTML = post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('');
    
    // Compile simple markdown content
    detailContent.innerHTML = parseMarkdown(post.content);
    
    // Open Modal
    articleDetailModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
    
    // Keyboard trap focus on close button
    closeDetailBtn.focus();
  }

  function closeArticleModal() {
    articleDetailModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore background scrolling
    
    // Return focus to active post card if available
    const activeHash = window.location.hash;
    if (activeHash.startsWith('#post/')) {
      const postId = activeHash.replace('#post/', '');
      const activeCard = document.getElementById(`card-${postId}`);
      if (activeCard) activeCard.focus();
    }
  }

  // Close actions
  const triggerClose = () => {
    window.location.hash = '#home';
  };
  
  closeDetailBtn.addEventListener('click', triggerClose);
  detailBackdrop.addEventListener('click', triggerClose);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && articleDetailModal.classList.contains('active')) {
      triggerClose();
    }
  });

  // --- SIMPLE MARKDOWN PARSER ---
  function parseMarkdown(mdText) {
    if (!mdText) return '';
    
    let html = mdText;
    
    // Replace preformatted code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre><code class="language-${lang}">${escapedCode}</code></pre>`;
    });
    
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Headers (H3 first, then H2 to avoid overlapping replaces if not careful, or anchor H weight)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$2</h2>'); // Note standard regex pattern
    // Fixed:
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold / Strong
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Italics
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Horizontal Rule
    html = html.replace(/^---$/gim, '<hr>');
    
    // Bullet lists
    // Simple block matches for unordered list groups
    html = html.replace(/^\s*-\s+(.*)$/gim, '<li>$1</li>');
    // Wrap consecutive list items in <ul>
    // Quick regex trick: find sequences of <li>...</li> and wrap
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    // Clean nested ul wraps if any duplicate captures happen (this simple parser replaces at block level)
    // To keep it simple, we replace line-by-line block paragraphs
    
    // Paragraph split (by double returns)
    // Filter lines that are not headers, lists, code, hr, and wrap in <p>
    const blocks = html.split(/\n\n+/);
    const parsedBlocks = blocks.map(block => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      // If it starts with an HTML block element tag, don't wrap it
      if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<ul') || trimmed.startsWith('<li>') || trimmed.startsWith('<hr') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<blockquote>')) {
        return trimmed;
      }
      // Check blockquote syntax
      if (trimmed.startsWith('&gt;') || trimmed.startsWith('>')) {
        const text = trimmed.replace(/^&gt;\s*|^>\s*/, '');
        return `<blockquote>${text}</blockquote>`;
      }
      return `<p>${trimmed}</p>`;
    });
    
    return parsedBlocks.join('\n');
  }
});
