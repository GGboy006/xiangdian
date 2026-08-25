# 香笺资料底本（已接入产品）

从解包知识库抽出，经 `scripts/build-xiangdian-corpus.py` 写入 `src/data/corpus/`。

本典折算仍冻 1 两 = 40 克。`editorial_efficacy` 与「一两约 30 克」不进原文。

| 文件 | 条数 | 怎么用 |
|---|---:|---|
| `formulas.reviewed.json` | 95 | 优先看。多有出处、分两 |
| `formulas.web.json` | 47 | 多据《香乘》网页整理 |
| `formulas.generated.json` | 55 | 最糙。51 条带「功效/适用人群」，且有「一两约 30 克」 |
| `materials.json` | 349 | 香材名、别名、性味炮制摘要 |
| `unit-profiles.json` | 6 套衡制 | 对照用。本典仍冻 1 两 = 40 克 |
| `index.json` | 计数 | |

重新抽出：`node scripts/extract-xiangjie-kb.mjs`

借鉴时只取三书（《香乘》《香谱》《陈氏香谱》）里对得上原文分两的条目；白话自撰。`flags` 含 `editorial_efficacy` 的不要当原文。
