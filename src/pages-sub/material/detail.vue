<script lang="ts" setup>
import FormulaSlip from '@/components/formula-slip/formula-slip.vue'
import SourceSeal from '@/components/source-seal/source-seal.vue'
import { getMaterial, listFormulasByMaterial } from '@/data/catalog'
import { MATERIAL_CATEGORY_LABEL } from '@/types/canon'
import { shareHome, shareMaterial } from '@/utils/share'

defineOptions({ name: 'MaterialDetail' })
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

const material = ref(getMaterial('chenxiang'))
const related = computed(() => material.value ? listFormulasByMaterial(material.value.id) : [])

onLoad((query) => {
  material.value = getMaterial(String(query?.id || ''))
  if (material.value) {
    uni.setNavigationBarTitle({ title: material.value.name })
  }
})

onShareAppMessage(() => {
  return material.value
    ? shareMaterial(material.value.name, material.value.id)
    : shareHome()
})

onShareTimeline(() => {
  if (!material.value)
    return shareHome()
  const payload = shareMaterial(material.value.name, material.value.id)
  return { title: payload.title, query: payload.query }
})
</script>

<template>
  <view v-if="material" class="page xd-page">
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
      <view v-if="material.prepSteps?.length" class="hint">
        上为原文，下为今语。有实拍则配图。
      </view>
      <formula-step
        v-for="(step, index) in material.prepSteps"
        :key="index"
        :step="step"
        :mark="['一', '二', '三', '四', '五'][index] || String(index + 1)"
      />
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
  <view v-else class="page xd-page empty">
    典中未载此香。
  </view>
</template>

<style scoped lang="scss">
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
