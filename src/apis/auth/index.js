import { doGet, doJson } from '@/common/utils'

/**
 * 登录验证码
 * @param {*} params
 * @returns
 */
export const captchaApi = params => doGet('/admin/auth/captcha', params)

/**
 * 登录
 * @param {*} params
 * @returns
 */
export const loginApi = params => doJson('/admin/auth/login', params)

/**
 * 获取登录账号的相关信息
 * @param {*} params
 * @returns
 */
export const loginInfoApi = () => doGet('/admin/auth/info')

/**
 * 获取登录管理员权限、菜单
 * @param {*} params
 * @returns
 */
export const loginPermissionApi = () => doGet('/admin/auth/menu')

/**
 * 修改基础信息
 * @param {*} params
 * @returns
 */
export const updateLoginBasicApi = params => doJson('/admin/auth/update/basic', params)

/**
 * 修改密码
 * @param {*} params
 * @returns
 */
export const updateLoginPasswordApi = params => doJson('/admin/auth/update/password', params)

/**
 * 退出登录
 * @returns
 */
export const logoutApi = () => doJson('/admin/auth/logout')

