import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { tabBar } from './src/tabbar/config'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '香典',
    navigationBarBackgroundColor: '#F4EDE0',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F4EDE0',
    enableShareAppMessage: true,
    enableShareTimeline: true,
  },
  easycom: {
    autoscan: true,
    custom: {
      '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  // tabBar 配置见 src/tabbar/config.ts（自定义四字栏）
  tabBar: tabBar as any,
})
