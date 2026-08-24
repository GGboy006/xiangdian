export function openMaterial(id: string) {
  uni.navigateTo({ url: `/pages-sub/material/detail?id=${id}` })
}

export function openFormula(id: string) {
  uni.navigateTo({ url: `/pages-sub/formula/detail?id=${id}` })
}

export function openSearch(keyword = '') {
  const query = keyword ? `?q=${encodeURIComponent(keyword)}` : ''
  uni.navigateTo({ url: `/pages-sub/search/index${query}` })
}

export function openSource(id?: string) {
  const query = id ? `?id=${encodeURIComponent(id)}` : ''
  uni.navigateTo({ url: `/pages-sub/source/index${query}` })
}
