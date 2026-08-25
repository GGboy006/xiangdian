import { describe, expect, it } from 'vitest'
import { toLoginPage } from './toLoginPage'

describe('toLoginPage', () => {
  it('一期不跳登录页', () => {
    toLoginPage()
    toLoginPage({ mode: 'reLaunch' })
    toLoginPage.flush()
    expect(uni.navigateTo).not.toHaveBeenCalled()
    expect(uni.reLaunch).not.toHaveBeenCalled()
  })
})
