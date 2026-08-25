<script lang="ts" setup>
import FormulaSlip from '@/components/formula-slip/formula-slip.vue'
import MaterialEntry from '@/components/material-entry/material-entry.vue'
import { todayPicks } from '@/data/catalog'
import { openSearch, openSource } from '@/utils/canon-nav'
import { shareHome } from '@/utils/share'

defineOptions({ name: 'CanonHome' })
definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '香典',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})

onShareAppMessage(() => shareHome())
onShareTimeline(() => shareHome())

const keyword = ref('')
const picks = ref(todayPicks())

onShow(() => {
  picks.value = todayPicks()
})

function handleSearch() {
  openSearch(keyword.value.trim())
}
</script>

<template>
  <view class="page xd-page xd-page--tab">
    <view class="masthead">
      <view class="masthead__title">
        香典
      </view>
      <view class="masthead__sub">
        据《香乘》《香谱》《陈氏香谱》整理
      </view>
    </view>

    <view class="search">
      <input
        v-model="keyword"
        class="search__input"
        type="text"
        confirm-type="search"
        placeholder="检索香材、香方、别名"
        placeholder-class="search__placeholder"
        @confirm="handleSearch"
      >
      <view class="search__go" @click="handleSearch">
        寻
      </view>
    </view>

    <view class="section">
      <view class="section__label">
        今日一味
      </view>
      <MaterialEntry :material="picks.material" />
    </view>

    <view class="section">
      <view class="section__label">
        今日一则
      </view>
      <FormulaSlip :formula="picks.formula" />
    </view>

    <view class="section">
      <view class="section__label">
        三书
      </view>
      <view class="sources" @click="openSource()">
        <text>香乘</text>
        <text>香谱</text>
        <text>陈氏香谱</text>
      </view>
      <view class="hint">
        白话为自撰，不收录今人译注与插图。
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  padding-top: 24rpx;
}

.masthead {
  padding: 48rpx 0 32rpx;
}

.masthead__title {
  font-size: 72rpx;
  letter-spacing: 0.4em;
  line-height: 1.2;
}

.masthead__sub {
  margin-top: 16rpx;
  color: var(--xd-smoke);
  font-size: 24rpx;
  letter-spacing: 0.08em;
}

.search {
  display: flex;
  align-items: center;
  padding: 8rpx 0 32rpx;
  border-bottom: 1rpx solid var(--xd-wood);
}

.search__input {
  flex: 1;
  height: 72rpx;
  font-size: 28rpx;
  color: var(--xd-ink);
}

.search__placeholder {
  color: var(--xd-smoke);
}

.search__go {
  margin-left: 16rpx;
  color: var(--xd-seal);
  font-size: 30rpx;
  letter-spacing: 0.2em;
}

.section {
  margin-top: 48rpx;
}

.section__label {
  color: var(--xd-wood);
  font-size: 22rpx;
  letter-spacing: 0.36em;
}

.sources {
  display: flex;
  justify-content: space-between;
  margin-top: 28rpx;
  color: var(--xd-ink);
  font-size: 30rpx;
  letter-spacing: 0.12em;
}

.hint {
  margin-top: 20rpx;
  color: var(--xd-smoke);
  font-size: 22rpx;
}
</style>
