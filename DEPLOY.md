# 部署手册

这个站用 GitHub Pages 托管，GitHub Actions 负责构建和发布。代码推到 `main` 就会自动上线，全程不需要服务器，也不需要额外付费。

- 线上地址：<https://kaynepeng.github.io/notes/>
- 仓库地址：<https://github.com/kaynePeng/notes>
- 本地目录：`C:\workspace\my-workspace\kayne.peng`（目录名和仓库名不一致，不影响使用）

---

## 一、一次性配置（已经做过，换新仓或重建时才需要重来）

### 1. 仓库必须是公开的

免费账户的 GitHub Pages **只能发布公开仓库**的站点。私有仓库要发 Pages 得升到 GitHub Pro。

检查方式：仓库首页标题旁显示 `Public`。改法：`Settings → 滚到最底部 Danger Zone → Change visibility → Change to public`。

### 2. Pages 的发布来源选 GitHub Actions

`Settings → Pages → Build and deployment → Source` 选 **GitHub Actions**。

选错成 `Deploy from a branch` 的后果：Actions 跑成功了，但站点一直是 404，因为两边发布通道不同。

### 3. 仓库里有 `.github/workflows/deploy.yml`

这是发布流水线，流程是：检出代码 → 装 Node 22 → `npm ci` → `npm run build` → 复制 `dist/index.html` 成 `dist/404.html` → 上传产物 → 发布到 Pages。

> 注意：推送这个文件需要 git 凭据具备 `workflow` scope。当前本地凭据没有这个权限，所以首次是用**网页端直接创建**这个文件提交的。以后改这个文件，同样建议在 GitHub 网页上编辑保存，或者先给凭据补上 `workflow` 权限。

---

## 二、日常更新（改完内容后）

```powershell
cd C:\workspace\my-workspace\kayne.peng
npm run dev            # 本地预览，默认 5173；被占用时加 -- --port 28417
# ……改内容……
npm run lint           # 0 warnings 0 errors 才算过
npm run type-check     # 退出码 0 才算过
git add -A
git commit -m "说明这次改了什么"
git push
```

想在本地看「线上那套路径」下的效果（含 `/notes/` 前缀、图片、404 兜底），先用 `npm run build` 再 `npm run preview`，访问 `http://localhost:4173/notes/`。`preview` 会自动使用生产环境的 `base`。

推送后 30–90 秒，Actions 会自动构建发布。看进度：仓库页 **Actions** 标签 → 最新一次 `Deploy to GitHub Pages`。

> PowerShell 里 `npm run lint | Select-Object -Last 20` 会吞掉输出，看不到真实报错。要写成 `npm run lint *> lint.log; Get-Content lint.log`。

---

## 三、构建与路径规则

| 场景 | `base` 取值 |
| --- | --- |
| GitHub Pages 项目站（当前） | `/notes/` |
| 自定义域名，或仓库名是 `<user>.github.io` | `/` |
| 本地开发 | `/` |

规则写在 `vite.config.ts`：

```ts
base: process.env.VITE_BASE ?? (command === 'build' ? '/notes/' : '/'),
```

临时覆盖不改代码：

```powershell
$env:VITE_BASE="/"; npm run build
```

**这是最容易踩的坑**：`base` 和实际部署路径不一致时，本地一切正常，线上整片 404（`/notes/assets/index.xxx.js` 请求不到）。判断方法：打开线上页面按 F12，看 Console 里报错的资源路径前缀对不对。

---

## 四、发布产物结构

构建产物在 `dist/`，被 `.gitignore` 忽略，不进仓库。关键文件：

| 文件 | 作用 |
| --- | --- |
| `dist/index.html` | 首页，资源路径已按 `base` 重写 |
| `dist/assets/*.js` `*.css` | 带 hash 的静态资源，可长期缓存 |
| `dist/404.html` | 由 `index.html` 复制而来，SPA 路由兜底 |

`404.html` 这一步不能省。站内路由（如 `/notes/writing/llm-boundaries`）在 GitHub Pages 上没有真实文件，服务器返回 404，只有靠 `404.html` 把页面交回给前端路由接管。少了它，直接分享文章链接给别人会打不开。

---

## 五、故障排查

| 现象 | 原因 | 处理 |
| --- | --- | --- |
| 线上白屏、Console 报 404 | `base` 与部署路径不一致 | 改 `vite.config.ts` 的 `base`，重新构建推送 |
| 首页正常，文章链接打不开 | 缺 `dist/404.html` | 检查 workflow 里的 `cp dist/index.html dist/404.html` |
| Actions 成功但站点 404 | Pages 发布来源选成了分支 | 改成 GitHub Actions |
| `refusing to allow a Personal Access Token ... without workflow scope` | 凭据缺 `workflow` 权限 | 网页端改 workflow，或给 token 补权限 |
| Actions 报 `npm ci` 失败 | 缺 `package-lock.json`，或仓库里还没有业务代码 | 确认 `package-lock.json` 已提交 |
| 页面是旧的 | 浏览器/CDN 缓存 | 强制刷新 Ctrl+F5；`assets` 有 hash，一般不会串版本 |
| 第一次 Actions 就失败 | 仓库里当时只有 workflow、没有 `package.json` | 正常现象，代码推上去后重跑即可 |

查看某次构建为什么失败：**Actions → 选中那次运行 → build 任务 → 展开失败的步骤**。日志里能直接看到是 `npm ci`、`npm run build` 还是 `upload-pages-artifact` 出的问题。

---

## 六、改仓库名之后

仓库名会直接出现在访问地址里（`https://<user>.github.io/<仓库名>/`），改名后旧地址失效。改动清单：

1. GitHub 仓库设置里改名。
2. `vite.config.ts` 的 `base` 改成 `/<新仓库名>/`。
3. 本地 remote 指向新地址：`git remote set-url origin https://github.com/kaynePeng/<新名>.git`。
4. README 与文章里出现的线上地址同步更新。
5. 推送后确认 Actions 重新发布，访问新地址验证。

---

## 七、绑自定义域名（可选）

前提：`base` 必须改成 `/`（自定义域名没有子路径），并准备一个已实名认证的域名。

1. DNS 加记录：`A` 记录指向 `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`；`www` 用 `CNAME` 指向 `kaynepeng.github.io`。
2. 仓库根目录加文件 `CNAME`，内容只有一行：`kaynepeng.com`。
3. `Settings → Pages → Custom domain` 填域名，等校验通过后勾上 **Enforce HTTPS**。
4. `base` 改成 `/`，重新构建推送。

服务器在境外，**不需要 ICP 备案**；但域名注册商的实名认证必须做，否则会被暂停解析。

---

## 八、回滚

重新发布某个历史版本：

```powershell
git log --oneline            # 找到目标提交
git revert <commit>          # 生成一条反向提交（推荐，保留历史）
git push
```

不建议 `git push --force` 到 `main`：Actions 会跟着重建，但历史被改写后不容易解释发生了什么。

---

## 九、上线检查清单

- [ ] `npm run lint` 0 error 0 warning
- [ ] `npm run type-check` 退出码 0
- [ ] 本地首页、文章页、关于页、项目页都能正常打开
- [ ] `git push` 后 Actions 显示绿色对勾
- [ ] 线上首页能打开，且 Console 无资源 404
- [ ] 随便挑一篇文章的直链能打开（验证 `404.html` 兜底）
- [ ] 手机宽度下不横向滚动
