/**
 * ZMF Blog - Main JavaScript
 * Core functionality: navigation, theme, rendering, interactions
 */

/* ========== Theme Management ========== */
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('zmf-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    this.set(theme);

    const toggle = document.querySelector('.theme-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
  },

  set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zmf-theme', theme);
    const icon = document.querySelector('.theme-toggle');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀' : '☾';
    }
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.set(next);
    Toast.show(next === 'dark' ? '已切换至暗黑模式' : '已切换至明亮模式');
  },
};

/* ========== Mobile Menu ========== */
const MobileMenu = {
  init() {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });

    // Close on link click
    menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  },
};

/* ========== Toast Notification ========== */
const Toast = {
  show(message, duration = 2500) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  },
};

/* ========== Back to Top ========== */
const BackToTop = {
  init() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  },
};

/* ========== Reading Progress ========== */
const ReadingProgress = {
  init() {
    const bar = document.querySelector('.progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = progress + '%';
    });
  },
};

/* ========== Article Renderer ========== */
const ArticleRenderer = {
  renderCard(article) {
    const tags = article.tags.map(t =>
      `<span class="card-tag">${t}</span>`
    ).join('');

    return `
      <article class="article-card fade-in-up" data-id="${article.id}" onclick="navigateToArticle('${article.id}')">
        <div class="card-cover">
          <div class="card-cover-gradient" style="background: ${article.cover.gradient}"></div>
          <span class="card-cover-icon">${article.cover.icon}</span>
        </div>
        <div class="card-body">
          <div class="card-tags">${tags}</div>
          <h3 class="card-title">${article.title}</h3>
          <p class="card-excerpt">${article.excerpt}</p>
          <div class="card-footer">
            <span class="card-date">📅 ${formatDate(article.date)}</span>
            <div class="card-stats">
              <span class="card-stat">👁 ${article.views}</span>
              <span class="card-stat">❤ ${article.likes}</span>
              <span class="card-stat">⏱ ${article.readTime}分钟</span>
            </div>
          </div>
        </div>
      </article>
    `;
  },

  renderGrid(articles, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (articles.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <p class="empty-state-text">暂无文章</p>
        </div>
      `;
      return;
    }

    container.innerHTML = articles.map(a => this.renderCard(a)).join('');
  },
};

/* ========== Search ========== */
const Search = {
  init() {
    const input = document.getElementById('search-input');
    if (!input) return;

    let debounceTimer = null;
    input.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.filter(e.target.value);
      }, 200);
    });
  },

  filter(keyword) {
    const kw = keyword.trim().toLowerCase();
    if (!kw) {
      ArticleRenderer.renderGrid(ARTICLES, 'article-grid');
      return;
    }

    const filtered = ARTICLES.filter(a =>
      a.title.toLowerCase().includes(kw) ||
      a.excerpt.toLowerCase().includes(kw) ||
      a.tags.some(t => t.toLowerCase().includes(kw))
    );

    ArticleRenderer.renderGrid(filtered, 'article-grid');
  },
};

/* ========== Sidebar Renderer ========== */
const Sidebar = {
  renderAuthor(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="sidebar-card author-card">
        <div class="author-avatar">Z</div>
        <h3 class="author-name">${SITE_CONFIG.author}</h3>
        <p class="author-bio">${SITE_CONFIG.authorBio}</p>
        <div class="social-links">
          <button class="social-link" data-type="email" onclick="SocialLinks.openEmail()" title="邮箱">✉</button>
          <button class="social-link" data-type="wechat" onclick="SocialLinks.openQR('wechat')" title="微信">💬</button>
          <button class="social-link" data-type="qq" onclick="SocialLinks.openQQ()" title="QQ">🐧</button>
          <button class="social-link" data-type="feishu" onclick="SocialLinks.openFeishu()" title="飞书">🐦</button>
        </div>
      </div>
    `;
  },

  renderTags(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tags = getAllTags();
    container.innerHTML = `
      <div class="sidebar-card">
        <h3 class="sidebar-title">标签云</h3>
        <div class="tag-cloud">
          ${tags.map(t => `
            <span class="tag-cloud-item" onclick="navigateToTag('${t.name}')">
              ${t.name}<span class="count">${t.count}</span>
            </span>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderPopular(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const popular = getPopularArticles(5);
    container.innerHTML = `
      <div class="sidebar-card">
        <h3 class="sidebar-title">热门文章</h3>
        ${popular.map((a, i) => `
          <div class="popular-item" onclick="navigateToArticle('${a.id}')">
            <span class="popular-rank">${i + 1}</span>
            <div>
              <div class="popular-title">${a.title}</div>
              <div class="popular-meta">${a.views} 次阅读</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },
};

/* ========== Social Links ========== */
const SocialLinks = {
  openEmail() {
    window.location.href = `mailto:${SITE_CONFIG.contact.email}?subject=来自博客的邮件&body=你好 zmf，`;
  },

  openQQ() {
    window.open(`https://wpa.qq.com/msgrd?v=3&uin=${SITE_CONFIG.contact.qq}&site=qq&menu=yes`, '_blank');
  },

  openFeishu() {
    window.open(SITE_CONFIG.contact.feishu, '_blank');
  },

  openQR(type) {
    const config = {
      wechat: {
        title: '微信联系',
        desc: '扫描二维码，添加我的微信',
        hint: '或在微信中搜索：' + SITE_CONFIG.contact.wechat,
        color: '#07C160',
      },
      qq: {
        title: 'QQ联系',
        desc: '扫描二维码，加我QQ',
        hint: 'QQ号：' + SITE_CONFIG.contact.qq,
        color: '#12B7F5',
      },
    };

    const cfg = config[type];
    if (!cfg) return;

    const overlay = document.querySelector('.modal-overlay');
    if (!overlay) {
      this.createModal();
    }

    const modal = document.querySelector('.modal-overlay');
    const content = modal.querySelector('.modal');
    content.innerHTML = `
      <button class="modal-close" onclick="SocialLinks.closeQR()">✕</button>
      <h3 class="modal-title">${cfg.title}</h3>
      <p class="modal-desc">${cfg.desc}</p>
      <div class="qr-placeholder" style="border: 2px solid ${cfg.color}">
        ${this.generateQRPlaceholder(cfg.color)}
      </div>
      <p class="modal-hint">${cfg.hint}</p>
    `;
    modal.classList.add('show');
  },

  closeQR() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.classList.remove('show');
  },

  createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal"></div>';
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeQR();
    });
    document.body.appendChild(overlay);
  },

  generateQRPlaceholder(color) {
    // Generate a decorative QR-like pattern
    const cells = [];
    const size = 12;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const isCorner = (i < 3 && j < 3) || (i < 3 && j >= size - 3) || (i >= size - 3 && j < 3);
        const isFinder = isCorner && ((i === 0 || i === 2 || i === size - 1 || i === size - 3) && (j === 0 || j === 2 || j === size - 1 || j === size - 3));
        const random = Math.random() > 0.55;
        if (isCorner) {
          const ci = i < 3 ? i : i - (size - 3);
          const cj = j < 3 ? j : j - (size - 3);
          if (ci === 0 || ci === 2 || cj === 0 || cj === 2) {
            cells.push(`<rect x="${j * 16 + 4}" y="${i * 16 + 4}" width="14" height="14" fill="${color}"/>`);
          } else if (ci === 1 && cj === 1) {
            cells.push(`<rect x="${j * 16 + 4}" y="${i * 16 + 4}" width="14" height="14" fill="${color}"/>`);
          }
        } else if (random) {
          cells.push(`<rect x="${j * 16 + 4}" y="${i * 16 + 4}" width="14" height="14" fill="${color}" opacity="0.8"/>`);
        }
      }
    }
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${cells.join('')}</svg>`;
  },

  copyLink() {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        Toast.show('链接已复制到剪贴板');
      });
    } else {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      Toast.show('链接已复制到剪贴板');
    }
  },
};

/* ========== Reactions (Likes) ========== */
const Reactions = {
  get(articleId) {
    const data = JSON.parse(localStorage.getItem('zmf-reactions') || '{}');
    return data[articleId] || { liked: false, bookmarked: false };
  },

  toggleLike(articleId) {
    const data = JSON.parse(localStorage.getItem('zmf-reactions') || '{}');
    if (!data[articleId]) data[articleId] = { liked: false, bookmarked: false };
    data[articleId].liked = !data[articleId].liked;
    localStorage.setItem('zmf-reactions', JSON.stringify(data));
    return data[articleId].liked;
  },

  toggleBookmark(articleId) {
    const data = JSON.parse(localStorage.getItem('zmf-reactions') || '{}');
    if (!data[articleId]) data[articleId] = { liked: false, bookmarked: false };
    data[articleId].bookmarked = !data[articleId].bookmarked;
    localStorage.setItem('zmf-reactions', JSON.stringify(data));
    return data[articleId].bookmarked;
  },
};

/* ========== Comments (localStorage-based) ========== */
const Comments = {
  get(articleId) {
    const data = JSON.parse(localStorage.getItem('zmf-comments') || '{}');
    return data[articleId] || [];
  },

  add(articleId, name, text) {
    const data = JSON.parse(localStorage.getItem('zmf-comments') || '{}');
    if (!data[articleId]) data[articleId] = [];

    const comment = {
      id: Date.now(),
      name: name || '匿名访客',
      text: text,
      time: new Date().toISOString(),
    };

    data[articleId].unshift(comment);
    localStorage.setItem('zmf-comments', JSON.stringify(data));
    return comment;
  },

  formatTime(isoStr) {
    const date = new Date(isoStr);
    const now = new Date();
    const diff = (now - date) / 1000;

    if (diff < 60) return '刚刚';
    if (diff < 3600) return Math.floor(diff / 60) + '分钟前';
    if (diff < 86400) return Math.floor(diff / 3600) + '小时前';
    if (diff < 604800) return Math.floor(diff / 86400) + '天前';
    return formatDate(date.toISOString().split('T')[0]);
  },

  getInitial(name) {
    return (name || '匿').charAt(0).toUpperCase();
  },
};

/* ========== Navigation ========== */
function navigateToArticle(id) {
  window.location.href = `article.html?id=${id}`;
}

function navigateToTag(tag) {
  window.location.href = `tags.html?tag=${encodeURIComponent(tag)}`;
}

/* ========== Typewriter Effect ========== */
function typewriter(element, text, speed = 80) {
  let i = 0;
  element.innerHTML = '';
  const cursor = '<span class="typewriter-cursor">&nbsp;</span>';

  function type() {
    if (i < text.length) {
      element.innerHTML = text.substring(0, i + 1) + cursor;
      i++;
      setTimeout(type, speed);
    } else {
      element.innerHTML = text;
    }
  }
  type();
}

/* ========== Active Nav Link ========== */
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ========== Init on DOM Ready ========== */
function initCommon() {
  ThemeManager.init();
  MobileMenu.init();
  BackToTop.init();
  ReadingProgress.init();
  setActiveNav();

  // Close modal on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') SocialLinks.closeQR();
  });
}

document.addEventListener('DOMContentLoaded', initCommon);
