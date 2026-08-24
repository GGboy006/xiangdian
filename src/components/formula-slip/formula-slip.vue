<script lang="ts" setup>
import type { Formula } from '@/types/canon'
import { FORMULA_USE_LABEL } from '@/types/canon'
import { getSource } from '@/data/catalog'
import { openFormula } from '@/utils/canon-nav'

const props = defineProps<{
  formula: Formula
  compact?: boolean
}>()

const source = computed(() => getSource(props.formula.sourceId))

function handleOpen() {
  openFormula(props.formula.id)
}
</script>

<template>
  <view class="slip" :class="{ 'slip--compact': compact }" @click="handleOpen">
    <view class="slip__use">
      {{ FORMULA_USE_LABEL[formula.use] }}
    </view>
    <view class="slip__name">
      {{ formula.name }}
    </view>
    <view v-if="formula.pattern" class="slip__pattern">
      {{ formula.pattern }}
    </view>
    <view v-if="source" class="slip__from">
      {{ source.title }} · {{ formula.juan }}
    </view>
    <view v-if="!compact" class="slip__summary">
      {{ formula.summary }}
    </view>
  </view>
</template>

<style scoped lang="scss">
.slip {
  padding: 36rpx 0 40rpx;
  border-bottom: 1rpx solid var(--xd-rule);
}

.slip--compact {
  padding: 24rpx 0;
}

.slip__use {
  color: var(--xd-seal);
  font-size: 22rpx;
  letter-spacing: 0.24em;
}

.slip__name {
  margin-top: 8rpx;
  font-size: 36rpx;
  letter-spacing: 0.12em;
}

.slip__pattern {
  margin-top: 6rpx;
  color: var(--xd-smoke);
  font-size: 22rpx;
  letter-spacing: 0.16em;
}

.slip__from {
  margin-top: 8rpx;
  color: var(--xd-smoke);
  font-size: 22rpx;
}

.slip__summary {
  margin-top: 16rpx;
  color: var(--xd-ink-soft);
  font-size: 26rpx;
}
</style>
