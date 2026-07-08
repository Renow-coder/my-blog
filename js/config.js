/**
 * ZMF Blog - Site Configuration
 * Central config for social links, site info, and personal details
 */

const SITE_CONFIG = {
  // Site info
  siteName: 'ZMF',
  siteTitle: 'ZMF · 思绪与光影',
  siteSubtitle: '在代码与文字之间，寻找生活的诗意',
  author: 'zmf',
  authorBio: '开发者 / 写作者 / 终身学习者。热爱技术，也热爱生活中每一个细微的美好瞬间。',
  authorTagline: '开发者 · 写作者 · 终身学习者',

  // Contact info (replace with your real info)
  contact: {
    email: 'zmf@example.com',
    wechat: 'zmf-wechat',
    qq: '123456789',
    qqGroup: '123456789',
    feishu: 'https://www.feishu.cn/...',
    github: 'https://github.com/zmf',
  },

  // Social share config
  share: {
    enabled: true,
  },

  // Features
  features: {
    darkMode: true,
    search: true,
    reactions: true,
    comments: true,
    readingProgress: true,
    backToTop: true,
    share: true,
    bookmark: true,
  },

  // Navigation
  nav: [
    { label: '首页', href: 'index.html', icon: 'home' },
    { label: '文章', href: 'index.html#articles', icon: 'article' },
    { label: '标签', href: 'tags.html', icon: 'tag' },
    { label: '关于', href: 'about.html', icon: 'user' },
  ],
};

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
