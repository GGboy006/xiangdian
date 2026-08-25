import type { Formula, Material } from '@/types/canon'
import formulasJson from './corpus/formulas.json'
import materialsJson from './corpus/materials.json'
import unitsJson from './corpus/units.json'

export const corpusFormulas = formulasJson as Formula[]
export const corpusMaterials = materialsJson as Material[]

export interface UnitProfile {
  id: string
  name: string
  liang?: number | null
  qian?: number | null
  fen?: number | null
  jin?: number | null
  zi?: number | null
  note?: string
}

export const canonScale = unitsJson.canon as UnitProfile
export const unitProfiles = unitsJson.profiles as UnitProfile[]
