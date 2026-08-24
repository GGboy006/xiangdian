<script lang="ts" setup>
import type { MaterialCategory } from '@/types/canon'
import MaterialEntry from '@/components/material-entry/material-entry.vue'
import { listMaterials } from '@/data/catalog'
import { MATERIAL_CATEGORY_LABEL } from '@/types/canon'
import { shareHome } from '@/utils/share'

defineOptions({ name: 'MaterialsIndex' })
definePage({
  style: {
    navigationBarTitleText: '香材',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
    enableShareAppMessage: true,
    enableShareTimeline: true,
  },
})

onShareAppMessage(() => shareHome())
onShareTimeline(() => shareHome())

const categories: Array<MaterialCategory | undefined> = [undefined, 'wood', 'herb', 'resin', 'animal']
const current = ref<MaterialCategory>()
const list = computed(() => listMaterials(current.value))

function labelOf(category?: MaterialCategory) {
  return category ? MATERIAL_CATEGORY_LABEL[category] : '全部'
}
</script>

<template>
  <view class="page xd-page xd-page--tab">
    <view class="filters">
      <text
        v-for="item in categories"
        :key="item || 'all'"
        class="filters__item"
        :class="{ 'is-on': current === item }"
        @click="current = item"
      >
        {{ labelOf(item) }}
      </text>
    </view>
    <MaterialEntry v-for="material in list" :key="material.id" :material="material" />
  </view>
</template>

<style scoped lang="scss">
.page {
  padding-top: 12rpx;
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
</style>
