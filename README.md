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

## 目录

- `src/pages`：典 / 材 / 方 / 笈
- `src/pages-sub`：香材详情、香方详情、检索、出处
- `src/data`：本地谱录
- `src/style/tokens.scss`：宣纸、墨色、朱砂
