<script lang="ts" setup>
import { openSource } from '@/utils/canon-nav'

defineOptions({ name: 'SatchelIndex' })
definePage({
  style: {
    navigationBarTitleText: '笈',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})
</script>

<template>
  <view class="page">
    <view class="title">
      书囊
    </view>
    <view class="lead">
      一期只供查阅。收藏与批注留待二期。
    </view>

    <view class="item" @click="openSource()">
      <view class="item__name">
        关于本典
      </view>
      <view class="item__desc">
        三书关系、整理原则与版权说明
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: 48rpx 48rpx 80rpx;
  background: var(--xd-paper);
}

.title {
  font-size: 56rpx;
  letter-spacing: 0.36em;
}

.lead {
  margin: 20rpx 0 48rpx;
  color: var(--xd-ink-soft);
  font-size: 26rpx;
}

.item {
  padding: 32rpx 0;
  border-top: 1rpx solid var(--xd-rule);
}

.item__name {
  font-size: 34rpx;
  letter-spacing: 0.12em;
}

.item__desc {
  margin-top: 8rpx;
  color: var(--xd-smoke);
  font-size: 24rpx;
}
</style>
