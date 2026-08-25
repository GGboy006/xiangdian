<script lang="ts" setup>
import { openSource } from '@/utils/canon-nav'
import { shareHome } from '@/utils/share'

defineOptions({ name: 'SatchelIndex' })
definePage({
  style: {
    navigationBarTitleText: '笈',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})

onShareAppMessage(() => shareHome())
onShareTimeline(() => shareHome())
</script>

<template>
  <view class="page xd-page xd-page--tab">
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
        三书、本典尺、古衡对照；校勘、辑录、粗编凡例
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  padding-top: 48rpx;
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
