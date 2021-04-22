/*
 * @Description: 常量
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-04 10:15:13
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-04 10:17:20
 */
import { TokenKey, ContentType, ModelKey, StorageType, SuccessCode, TimeOut, LanguageKey } from './index.type'
// 请求数据类型
export const CONTENT_TYPE: string = ContentType.JSON
// 请求超时时长
export const TIME_OUT: number = TimeOut.TEN
// 访问秘钥 存储
export const TOKEN_KEY: string = TokenKey.TOKEN
export const TOKEN_STORAGE: string = StorageType.COOKIE
// 菜单 存储
export const MENU_STORAGE: string = StorageType.SESSION
export const IS_GET_MENU_KEY: string = 'isGet'
export const MENU_KEY: string = 'menus'
export const PERMISSION_KEY: string = 'permissions'
// 语言 存储
export const LANGUAGE_KEY: string = LanguageKey.LANG
export const LANGUAGE_STORAGE: string = StorageType.LOCAL
// 请求成功响应code
export const SUCCESS_CODE: number[] = [SuccessCode.ZERO, SuccessCode.TWO_HUNDRED]
// 双向绑定方法名
export const UPDATE_MODEL_EVENT: string = ModelKey.UPDATE
