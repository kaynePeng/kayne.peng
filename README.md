# kayne.peng

个人站点：Vue 3 + TypeScript + Vite，内容用 Markdown 写，构建后发布到 GitHub Pages。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build      # 类型检查 + 构建，产物在 dist/
```

构建时 `base` 默认是 `/kayne.peng/`（对应 `https://<user>.github.io/kayne.peng/`）。如果换成自定义域名或用户主页仓库，用环境变量覆盖：

```bash
VITE_BASE=/ npm run build
```

## 发布

推到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布。首次使用前，需要在仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

## 改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、简介、社交链接 | `src/data/site.ts` |
| 项目列表 | `src/data/site.ts` 里的 `projects` |
| 文章 | `src/content/posts/*.md`（文件名即 URL 片段，头部 front matter 写 title / date / tags / summary） |
| 配色与字体 | `src/assets/main.css` 顶部的设计变量 |
| 页面结构 | `src/views/` |
