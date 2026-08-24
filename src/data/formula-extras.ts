import type { Formula } from '@/types/canon'

/** 第二种制法标本：和蜜合香，谱中不强制久窨。 */
export const extraFormulas: Formula[] = [
  {
    id: 'huadusi',
    name: '唐化度寺衙香',
    aliases: ['化度寺衙香', '唐化度寺牙香', '化度寺牙香'],
    pattern: '炼蜜搜和',
    use: 'burn',
    method: '沉檀苏合甲香细剉捣末，马尾罗过。炼蜜搜和，脑麝别研后入。作饼阴干，爇之。',
    usage: '搓成小饼或丸，阴干半天到一天即可焚。书斋、清供都合适。火要小，免得脑麝先冲。',
    ingredients: [
      { materialId: 'tanxiang', amount: '五两', grams: 200 },
      { materialId: 'suhexiang', amount: '二两', grams: 80, note: '入合，非浸剂' },
      { materialId: 'chenxiang', amount: '一两半', grams: 60 },
      { materialId: 'jiaxiang', amount: '一两', grams: 40, note: '煑製' },
      { materialId: 'longnao', amount: '半两', grams: 20, note: '别研后入' },
      { materialId: 'shexiang', amount: '半两', grams: 20, note: '别研后入' },
      { materialId: 'lianmi', amount: '溲和得所', note: '粘合，不入折算' },
    ],
    sourceId: 'chenshi',
    juan: '卷二',
    summary: '沉檀为骨，苏合、甲香为辅，脑麝后入，炼蜜搜和。谱中不强制久窨，适合当天合、当天焚。洪刍《香谱》此方苏合作一两，本典从《陈氏香谱》作二两。',
    original: '白檀香五两　苏合香二两　沉香一两半　甲香一两煑製　龙脑香半两　麝香半两别研。右细剉捣末，马尾罗过，炼蜜搜和爇之。',
  },
]
