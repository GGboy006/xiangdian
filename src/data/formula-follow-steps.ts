import type { Formula, FormulaStep } from '@/types/canon'
import { sourceBatchSteps } from './sources'

export const followSteps: Record<string, FormulaStep[]> = {
  meizhen: [
    {
      original: '零陵叶、甘松、白檀、丁香、白梅末各半两',
      text: '各称 20 克。白梅去核，碾成细末。零陵用叶。',
    },
    {
      original: '脑麝少许',
      text: '原书只写少许，不折克。龙脑、麝香各几小粒，另研，最后拌。',
    },
    {
      original: '右为细末，糁衣傅身，皆可用之',
      text: '诸香研成极细粉，不和蜜。浴后或洗手后薄薄扑在身上、手上，也可洒在衣上。不可入目。',
    },
  ],
  cangchun: [
    {
      original: '降真香四两（腊茶清浸三日',
      text: '原方 160 克。第一次可按十分之一：降真 16 克。用腊茶清（浓绿茶水）没过香面，封浸三日。',
    },
    {
      original: '次以香煮十余沸，取出为末）',
      text: '连茶水一起煮十来开，取出沥干，碾成细末。茶渣不要。',
    },
    {
      original: '丁香十余粒',
      text: '原书只写粒数，不折克。试作一两粒，微捣。',
    },
    {
      original: '龙脑一钱　麝香一钱',
      text: '原方各 4 克，试作各 0.4 克。另研成粉，最后才拌。',
    },
    {
      original: '右为细末，炼蜜和匀，烧如常法',
      text: '炼蜜拌到能搓团。捏成小饼或丸，阴干后放入香炉点燃。',
    },
  ],
  yaxiang: [
    {
      original: '沉香半两、白檀香半两、乳香半两、青桂香半两、降真香半两、甲香半两',
      text: '各称 20 克。青桂用栈香（同树细枝、未成沉者）。甲香必须先制过，闻不到海腥才能用。',
    },
    {
      original: '龙脑半两、麝香半两',
      text: '原方各 20 克，极烈，试作各 2 克。另研成粉，最后才入。',
    },
    {
      original: '右捣罗细末，炼蜜拌匀，次入龙脑、麝香搜和得所，如常爇之',
      text: '先把木香、脂香、甲香捣成细粉，筛过，炼蜜拌匀。再拌入脑麝。软硬能搓团，捏成小饼或丸，阴干后炉中点燃。',
    },
  ],
  gongzhong: [
    {
      original: '檀香八两（劈作小片，腊茶清浸一宿，取出焙干，再以酒蜜浸一宿，慢火炙干）',
      text: '原方 320 克。第一次可按十分之一：檀香 32 克。劈成薄片，用腊茶清浸一夜，取出焙干；再用酒蜜浸一夜，小火炙干。不要烤焦。',
    },
    {
      original: '沉香三两　甲香一两　生结香四两',
      text: '原方沉香 120 克、甲香 40 克、生结 160 克。试作：沉香 12 克、甲香 4 克、栈香（即生结）16 克。甲香须制过。',
    },
    {
      original: '龙麝各半两（别器研）',
      text: '原方各 20 克，试作各 2 克。另研成粉，不要先和众香一起捣。',
    },
    {
      original: '右为细末，生蜜和匀，贮瓷器，地窨一月，旋丸爇之',
      text: '生蜜拌匀，不要煮过热。装进瓷罐封好，埋在阴凉处满一个月。取出搓丸，再放入香炉点燃。',
    },
  ],
  tihu: [
    {
      original: '乳香、沉香各二钱半，檀香一两半',
      text: '乳、沉各 10 克，檀香 60 克。量不大，可按原方称。锉成细末。',
    },
    {
      original: '入麝少许',
      text: '原书只写少许，不折克。麝香几小粒，另研，最后拌。',
    },
    {
      original: '炼蜜和剂作饼焚之',
      text: '炼蜜拌到能搓团，捏成小饼，阴干后炉中点燃。',
    },
  ],
  lamei: [
    {
      original: '沉香、檀香各三钱，丁香六钱',
      text: '原方沉、檀各 12 克，丁香 24 克。量不大，可按原方称，也可再减半试作。',
    },
    {
      original: '龙脑半钱，麝香一钱',
      text: '原方龙脑 2 克、麝香 4 克。另研成粉，最后才入。',
    },
    {
      original: '右为细末，生蜜和剂',
      text: '生蜜拌匀，不要煮过热。搓饼或丸，阴干后点燃。火要小，免得丁香先冲。',
    },
  ],
}

