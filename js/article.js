/**
 * ZMF Blog - Article Page Logic
 * Handles markdown rendering, reactions, comments, sharing
 */

/* ========== Article Page Controller ========== */
const ArticlePage = {
  currentArticle: null,

  init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
      this.showError('未找到文章');
      return;
    }

    const article = getArticleById(id);
    if (!article) {
      this.showError('文章不存在');
      return;
    }

    this.currentArticle = article;
    this.render(article);
    this.renderComments(article.id);
  },

  render(article) {
    // Set page title
    document.title = `${article.title} - ${SITE_CONFIG.siteName}`;

    // Render header
    document.getElementById('article-title').textContent = article.title;
    document.getElementById('article-date').textContent = formatDate(article.date);
    document.getElementById('article-readtime').textContent = article.readTime + ' 分钟阅读';
    document.getElementById('article-views').textContent = article.views + ' 次阅读';

    // Tags
    const tagsContainer = document.getElementById('article-tags');
    tagsContainer.innerHTML = article.tags.map(t =>
      `<span class="card-tag" onclick="navigateToTag('${t}')">${t}</span>`
    ).join('');

    // Render markdown content
    this.renderMarkdown(article.content);

    // Render reactions
    this.renderReactions(article);

    // Render share buttons
    this.renderShare(article);

    // Render prev/next
    this.renderNav(article);

    // Scroll to top
    window.scrollTo(0, 0);
  },

  renderMarkdown(content) {
    const container = document.getElementById('article-content');

    // Configure marked
    if (typeof marked !== 'undefined') {
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
      });

      let html = marked.parse(content);

      // Add code highlighting if hljs is available
      if (typeof hljs !== 'undefined') {
        // Create a temporary element to process
        const temp = document.createElement('div');
        temp.innerHTML = html;
        temp.querySelectorAll('pre code').forEach(block => {
          hljs.highlightElement(block);
        });
        html = temp.innerHTML;
      }

      // Sanitize if DOMPurify is available
      if (typeof DOMPurify !== 'undefined') {
        html = DOMPurify.sanitize(html);
      }

      container.innerHTML = html;
    } else {
      // Fallback: render as plain text with basic formatting
      container.innerHTML = `<p>${content.replace(/\n/g, '<br>')}</p>`;
    }

    // Add copy button to code blocks
    container.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.code-copy-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'code-copy-btn';
      btn.textContent = '复制';
      btn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 4px 12px;
        font-size: 12px;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 4px;
        color: var(--text-secondary);
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s;
      `;

      pre.style.position = 'relative';
      pre.appendChild(btn);

      pre.addEventListener('mouseenter', () => btn.style.opacity = '1');
      pre.addEventListener('mouseleave', () => btn.style.opacity = '0');

      btn.addEventListener('click', () => {
        const code = pre.querySelector('code');
        const text = code ? code.textContent : '';
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = '已复制';
          setTimeout(() => btn.textContent = '复制', 2000);
        });
      });
    });
  },

  renderReactions(article) {
    const container = document.getElementById('reactions');
    const state = Reactions.get(article.id);

    container.innerHTML = `
      <button class="reaction-btn ${state.liked ? 'active' : ''}" id="like-btn">
        <span class="reaction-emoji">❤</span>
        <span class="reaction-count">${article.likes + (state.liked ? 1 : 0)}</span>
      </button>
      <button class="reaction-btn ${state.bookmarked ? 'active' : ''}" id="bookmark-btn">
        <span class="reaction-emoji">${state.bookmarked ? '⭐' : '☆'}</span>
        <span class="reaction-count">${state.bookmarked ? '已收藏' : '收藏'}</span>
      </button>
      <button class="reaction-btn" onclick="window.print()">
        <span class="reaction-emoji">🖨</span>
        <span class="reaction-count">打印</span>
      </button>
    `;

    // Like button
    const likeBtn = document.getElementById('like-btn');
    likeBtn.addEventListener('click', () => {
      const isLiked = Reactions.toggleLike(article.id);
      likeBtn.classList.toggle('active', isLiked);
      const countEl = likeBtn.querySelector('.reaction-count');
      const baseCount = article.likes;
      countEl.textContent = baseCount + (isLiked ? 1 : 0);
      if (isLiked) {
        Toast.show('感谢点赞！');
      }
    });

    // Bookmark button
    const bookmarkBtn = document.getElementById('bookmark-btn');
    bookmarkBtn.classList.toggle('active', state.bookmarked);
    bookmarkBtn.addEventListener('click', () => {
      const isBookmarked = Reactions.toggleBookmark(article.id);
      bookmarkBtn.classList.toggle('active', isBookmarked);
      const emoji = bookmarkBtn.querySelector('.reaction-emoji');
      const text = bookmarkBtn.querySelector('.reaction-count');
      emoji.textContent = isBookmarked ? '⭐' : '☆';
      text.textContent = isBookmarked ? '已收藏' : '收藏';
      Toast.show(isBookmarked ? '已加入收藏' : '已取消收藏');
    });
  },

  renderShare(article) {
    const container = document.getElementById('share-section');
    container.innerHTML = `
      <span class="share-label">分享到：</span>
      <button class="share-btn" data-share="wechat" onclick="SocialLinks.openQR('wechat')" title="微信分享">💬</button>
      <button class="share-btn" data-share="qq" onclick="ArticlePage.shareQQ()" title="QQ分享">🐧</button>
      <button class="share-btn" data-share="weibo" onclick="ArticlePage.shareWeibo()" title="微博分享">🌐</button>
      <button class="share-btn" data-share="email" onclick="ArticlePage.shareEmail()" title="邮件分享">✉</button>
      <button class="share-btn" data-share="link" onclick="SocialLinks.copyLink()" title="复制链接">🔗</button>
    `;
  },

  shareQQ() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentArticle.title);
    window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`, '_blank');
  },

  shareWeibo() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(this.currentArticle.title);
    window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`, '_blank');
  },

  shareEmail() {
    const url = window.location.href;
    const title = this.currentArticle.title;
    window.location.href = `mailto:${SITE_CONFIG.contact.email}?subject=推荐文章：${title}&body=我觉得这篇文章不错，分享给你：${url}`;
  },

  renderNav(article) {
    const index = ARTICLES.findIndex(a => a.id === article.id);
    const prev = index > 0 ? ARTICLES[index - 1] : null;
    const next = index < ARTICLES.length - 1 ? ARTICLES[index + 1] : null;

    const container = document.getElementById('post-nav');
    container.innerHTML = `
      <div class="post-nav-item prev" ${prev ? '' : 'style="visibility:hidden"'}>
        ${prev ? `
          <div class="post-nav-label">← 上一篇</div>
          <div class="post-nav-title" onclick="navigateToArticle('${prev.id}')">${prev.title}</div>
        ` : ''}
      </div>
      <div class="post-nav-item next" ${next ? '' : 'style="visibility:hidden"'}>
        ${next ? `
          <div class="post-nav-label">下一篇 →</div>
          <div class="post-nav-title" onclick="navigateToArticle('${next.id}')">${next.title}</div>
        ` : ''}
      </div>
    `;
  },

  renderComments(articleId) {
    const list = document.getElementById('comment-list');
    const comments = Comments.get(articleId);

    if (comments.length === 0) {
      list.innerHTML = `
        <div class="comment-empty">
          <p>还没有评论，来抢沙发吧！</p>
        </div>
      `;
      return;
    }

    list.innerHTML = comments.map(c => `
      <div class="comment-item">
        <div class="comment-avatar">${Comments.getInitial(c.name)}</div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-author">${c.name}</span>
            <span class="comment-time">${Comments.formatTime(c.time)}</span>
          </div>
          <div class="comment-text">${this.escapeHtml(c.text)}</div>
        </div>
      </div>
    `).join('');
  },

  submitComment() {
    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!text) {
      Toast.show('请输入评论内容');
      return;
    }

    Comments.add(this.currentArticle.id, name, text);
    this.renderComments(this.currentArticle.id);
    textInput.value = '';
    Toast.show('评论成功！');
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  showError(message) {
    document.querySelector('.main').innerHTML = `
      <div class="empty-state" style="padding: 120px 32px;">
        <div class="empty-state-icon">😕</div>
        <p class="empty-state-text">${message}</p>
        <br>
        <a href="index.html" class="btn btn-primary">返回首页</a>
      </div>
    `;
  },
};

/* ========== Tags Page Controller ========== */
const TagsPage = {
  init() {
    this.renderTagCards();
    this.renderFilteredArticles();

    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    if (tag) {
      this.filterByTag(tag);
    }
  },

  renderTagCards() {
    const container = document.getElementById('tags-grid');
    const tags = getAllTags();

    const descriptions = {
      '技术': '编程开发、技术笔记、最佳实践',
      '设计': 'UI/UX、视觉美学、设计思考',
      '前端': 'HTML/CSS/JS、框架、工程化',
      'JavaScript': '语言特性、性能优化、设计模式',
      '随笔': '生活感悟、所思所想',
      '读书': '书评、读书笔记、推荐书单',
      '公告': '站点动态、重要通知',
      '思考': '深度思考、认知提升',
    };

    container.innerHTML = tags.map(t => `
      <div class="tag-card" onclick="TagsPage.filterByTag('${t.name}')">
        <div class="tag-card-header">
          <span class="tag-card-name">#${t.name}</span>
          <span class="tag-card-count">${t.count} 篇</span>
        </div>
        <p class="tag-card-desc">${descriptions[t.name] || '相关文章集合'}</p>
      </div>
    `).join('');
  },

  renderFilteredArticles(articles) {
    const container = document.getElementById('filtered-articles');
    if (!container) return;

    if (!articles) {
      container.style.display = 'none';
      return;
    }

    const grid = container.querySelector('#filtered-grid');
    if (articles.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📭</div>
          <p class="empty-state-text">该标签下暂无文章</p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="section-header">
          <h2 class="section-title">筛选结果</h2>
          <a href="tags.html" class="section-more">清除筛选 →</a>
        </div>
        <div class="article-grid" id="filtered-grid">
          ${articles.map(a => ArticleRenderer.renderCard(a)).join('')}
        </div>
      `;
    }
    container.style.display = 'block';
  },

  filterByTag(tag) {
    // Update filter chips
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.tag === tag);
    });

    const filtered = ARTICLES.filter(a => a.tags.includes(tag));
    this.renderFilteredArticles(filtered);

    // Scroll to filtered section
    setTimeout(() => {
      const target = document.getElementById('filtered-articles');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  },

  renderFilterBar() {
    const tags = getAllTags();
    const bar = document.getElementById('filter-bar');
    if (!bar) return;

    bar.innerHTML = `
      <span class="filter-chip active" data-tag="" onclick="TagsPage.clearFilter()">全部</span>
      ${tags.map(t => `
        <span class="filter-chip" data-tag="${t.name}" onclick="TagsPage.filterByTag('${t.name}')">
          ${t.name} (${t.count})
        </span>
      `).join('')}
    `;
  },

  clearFilter() {
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.tag === '');
    });
    document.getElementById('filtered-articles').style.display = 'none';
  },
};

