import type { Formula, FormulaUse, Material, MaterialCategory, SourceRecord } from '@/types/canon'
import { FORMULA_USE_LABEL } from '@/types/canon'
import { extraFormulas } from './formula-extras'
import { formulaStepOverrides, formulaUsageOverrides } from './formula-steps'
import { formulas } from './formulas'
import { materials } from './materials'
import { sources } from './sources'

const catalogFormulas = [
  ...formulas.filter(item => item.id === 'zhangzhong'),
  ...extraFormulas,
  ...formulas.filter(item => item.id !== 'zhangzhong'),
]

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
    return materials
  return materials.filter(item => item.category === category)
}

export function getMaterial(id: string): Material | undefined {
  return materials.find(item => item.id === id)
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
  const steps = formulaStepOverrides[id]
  const usage = formulaUsageOverrides[id]
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

  const materialHits = materials
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
  const material = materials[0]
  const formula = formulas[0]
  return { material, formula }
}
