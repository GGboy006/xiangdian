import { describe, expect, it } from 'vitest'
import { FEN_TO_GRAM, JIN_TO_GRAM, LIANG_TO_GRAM, formatGrams, gramsUnderProfile, liangToGram, qianToGram, sumIngredientGrams } from './scale'

describe('scale', () => {
  it('一两折四十克', () => {
    expect(LIANG_TO_GRAM).toBe(40)
    expect(liangToGram(1)).toBe(40)
    expect(liangToGram(4)).toBe(160)
  })

  it('一斤按十六两', () => {
    expect(JIN_TO_GRAM).toBe(640)
  })

  it('一钱四分按十进', () => {
    expect(qianToGram(1)).toBe(4)
    expect(FEN_TO_GRAM).toBe(0.4)
  })

  it('可称部分求和，浸剂不计', () => {
    expect(sumIngredientGrams([{ grams: 40 }, { grams: undefined }, { grams: 4 }])).toBe(44)
  })

  it('克数读法', () => {
    expect(formatGrams(40)).toBe('40 克')
    expect(formatGrams(0.4)).toBe('0.4 克')
  })

  it('古衡对照按两的克值换算', () => {
    expect(gramsUnderProfile(40, 41.3)).toBe(41.3)
    expect(gramsUnderProfile(40, 37.3)).toBe(37.3)
  })
})