/* ========== About Page Controller ========== */
const AboutPage = {
  init() {
    this.renderContactMethods();
  },

  renderContactMethods() {
    const container = document.getElementById('contact-methods');
    if (!container) return;

    container.innerHTML = `
      <div class="contact-method" onclick="SocialLinks.openEmail()">
        <div class="contact-method-icon">✉</div>
        <div class="contact-method-name">邮箱</div>
        <div class="contact-method-value">${SITE_CONFIG.contact.email}</div>
      </div>
      <div class="contact-method" onclick="SocialLinks.openQR('wechat')">
        <div class="contact-method-icon" style="color: #07C160">💬</div>
        <div class="contact-method-name">微信</div>
        <div class="contact-method-value">扫码添加</div>
      </div>
      <div class="contact-method" onclick="SocialLinks.openQQ()">
        <div class="contact-method-icon" style="color: #12B7F5">🐧</div>
        <div class="contact-method-name">QQ</div>
        <div class="contact-method-value">${SITE_CONFIG.contact.qq}</div>
      </div>
      <div class="contact-method" onclick="SocialLinks.openFeishu()">
        <div class="contact-method-icon" style="color: #3370FF">🐦</div>
        <div class="contact-method-name">飞书</div>
        <div class="contact-method-value">在线联系</div>
      </div>
    `;
  },
};

