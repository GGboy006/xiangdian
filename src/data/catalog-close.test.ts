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
  it('今日一味一则走 catalog 真方，不读占位', () => {
    const picks = todayPicks()
    expect(picks.formula.id).toBe('zhangzhong')
    expect(picks.formula.steps?.[0].original).toContain('剉如炷大')
    expect(picks.formula.steps?.[0].text).toContain('40 克')
    expect(picks.material.id).toBe('chenxiang')
    expect(formulas.map(item => item.id)).toEqual(['zhangzhong'])
    expect(FOLLOWABLE_IDS.every(id => !['tufu', 'xunyi', 'yinxian', 'peixiang', 'baihe'].includes(id))).toBe(true)
    expect(['tufu', 'xunyi', 'yinxian', 'peixiang', 'baihe'].every(id => !getFormula(id))).toBe(true)
  })

  it('产品面只有九方，甲香炼蜜可跟着做', () => {
    expect(listFormulas().map(item => item.id)).toEqual(FOLLOWABLE_IDS)
    expect(listMaterials().length).toBeLessThan(30)
    const jiaxiang = getMaterial('jiaxiang')
    expect(jiaxiang?.prepSteps?.some(step => step.original?.includes('灰煮去膜'))).toBe(true)
    expect(jiaxiang?.prepSteps?.some(step => step.text.includes('海腥'))).toBe(true)
    const lianmi = getMaterial('lianmi')
    expect(lianmi?.prepSteps?.some(step => step.original?.includes('重汤煮一日'))).toBe(true)
    expect(lianmi?.prepSteps?.some(step => step.text.includes('放凉'))).toBe(true)
  })
})
