<script lang="ts" setup>
import type { FormulaUse } from '@/types/canon'
import FormulaSlip from '@/components/formula-slip/formula-slip.vue'
import { listFormulas } from '@/data/catalog'
import { FORMULA_USE_LABEL } from '@/types/canon'

defineOptions({ name: 'FormulasIndex' })
definePage({
  style: {
    navigationBarTitleText: '香方',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})

const uses: Array<FormulaUse | undefined> = [undefined, 'burn', 'fumigate', 'wear', 'anoint', 'seal']
const current = ref<FormulaUse>()
const list = computed(() => listFormulas(current.value))

function labelOf(use?: FormulaUse) {
  return use ? FORMULA_USE_LABEL[use] : '全部'
}
</script>

<template>
  <view class="page">
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
    <FormulaSlip v-for="formula in list" :key="formula.id" :formula="formula" />
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: 12rpx 48rpx 80rpx;
  background: var(--xd-paper);
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
