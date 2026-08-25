import type { Formula, FormulaStep } from '@/types/canon'
import { sourceBatchFormulas } from './sources'

/**
 * 真方写「制过」「炼蜜」时用。原文摘自《陈氏香谱》脩製诸香。
 * 谱中甲香制法多条并列，本典取「灰煮去膜、酒煮、蜜汤洗」这一路，便于跟着做。
 */
export const materialPrepSteps: Record<string, FormulaStep[]> = {
  jiaxiang: [
    {
      original: '甲香如龙耳者好，自余小者次也。取一二两以来',
      text: '拣像耳朵那么大的螺厣。一次用 40 到 80 克即可。太碎的力薄。',
    },
    {
      original: '甲香以灰煮去膜',
      text: '草木灰加水，澄出灰汁，把甲香煮到能揭掉腥膜。还有海腥就换水再煮。',
    },
    {
      original: '好酒煮乾',
      text: '洗净，用黄酒没过，慢煮到酒干。不要焦。',
    },
    {
      original: '以蜜汤洗净。入香宜少用',
      text: '再用稀蜜水洗一遍，阴干。闻不到海腥才能入合。合香用量宜少。',
    },
  ],
  lianmi: [
    {
      original: '白沙蜜若干，绵滤入磁罐',
      text: '取白蜜，用纱布滤进瓷罐或耐热玻璃罐。不要用铁器。',
    },
    {
      original: '油纸重叠，蜜封罐口，大釜内重汤煮一日',
      text: '油纸封严。隔水煮。谱中煮一日是求久存；当天和香，煮到水气少、蜜微稠即可。',
    },
    {
      original: '就罐于火上煨煎数沸，便出尽水气。凡炼蜜不可大过',
      text: '再连罐小火煨几开。不要煮成硬糖，过老则和香不匀。放凉再用。宫中香用生蜜，不必走这条。',
    },
  ],
}

export const prepBatchFormulas: Formula[] = [
  {
    id: 'yanrui',
    name: '延安郡公蕊香',
    aliases: ['蕊香', '延安郡公香'],
    pattern: '炼蜜搓丸',
    use: 'burn',
    method: '玄参半斤煮熟再炒，甘松四两，白檀二两，麝乳各二钱，炼蜜搓丸。',
    usage: '搓丸密封，随时取出点燃。玄参须先煮再炒。按十分之一试作。',
    ingredients: [
      { materialId: 'xuanshen', amount: '半斤', grams: 320, note: '原文作元参；煮熟再炒令微烟出' },
      { materialId: 'gansong', amount: '四两', grams: 160, note: '细剉，去草土' },
      { materialId: 'tanxiang', amount: '二两', grams: 80, note: '原文作白檀' },
      { materialId: 'shexiang', amount: '二钱', grams: 8, note: '当门子，别研后入' },
      { materialId: 'ruxiang', amount: '二钱', grams: 8, note: '原文作滴乳' },
      { materialId: 'lianmi', amount: '炼蜜和匀', note: '粘合，不入折算' },
    ],
    sourceId: 'xiangpu',
    juan: '香之法',
    summary: '洪刍《香谱》延安郡公蕊香。玄参半斤须煮熟再炒，甘松、白檀为辅。原方半斤，今语按十分之一。',
    original: '玄参半斤（洗去土，煮令熟，炒令微烟出），甘松四两，白檀二两，麝香二钱，滴乳二钱。右捣罗为末，炼蜜和匀，捻作鸡头大，贮瓷器，旋取爇之。',
  },
  {
    id: 'xiaofenji',
    name: '小芬积香',
    aliases: ['芬积香'],
    pattern: '蜜和地埋',
    use: 'burn',
    method: '栈香一两，檀香半两，樟脑半两飞过，降真一钱，麸炭三两。蜜和，地埋一月。',
    usage: '埋满一个月后取出点燃。麸炭只助燃。樟脑气烈，火要小。',
    ingredients: [
      { materialId: 'zhanxiang', amount: '一两', grams: 40 },
      { materialId: 'tanxiang', amount: '半两', grams: 20 },
      { materialId: 'zhangnao', amount: '半两', grams: 20, note: '飞过；气烈，试作宜减' },
      { materialId: 'jiangzhen', amount: '一钱', grams: 4, note: '别本作一分' },
      { materialId: 'futan', amount: '三两', grams: 120, note: '助燃，不入香气' },
      { materialId: 'lianmi', amount: '生蜜或熟蜜和匀', note: '粘合，不入折算' },
    ],
    sourceId: 'chenshi',
    juan: '卷二',
    summary: '《陈氏香谱》卷二小芬积香。栈檀为骨，樟脑飞过后入，麸炭助燃。蜜和后地埋一月。',
    original: '栈香一两，檀香半两，樟脑半两（飞过），降真香一钱（别本作一分），麸炭三两。右以生蜜或熟蜜和匀，磁盒盛，地埋一月，取烧之。',
  },
  ...sourceBatchFormulas,
]
