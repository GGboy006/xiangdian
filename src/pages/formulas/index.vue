<script lang="ts" setup>
import type { FormulaLayer, FormulaUse } from '@/types/canon'
import FormulaSlip from '@/components/formula-slip/formula-slip.vue'
import { listFormulas } from '@/data/catalog'
import { FORMULA_LAYER_LABEL, FORMULA_USE_LABEL } from '@/types/canon'
import { shareHome } from '@/utils/share'

defineOptions({ name: 'FormulasIndex' })
definePage({
  style: {
    navigationBarTitleText: '香方',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})

onShareAppMessage(() => shareHome())
onShareTimeline(() => shareHome())

const uses: Array<FormulaUse | undefined> = [undefined, 'burn', 'fumigate', 'wear', 'anoint', 'seal']
const layers: Array<FormulaLayer | undefined> = [undefined, 'canon', 'reviewed', 'web', 'generated']
const current = ref<FormulaUse>()
const layer = ref<FormulaLayer>()
const list = computed(() => listFormulas(current.value, layer.value))

function labelOf(use?: FormulaUse) {
  return use ? FORMULA_USE_LABEL[use] : '全部'
}

function layerOf(item?: FormulaLayer) {
  return item ? FORMULA_LAYER_LABEL[item] : '全部'
}
</script>

<template>
  <view class="page xd-page xd-page--tab">
    <view class="note">
      校勘已核对原文；辑录自资料整理；粗编为自动抽方，功效与适用人群已去掉，不当原文。没有分两的标「只可对照，不可按克做」。
    </view>
    <view class="filters">
      <text
        v-for="item in uses"
        :key="item || 'all'"
        class="filters__item"
        :class="{ 'is-on': current === item }"
        @click="current = item"
      >
        {{ labelOf(item) }}
      </text>
    </view>
    <view class="filters">
      <text
        v-for="item in layers"
        :key="item || 'layer-all'"
        class="filters__item"
        :class="{ 'is-on': layer === item }"
        @click="layer = item"
      >
        {{ layerOf(item) }}
      </text>
    </view>
    <FormulaSlip v-for="formula in list" :key="formula.id" :formula="formula" compact />
  </view>
</template>

<style scoped lang="scss">
.page {
  padding-top: 12rpx;
}

.note {
  padding: 8rpx 0 4rpx;
  color: var(--xd-ink-soft);
  font-size: 22rpx;
  line-height: 1.6;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 28rpx;
  padding: 24rpx 0 8rpx;
  color: var(--xd-smoke);
  font-size: 24rpx;
  letter-spacing: 0.16em;
}

.filters__item.is-on {
  color: var(--xd-seal);
  border-bottom: 1rpx solid var(--xd-seal);
}
</style>
