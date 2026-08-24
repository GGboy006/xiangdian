import { describe, expect, it } from 'vitest'
import { getFormula, getMaterial, listFormulasByMaterial, searchCatalog } from './catalog'

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
    expect(hits.some(item => item.kind === 'formula' && (item.id === 'huadusi' || item.id === 'shuwang'))).toBe(true)
    expect(getMaterial('jiaxiang')?.name).toBe('甲香')
  })

  it('帐中香可按格名与苏合检索', () => {
    const hits = searchCatalog('苏合')
    expect(hits.some(item => item.kind === 'formula' && item.id === 'zhangzhong')).toBe(true)
  })

  it('帐中香标本按一两折四十克', () => {
    const formula = getFormula('zhangzhong')
    expect(formula?.pattern).toBe('苏合香浸沉香')
    expect(formula?.ingredients[0]).toMatchObject({ materialId: 'chenxiang', amount: '一两', grams: 40 })
    expect(formula?.steps?.length).toBe(5)
    expect(formula?.steps?.[0].text).toContain('40 克')
    expect(formula?.steps?.[0].original).toContain('剉如炷大')
    expect(formula?.usage).toContain('卧室')
  })

  it('唐化度寺衙香按原方折克，今语给试作量', () => {
    const formula = getFormula('huadusi')
    expect(formula?.pattern).toBe('炼蜜搜和')
    expect(formula?.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ materialId: 'tanxiang', amount: '五两', grams: 200 }),
      expect.objectContaining({ materialId: 'chenxiang', amount: '一两半', grams: 60 }),
      expect.objectContaining({ materialId: 'suhexiang', amount: '二两', grams: 80 }),
      expect.objectContaining({ materialId: 'jiaxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'longnao', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'shexiang', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'lianmi', amount: '溲和得所' }),
    ]))
    expect(formula?.ingredients.find(item => item.materialId === 'lianmi')?.grams).toBeUndefined()
    expect(formula?.steps?.length).toBeGreaterThanOrEqual(6)
    expect(formula?.steps?.[0].original).toContain('白檀香五两')
    expect(formula?.steps?.some(step => step.text.includes('20 克'))).toBe(true)
    expect(formula?.steps?.some(step => step.original?.includes('炼蜜'))).toBe(true)
    expect(formula?.usage).toContain('阴干')
  })

  it('炼蜜可检索，并从沉香反查到化度寺', () => {
    expect(getMaterial('lianmi')?.name).toBe('炼蜜')
    expect(searchCatalog('化度').some(item => item.id === 'huadusi')).toBe(true)
    expect(listFormulasByMaterial('chenxiang').some(item => item.id === 'huadusi')).toBe(true)
    expect(listFormulasByMaterial('lianmi').some(item => item.id === 'huadusi')).toBe(true)
  })

  it('蜀王熏御衣按各一两折克，今语按十分之一试作', () => {
    const formula = getFormula('shuwang')
    expect(formula?.use).toBe('fumigate')
    expect(formula?.pattern).toBe('蜜和熏衣')
    expect(formula?.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ materialId: 'dingxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'zhanxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'chenxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'tanxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'shexiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'jiaxiang', amount: '三两', grams: 120 }),
      expect.objectContaining({ materialId: 'lianmi', amount: '轻炼，不得热用' }),
    ]))
    expect(formula?.steps?.some(step => step.original?.includes('馢香'))).toBe(true)
    expect(formula?.steps?.some(step => step.text.includes('4 克'))).toBe(true)
    expect(formula?.usage).toContain('熏笼')
    expect(getFormula('xunyi')).toBeUndefined()
    expect(searchCatalog('蜀王').some(item => item.id === 'shuwang')).toBe(true)
    expect(searchCatalog('熏衣').some(item => item.id === 'shuwang')).toBe(true)
  })

  it('衣香按一斤十六两折克，今语给试作量', () => {
    const formula = getFormula('yixiang')
    expect(formula?.use).toBe('wear')
    expect(formula?.pattern).toBe('贮囊佩之')
    expect(formula?.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ materialId: 'lingling', amount: '一斤', grams: 640 }),
      expect.objectContaining({ materialId: 'gansong', amount: '十两', grams: 400 }),
      expect.objectContaining({ materialId: 'tanxiang', amount: '十两', grams: 400 }),
      expect.objectContaining({ materialId: 'dingxiang', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'xinyi', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'huixiang', amount: '六分', grams: 2.4 }),
    ]))
    expect(formula?.ingredients.find(item => item.materialId === 'longnao')?.grams).toBeUndefined()
    expect(formula?.steps?.some(step => step.original?.includes('贮囊佩之'))).toBe(true)
    expect(formula?.steps?.some(step => step.text.includes('16 克'))).toBe(true)
    expect(formula?.usage).toContain('纱囊')
    expect(getFormula('peixiang')).toBeUndefined()
    expect(searchCatalog('衣香').some(item => item.id === 'yixiang')).toBe(true)
  })

  it('定州公库印香按两折克，杏仁末只作脱模', () => {
    const formula = getFormula('dingzhou')
    expect(formula?.use).toBe('seal')
    expect(formula?.pattern).toBe('杵末印篆')
    expect(formula?.ingredients).toEqual(expect.arrayContaining([
      expect.objectContaining({ materialId: 'zhanxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'tanxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'lingling', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'huoxiang', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'gansong', amount: '一两', grams: 40 }),
      expect.objectContaining({ materialId: 'maoxiang', amount: '半两', grams: 20 }),
      expect.objectContaining({ materialId: 'dahuang', amount: '半两', grams: 20 }),
    ]))
    expect(formula?.steps?.some(step => step.original?.includes('杏仁末'))).toBe(true)
    expect(formula?.steps?.some(step => step.text.includes('4 克'))).toBe(true)
    expect(getFormula('yinxian')).toBeUndefined()
    expect(searchCatalog('定州').some(item => item.id === 'dingzhou')).toBe(true)
    expect(searchCatalog('印香').some(item => item.id === 'dingzhou')).toBe(true)
    expect(getMaterial('gansong')?.name).toBe('甘松')
    expect(getMaterial('maoxiang')?.name).toBe('茅香')
  })
})
