import { describe, expect, it } from 'vitest'
import { formulas } from './formulas'
import { getFormula, getMaterial, listFormulas, listMaterials, todayPicks } from './catalog'

const FOLLOWABLE_IDS = [
  'zhangzhong',
  'huadusi',
  'shuwang',
  'yixiang',
  'dingzhou',
  'meizhen',
  'cangchun',
  'yaxiang',
  'gongzhong',
]

describe('一期收口', () => {
  it('今日一味一则按日历日轮换，同日不变', () => {
    const morning = todayPicks(new Date(2026, 7, 25, 8, 0))
    const night = todayPicks(new Date(2026, 7, 25, 23, 50))
    expect(morning.formula.id).toBe(night.formula.id)
    expect(morning.material.id).toBe(night.material.id)
    expect(getFormula(morning.formula.id)?.id).toBe(morning.formula.id)
    expect(getMaterial(morning.material.id)?.id).toBe(morning.material.id)

    const ids = Array.from({ length: 21 }, (_, i) => todayPicks(new Date(2026, 7, 25 + i)).formula.id)
    expect(new Set(ids).size).toBeGreaterThan(12)

    const materialIds = Array.from({ length: 21 }, (_, i) => todayPicks(new Date(2026, 7, 25 + i)).material.id)
    expect(new Set(materialIds).size).toBeGreaterThan(12)
  })

  it('占位方已撤，帐中香标本仍可跟着做', () => {
    const zhangzhong = getFormula('zhangzhong')
    expect(zhangzhong?.steps?.[0].original).toContain('剉如炷大')
    expect(zhangzhong?.steps?.[0].text).toContain('40 克')
    expect(getMaterial('chenxiang')?.id).toBe('chenxiang')
    expect(formulas.map(item => item.id)).toEqual(['zhangzhong'])
    expect(FOLLOWABLE_IDS.every(id => !['tufu', 'xunyi', 'yinxian', 'peixiang', 'baihe'].includes(id))).toBe(true)
    expect(['tufu', 'xunyi', 'yinxian', 'peixiang', 'baihe'].every(id => !getFormula(id))).toBe(true)
  })

  it('产品面九方仍在，甲香炼蜜可跟着做', () => {
    expect(listFormulas().map(item => item.id)).toEqual(expect.arrayContaining(FOLLOWABLE_IDS))
    expect(listFormulas().length).toBeGreaterThan(180)
    expect(listMaterials().length).toBeGreaterThan(330)
    const jiaxiang = getMaterial('jiaxiang')
    expect(jiaxiang?.prepSteps?.some(step => step.original?.includes('灰煮去膜'))).toBe(true)
    expect(jiaxiang?.prepSteps?.some(step => step.text.includes('海腥'))).toBe(true)
    const lianmi = getMaterial('lianmi')
    expect(lianmi?.prepSteps?.some(step => step.original?.includes('重汤煮一日'))).toBe(true)
    expect(lianmi?.prepSteps?.some(step => step.text.includes('放凉'))).toBe(true)
  })
})
