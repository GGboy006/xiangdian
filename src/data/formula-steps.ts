import type { FormulaStep } from '@/types/canon'

/**
 * 今语步骤覆写。
 * 每步：original 原文摘句（上）+ text 今语做法（下，主文）。
 * 实拍：把图放到 src/static/steps/，photo 填 `/static/steps/帐中香-01.jpg`。
 */
export const formulaStepOverrides: Record<string, FormulaStep[]> = {
  zhangzhong: [
    {
      original: '沉香一两（剉如炷大）',
      text: '称 40 克沉香，锉成大约牙签或灯芯那么粗的小条，不要打成细粉。',
    },
    {
      original: '苏合油（以不津磁器盛）',
      text: '用不会渗油的瓷器或玻璃罐盛苏合油。不要用铜器、铁器。油要能没过沉香。',
    },
    {
      original: '右以香投油，封浸',
      text: '把沉香完全按进油里，盖严封好，记下日期。',
    },
    {
      original: '百日',
      text: '常温放满 100 天。中间不要打开。阴凉避光即可，不必冷藏。',
    },
    {
      original: '爇之。入蔷薇水更佳',
      text: '到期取出，沥去余油，放入香炉点燃。有蔷薇水的话，焚时滴几滴，气味会更润。',
    },
  ],
  huadusi: [
    {
      original: '白檀香五两　沉香一两半',
      text: '原方檀香 200 克、沉香 60 克。第一次可按十分之一：檀香 20 克、沉香 6 克。锉成碎末，不要留大块。',
    },
    {
      original: '苏合香二两',
      text: '原方 80 克，试作 8 克。这是拌进粉里的膏，不是帐中香那种拿来泡沉香的油。',
    },
    {
      original: '甲香一两煑製',
      text: '原方 40 克，试作 4 克。必须先煮制过，闻不到海腥才能用。生用会把整炉带腥。',
    },
    {
      original: '细剉捣末，马尾罗过',
      text: '把沉、檀、甲香捣成细粉，用细筛筛过。粗渣再捣。苏合香软，可另研进粉里。',
    },
    {
      original: '炼蜜',
      text: '白蜜隔水煮到能搓得拢、不稀淌。不要煮焦。谱中「重汤煮一日」是求久存；当天做，煮到去生水气即可。',
    },
    {
      original: '龙脑香半两　麝香半两别研',
      text: '原方各 20 克，试作各 2 克。另研成粉，最后才拌，免得香气先散。麝香烈且贵，还可再减。',
    },
    {
      original: '搜和爇之',
      text: '蜜和香末，软硬能搓团。捏成小饼或丸，阴干半天到一天，放入香炉点燃。此方不必窨百日。',
    },
  ],
}

/** 用法今语。有则盖过谱中文言。 */
export const formulaUsageOverrides: Record<string, string> = {
  zhangzhong: '浸满一百天后取出，炉中点燃。适合卧室、帐中。有蔷薇水可同焚。',
  huadusi: '搓成小饼或丸，阴干半天到一天即可焚。书斋、清供都合适。火要小，免得脑麝先冲。',
}
