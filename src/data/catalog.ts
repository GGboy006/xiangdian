import type { Formula, FormulaLayer, FormulaUse, Material, MaterialCategory, SourceRecord } from '@/types/canon'
import { FORMULA_USE_LABEL } from '@/types/canon'
import { canonScale, corpusFormulas, corpusMaterials, unitProfiles } from './corpus'
import { extraFormulas } from './formula-extras'
import { extraMaterials } from './material-extras'
import { followFormulas } from './formula-follow'
import { followSteps, followUsage, moreFollowFormulas } from './formula-follow-steps'
import { formulaStepOverrides, formulaUsageOverrides, stepBatchFormulas } from './formula-steps'
import { formulas } from './formulas'
import { materialPrepSteps, prepBatchFormulas } from './material-prep'
import { materials } from './materials'
import { sources } from './sources'

/** 谱录静态入库，不走后端。后段 moreFormulas 补入。 */
let catalogFormulas: Formula[] = []

const handmadeMaterialNames = new Set(
  [...materials, ...extraMaterials].flatMap(item => [item.name, ...item.aliases]),
)
const catalogMaterials = [
  ...materials,
  ...extraMaterials,
  ...corpusMaterials.filter(item => !handmadeMaterialNames.has(item.name)),
]
const stepOverrides = { ...formulaStepOverrides, ...followSteps }
const usageOverrides = { ...formulaUsageOverrides, ...followUsage }

function normalize(text: string) {
  return text.trim().toLowerCase()
}

function matchesKeyword(haystack: string[], keyword: string) {
  const q = normalize(keyword)
  if (!q)
    return false
  return haystack.some(item => normalize(item).includes(q))
}

export function listSources() {
  return sources
}

export function listUnitProfiles() {
  return unitProfiles
}

export function getCanonScale() {
  return canonScale
}


export function getSource(id: string): SourceRecord | undefined {
  return sources.find(item => item.id === id)
}

export function listMaterials(category?: MaterialCategory) {
  if (!category)
    return catalogMaterials
  return catalogMaterials.filter(item => item.category === category)
}

export function getMaterial(id: string): Material | undefined {
  const material = catalogMaterials.find(item => item.id === id)
  if (!material)
    return undefined
  const prepSteps = materialPrepSteps[id]
  return prepSteps ? { ...material, prepSteps } : material
}

export function listFormulas(use?: FormulaUse, layer?: FormulaLayer) {
  let list = catalogFormulas
  if (use)
    list = list.filter(item => item.use === use)
  if (layer === "canon")
    list = list.filter(item => !item.layer || item.layer === "canon")
  else if (layer)
    list = list.filter(item => item.layer === layer)
  return list
}

export function getFormula(id: string): Formula | undefined {
  const formula = catalogFormulas.find(item => item.id === id)
  if (!formula)
    return undefined
  const steps = stepOverrides[id]
  const usage = usageOverrides[id]
  return {
    ...formula,
    layer: formula.layer || "canon",
    ...(steps ? { steps } : {}),
    ...(usage ? { usage } : {}),
  }
}

export function listFormulasByMaterial(materialId: string) {
  return catalogFormulas.filter(item => item.ingredients.some(part => part.materialId === materialId))
}

export interface SearchHit {
  kind: 'material' | 'formula'
  id: string
  name: string
  subtitle: string
}

export function searchCatalog(keyword: string): SearchHit[] {
  const q = normalize(keyword)
  if (!q)
    return []

  const materialHits = catalogMaterials
    .filter(item => matchesKeyword([item.name, item.summary, item.origin, ...item.aliases], q))
    .map<SearchHit>(item => ({
      kind: 'material',
      id: item.id,
      name: item.name,
      subtitle: item.aliases.slice(0, 2).join(' · ') || item.nature,
    }))

  const formulaHits = catalogFormulas
    .filter((item) => {
      const materialNames = item.ingredients
        .map(part => getMaterial(part.materialId)?.name || '')
      return matchesKeyword(
        [item.name, item.summary, item.method, item.pattern || '', FORMULA_USE_LABEL[item.use], ...item.aliases, ...materialNames],
        q,
      )
    })
    .map<SearchHit>(item => ({
      kind: 'formula',
      id: item.id,
      name: item.name,
      subtitle: item.aliases[0] || item.summary.slice(0, 18),
    }))

  return [...materialHits, ...formulaHits]
}

export function todayPicks(at: Date = new Date()) {
  if (!catalogFormulas.length || !catalogMaterials.length)
    throw new Error('谱录空缺')
  const formula = getFormula(catalogFormulas[pickIndex(catalogFormulas.length, at, 0x9E3779B9)].id)
  const material = getMaterial(catalogMaterials[pickIndex(catalogMaterials.length, at, 0x85EBCA6B)].id)
  if (!formula || !material)
    throw new Error('谱录空缺')
  return { material, formula }
}

