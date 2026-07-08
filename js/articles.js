/**
 * ZMF Blog - Articles Data
 * All articles stored as markdown strings for client-side rendering
 */

const ARTICLES = [
  {
    id: 'welcome-to-my-blog',
    title: '欢迎来到我的博客 — 在这里，遇见更好的自己',
    excerpt: '这是我的第一篇博文。在这里，我想和你聊聊为什么要写博客，以及这个小小的角落会记录些什么。从今天起，让文字成为思考的锚点。',
    tags: ['随笔', '公告'],
    date: '2026-07-07',
    cover: { gradient: 'linear-gradient(135deg, #8B7355, #C9A961)', icon: '✨' },
    readTime: 4,
    views: 1024,
    likes: 88,
    featured: true,
    content: `# 欢迎来到我的博客

> "写作是思考的镜子，映照出我们内心最真实的模样。"

终于，这个博客上线了。

## 为什么要写博客？

在这个信息爆炸的时代，我们每天都在消费大量的内容——短视频、推文、新闻推送。但有多少内容真正留在了心里？

我写博客，是因为：

- **思考需要锚点** —— 写下来，想法才不会像风一样消散
- **分享带来连接** —— 也许我的某段经历，恰好能帮到正在搜索的你
- **记录即是成长** —— 回头看时，能看到自己走过的路

## 这里会有什么？

这个博客会记录我在以下几个方向的探索：

### 技术笔记

作为开发者，我会在工作中遇到各种有趣的技术问题。从前端框架到后端架构，从性能优化到工程实践，我会把踩过的坑和找到的解决方案都记录下来。

\`\`\`javascript
// 一个简单的防抖函数，日常开发中经常用到
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
\`\`\`

### 设计思考

好的产品不仅仅是功能的堆砌，更是对用户体验的深度思考。我会分享关于 UI/UX 设计、交互逻辑、视觉美学方面的想法和实践。

### 生活随笔

除了技术，我也想记录生活中的点滴——一本书的读后感、一次旅行的见闻、一段代码之外的诗意时刻。

## 写在最后

这个博客采用纯前端方案构建，支持 Markdown 渲染、暗黑模式、标签分类、留言互动等功能。如果你喜欢这里的内容，欢迎通过邮箱、微信、QQ 或飞书与我交流。

让我们一起，在代码与文字之间，寻找生活的诗意。

---

*感谢你的到来。愿我们都能成为更好的自己。*`,
  },

  {
    id: 'premium-minimalist-design',
    title: '高级简约：少即是多的设计哲学',
    excerpt: '简约不是空洞，而是恰到好处的留白。聊聊如何在设计中做到"高级感"——从配色、排版到呼吸感的把控，每一个细节都值得推敲。',
    tags: ['设计', '思考'],
    date: '2026-07-05',
    cover: { gradient: 'linear-gradient(135deg, #2C3E50, #34495E)', icon: '🎨' },
    readTime: 6,
    views: 892,
    likes: 76,
    featured: true,
    content: `# 高级简约：少即是多的设计哲学

> "简约不是做减法，而是做到恰如其分。"

每次有人问我"什么是高级感"，我总会想起博物馆里的那些展品——它们不需要华丽的装饰，仅凭形态和材质就能吸引你驻足。

## 配色：克制的力量

高级感的配色，核心在于**克制**。

| 风格 | 主色调 | 点缀色 | 适用场景 |
|------|--------|--------|----------|
| 暖象牙 | #FAFAF7 | #8B7355 | 博客、阅读类 |
| 冷石灰 | #F5F5F4 | #57534E | 工具类产品 |
| 深邃墨 | #1A1A1A | #C9A961 | 夜间模式 |

### 关键原则

1. **主色不超过3种** —— 大面积使用中性色，小面积点缀强调色
2. **饱和度要低** —— 莫兰迪色系之所以高级，就是因为降低了饱和度
3. **对比要柔和** —— 不要用纯黑纯白，用 #1A1A1A 和 #FAFAF7

## 排版：呼吸的艺术

好的排版，像呼吸一样自然。

\`\`\`css
/* 行高 1.6-1.8 之间最适合中文阅读 */
body {
  line-height: 1.8;
  letter-spacing: 0.02em;
}

/* 标题用衬线体，正文用无衬线体 */
h1, h2, h3 {
  font-family: 'Noto Serif SC', serif;
}
\`\`\`

### 字体搭配建议

- **标题**：衬线体（如 Noto Serif SC）—— 增加文化质感
- **正文**：无衬线体（如 Noto Sans SC）—— 保证阅读舒适
- **代码**：等宽体（如 JetBrains Mono）—— 提升辨识度

## 留白：无声胜有声

> 留白不是空白，是设计的一部分。

苹果官网之所以看起来高级，很大程度归功于大量的留白。每个元素都有充足的呼吸空间，不拥挤、不焦虑。

### 留白的三层境界

1. **元素间距** —— 卡片之间、段落之间留出足够空间
2. **页面边距** —— 内容不要撑满整个宽度，留出呼吸区域
3. **视觉焦点** —— 每个屏幕只突出一个核心信息

## 微交互：细节决定成败

高级感不仅在于静态视觉，还在于动态体验。

- **过渡要柔和** —— 使用 \`cubic-bezier(0.4, 0, 0.2, 1)\` 而非线性
- **反馈要及时** —— hover 状态在 200ms 内响应
- **动效要克制** —— 不要为了动而动，每个动效都要有目的

## 结语

高级简约不是一种风格，而是一种**态度**——对每一个像素负责，对每一次交互用心。

当你不知道该加什么的时候，先想想能减去什么。`,
  },

  {
    id: 'javascript-debounce-throttle',
    title: '深入理解防抖与节流：前端性能优化的基石',
    excerpt: '防抖和节流是前端开发中最常用的性能优化手段。本文从原理到实现，带你彻底搞懂这两个概念，并附上实际应用场景和完整代码。',
    tags: ['技术', '前端', 'JavaScript'],
    date: '2026-07-03',
    cover: { gradient: 'linear-gradient(135deg, #1B4332, #2D6A4F)', icon: '⚡' },
    readTime: 8,
    views: 1536,
    likes: 124,
    featured: false,
    content: `# 深入理解防抖与节流

在前端开发中，我们经常需要处理高频触发的事件：滚动、输入、窗口缩放、鼠标移动……如果不加控制，这些事件可能在几秒内触发上百次，导致性能问题。

**防抖（Debounce）** 和 **节流（Throttle）** 就是解决这个问题的两把利器。

## 防抖：只执行最后一次

> 核心思想：事件触发后等待一段时间，如果在这段时间内没有再次触发，才真正执行。如果再次触发，则重新计时。

### 生活类比

想象你在等电梯。电梯门快要关了，突然有人跑过来按了开门键，门又重新等待。直到没有人再按了，门才会真正关闭。

### 代码实现

\`\`\`javascript
/**
 * 防抖函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 防抖处理后的函数
 */
function debounce(fn, delay = 300) {
  let timer = null;

  return function(...args) {
    // 如果已有定时器，清除它（重新计时）
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

// 使用示例：搜索框输入
const handleSearch = debounce((keyword) => {
  console.log('搜索：', keyword);
  // fetch(\`/api/search?q=\${keyword}\`)
}, 500);

input.addEventListener('input', (e) => handleSearch(e.target.value));
\`\`\`

### 立即执行版防抖

有时候我们希望第一次触发就立即执行，后续的快速触发才被防抖：

\`\`\`javascript
function debounceImmediate(fn, delay = 300) {
  let timer = null;

  return function(...args) {
    if (!timer) {
      fn.apply(this, args); // 第一次立即执行
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}
\`\`\`

## 节流：固定频率执行

> 核心思想：在一定时间间隔内，最多只执行一次。不管触发多少次，频率保持不变。

### 生活类比

水龙头滴水——不管你拧多大，水滴都是一滴一滴地往下落，保持固定频率。

### 代码实现

#### 方式一：时间戳

\`\`\`javascript
function throttle(fn, interval = 300) {
  let lastTime = 0;

  return function(...args) {
    const now = Date.now();

    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
\`\`\`

#### 方式二：定时器

\`\`\`javascript
function throttle(fn, interval = 300) {
  let timer = null;

  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, interval);
    }
  };
}
\`\`\`

#### 方式三：结合版（推荐）

时间戳版在第一次触发时立即执行，但停止触发后不再执行；定时器版在停止后会再执行一次。结合两者优点：

\`\`\`javascript
function throttle(fn, interval = 300) {
  let lastTime = 0;
  let timer = null;

  return function(...args) {
    const now = Date.now();
    const remaining = interval - (now - lastTime);

    if (remaining <= 0) {
      // 时间到了，立即执行
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, args);
      lastTime = now;
    } else if (!timer) {
      // 还没到时间，设置定时器保证最后一次能执行
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
        timer = null;
      }, remaining);
    }
  };
}
\`\`\`

## 对比总结

| 特性 | 防抖 (Debounce) | 节流 (Throttle) |
|------|-----------------|-----------------|
| 执行时机 | 停止触发后执行 | 固定间隔执行 |
| 执行次数 | 1次（最后一次） | 多次（按间隔） |
| 适用场景 | 搜索、表单验证 | 滚动、拖拽、缩放 |

## 实际应用场景

### 防抖适用场景

- **搜索框输入** —— 用户停止输入后再发请求
- **表单验证** —— 输入完成后再验证
- **按钮防重复提交** —— 防止快速点击

### 节流适用场景

- **滚动事件** —— 懒加载、吸顶导航
- **鼠标拖拽** —— 限制拖拽事件频率
- **窗口缩放** —— resize 事件处理
- **视频播放进度** —— 定期上报播放进度

\`\`\`javascript
// 滚动加载更多
window.addEventListener('scroll', throttle(() => {
  const { scrollTop, scrollHeight } = document.documentElement;
  if (scrollTop + window.innerHeight >= scrollHeight - 200) {
    loadMore();
  }
}, 200));

// 搜索防抖
searchInput.addEventListener('input', debounce((e) => {
  search(e.target.value);
}, 500));
\`\`\`

## 结语

防抖和节流虽然概念简单，但在实际开发中非常实用。理解它们的原理和区别，能帮你写出更高性能的前端代码。

> 记住：不是所有事件都需要立即响应，有时候"慢一点"反而更好。`,
  },

  {
    id: 'reading-notes-2026',
    title: '2026 上半年读书笔记：五本改变思维方式的好书',
    excerpt: '从《思考，快与慢》到《被讨厌的勇气》，这半年读的五本书，每一本都给我带来了认知上的冲击。分享我的读书笔记和感悟。',
    tags: ['读书', '随笔'],
    date: '2026-07-01',
    cover: { gradient: 'linear-gradient(135deg, #6B4226, #A0522D)', icon: '📚' },
    readTime: 7,
    views: 678,
    likes: 92,
    featured: false,
    content: `# 2026 上半年读书笔记

> "你读过的书，终将成为你灵魂的一部分。"

2026 年已经过半，回看这半年的阅读清单，有五本书给我留下了深刻印象。它们不仅仅是"好看"，更是**改变了我看世界的方式**。

## 1. 《思考，快与慢》— 丹尼尔·卡尼曼

这本书揭示了人类思维的两套系统：

- **系统1**：快速、直觉、自动
- **系统2**：缓慢、理性、费力

### 最大的启发

我们以为自己是理性的，但实际上大部分决策由系统1主导。了解了这一点后，我开始在做重要决定时刻意"启动系统2"——停下来，想一想。

> "我们对自己认为自己知晓的东西太过自信了。"

## 2. 《被讨厌的勇气》— 岸见一郎

阿德勒心理学的通俗解读，核心观点是**"一切烦恼都来自人际关系"**。

### 三个关键概念

1. **课题分离** —— 分清什么是自己的课题，什么是别人的
2. **目的论** —— 不是"因为过去发生了什么"，而是"为了什么目的"
3. **共同体感觉** —— 在贡献中找到价值

这本书改变了我对"自由"的理解：**自由就是被别人讨厌**。不是要故意让人讨厌，而是不为了迎合他人而委屈自己。

## 3. 《代码整洁之道》— Robert C. Martin

作为开发者，这本书是必读经典。

### 核心原则

\`\`\`
- 函数应该短小精悍
- 命名要有意义
- 注释不是用来弥补糟糕代码的
- 一个函数只做一件事
\`\`\`

读完之后，我重构了一个旧项目，代码量减少了 30%，可读性提升了一个量级。

## 4. 《人间值得》— 中村恒子

90 岁心理医生的人生智慧，语言平淡却充满力量。

### 最打动我的一段话

> "不要试图改变他人，也不要试图改变自己。接受现实，在现实中找到属于自己的位置。"

这本书教会我**不必太用力**——人生不是非得轰轰烈烈才值得。

## 5. 《设计心理学》— 唐纳德·诺曼

理解用户体验的经典之作。

### 日常物品的设计原则

| 原则 | 含义 | 例子 |
|------|------|------|
| 示能 | 物品暗示的使用方式 | 门把手暗示"拉" |
| 指意 | 告诉用户该怎么操作 | "推"字标识 |
| 反馈 | 操作后的即时响应 | 按钮点击动画 |
| 约束 | 限制错误操作 | USB 只能一个方向插入 |

读完这本书后，我开始注意生活中那些"反人类"的设计，也学会了在自己的产品设计中避免同样的错误。

## 结语

读书的意义不在于记住所有内容，而在于**那些读过的内容会潜移默化地改变你**。

> "读书是在别人思想的帮助下，建立起自己的思想。"

下半年，我计划读更多技术架构和哲学方面的书。如果你有推荐，欢迎留言告诉我。`,
  },

  {
    id: 'building-this-blog',
    title: '从零搭建这个博客：技术选型与实现细节',
    excerpt: '这个博客没有用任何框架，纯 HTML/CSS/JS 构建。本文分享了技术选型的思考过程、Markdown 渲染方案、暗黑模式实现等细节。',
    tags: ['技术', '前端', '设计'],
    date: '2026-06-28',
    cover: { gradient: 'linear-gradient(135deg, #4A5568, #718096)', icon: '🛠️' },
    readTime: 10,
    views: 1156,
    likes: 103,
    featured: false,
    content: `# 从零搭建这个博客

> "最好的工具，是你完全掌控的工具。"

这个博客没有用 React、Vue 或任何前端框架。纯 HTML + CSS + JavaScript，加上 marked.js 做 Markdown 渲染。为什么？因为我想要**完全的掌控感**。

## 技术选型

### 为什么不用框架？

| 方案 | 优点 | 缺点 |
|------|------|------|
| 纯原生 | 零依赖、完全可控、性能极致 | 需要手写更多代码 |
| Next.js | 生态丰富、SSR | 过度工程化、部署复杂 |
| Hexo | 开箱即用 | 定制性差、主题受限 |
| Astro | 内容优先 | 仍需构建步骤 |

对于一个个人博客来说，纯原生方案是**最合适**的——没有构建步骤，打开即用，修改即生效。

### 核心依赖

- **marked.js** —— Markdown 解析渲染
- **DOMPurify** —— XSS 防护
- **highlight.js** —— 代码高亮
- **Google Fonts** —— Noto Serif SC / Noto Sans SC

## 架构设计

### 文件结构

\`\`\`
zmf-blog/
├── index.html       # 首页（文章列表）
├── article.html     # 文章详情页
├── tags.html        # 标签分类页
├── about.html       # 关于页面
├── css/
│   └── style.css    # 全局样式
├── js/
│   ├── config.js    # 站点配置
│   ├── articles.js  # 文章数据（Markdown）
│   ├── main.js      # 核心逻辑
│   └── article.js   # 文章页逻辑
└── assets/          # 静态资源
\`\`\`

### 数据流

1. 文章以 Markdown 字符串存储在 \`articles.js\` 中
2. 首页从文章数据渲染卡片列表
3. 文章详情页通过 URL 参数获取文章 ID
4. 使用 marked.js 将 Markdown 渲染为 HTML
5. 交互数据（点赞、评论）存储在 localStorage

## 暗黑模式实现

使用 CSS 变量 + \`data-theme\` 属性，切换主题只需修改一个属性：

\`\`\`javascript
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

// 初始化时读取用户偏好
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
\`\`\`

CSS 端只需要定义两套变量：

\`\`\`css
:root {
  --bg-primary: #FAFAF7;
  --text-primary: #1A1A1A;
  --accent: #8B7355;
}

[data-theme="dark"] {
  --bg-primary: #141414;
  --text-primary: #E8E6E1;
  --accent: #C9A961;
}
\`\`\`

## Markdown 渲染

\`\`\`javascript
// 配置 marked
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  },
  breaks: true,
  gfm: true,
});

// 渲染并注入
function renderArticle(markdownText) {
  const rawHtml = marked.parse(markdownText);
  const cleanHtml = DOMPurify.sanitize(rawHtml);
  document.getElementById('article-content').innerHTML = cleanHtml;
}
\`\`\`

## 点赞功能

使用 localStorage 存储点赞状态，模拟点赞计数：

\`\`\`javascript
function toggleLike(articleId) {
  const likes = JSON.parse(localStorage.getItem('likes') || '{}');
  const isLiked = likes[articleId] || false;

  if (isLiked) {
    likes[articleId] = false;
    // 减少计数
  } else {
    likes[articleId] = true;
    // 增加计数
  }

  localStorage.setItem('likes', JSON.stringify(likes));
}
\`\`\`

## 阅读进度条

监听滚动事件，计算阅读百分比：

\`\`\`javascript
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.querySelector('.progress-bar').style.width = progress + '%';
});
\`\`\`

## 性能优化

1. **CSS 变量** —— 避免重复定义，方便主题切换
2. **防抖处理** —— 搜索、滚动事件使用防抖
3. **图片懒加载** —— 使用 \`loading="lazy"\`
4. **字体优化** —— 使用 \`font-display: swap\`

## 结语

搭建这个博客的过程本身就是一次很好的练习。没有框架的束缚，每一行代码都清清楚楚。

> "简单是终极的复杂。" —— 达芬奇

如果你也想搭建自己的博客，不妨试试纯原生方案。你会发现，有时候"不用工具"本身就是最好的工具。`,
  },
];

// Helper: get all unique tags
function getAllTags() {
  const tagMap = {};
  ARTICLES.forEach(article => {
    article.tags.forEach(tag => {
      if (!tagMap[tag]) {
        tagMap[tag] = { name: tag, count: 0, articles: [] };
      }
      tagMap[tag].count++;
      tagMap[tag].articles.push(article);
    });
  });
  return Object.values(tagMap).sort((a, b) => b.count - a.count);
}

// Helper: get article by ID
function getArticleById(id) {
  return ARTICLES.find(a => a.id === id);
}

// Helper: format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const months = ['一月', '二月', '三月', '四月', '五月', '六月',
                  '七月', '八月', '九月', '十月', '十一月', '十二月'];
  return `${date.getFullYear()}年${months[date.getMonth()]}${date.getDate()}日`;
}

// Helper: get popular articles (sorted by views)
function getPopularArticles(limit = 5) {
  return [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, limit);
}

// Helper: get featured articles
function getFeaturedArticles() {
  return ARTICLES.filter(a => a.featured);
}
