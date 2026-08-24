/** 本典折算尺。十六两为斤，十钱为两，十分为钱。不充古秤。 */
export const LIANG_TO_GRAM = 40
export const QIAN_TO_GRAM = 4
export const FEN_TO_GRAM = 0.4
export const JIN_TO_GRAM = 16 * LIANG_TO_GRAM

export const SCALE_NOTE = '本典以 1 两 = 40 克折算，便于入手，不充古秤。'

export function liangToGram(liang: number) {
  return liang * LIANG_TO_GRAM
}

export function qianToGram(qian: number) {
  return qian * QIAN_TO_GRAM
}

export function fenToGram(fen: number) {
  return fen * FEN_TO_GRAM
}

export function formatGrams(grams: number) {
  const value = Number.isInteger(grams) ? String(grams) : String(Number(grams.toFixed(1)))
  return `${value} 克`
}

export function sumIngredientGrams(items: Array<{ grams?: number }>) {
  return items.reduce((total, item) => total + (item.grams ?? 0), 0)
}
