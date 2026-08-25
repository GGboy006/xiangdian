import { describe, expect, it } from 'vitest'
import { FORMULA_LAYER_LABEL } from '@/types/canon'
import { corpusFormulas } from './corpus'
import { getFormula, getMaterial, listFormulas, listMaterials, listUnitProfiles } from './catalog'

describe('全库底本', () => {
  it('底本 197 方分层入库，功效不作原文', () => {
    expect(corpusFormulas).toHaveLength(197)
    expect(corpusFormulas.filter(item => item.layer === 'reviewed')).toHaveLength(95)
    expect(corpusFormulas.filter(item => item.layer === 'web')).toHaveLength(47)
    expect(corpusFormulas.filter(item => item.layer === 'generated')).toHaveLength(55)
    expect(corpusFormulas.every(item => !item.original?.includes('适用人群'))).toBe(true)
    expect(FORMULA_LAYER_LABEL.web).toBe('辑录')
    expect(FORMULA_LAYER_LABEL.generated).toBe('粗编')
    expect(listFormulas().length).toBeGreaterThan(180)
  })

  it('香材可点开，本典标本仍在', () => {
    expect(listMaterials().length).toBeGreaterThan(330)
    expect(getMaterial('chenxiang')?.name).toBe('沉香')
    expect(getFormula('zhangzhong')?.id).toBe('zhangzhong')
    for (const formula of listFormulas()) {
      for (const part of formula.ingredients)
        expect(getMaterial(part.materialId), `${formula.id} 缺材 ${part.materialId}`).toBeTruthy()
    }
  })

  it('六套古衡可对照，本典仍是四十克一两', () => {
    expect(listUnitProfiles().length).toBe(6)
    expect(getFormula('zhangzhong')?.ingredients[0].grams).toBe(40)
  })
})
