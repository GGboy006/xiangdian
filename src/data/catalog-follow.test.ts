import { describe, expect, it } from 'vitest'
import { getFormula, getMaterial, listFormulas, listFormulasByMaterial, listMaterials, searchCatalog } from './catalog'

describe('followable catalog', () => {
  it('四方占位已换掉，真方有分两', () => {
    expect(['tufu', 'jiangzhen', 'baihe'].every(id => !getFormula(id))).toBe(true)
    expect(listFormulas().map(item => item.id)).toEqual(expect.arrayContaining([
      'meizhen',
      'cangchun',
      'yaxiang',
      'gongzhong',
    ]))
    expect(listFormulas().length).toBeGreaterThan(180)
    expect(listMaterials().length).toBeGreaterThan(330)
  })

  it('入方香材都能点开，丁香十余粒不编克数', () => {
    const formulas = listFormulas()
    for (const formula of formulas) {
      for (const part of formula.ingredients) {
        expect(getMaterial(part.materialId), `${formula.id} 缺材 ${part.materialId}`).toBeTruthy()
      }
    }
    const clove = getFormula('cangchun')?.ingredients.find(item => item.materialId === 'dingxiang')
    expect(clove?.amount).toBe('十余粒')
    expect(clove?.grams).toBeUndefined()
    expect(listFormulasByMaterial('baimei').some(item => item.id === 'meizhen')).toBe(true)
    expect(listFormulasByMaterial('jiangzhen').some(item => item.id === 'cangchun')).toBe(true)
    expect(searchCatalog('青桂').some(item => item.id === 'zhanxiang')).toBe(true)
    expect(searchCatalog('生结').some(item => item.id === 'zhanxiang')).toBe(true)
    expect(searchCatalog('涂傅').some(item => item.id === 'meizhen')).toBe(true)
  })

  it('第二刀真方有分两，入方香材都能点开', () => {
    const added = ['huairui', 'tihu', 'lamei', 'xiulan', 'sishi', 'xunling', 'dazhen', 'yanrui', 'xiaofenji', 'meihuayi']
    expect(added.every(id => getFormula(id))).toBe(true)
    expect(getFormula('yanrui')?.ingredients.find(item => item.materialId === 'xuanshen')?.grams).toBe(320)
    expect(getFormula('huairui')?.ingredients.find(item => item.materialId === 'chenxiang')?.grams).toBe(120)
    expect(getFormula('sishi')?.steps?.some(step => step.text.includes('铅粉'))).toBe(true)
    expect(getMaterial('muxiang')?.name).toBe('木香')
    expect(getMaterial('zhangnao')?.name).toBe('樟脑')
    expect(searchCatalog('花蕊').some(item => item.id === 'huairui')).toBe(true)
    expect(searchCatalog('荀令').some(item => item.id === 'xunling')).toBe(true)
  })
})
