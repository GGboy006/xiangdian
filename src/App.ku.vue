<script setup lang="ts">
import { ref } from 'vue'
import FgTabbar from '@/tabbar/index.vue'
import { customTabbarEnable, needHideNativeTabbar } from '@/tabbar/config'
import { isPageTabbar, tabbarStore } from './tabbar/store'
import { currRoute } from './utils'

const isCurrentPageTabbar = ref(true)
onShow(() => {
  const { path } = currRoute()
  if (path === '/') {
    isCurrentPageTabbar.value = true
  }
  else {
    isCurrentPageTabbar.value = isPageTabbar(path)
  }
  tabbarStore.syncCurIdxByCurrentPage()
  if (needHideNativeTabbar) {
    uni.hideTabBar({ animation: false })
  }
})
</script>

<template>
  <view>
    <KuRootView />
    <FgTabbar v-if="customTabbarEnable && isCurrentPageTabbar" />
  </view>
</template>
