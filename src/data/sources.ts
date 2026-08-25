import type { Formula, FormulaStep, SourceRecord } from '@/types/canon'

export const sources: SourceRecord[] = [
  {
    id: 'xiangcheng',
    title: '香乘',
    dynasty: '明',
    author: '周嘉胄',
    note: '明末扬州周嘉胄穷二十年之力纂成，香学集大成。本典只取公有领域原文脉络，白话为自撰。',
  },
  {
    id: 'xiangpu',
    title: '香谱',
    dynasty: '北宋',
    author: '洪刍',
    note: '洪刍字驹父，黄庭坚甥。谱中多记合香之法，后世香书多所取资。',
  },
  {
    id: 'chenshi',
    title: '陈氏香谱',
    dynasty: '南宋',
    author: '陈敬',
    note: '陈敬字子中，洛阳人。在洪谱之后广采诸家，香方尤备。',
  },
  {
    id: 'diben',
    title: '资料底本',
    dynasty: '待校',
    author: '香笺抽出',
    note: '校勘、辑录、粗编三条。功效文案不作原文。不充三书。',
  },
]

export const sourceBatchFormulas: Formula[] = [
  {
    id: 'meihuayi',
    name: '梅花衣香',
    aliases: ['梅衣香'],
    pattern: '贮囊佩之',
    use: 'wear',
    method: '零陵、甘松、白檀、茴香各五钱，丁香、木香各一钱，为粗末，入龙脑少许，贮囊佩之。',
    usage: '薄纸包好，放入纱囊，佩在衣带或枕边。不要和蜜，不要火焙。',
    ingredients: [
      { materialId: 'lingling', amount: '五钱', grams: 20 },
      { materialId: 'gansong', amount: '五钱', grams: 20 },
      { materialId: 'tanxiang', amount: '五钱', grams: 20, note: '原文作白檀' },
      { materialId: 'huixiang', amount: '五钱', grams: 20 },
      { materialId: 'dingxiang', amount: '一钱', grams: 4 },
      { materialId: 'muxiang', amount: '一钱', grams: 4 },
      { materialId: 'longnao', amount: '少许', note: '后入' },
    ],
    sourceId: 'chenshi',
    juan: '佩熏诸香',
    summary: '《陈氏香谱》梅花衣香。草香为骨，丁香、木香点睛，龙脑少许后入。不和蜜，贮囊佩之。',
    original: '零陵香、甘松、白檀、茴香各五钱，丁香、木香各一钱。右为粗末，入龙脑少许，贮囊佩之。',
  },
]

