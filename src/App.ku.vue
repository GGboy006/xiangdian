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
  // 微信 custom:true 后禁止 hideTabBar；App/H5 仍要藏原生栏
  // #ifndef MP-WEIXIN
  if (needHideNativeTabbar) {
    uni.hideTabBar({ animation: false })
  }
  // #endif
})
</script>

<template>
  <view>
    <KuRootView />
    <FgTabbar v-if="customTabbarEnable && isCurrentPageTabbar" />
  </view>
</template>