export const followUsage: Record<string, string> = {
  meizhen: '浴后或洗手后，薄薄扑在身上、手上。也可洒在衣上。不可入目。不和蜜。',
  cangchun: '搓成小饼或丸，阴干后炉中点燃。降真须先浸煮，不要生用。',
  yaxiang: '搓成小饼或丸，阴干后炉中点燃。书斋、宾客都合适。火要小，免得脑麝先冲。',
  gongzhong: '窨满一个月后取出，搓丸点燃。不要刚和完就焚。烟宜缓。',
}

export const moreFollowFormulas: Formula[] = [
  {
    id: 'sishi',
    name: '四时清味香',
    aliases: ['清味香'],
    pattern: '炼蜜作饼',
    use: 'burn',
    method: '茴丁各一钱半，零陵五钱，檀八钱，甘松一两，脑麝少许，炼蜜作饼。',
    usage: '搓成小饼点燃。原方裹铅粉，本典不作。',
    ingredients: [
      { materialId: 'huixiang', amount: '一钱半', grams: 6 },
      { materialId: 'dingxiang', amount: '一钱半', grams: 6 },
      { materialId: 'lingling', amount: '五钱', grams: 20 },
      { materialId: 'tanxiang', amount: '八钱', grams: 32 },
      { materialId: 'gansong', amount: '一两', grams: 40 },
      { materialId: 'longnao', amount: '少许', note: '另研' },
      { materialId: 'shexiang', amount: '少许', note: '另研' },
      { materialId: 'lianmi', amount: '炼蜜和剂', note: '粘合，不入折算' },
    ],
    sourceId: 'xiangcheng',
    juan: '卷二十三',
    summary: '《香乘》晦斋香谱四时清味香。草香为骨。原方裹铅粉，有毒，本典不作。',
    original: '茴香一钱半，丁香一钱半，零陵香五钱，檀香八钱，甘松一两，脑麝少许另研。右为末，炼蜜和剂作饼，用铅粉黄为衣焚之。',
  },
  {
    id: 'xunling',
    name: '荀令十里香',
    aliases: ['十里香', '荀令香'],
    pattern: '贮囊佩之',
    use: 'wear',
    method: '丁香半两强，檀、甘松、零陵各一两，生脑少许，茴香半钱弱略炒。为末，薄纸裹，贮囊佩之。',
    usage: '薄纸包好，放入纱囊佩之。茴香须略炒。不可火焙。',
    ingredients: [
      { materialId: 'dingxiang', amount: '半两强', grams: 20, note: '原文作半两强，按半两折' },
      { materialId: 'tanxiang', amount: '一两', grams: 40 },
      { materialId: 'gansong', amount: '一两', grams: 40 },
      { materialId: 'lingling', amount: '一两', grams: 40 },
      { materialId: 'huixiang', amount: '半钱弱', grams: 2, note: '略炒；一作五分' },
      { materialId: 'longnao', amount: '少许', note: '原文作生脑' },
    ],
    sourceId: 'chenshi',
    juan: '佩熏诸香',
    summary: '沈立谱入《陈氏香谱》。丁香半两强，檀、松、零陵各一两，茴香略炒，生脑少许。为末贮囊，不和蜜。',
    original: '丁香半两强，檀香、甘松、零陵香各一两，生脑少许，茴香半钱弱略炒。右为末，薄纸裹，贮囊佩之。',
  },
]
Object.assign(followSteps, sourceBatchSteps)
