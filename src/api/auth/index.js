import service from '..'

/**
 * 登录验证码
 * @param {*} params
 * @returns
 */
export function captchaApi(params) {
  return service({
    url: '/admin/auth/captcha',
    method: 'get',
    params
  })
}
/**
 * 登录
 * @param {*} data
 * @returns
 */
export function loginApi(data) {
  return service({
    url: '/admin/auth/login',
    method: 'post',
    data
  })
}
/**
 * 获取登录管理员信息
 * @param {*} data
 * @returns
 */
export function adminerInfoApi() {
  return service({
    url: '/admin/auth/info',
    method: 'get'
  })
}
/**
 * 获取登录管理员菜单权限
 * @param {*} data
 * @returns
 */
export function adminerMenuApi() {
  return service({
    url: '/admin/auth/menu',
    method: 'get'
  })
}
/**
 * 修改基础信息
 * @param {*} data
 * @returns
 */
export function updateBasicApi(data) {
  return service({
    url: '/admin/auth/update/basic',
    method: 'post',
    data
  })
}
/**
 * 修改密码
 * @param {*} data
 * @returns
 */
export function updatePasswordApi(data) {
  return service({
    url: '/admin/auth/update/password',
    method: 'post',
    data
  })
}
/**
 * 退出登录
 * @param {*} data
 * @returns
 */
export function logoutApi() {
  return service({
    url: '/admin/auth/logout',
    method: 'post'
  })
}
