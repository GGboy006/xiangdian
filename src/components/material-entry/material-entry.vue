<script lang="ts" setup>
import type { Material } from '@/types/canon'
import { MATERIAL_CATEGORY_LABEL } from '@/types/canon'
import { openMaterial } from '@/utils/canon-nav'

const props = defineProps<{
  material: Material
  compact?: boolean
}>()

function handleOpen() {
  openMaterial(props.material.id)
}
</script>

<template>
  <view class="entry" :class="{ 'entry--compact': compact }" @click="handleOpen">
    <view class="entry__name">
      {{ material.name }}
    </view>
    <view class="entry__meta">
      <text>{{ MATERIAL_CATEGORY_LABEL[material.category] }}</text>
      <text v-if="material.aliases.length">{{ material.aliases[0] }}</text>
    </view>
    <view v-if="!compact" class="entry__summary">
      {{ material.summary }}
    </view>
  </view>
</template>

<style scoped lang="scss">
.entry {
  padding: 36rpx 0;
  border-bottom: 1rpx solid var(--xd-rule);
}

.entry--compact {
  padding: 24rpx 0;
}

.entry__name {
  font-size: 40rpx;
  letter-spacing: 0.16em;
}

.entry__meta {
  margin-top: 8rpx;
  display: flex;
  gap: 20rpx;
  color: var(--xd-smoke);
  font-size: 22rpx;
  letter-spacing: 0.08em;
}

.entry__summary {
  margin-top: 16rpx;
  color: var(--xd-ink-soft);
  font-size: 26rpx;
}
</style>
