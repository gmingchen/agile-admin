/*
 * @Description: 常量
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 10:15:13
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 14:05:07
 */
export const ContentType = {
  JSON: 'application/json;charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD: 'multipart/form-data'
}
const TokenKey = {
  TOKEN: 'token',
  ACCESS: 'access'
}
export const StorageType = {
  COOKIE: 'cookie',
  SESSION: 'sessionStorage',
  LOCAL: 'localStorage'
}
const SuccessCode = {
  ZERO: 0,
  TWO_HUNDRED: 200
}

// 请求数据类型
export const CONTENT_TYPE = ContentType.JSON
// 请求超时时长
export const TIME_OUT = 10000
// 访问秘钥 存储
export const TOKEN_KEY = TokenKey.TOKEN
export const TOKEN_STORAGE = StorageType.COOKIE
// 菜单 存储
export const MENU_STORAGE = StorageType.SESSION
export const IS_GET_MENU_KEY = 'isGet'
export const MENU_KEY = 'menus'
export const PERMISSION_KEY = 'permissions'
// 请求成功响应code
export const SUCCESS_CODE = [SuccessCode.ZERO, SuccessCode.TWO_HUNDRED]
// 双向绑定方法名
export const UPDATE_MODEL_EVENT = 'update:modelValue'
