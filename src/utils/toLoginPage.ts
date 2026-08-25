type ToLoginPageFn = {
  (options?: { mode?: 'navigateTo' | 'reLaunch', queryString?: string }): void
  flush: () => void
  cancel: () => void
}

/** 一期无登录。模板若仍调用，不得跳页。 */
export const toLoginPage: ToLoginPageFn = Object.assign(
  function toLoginPage(_options?: { mode?: 'navigateTo' | 'reLaunch', queryString?: string }) {},
  { flush() {}, cancel() {} },
)