export const sourceBatchSteps: Record<string, FormulaStep[]> = {
  xiulan: [
    {
      original: '沉香、藿香、零陵香俱半两，丁香一分',
      text: '原方沉、藿、零陵各 20 克，丁香 0.4 克。试作按十分之一：前三味各 2 克，丁香几小粒。',
    },
    {
      original: '麝香三钱',
      text: '原方 12 克，极烈。试作按十分之一再减半，大约 0.6 克。另研最后拌。',
    },
    {
      original: '细捣，蜜和为饼，爇之',
      text: '捣成细粉，炼蜜拌到能搓团，捏饼阴干后炉中点燃。',
    },
  ],
  meihuayi: [
    {
      original: '零陵香、甘松、白檀、茴香各五钱',
      text: '原方各 20 克。第一次可按五分之一：各 4 克。茴香略炒一下再入，不要炒焦。',
    },
    {
      original: '丁香、木香各一钱',
      text: '原方各 4 克，试作各 0.8 克。木香是云木香的根，不是沉檀那类木头。',
    },
    {
      original: '右为粗末，入龙脑少许，贮囊佩之',
      text: '捣成粗粉。龙脑几小粒最后拌。薄纸包好放入纱囊。不要和蜜，不要火焙。',
    },
  ],
  xunling: [
    {
      original: '丁香半两强，檀香、甘松、零陵香各一两',
      text: '原方丁香按半两折 20 克，檀、松、零陵各 40 克。试作按十分之一：丁香 2 克，其余各 4 克。',
    },
    {
      original: '茴香半钱弱略炒',
      text: '原方按半钱折 2 克，试作一小撮。略炒，生则不香，过炒则焦。',
    },
    {
      original: '生脑少许。右为末，薄纸裹，贮囊佩之',
      text: '捣成细粉。龙脑几小粒最后拌。薄纸包好，放入纱囊佩在衣带上。',
    },
  ],
  dazhen: [
    {
      original: '沉香一两半，白檀一两，白蜜半盏相和蒸干',
      text: '原方沉香 60 克、檀香 40 克。试作按十分之一：沉 6 克、檀 4 克。白蜜大约半小碟，拌湿后隔水蒸干。半盏不折克。',
    },
    {
      original: '栈香二两，甲香一两，脑、麝各一钱',
      text: '原方栈 80 克、甲 40 克、脑麝各 4 克。试作：栈 8 克、甲 4 克、脑麝各 0.4 克。甲香须制过。脑麝另研后入。',
    },
    {
      original: '右为细末，和匀，重汤煮蜜为膏，作饼子，窨一月烧',
      text: '众末拌匀，隔水煮蜜成膏再搜和。捏饼，封存在阴凉处满一个月，再点燃。',
    },
  ],
  yanrui: [
    {
      original: '玄参半斤（洗去土，煮令熟，炒令微烟出）',
      text: '原方 320 克。第一次可按十分之一：玄参 32 克。洗净，加水煮到软，沥干，切小块，小火炒到微微冒烟。不要炒焦。',
    },
    {
      original: '甘松四两，白檀二两',
      text: '原方甘松 160 克、白檀 80 克。试作：甘松 16 克、檀香 8 克。甘松去土细锉。',
    },
    {
      original: '麝香二钱，滴乳二钱',
      text: '原方各 8 克，试作各 0.8 克。滴乳即乳香。麝用当门子，另研，最后才入。',
    },
    {
      original: '右捣罗为末，炼蜜和匀，捻作鸡头大，贮瓷器，旋取爇之',
      text: '捣成细粉筛过，炼蜜拌匀，搓成芡实那么大的丸。油纸封好放瓷罐，随时取出点燃。',
    },
  ],
  xiaofenji: [
    {
      original: '栈香一两，檀香半两，降真香一钱',
      text: '原方栈香 40 克、檀香 20 克、降真 4 克。试作按十分之一：栈 4 克、檀 2 克、降真 0.4 克。',
    },
    {
      original: '樟脑半两（飞过）',
      text: '原方 20 克，极烈，试作 2 克。研细，用纸包着抖下细粉，粗渣不要。不可充龙脑。',
    },
    {
      original: '麸炭三两',
      text: '原方 120 克，试作 12 克。过筛细末，只助燃、挂灰，几乎无香。',
    },
    {
      original: '右以生蜜或熟蜜和匀，磁盒盛，地埋一月，取烧之',
      text: '蜜拌匀，装瓷盒封好，埋在阴凉处满一个月。取出捏小块点燃。',
    },
  ],
  sishi: [
    {
      original: '茴香一钱半，丁香一钱半，零陵香五钱，檀香八钱，甘松一两',
      text: '茴、丁各 6 克，零陵 20 克，檀香 32 克，甘松 40 克。量不大，可按原方称，也可再减半。茴香略炒。',
    },
    {
      original: '脑麝少许另研',
      text: '原书只写少许，不折克。龙脑、麝香各几小粒，另研，最后拌。',
    },
    {
      original: '右为末，炼蜜和剂作饼，用铅粉黄为衣焚之',
      text: '炼蜜拌匀捏饼。原方裹铅粉，有毒，本典不作。阴干后直接点燃即可。',
    },
  ],
}
