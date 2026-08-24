<script lang="ts" setup>
import FormulaSlip from '@/components/formula-slip/formula-slip.vue'
import SourceSeal from '@/components/source-seal/source-seal.vue'
import { getMaterial, listFormulasByMaterial } from '@/data/catalog'
import { MATERIAL_CATEGORY_LABEL } from '@/types/canon'

defineOptions({ name: 'MaterialDetail' })
definePage({
  style: {
    navigationBarTitleText: '香材',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
  },
})

const material = ref(getMaterial('chenxiang'))
const related = computed(() => material.value ? listFormulasByMaterial(material.value.id) : [])

onLoad((query) => {
  material.value = getMaterial(String(query?.id || ''))
  if (material.value) {
    uni.setNavigationBarTitle({ title: material.value.name })
  }
})
</script>

<template>
  <view v-if="material" class="page">
    <view class="name">
      {{ material.name }}
    </view>
    <view v-if="material.aliases.length" class="aliases">
      {{ material.aliases.join('  ·  ') }}
    </view>
    <SourceSeal :source-id="material.sourceId" :juan="material.juan" />

    <view class="block">
      <view class="label">
        部类
      </view>
      <view class="body">
        {{ MATERIAL_CATEGORY_LABEL[material.category] }} · {{ material.nature }}
      </view>
    </view>
    <view class="block">
      <view class="label">
        产地
      </view>
      <view class="body">
        {{ material.origin }}
      </view>
    </view>
    <view class="block">
      <view class="label">
        炮制
      </view>
      <view class="body">
        {{ material.prep }}
      </view>
    </view>
    <view class="block">
      <view class="label">
        真伪
      </view>
      <view class="body">
        {{ material.authenticity }}
      </view>
    </view>
    <view class="block">
      <view class="label">
        识
      </view>
      <view class="body">
        {{ material.summary }}
      </view>
    </view>

    <view class="block">
      <view class="label">
        入方
      </view>
      <FormulaSlip v-for="item in related" :key="item.id" :formula="item" compact />
      <view v-if="!related.length" class="empty">
        典中暂无含此香之方。
      </view>
    </view>
  </view>
  <view v-else class="page empty">
    典中未载此香。
  </view>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: 40rpx 48rpx 80rpx;
  background: var(--xd-paper);
}

.name {
  font-size: 64rpx;
  letter-spacing: 0.28em;
}

.aliases {
  margin: 12rpx 0 20rpx;
  color: var(--xd-smoke);
  font-size: 24rpx;
}

.block {
  margin-top: 44rpx;
}

.label {
  color: var(--xd-wood);
  font-size: 22rpx;
  letter-spacing: 0.36em;
}

.body {
  margin-top: 12rpx;
  font-size: 28rpx;
  color: var(--xd-ink-soft);
}

.empty {
  margin-top: 20rpx;
  color: var(--xd-smoke);
  font-size: 26rpx;
}
</style>
