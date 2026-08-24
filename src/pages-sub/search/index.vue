<script lang="ts" setup>
import type { SearchHit } from '@/data/catalog'
import { searchCatalog } from '@/data/catalog'
import { openFormula, openMaterial } from '@/utils/canon-nav'

defineOptions({ name: 'SearchIndex' })
definePage({
  style: {
    navigationBarTitleText: '检索',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})

const keyword = ref('')
const hits = ref<SearchHit[]>([])

function runSearch(value = keyword.value) {
  keyword.value = value
  hits.value = searchCatalog(value)
}

function openHit(hit: SearchHit) {
  if (hit.kind === 'material')
    openMaterial(hit.id)
  else
    openFormula(hit.id)
}

onLoad((query) => {
  const q = decodeURIComponent(String(query?.q || ''))
  if (q)
    runSearch(q)
})
</script>

<template>
  <view class="page">
    <view class="search">
      <input
        v-model="keyword"
        class="search__input"
        type="text"
        confirm-type="search"
        focus
        placeholder="香材、香方、别名、用途"
        placeholder-class="search__placeholder"
        @confirm="runSearch()"
        @input="runSearch()"
      >
    </view>

    <view v-if="keyword && !hits.length" class="empty">
      典中未载。可换别名再寻。
    </view>

    <view v-for="hit in hits" :key="`${hit.kind}-${hit.id}`" class="hit" @click="openHit(hit)">
      <view class="hit__kind">
        {{ hit.kind === 'material' ? '香材' : '香方' }}
      </view>
      <view class="hit__name">
        {{ hit.name }}
      </view>
      <view class="hit__sub">
        {{ hit.subtitle }}
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: 12rpx 48rpx 80rpx;
  background: var(--xd-paper);
}

.search {
  padding: 16rpx 0 24rpx;
  border-bottom: 1rpx solid var(--xd-wood);
}

.search__input {
  height: 72rpx;
  font-size: 30rpx;
  color: var(--xd-ink);
}

.search__placeholder {
  color: var(--xd-smoke);
}

.hit {
  padding: 32rpx 0;
  border-bottom: 1rpx solid var(--xd-rule);
}

.hit__kind {
  color: var(--xd-seal);
  font-size: 20rpx;
  letter-spacing: 0.24em;
}

.hit__name {
  margin-top: 6rpx;
  font-size: 34rpx;
  letter-spacing: 0.12em;
}

.hit__sub {
  margin-top: 6rpx;
  color: var(--xd-smoke);
  font-size: 24rpx;
}

.empty {
  margin-top: 48rpx;
  color: var(--xd-smoke);
  font-size: 26rpx;
}
</style>
