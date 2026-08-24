import type { Formula, FormulaUse, Material, MaterialCategory, SourceRecord } from '@/types/canon'
import { FORMULA_USE_LABEL } from '@/types/canon'
import { extraFormulas } from './formula-extras'
import { extraMaterials } from './material-extras'
import { followFormulas } from './formula-follow'
import { followSteps, followUsage } from './formula-follow-steps'
import { formulaStepOverrides, formulaUsageOverrides } from './formula-steps'
import { formulas } from './formulas'
import { materialPrepSteps } from './material-prep'
import { materials } from './materials'
import { sources } from './sources'

/** 谱录静态入库，不走后端。 */
const catalogFormulas = [
  ...formulas,
  ...extraFormulas,
  ...followFormulas,
]

const catalogMaterials = [...materials, ...extraMaterials]
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

export function listFormulas(use?: FormulaUse) {
  if (!use)
    return catalogFormulas
  return catalogFormulas.filter(item => item.use === use)
}

export function getFormula(id: string): Formula | undefined {
  const formula = catalogFormulas.find(item => item.id === id)
  if (!formula)
    return undefined
  const steps = stepOverrides[id]
  const usage = usageOverrides[id]
  return {
    ...formula,
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

export function todayPicks() {
  const formula = getFormula(catalogFormulas[0].id)
  const material = getMaterial(catalogMaterials[0].id)
  if (!formula || !material)
    throw new Error('谱录空缺')
  return { material, formula }
}
