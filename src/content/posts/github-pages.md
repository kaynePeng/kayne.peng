---
title: 用 GitHub Pages 免费托管一个像样的个人站
date: 2026-07-30
tags: 部署, GitHub, 工程化
summary: 不用买服务器、不用备案。从仓库设置到自动发布，把这条流水线一次讲清楚。
---

个人站最贵的部分从来不是域名，而是维护。GitHub Pages 的好处是：仓库推上去就发布，没有服务器要管，也没有证书要续。缺点同样明显——它只提供静态文件，所以前端路由和子路径这两件事必须提前想清楚。

## 一、仓库与 Pages 设置

新建一个公开仓库，名字就用站点名，比如 `kayne.peng`。发布出来的地址是：

```
https://<用户名>.github.io/kayne.peng/
```

注意末尾的 `/kayne.peng/`。这意味着构建时所有资源路径都要带上这个前缀，否则线上会整片 404，而本地开发却一切正常——这是最常见的坑。

## 二、把 base 交给构建配置

Vite 项目里改一行 `base` 就够了：

```ts
export default defineConfig(({ command }) => ({
  base: process.env.VITE_BASE ?? (command === 'build' ? '/kayne.peng/' : '/'),
}))
```

本地开发挂根路径，构建时挂子路径。路由用 `createWebHistory(import.meta.env.BASE_URL)`，这样它自动跟着 base 走，不用再手写一遍。

## 三、静态托管没有 SPA 回退

`/writing/type-boundaries` 这种路径，GitHub Pages 会去找同名文件，找不到就返回 404。两个办法：

- 用哈希路由（`#/writing/...`），代价是 URL 不好看
- 构建后把 `index.html` 复制一份成 `404.html`，让未知路径也落到同一个应用入口

我选了后者。代价是状态码仍然是 404，但对个人站来说影响很小，换来的是干净的链接。

## 四、用 Actions 自动发布

在 `.github/workflows/deploy.yml` 里写三步：装依赖、构建、上传产物。核心只有这几行：

```yaml
- uses: actions/upload-pages-artifact@v3
  with:
    path: dist
- uses: actions/deploy-pages@v4
```

然后在仓库的 **Settings → Pages → Build and deployment** 里把 Source 选成 **GitHub Actions**。这一步不做，仓库里的 workflow 跑完也没有任何东西被发布出去。

## 五、几个容易忘的细节

- 提交前确认 `dist`、`node_modules` 都进了 `.gitignore`
- 文件大小写敏感：本地 Windows 上 `Logo.svg` 和 `logo.svg` 是同一个文件，线上不是
- 首次发布后等一两分钟再刷新，缓存会骗你

静态托管的边界很清楚：没有后端、没有评论、没有搜索索引。但它足够快、足够便宜，也足够让你把注意力放回内容本身。
