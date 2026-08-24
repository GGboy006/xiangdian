import { describe, expect, it } from 'vitest'
import { getMaterial, listFormulasByMaterial, searchCatalog } from './catalog'

describe('catalog', () => {
  it('按别名找到龙脑', () => {
    const hits = searchCatalog('冰片')
    expect(hits.some(item => item.id === 'longnao')).toBe(true)
  })

  it('从沉香反查到帐中香', () => {
    const formulas = listFormulasByMaterial('chenxiang')
    expect(formulas.some(item => item.id === 'zhangzhong')).toBe(true)
  })

  it('香方可按入方香材名检索', () => {
    const hits = searchCatalog('甲香')
    expect(hits.some(item => item.kind === 'formula' && item.id === 'zhangzhong')).toBe(true)
    expect(getMaterial('jiaxiang')?.name).toBe('甲香')
  })
})
