<script setup lang="ts">
import type { CustomTabBarItem } from './types'

defineProps<{
  item: CustomTabBarItem
  index: number
  isBulge?: boolean
}>()
</script>

<template>
  <view class="flex flex-col items-center justify-center">
    <view v-if="!isBulge" class="tab-char">
      {{ item.text }}
    </view>
    <!-- 角标显示 -->
    <view v-if="item.badge">
      <template v-if="item.badge === 'dot'">
        <view class="absolute right-0 top-0 h-2 w-2 rounded-full bg-#f56c6c" />
      </template>
      <template v-else>
        <view class="absolute top-0 box-border h-5 min-w-5 center rounded-full bg-#f56c6c px-1 text-center text-xs text-white -right-3">
          {{ item.badge > 99 ? '99+' : item.badge }}
        </view>
      </template>
    </view>
  </view>
</template>

<style scoped lang="scss">
.tab-char {
  font-size: 30rpx;
  letter-spacing: 0.2em;
  line-height: 1;
}
</style>
