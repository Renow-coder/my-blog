# 项目记忆 - ZMF 个人博客网站

## 项目信息
- 名称: ZMF · 思绪与光影
- 作者: zmf
- 类型: 纯前端个人博客（无框架）
- 技术栈: HTML/CSS/JS + marked.js + highlight.js + DOMPurify (CDN)

## 设计规范
- 配色: 暖象牙白(#FAFAF7) + 古铜金(#8B7355)，暗黑模式用深黑(#141414) + 亮金(#C9A961)
- 字体: Noto Serif SC(标题) / Noto Sans SC(正文) / JetBrains Mono(代码)
- 风格: 高级简约，大量留白，柔和过渡

## 文件结构
- index.html / article.html / tags.html / about.html
- css/style.css (核心样式，CSS变量驱动)
- js/config.js (站点配置) / js/articles.js (文章数据) / js/main.js (核心逻辑) / js/article.js (文章页逻辑)

## 功能特性
- Markdown渲染、暗黑模式、搜索、标签分类、点赞收藏、社交分享、评论留言
- 社交联系: 邮箱(mailto) / 微信(QR弹窗) / QQ(链接) / 飞书(链接)
- 数据持久化: localStorage (主题/点赞/收藏/评论/留言)

## 注意事项
- 文章数据存储在 js/articles.js 中（Markdown字符串），添加新文章直接在此文件追加
- 社交联系方式在 js/config.js 中配置，用户需替换为真实信息
- CDN资源需联网才能加载（marked.js, highlight.js, DOMPurify, Google Fonts）