/* ========== Message Board (About page) ========== */
const MessageBoard = {
  init() {
    this.render();
  },

  get() {
    return JSON.parse(localStorage.getItem('zmf-messages') || '[]');
  },

  add(name, text) {
    const messages = this.get();
    messages.unshift({
      id: Date.now(),
      name: name || '匿名访客',
      text: text,
      time: new Date().toISOString(),
    });
    localStorage.setItem('zmf-messages', JSON.stringify(messages));
  },

  render() {
    const list = document.getElementById('message-list');
    if (!list) return;

    const messages = this.get();

    if (messages.length === 0) {
      list.innerHTML = `
        <div class="comment-empty">
          <p>还没有留言，快来留下你的足迹吧！</p>
        </div>
      `;
      return;
    }

    list.innerHTML = messages.map(m => `
      <div class="comment-item">
        <div class="comment-avatar">${Comments.getInitial(m.name)}</div>
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-author">${m.name}</span>
            <span class="comment-time">${Comments.formatTime(m.time)}</span>
          </div>
          <div class="comment-text">${this.escapeHtml(m.text)}</div>
        </div>
      </div>
    `).join('');
  },

  submit() {
    const nameInput = document.getElementById('message-name');
    const textInput = document.getElementById('message-text');
    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!text) {
      Toast.show('请输入留言内容');
      return;
    }

    this.add(name, text);
    this.render();
    textInput.value = '';
    Toast.show('留言成功！');
  },

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },
};

/* ========== Auto-init based on page ========== */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop();

  if (path === 'article.html' || path === 'article') {
    ArticlePage.init();
  } else if (path === 'tags.html' || path === 'tags') {
    TagsPage.renderFilterBar();
    TagsPage.init();
  } else if (path === 'about.html' || path === 'about') {
    AboutPage.init();
    MessageBoard.init();
  }
});