/** 按本地日历日取下标。同日同盐必同，方与材用不同盐以免永远成对。 */
function pickIndex(length: number, at: Date, salt: number) {
  const day = at.getFullYear() * 10000 + (at.getMonth() + 1) * 100 + at.getDate()
  return ((Math.imul(day, 1103515245) + salt) >>> 0) % length
}

const moreFormulas: Formula[] = [
  {
    id: 'tihu',
    name: '醍醐香',
    aliases: ['醍醐'],
    pattern: '炼蜜作饼',
    use: 'burn',
    method: '乳香、沉香各二钱半，檀香一两半，为末，入麝少许，炼蜜和剂作饼焚之。',
    usage: '搓成小饼，阴干后炉中点燃。麝香原书只写少许，不折克。',
    ingredients: [
      { materialId: 'ruxiang', amount: '二钱半', grams: 10 },
      { materialId: 'chenxiang', amount: '二钱半', grams: 10 },
      { materialId: 'tanxiang', amount: '一两半', grams: 60 },
      { materialId: 'shexiang', amount: '少许', note: '后入' },
      { materialId: 'lianmi', amount: '炼蜜和剂', note: '粘合，不入折算' },
    ],
    sourceId: 'xiangcheng',
    juan: '卷二十三',
    summary: '《香乘》晦斋香谱醍醐香。檀为骨，沉乳为辅，麝少许后入，炼蜜作饼。',
    original: '乳香、沉香各二钱半，檀香一两半。右为末，入麝少许，炼蜜和剂作饼焚之。',
  },
  {
    id: 'lamei',
    name: '蜡梅香',
    aliases: ['腊梅香'],
    pattern: '生蜜和剂',
    use: 'burn',
    method: '沉檀各三钱，丁香六钱，龙脑半钱，麝香一钱。为细末，生蜜和剂。',
    usage: '搓成小饼或丸，阴干后炉中点燃。丁香偏重，火要小。',
    ingredients: [
      { materialId: 'chenxiang', amount: '三钱', grams: 12 },
      { materialId: 'tanxiang', amount: '三钱', grams: 12 },
      { materialId: 'dingxiang', amount: '六钱', grams: 24 },
      { materialId: 'longnao', amount: '半钱', grams: 2 },
      { materialId: 'shexiang', amount: '一钱', grams: 4 },
      { materialId: 'lianmi', amount: '生蜜和剂', note: '粘合，不入折算' },
    ],
    sourceId: 'chenshi',
    juan: '卷三',
    summary: '《陈氏香谱》卷三蜡梅香。丁香为君，沉檀为辅，脑麝后入，生蜜和剂。不是蜡梅花。',
    original: '沉香、檀香各三钱，丁香六钱，龙脑半钱，麝香一钱。右为细末，生蜜和剂。',
  },
  {
    id: 'xiulan',
    name: '秀兰香',
    aliases: ['秀兰', '秀兰合香'],
    pattern: '蜜和为饼',
    use: 'burn',
    method: '沉、藿、零陵俱半两，丁香一分，麝香三钱。细捣，蜜和为饼，爇之。',
    usage: '搓成小饼，阴干后炉中点燃。麝香原方极重，试作宜再减。',
    ingredients: [
      { materialId: 'chenxiang', amount: '半两', grams: 20 },
      { materialId: 'huoxiang', amount: '半两', grams: 20 },
      { materialId: 'lingling', amount: '半两', grams: 20 },
      { materialId: 'dingxiang', amount: '一分', grams: 0.4 },
      { materialId: 'shexiang', amount: '三钱', grams: 12, note: '气烈，试作宜减' },
      { materialId: 'lianmi', amount: '蜜和为饼', note: '粘合，不入折算' },
    ],
    sourceId: 'chenshi',
    juan: '卷三',
    summary: '《陈氏香谱》卷三秀兰香。沉藿零陵各半两，丁香一分，麝香三钱。蜜和为饼。麝极重，今语按十分之一后再减。',
    original: '沉香、藿香、零陵香俱半两，丁香一分，麝香三钱。细捣，蜜和为饼，爇之。',
  },
]

const handmadeFormulas = [
  ...formulas,
  ...extraFormulas,
  ...followFormulas,
  ...moreFormulas,
  ...moreFollowFormulas,
  ...stepBatchFormulas,
  ...prepBatchFormulas,
]
const handmadeFormulaNames = new Set(handmadeFormulas.map(item => item.name))
catalogFormulas = [
  ...handmadeFormulas,
  ...corpusFormulas.filter(item => !handmadeFormulaNames.has(item.name)),
]
