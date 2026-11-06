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

线上地址：<https://kaynepeng.github.io/kayne.peng/>

推到 `main` 分支后，`.github/workflows/deploy.yml` 会自动构建并发布（GitHub Actions → Pages）。仓库需要是 Public（免费账户的 Pages 只支持公开仓库），且 **Settings → Pages → Build and deployment → Source** 需选 **GitHub Actions**。

首次发布若只有 workflow 文件、还没有业务代码，构建会因为缺少 `package.json` 失败，把代码推上去重跑即可。

## 改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 姓名、简介、社交链接 | `src/data/site.ts` |
| 项目列表 | `src/data/site.ts` 里的 `projects` |
| 文章 | `src/content/posts/*.md`（文件名即 URL 片段，头部 front matter 写 title / date / tags / summary） |
| 配色与字体 | `src/assets/main.css` 顶部的设计变量 |
| 页面结构 | `src/views/` |
