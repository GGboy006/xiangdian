<script lang="ts" setup>
import type { FormulaStep } from '@/types/canon'

defineProps<{
  step: FormulaStep
  mark: string
}>()
</script>

<template>
  <view class="step">
    <text class="step__mark">
      {{ mark }}
    </text>
    <view class="step__body">
      <view v-if="step.original" class="step__original">
        {{ step.original }}
      </view>
      <view class="step__text">
        {{ step.text }}
      </view>
      <image
        v-if="step.photo"
        class="step__photo"
        :src="step.photo"
        mode="widthFix"
      />
    </view>
  </view>
</template>

<style scoped lang="scss">
.step {
  display: flex;
  gap: 20rpx;
  margin-top: 36rpx;
  align-items: flex-start;
}

.step__mark {
  width: 40rpx;
  color: var(--xd-seal);
  font-size: 24rpx;
  letter-spacing: 0.12em;
  line-height: 1.7;
}

.step__body {
  flex: 1;
  min-width: 0;
}

.step__original {
  color: var(--xd-smoke);
  font-size: 22rpx;
  line-height: 1.7;
}

.step__text {
  margin-top: 10rpx;
  font-size: 30rpx;
  color: var(--xd-ink);
  line-height: 1.75;
}

.step__photo {
  display: block;
  width: 100%;
  margin-top: 16rpx;
}
</style>
