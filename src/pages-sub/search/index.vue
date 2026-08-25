<script lang="ts" setup>
import type { SearchHit } from '@/data/catalog'
import { searchCatalog } from '@/data/catalog'
import { openFormula, openMaterial } from '@/utils/canon-nav'
import { shareHome } from '@/utils/share'

defineOptions({ name: 'SearchIndex' })
definePage({
  style: {
    navigationBarTitleText: '检索',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})

onShareAppMessage(() => shareHome())
onShareTimeline(() => shareHome())

type SearchScope = 'all' | 'material' | 'formula'

const keyword = ref('')
const hits = ref<SearchHit[]>([])
const scope = ref<SearchScope>('all')
const scopes: SearchScope[] = ['all', 'material', 'formula']

const materials = computed(() => hits.value.filter(item => item.kind === 'material'))
const formulas = computed(() => hits.value.filter(item => item.kind === 'formula'))
const showMaterials = computed(() => scope.value !== 'formula')
const showFormulas = computed(() => scope.value !== 'material')
const visibleCount = computed(() => {
  const n = (showMaterials.value ? materials.value.length : 0)
    + (showFormulas.value ? formulas.value.length : 0)
  return n
})

function scopeLabel(item: SearchScope) {
  if (item === 'material')
    return `香材 ${materials.value.length}`
  if (item === 'formula')
    return `香方 ${formulas.value.length}`
  return `全部 ${hits.value.length}`
}

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

function emptyText() {
  if (scope.value === 'material')
    return '此字下无香材。可换别名再寻。'
  if (scope.value === 'formula')
    return '此字下无香方。可换用途或入方香材再寻。'
  return '典中未载。可换别名再寻。'
}

onLoad((query) => {
  const q = decodeURIComponent(String(query?.q || ''))
  if (q)
    runSearch(q)
})
</script>

<template>
  <view class="page xd-page">
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

    <view v-if="keyword" class="filters">
      <text
        v-for="item in scopes"
        :key="item"
        class="filters__item"
        :class="{ 'is-on': scope === item }"
        @click="scope = item"
      >
        {{ scopeLabel(item) }}
      </text>
    </view>

    <view v-if="keyword && !visibleCount" class="empty">
      {{ emptyText() }}
    </view>

    <view v-if="keyword && showMaterials && materials.length" class="block">
      <view class="block__label">
        香材
      </view>
      <view
        v-for="hit in materials"
        :key="`m-${hit.id}`"
        class="hit"
        @click="openHit(hit)"
      >
        <view class="hit__name">
          {{ hit.name }}
        </view>
        <view class="hit__sub">
          {{ hit.subtitle }}
        </view>
      </view>
    </view>

    <view v-if="keyword && showFormulas && formulas.length" class="block">
      <view class="block__label">
        香方
      </view>
      <view
        v-for="hit in formulas"
        :key="`f-${hit.id}`"
        class="hit"
        @click="openHit(hit)"
      >
        <view class="hit__name">
          {{ hit.name }}
        </view>
        <view class="hit__sub">
          {{ hit.subtitle }}
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.page {
  padding-top: 12rpx;
}

.search {
  padding: 16rpx 0 8rpx;
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

.filters {
  display: flex;
  gap: 32rpx;
  padding: 24rpx 0 8rpx;
  color: var(--xd-smoke);
  font-size: 24rpx;
  letter-spacing: 0.16em;
}

.filters__item.is-on {
  color: var(--xd-seal);
  border-bottom: 1rpx solid var(--xd-seal);
}

.block {
  margin-top: 12rpx;
}

.block__label {
  padding: 28rpx 0 8rpx;
  color: var(--xd-wood);
  font-size: 22rpx;
  letter-spacing: 0.28em;
}

.hit {
  padding: 28rpx 0;
  border-bottom: 1rpx solid var(--xd-rule);
}

.hit__name {
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
