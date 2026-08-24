import { describe, expect, it } from 'vitest'
import { getFormula, getMaterial, searchCatalog } from './catalog'

describe('catalog specimens', () => {
  it('梅真香各半两折克，可糁衣傅身', () => {
    const formula = getFormula('meizhen')
    expect(formula?.use).toBe('anoint')
    expect(formula?.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ materialId: 'lingling', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'gansong', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'tanxiang', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'dingxiang', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'baimei', amount: '半两', grams: 20 }),
    ]))
    expect(formula?.steps?.some(step => step.original?.includes('糁衣傅身'))).toBe(true)
    expect(formula?.usage).toContain('不可入目')
    expect(getFormula('tufu')).toBeUndefined()
    expect(searchCatalog('梅真').some(item => item.id === 'meizhen')).toBe(true)
  })

  it('藏春香以降真四两为骨', () => {
    const formula = getFormula('cangchun')
    expect(formula?.use).toBe('burn')
    expect(formula?.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ materialId: 'jiangzhen', amount: '四两', grams: 160 }),
      expect.objectContaining({ materialId: 'longnao', amount: '一钱', grams: 4 }),
      expect.objectContaining({ materialId: 'shexiang', amount: '一钱', grams: 4 }),
    ]))
    expect(formula?.steps?.some(step => step.text.includes('16 克'))).toBe(true)
    expect(getFormula('jiangzhen')).toBeUndefined()
    expect(getMaterial('jiangzhen')?.name).toBe('降真香')
    expect(searchCatalog('降真').some(item => item.kind === 'formula' && item.id === 'cangchun')).toBe(true)
  })

  it('衙香各半两，作百合众香之标本', () => {
    const formula = getFormula('yaxiang')
    expect(formula?.use).toBe('burn')
    expect(formula?.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ materialId: 'chenxiang', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'tanxiang', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'ruxiang', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'jiangzhen', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'jiaxiang', amount: '半两', grams: 20 }),
    ]))
    expect(formula?.steps?.some(step => step.original?.includes('炼蜜拌匀'))).toBe(true)
    expect(getFormula('baihe')).toBeUndefined()
    expect(searchCatalog('百合').some(item => item.id === 'yaxiang')).toBe(true)
  })

  it('宫中香从陈氏真方折克，须窨一月', () => {
    const formula = getFormula('gongzhong')
    expect(formula?.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ materialId: 'tanxiang', amount: '八两', grams: 320 }),
      expect.objectContaining({ materialId: 'chenxiang', amount: '三两', grams: 120 }),
      expect.objectContaining({ materialId: 'jiaxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'zhanxiang', amount: '四两', grams: 160 }),
      expect.objectContaining({ materialId: 'longnao', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'shexiang', amount: '半两', grams: 20 }),
    ]))
    expect(formula?.steps?.some(step => step.original?.includes('地窨一月'))).toBe(true)
    expect(formula?.steps?.some(step => step.text.includes('32 克'))).toBe(true)
    expect(formula?.original).toContain('檀香八两')
  })
})
