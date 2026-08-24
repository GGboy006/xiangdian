<script lang="ts" setup>
import type { FormulaStep } from '@/types/canon'
import SourceSeal from '@/components/source-seal/source-seal.vue'
import { getFormula, getMaterial } from '@/data/catalog'
import { FORMULA_USE_LABEL } from '@/types/canon'
import { openMaterial } from '@/utils/canon-nav'
import { shareFormula, shareHome } from '@/utils/share'
import { SCALE_NOTE, formatGrams, sumIngredientGrams } from '@/utils/scale'

defineOptions({ name: 'FormulaDetail' })
definePage({
  style: {
    navigationBarTitleText: '香方',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
    enableShareAppMessage: true,
    enableShareTimeline: true,
  },
})

const STEP_MARKS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

const formula = ref(getFormula('zhangzhong'))

const rows = computed(() => {
  if (!formula.value)
    return []
  return formula.value.ingredients.map((item) => {
    const material = getMaterial(item.materialId)
    return {
      ...item,
      name: material?.name || '未载',
    }
  })
})

const hasScale = computed(() => rows.value.some(item => item.grams != null))
const weighedGrams = computed(() => sumIngredientGrams(rows.value))
const steps = computed<FormulaStep[]>(() => {
  if (!formula.value)
    return []
  if (formula.value.steps?.length)
    return formula.value.steps
  return [{ text: formula.value.method }]
})

onLoad((query) => {
  formula.value = getFormula(String(query?.id || ''))
  if (formula.value) {
    uni.setNavigationBarTitle({ title: formula.value.name })
  }
})

onShareAppMessage(() => {
  return formula.value
    ? shareFormula(formula.value.name, formula.value.id)
    : shareHome()
})

onShareTimeline(() => {
  if (!formula.value)
    return shareHome()
  const payload = shareFormula(formula.value.name, formula.value.id)
  return { title: payload.title, query: payload.query }
})

function markOf(index: number) {
  return STEP_MARKS[index] || String(index + 1)
}
</script>

<template>
  <view v-if="formula" class="page xd-page">
    <view class="use">
      {{ FORMULA_USE_LABEL[formula.use] }}
    </view>
    <view class="name">
      {{ formula.name }}
    </view>
    <view v-if="formula.pattern" class="pattern">
      {{ formula.pattern }}
    </view>
    <view v-else-if="formula.aliases.length" class="aliases">
      {{ formula.aliases.join('  ·  ') }}
    </view>
    <SourceSeal :source-id="formula.sourceId" :juan="formula.juan" />
    <view v-if="hasScale" class="scale">
      {{ SCALE_NOTE }}
    </view>

    <view class="lead">
      {{ formula.summary }}
    </view>

    <view class="block">
      <view class="label">
        原方用料
      </view>
      <view class="sheet">
        <view class="sheet__head">
          <text class="col-name">
            香材
          </text>
          <text class="col-amt">
            原方
          </text>
          <text v-if="hasScale" class="col-g">
            本典
          </text>
        </view>
        <view
          v-for="row in rows"
          :key="row.materialId"
          class="sheet__row"
          @click="openMaterial(row.materialId)"
        >
          <view class="col-name">
            <text class="row-name">
              {{ row.name }}
            </text>
            <text v-if="row.note" class="row-note">
              {{ row.note }}
            </text>
          </view>
          <text class="col-amt">
            {{ row.amount }}
          </text>
          <text v-if="hasScale" class="col-g">
            {{ row.grams != null ? formatGrams(row.grams) : '—' }}
          </text>
        </view>
      </view>
      <view v-if="hasScale && weighedGrams" class="weighed">
        可称部分合计 {{ formatGrams(weighedGrams) }}。浸剂不计入。
      </view>
    </view>

    <view class="block">
      <view class="label">
        制法
      </view>
      <view class="hint">
        上为原文，下为今语。有实拍则配图。
      </view>
      <view
        v-for="(step, index) in steps"
        :key="index"
        class="step"
      >
        <text class="step__mark">
          {{ markOf(index) }}
        </text>
        <view class="step__body">
          <view v-if="step.original" class="step__original">
            {{ step.original }}
          </view>
          <view class="step__text">
            {{ step.text }}
          </view>
        </view>
      </view>
    </view>

    <view class="block">
      <view class="label">
        用法
      </view>
      <view class="body">
        {{ formula.usage }}
      </view>
    </view>

    <view v-if="formula.original" class="block cite">
      <view class="label">
        原文
      </view>
      <view class="cite__body">
        {{ formula.original }}
      </view>
    </view>
  </view>
  <view v-else class="page xd-page empty">
    典中未载此方。
  </view>
</template>

<style scoped lang="scss">
.use {
  color: var(--xd-seal);
  font-size: 22rpx;
  letter-spacing: 0.32em;
}

.name {
  margin-top: 12rpx;
  font-size: 52rpx;
  letter-spacing: 0.14em;
  line-height: 1.35;
}

.pattern,
.aliases {
  margin: 12rpx 0 20rpx;
  color: var(--xd-smoke);
  font-size: 24rpx;
  letter-spacing: 0.18em;
}

.scale {
  margin-top: 16rpx;
  color: var(--xd-wood);
  font-size: 22rpx;
  letter-spacing: 0.06em;
}

.lead {
  margin-top: 40rpx;
  font-size: 28rpx;
  color: var(--xd-ink-soft);
}

.block {
  margin-top: 56rpx;
}

.label {
  color: var(--xd-wood);
  font-size: 22rpx;
  letter-spacing: 0.36em;
}

.sheet {
  margin-top: 8rpx;
}

.sheet__head,
.sheet__row {
  display: flex;
  align-items: baseline;
  gap: 16rpx;
  padding: 22rpx 0;
  border-bottom: 1rpx solid var(--xd-rule);
}

.sheet__head {
  padding-bottom: 12rpx;
  color: var(--xd-smoke);
  font-size: 20rpx;
  letter-spacing: 0.2em;
}

.col-name {
  flex: 1;
  min-width: 0;
}

.col-amt {
  width: 200rpx;
  text-align: right;
  font-size: 24rpx;
  color: var(--xd-ink-soft);
}

.col-g {
  width: 120rpx;
  text-align: right;
  font-size: 24rpx;
  color: var(--xd-ink);
}

.row-name {
  font-size: 30rpx;
  letter-spacing: 0.12em;
}

.row-note {
  display: block;
  margin-top: 6rpx;
  color: var(--xd-smoke);
  font-size: 22rpx;
}

.weighed {
  margin-top: 16rpx;
  color: var(--xd-smoke);
  font-size: 22rpx;
}

.step {
  display: flex;
  gap: 20rpx;
  margin-top: 36rpx;
  align-items: flex-start;
}

.step__mark {
  width: 40rpx;
  color: var(--xd-seal);
  font-size: 24rpx;
  letter-spacing: 0.12em;
  line-height: 1.7;
}

.step__text {
  margin-top: 10rpx;
  font-size: 30rpx;
  color: var(--xd-ink);
  line-height: 1.75;
}

.body {
  margin-top: 16rpx;
  font-size: 28rpx;
  color: var(--xd-ink-soft);
}

.cite__body {
  margin-top: 16rpx;
  padding-left: 20rpx;
  border-left: 2rpx solid var(--xd-rule);
  color: var(--xd-smoke);
  font-size: 24rpx;
  line-height: 1.85;
}

.empty {
  color: var(--xd-smoke);
  font-size: 26rpx;
}
</style>
