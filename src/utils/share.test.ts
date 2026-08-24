import { describe, expect, it } from 'vitest'
import { shareFormula, shareHome, shareMaterial } from './share'

describe('share', () => {
  it('首页转发落到典', () => {
    expect(shareHome().path).toBe('/pages/canon/index')
  })

  it('香材转发带 id', () => {
    const payload = shareMaterial('龙脑', 'longnao')
    expect(payload.title).toBe('龙脑 · 香典')
    expect(payload.path).toBe('/pages-sub/material/detail?id=longnao')
  })

  it('香方转发带 id', () => {
    const payload = shareFormula('江南李王帐中香', 'zhangzhong')
    expect(payload.path).toContain('id=zhangzhong')
  })
})
