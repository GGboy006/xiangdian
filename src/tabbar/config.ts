import type { TabBar } from '@uni-helper/vite-plugin-uni-pages'
import type { CustomTabBarItem, NativeTabBarItem } from './types'

export const TABBAR_STRATEGY_MAP = {
  NO_TABBAR: 0,
  NATIVE_TABBAR: 1,
  CUSTOM_TABBAR: 2,
}

export const selectedTabbarStrategy = TABBAR_STRATEGY_MAP.CUSTOM_TABBAR

export const nativeTabbarList: NativeTabBarItem[] = [
  {
    iconPath: 'static/tabbar/canon.png',
    selectedIconPath: 'static/tabbar/canon-on.png',
    pagePath: 'pages/canon/index',
    text: '典',
  },
  {
    iconPath: 'static/tabbar/materials.png',
    selectedIconPath: 'static/tabbar/materials-on.png',
    pagePath: 'pages/materials/index',
    text: '材',
  },
  {
    iconPath: 'static/tabbar/formulas.png',
    selectedIconPath: 'static/tabbar/formulas-on.png',
    pagePath: 'pages/formulas/index',
    text: '方',
  },
  {
    iconPath: 'static/tabbar/satchel.png',
    selectedIconPath: 'static/tabbar/satchel-on.png',
    pagePath: 'pages/satchel/index',
    text: '笈',
  },
]

export const customTabbarList: CustomTabBarItem[] = [
  {
    text: '典',
    pagePath: 'pages/canon/index',
    iconType: 'unocss',
    icon: 'i-carbon-home',
  },
  {
    text: '材',
    pagePath: 'pages/materials/index',
    iconType: 'unocss',
    icon: 'i-carbon-home',
  },
  {
    text: '方',
    pagePath: 'pages/formulas/index',
    iconType: 'unocss',
    icon: 'i-carbon-menu',
  },
  {
    text: '笈',
    pagePath: 'pages/satchel/index',
    iconType: 'unocss',
    icon: 'i-carbon-user',
  },
]

export const tabbarCacheEnable
  = [TABBAR_STRATEGY_MAP.NATIVE_TABBAR, TABBAR_STRATEGY_MAP.CUSTOM_TABBAR].includes(selectedTabbarStrategy)

export const customTabbarEnable = [TABBAR_STRATEGY_MAP.CUSTOM_TABBAR].includes(selectedTabbarStrategy)

export const needHideNativeTabbar = selectedTabbarStrategy === TABBAR_STRATEGY_MAP.CUSTOM_TABBAR

export const tabbarList = customTabbarEnable ? customTabbarList : nativeTabbarList

const _tabbar: TabBar = {
  custom: selectedTabbarStrategy === TABBAR_STRATEGY_MAP.CUSTOM_TABBAR,
  color: '#8A7E6E',
  selectedColor: '#A63D2F',
  backgroundColor: '#F4EDE0',
  borderStyle: 'white',
  height: '50px',
  fontSize: '12px',
  iconWidth: '24px',
  spacing: '3px',
  // 微信自定义栏仍要求 list 带图标路径，实际界面只画四字
  list: nativeTabbarList as unknown as TabBar['list'],
}

export const tabBar = tabbarCacheEnable ? _tabbar : {}
