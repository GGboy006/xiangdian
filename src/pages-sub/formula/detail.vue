<script lang="ts" setup>
import SourceSeal from '@/components/source-seal/source-seal.vue'
import { getFormula, getMaterial } from '@/data/catalog'
import { FORMULA_USE_LABEL } from '@/types/canon'
import { openMaterial } from '@/utils/canon-nav'

defineOptions({ name: 'FormulaDetail' })
definePage({
  style: {
    navigationBarTitleText: '香方',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})

const formula = ref(getFormula('zhangzhong'))

const rows = computed(() => {
  if (!formula.value)
    return []
  return formula.value.ingredients.map((item) => {
    const material = getMaterial(item.materialId)
    return {
      ...item,
      name: material?.name || '未载',
    }
  })
})

onLoad((query) => {
  formula.value = getFormula(String(query?.id || ''))
  if (formula.value) {
    uni.setNavigationBarTitle({ title: formula.value.name })
  }
})
</script>

<template>
  <view v-if="formula" class="page">
    <view class="use">
      {{ FORMULA_USE_LABEL[formula.use] }}
    </view>
    <view class="name">
      {{ formula.name }}
    </view>
    <view v-if="formula.aliases.length" class="aliases">
      {{ formula.aliases.join('  ·  ') }}
    </view>
    <SourceSeal :source-id="formula.sourceId" :juan="formula.juan" />

    <view class="lead">
      {{ formula.summary }}
    </view>

    <view class="block">
      <view class="label">
        配方
      </view>
      <view v-for="row in rows" :key="row.materialId" class="row" @click="openMaterial(row.materialId)">
        <text class="row__name">
          {{ row.name }}
        </text>
        <text class="row__amount">
          {{ row.amount }}
        </text>
        <text v-if="row.note" class="row__note">
          {{ row.note }}
        </text>
      </view>
    </view>

    <view class="block">
      <view class="label">
        制法
      </view>
      <view class="body">
        {{ formula.method }}
      </view>
    </view>

    <view class="block">
      <view class="label">
        用法
      </view>
      <view class="body">
        {{ formula.usage }}
      </view>
    </view>
  </view>
  <view v-else class="page empty">
    典中未载此方。
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: 40rpx 48rpx 80rpx;
  background: var(--xd-paper);
}

.use {
  color: var(--xd-seal);
  font-size: 22rpx;
  letter-spacing: 0.28em;
}

.name {
  margin-top: 8rpx;
  font-size: 52rpx;
  letter-spacing: 0.16em;
}

.aliases {
  margin: 12rpx 0 20rpx;
  color: var(--xd-smoke);
  font-size: 24rpx;
}

.lead {
  margin-top: 36rpx;
  font-size: 28rpx;
  color: var(--xd-ink-soft);
}

.block {
  margin-top: 48rpx;
}

.label {
  color: var(--xd-wood);
  font-size: 22rpx;
  letter-spacing: 0.36em;
}

.row {
  display: flex;
  align-items: baseline;
  gap: 16rpx;
  padding: 22rpx 0;
  border-bottom: 1rpx solid var(--xd-rule);
}

.row__name {
  font-size: 30rpx;
  letter-spacing: 0.12em;
}

.row__amount,
.row__note {
  color: var(--xd-smoke);
  font-size: 24rpx;
}

.body {
  margin-top: 12rpx;
  font-size: 28rpx;
  color: var(--xd-ink-soft);
}

.empty {
  color: var(--xd-smoke);
  font-size: 26rpx;
}
</style>
