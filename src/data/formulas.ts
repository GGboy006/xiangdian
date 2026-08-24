import type { Formula } from '@/types/canon'

export const formulas: Formula[] = [
  {
    id: 'zhangzhong',
    name: '江南李王帐中香',
    aliases: ['李王帐中香', '帐中香', '苏合香浸沉香'],
    pattern: '苏合香浸沉香',
    use: 'burn',
    method: '沉香锉如炷大，投入苏合油中，磁器密封，浸满百日，取出爇之。入蔷薇水更佳。',
    usage: '封浸期满，取出爇于炉中。宜帐中、寝室。入蔷薇水则更清润。',
    ingredients: [
      { materialId: 'chenxiang', amount: '一两', grams: 40, note: '剉如炷大' },
      { materialId: 'suhexiang', amount: '以不津磁器盛', note: '浸剂，不入折算' },
    ],
    sourceId: 'chenshi',
    juan: '法和众妙香',
    summary: '南唐李后主帐中所用之一格。以苏合油养沉香，不和众末。谱中帐中香有数则，本典先取此格，便于按步制作。',
    original: '沉香一两（剉如炷大）　苏合油（以不津磁器盛）。右以香投油，封浸百日爇之，入蔷薇水更佳。',
  },
]
