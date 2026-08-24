<script lang="ts" setup>
import { getSource } from '@/data/catalog'
import { openSource } from '@/utils/canon-nav'

const props = defineProps<{
  sourceId: string
  juan?: string
}>()

const source = computed(() => getSource(props.sourceId))

function handleOpen() {
  openSource(props.sourceId)
}
</script>

<template>
  <view v-if="source" class="source-seal" @click="handleOpen">
    <text class="source-seal__mark">据</text>
    <text class="source-seal__title">{{ source.dynasty }} · {{ source.title }}</text>
    <text v-if="juan" class="source-seal__juan">{{ juan }}</text>
  </view>
</template>

<style scoped lang="scss">
.source-seal {
  display: inline-flex;
  align-items: baseline;
  gap: 10rpx;
  color: var(--xd-seal);
  font-size: 24rpx;
  letter-spacing: 0.12em;
}

.source-seal__mark {
  font-size: 20rpx;
}

.source-seal__title,
.source-seal__juan {
  border-bottom: 1rpx solid #c48a82;
}
</style>
