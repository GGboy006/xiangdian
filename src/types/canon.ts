export type MaterialCategory = 'wood' | 'herb' | 'resin' | 'animal' | 'compound'

export type FormulaUse = 'burn' | 'fumigate' | 'wear' | 'anoint' | 'seal'

export interface SourceRecord {
  id: string
  title: string
  dynasty: string
  author: string
  note: string
}

export interface FormulaStep {
  /** 这一步对应的原文 */
  original?: string
  /** 今语做法，供跟着做 */
  text: string
  /** 实拍，放在 src/static/steps/ 下，有则显示 */
  photo?: string
}

export interface Material {
  id: string
  name: string
  aliases: string[]
  category: MaterialCategory
  nature: string
  origin: string
  prep: string
  authenticity: string
  summary: string
  sourceId: string
  juan: string
  /** 炮制拆步。有则香材页上原文、下今语。 */
  prepSteps?: FormulaStep[]
}

export interface FormulaIngredient {
  materialId: string
  /** 原书分两，如「一两」「半钱」 */
  amount: string
  /** 按本典尺折成克；浸剂、约量则不填 */
  grams?: number
  note?: string
}

export type FormulaLayer = 'canon' | 'reviewed' | 'web' | 'generated'

export interface Formula {
  id: string
  name: string
  aliases: string[]
  /** 格名，如「苏合香浸沉香」 */
  pattern?: string
  use: FormulaUse
  method: string
  steps?: FormulaStep[]
  usage: string
  ingredients: FormulaIngredient[]
  sourceId: string
  juan: string
  summary: string
  /** 对应古籍原文摘句 */
  original?: string
  /** 底本分层。本典标本为 canon */
  layer?: FormulaLayer
  /** 自动生成层：功效文案已去掉 */
  editorial?: boolean
  /** 分两不足，不折克 */
  compareOnly?: boolean
}

export const MATERIAL_CATEGORY_LABEL: Record<MaterialCategory, string> = {
  wood: '木香',
  herb: '草香',
  resin: '脂香',
  animal: '兽香',
  compound: '合成',
}

export const FORMULA_USE_LABEL: Record<FormulaUse, string> = {
  burn: '焚香',
  fumigate: '熏衣',
  wear: '佩香',
  anoint: '涂傅',
  seal: '印香',
}

export const FORMULA_LAYER_LABEL: Record<FormulaLayer, string> = {
  canon: '本典',
  reviewed: '校勘',
  web: '辑录',
  generated: '粗编',
}
