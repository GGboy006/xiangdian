<script lang="ts" setup>
import { getSource, listSources } from '@/data/catalog'
import { shareHome } from '@/utils/share'

defineOptions({ name: 'SourceIndex' })
definePage({
  style: {
    navigationBarTitleText: '出处',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
    enableShareAppMessage: true,
    enableShareTimeline: true,
  },
})

onShareAppMessage(() => shareHome())
onShareTimeline(() => shareHome())

const currentId = ref('')
const list = listSources()
const current = computed(() => currentId.value ? getSource(currentId.value) : undefined)

onLoad((query) => {
  currentId.value = String(query?.id || '')
  if (current.value) {
    uni.setNavigationBarTitle({ title: current.value.title })
  }
})
</script>

<template>
  <view class="page xd-page">
    <view class="title">
      关于本典
    </view>
    <view class="body">
      《香典》合《香乘》《香谱》《陈氏香谱》三书之公有领域记载，供查阅香材与香方。白话说明为自撰，不收录今人译注、手绘图与出版社专有编排。
    </view>
    <view class="body">
      分两按本典尺折成克，页上写明不充古秤。制法上为原文摘句，下为今语，供跟着做。原书只写少许、粒数的，不编克数。
    </view>

    <view v-for="item in list" :key="item.id" class="book" :class="{ 'is-on': current?.id === item.id }">
      <view class="book__name">
        {{ item.dynasty }} · {{ item.title }}
      </view>
      <view class="book__author">
        {{ item.author }}
      </view>
      <view class="book__note">
        {{ item.note }}
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.title {
  font-size: 48rpx;
  letter-spacing: 0.28em;
}

.body {
  margin-top: 24rpx;
  color: var(--xd-ink-soft);
  font-size: 28rpx;
}

.book {
  margin-top: 48rpx;
  padding-top: 28rpx;
  border-top: 1rpx solid var(--xd-rule);
}

.book.is-on .book__name {
  color: var(--xd-seal);
}

.book__name {
  font-size: 34rpx;
  letter-spacing: 0.12em;
}

.book__author {
  margin-top: 8rpx;
  color: var(--xd-wood);
  font-size: 24rpx;
}

.book__note {
  margin-top: 12rpx;
  color: var(--xd-ink-soft);
  font-size: 26rpx;
}
</style>
