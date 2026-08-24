export interface SharePayload {
  title: string
  path: string
  query?: string
}

export function shareHome(): SharePayload {
  return {
    title: '香典 · 香材与香方手册',
    path: '/pages/canon/index',
  }
}

export function shareMaterial(name: string, id: string): SharePayload {
  return {
    title: `${name} · 香典`,
    path: `/pages-sub/material/detail?id=${id}`,
    query: `id=${id}`,
  }
}

export function shareFormula(name: string, id: string): SharePayload {
  return {
    title: `${name} · 香典`,
    path: `/pages-sub/formula/detail?id=${id}`,
    query: `id=${id}`,
  }
}

export const sharePageStyle = {
  enableShareAppMessage: true,
  enableShareTimeline: true,
}
