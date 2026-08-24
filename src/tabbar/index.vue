<script setup lang="ts">
import { customTabbarEnable, needHideNativeTabbar, tabbarCacheEnable } from './config'
import { tabbarList, tabbarStore } from './store'
import TabbarItem from './TabbarItem.vue'

// #ifdef MP-WEIXIN
defineOptions({
  virtualHost: true,
})
// #endif

function handleClick(index: number) {
  if (index === tabbarStore.curIdx && tabbarStore.isCurrentRouteTabbarItem(index)) {
    return
  }
  const list = tabbarList.value
  if (!list[index]) {
    return
  }
  const url = list[index].pagePath
  const prevIdx = tabbarStore.curIdx
  tabbarStore.setCurIdx(index)
  const syncTabbarAfterNavigation = () => {
    tabbarStore.syncCurIdxByCurrentPageAsync()
  }
  const restoreTabbarWhenNavigationFailed = () => {
    tabbarStore.setCurIdx(prevIdx)
  }
  if (tabbarCacheEnable) {
    uni.switchTab({
      url,
      success: syncTabbarAfterNavigation,
      fail: restoreTabbarWhenNavigationFailed,
    })
  }
  else {
    uni.navigateTo({
      url,
      success: syncTabbarAfterNavigation,
      fail: restoreTabbarWhenNavigationFailed,
    })
  }
}

onShow(() => {
  tabbarStore.syncCurIdxByCurrentPage()
  // #ifndef MP-WEIXIN
  needHideNativeTabbar && uni.hideTabBar({ animation: false })
  // #endif
})

function getColorByIndex(index: number) {
  return tabbarStore.curIdx === index ? '#A63D2F' : '#8A7E6E'
}
</script>

<template>
  <view v-if="customTabbarEnable" class="xd-tabbar">
    <view
      v-for="(item, index) in tabbarList"
      :key="item.pagePath"
      class="xd-tabbar__item"
      :style="{ color: getColorByIndex(index) }"
      @click="handleClick(index)"
    >
      <TabbarItem :item="item" :index="index" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.xd-tabbar {
  display: flex;
  align-items: stretch;
  box-sizing: content-box;
  height: 50px;
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--xd-paper, #f4ede0);
  border-top: 1px solid var(--xd-rule, #c4b8a4);
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}

.xd-tabbar__item {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
