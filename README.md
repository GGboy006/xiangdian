# 香典

一部可随身翻阅的香学手册。据《香乘》《香谱》《陈氏香谱》的公有领域记载整理香材与香方，白话为自撰。

工程底座是 [unibest](https://unibest.tech) 的极简模板（无 UI 库、无登录、无 i18n），视觉与内容按「纸上焚香」自建。

## 本地运行

```bash
pnpm i
pnpm dev          # H5，默认 http://localhost:9000
pnpm dev:mp       # 微信小程序
pnpm test:run
```

## H5 部署到 GitHub Pages

仓库已带 `.github/workflows/deploy-h5.yml`。推 `main` 后自动构建网页版。

1. 打开 GitHub 仓库 → **Settings → Pages**
2. **Source** 选 **GitHub Actions**（不要选 Deploy from a branch）
3. 推送含该 workflow 的 `main`，或到 **Actions** 里手动跑 **Deploy H5 to GitHub Pages**
4. 成功后访问：`https://<你的用户名>.github.io/xiangdian/`

说明：Pages 项目站路径是 `/xiangdian/`，workflow 里已设 `VITE_APP_PUBLIC_BASE=/xiangdian/`。若仓库改名，同步改 workflow 里的 base。

微信小程序仍须用开发者工具上传审核，不能靠 Pages 发布。

## 目录

- `src/pages`：典 / 材 / 方 / 笈
- `src/pages-sub`：香材详情、香方详情、检索、出处
- `src/data`：本地谱录
- `src/style/tokens.scss`：宣纸、墨色、朱砂
