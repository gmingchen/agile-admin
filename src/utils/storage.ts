/*
 * @Description: 凭证信息存取
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 14:01:54
 */
import cookie from 'js-cookie'
import { IS_GET_MENU_KEY, LANGUAGE_KEY, LANGUAGE_STORAGE, MENU_KEY, MENU_STORAGE, PERMISSION_KEY, TOKEN_KEY, TOKEN_STORAGE } from '@/utils/constants'
import { UserMenus } from '@/api/login'
import { LanguageType, StorageType } from 'Type/index'

/**
 * @description: token-存储、获取、清除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getToken(): string | null | undefined {
  let token: string | null | undefined
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      token = cookie.get(TOKEN_KEY)
      break
    case StorageType.SESSION:
      token = sessionStorage.getItem(TOKEN_KEY)
      break
    case StorageType.LOCAL:
      token = localStorage.getItem(TOKEN_KEY)
      break
    default:
      token = cookie.get(TOKEN_KEY)
      break
  }
  return token
}
export function setToken(token: string): void {
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      cookie.set(TOKEN_KEY, token)
      break
    case StorageType.SESSION:
      sessionStorage.setItem(TOKEN_KEY, token)
      break
    case StorageType.LOCAL:
      localStorage.setItem(TOKEN_KEY, token)
      break
    default:
      cookie.set(TOKEN_KEY, token)
      break
  }
}
export function clearToken(): void {
  switch (TOKEN_STORAGE) {
    case StorageType.COOKIE:
      cookie.remove(TOKEN_KEY)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(TOKEN_KEY)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(TOKEN_KEY)
      break
    default:
      cookie.remove(TOKEN_KEY)
      break
  }
}

/**
 * @description: 菜单、权限-存储、获取、清除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getMenuAndPermissions(): UserMenus {
  let result: UserMenus
  switch (MENU_STORAGE) {
    case StorageType.COOKIE:
      result = {
        menus: JSON.parse(cookie.get(MENU_KEY) || '[]') || [],
        permissions: JSON.parse(cookie.get(PERMISSION_KEY) || '[]') || []
      }
      break
    case StorageType.SESSION:
      result = {
        menus: JSON.parse(sessionStorage.getItem(MENU_KEY) || '[]') || [],
        permissions: JSON.parse(sessionStorage.getItem(PERMISSION_KEY) || '[]') || []
      }
      break
    case StorageType.LOCAL:
      result = {
        menus: JSON.parse(localStorage.getItem(MENU_KEY) || '') || [],
        permissions: JSON.parse(localStorage.getItem(PERMISSION_KEY) || '') || []
      }
      break
    default:
      result = {
        menus: JSON.parse(sessionStorage.getItem(MENU_KEY) || '[]') || [],
        permissions: JSON.parse(sessionStorage.getItem(PERMISSION_KEY) || '[]') || []
      }
      break
  }
  return result
}
export function setMenuAndPermissions(data: UserMenus): void {
  switch (MENU_STORAGE) {
    case StorageType.COOKIE:
      cookie.set(MENU_KEY, JSON.stringify(data.menus))
      cookie.set(PERMISSION_KEY, JSON.stringify(data.permissions))
      break
    case StorageType.SESSION:
      sessionStorage.setItem(MENU_KEY, JSON.stringify(data.menus))
      sessionStorage.setItem(PERMISSION_KEY, JSON.stringify(data.permissions))
      break
    case StorageType.LOCAL:
      localStorage.setItem(MENU_KEY, JSON.stringify(data.menus))
      localStorage.setItem(PERMISSION_KEY, JSON.stringify(data.permissions))
      break
    default:
      sessionStorage.setItem(MENU_KEY, JSON.stringify(data.menus))
      sessionStorage.setItem(PERMISSION_KEY, JSON.stringify(data.permissions))
      break
  }
}
export function clearMenuAndPermissions(): void {
  switch (MENU_STORAGE) {
    case StorageType.COOKIE:
      cookie.remove(MENU_KEY)
      cookie.remove(PERMISSION_KEY)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(MENU_KEY)
      sessionStorage.removeItem(PERMISSION_KEY)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(MENU_KEY)
      localStorage.removeItem(PERMISSION_KEY)
      break
    default:
      sessionStorage.removeItem(MENU_KEY)
      sessionStorage.removeItem(PERMISSION_KEY)
      break
  }
}
export function getIsGet(): boolean {
  let result: boolean
  switch (MENU_STORAGE) {
    case StorageType.COOKIE:
      result = cookie.get(IS_GET_MENU_KEY) === 'true'
      break
    case StorageType.SESSION:
      result = sessionStorage.getItem(IS_GET_MENU_KEY) === 'true'
      break
    case StorageType.LOCAL:
      result = localStorage.getItem(IS_GET_MENU_KEY) === 'true'
      break
    default:
      result = sessionStorage.getItem(IS_GET_MENU_KEY) === 'true'
      break
  }
  return result
}
export function setIsGet(val: boolean = true): void {
  switch (MENU_STORAGE) {
    case StorageType.COOKIE:
      cookie.set(IS_GET_MENU_KEY, JSON.stringify(val))
      break
    case StorageType.SESSION:
      sessionStorage.setItem(IS_GET_MENU_KEY, JSON.stringify(val))
      break
    case StorageType.LOCAL:
      localStorage.setItem(IS_GET_MENU_KEY, JSON.stringify(val))
      break
    default:
      sessionStorage.setItem(IS_GET_MENU_KEY, JSON.stringify(val))
      break
  }
}
export function clearIsGet(): void {
  switch (MENU_STORAGE) {
    case StorageType.COOKIE:
      cookie.remove(IS_GET_MENU_KEY)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(IS_GET_MENU_KEY)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(IS_GET_MENU_KEY)
      break
    default:
      cookie.remove(IS_GET_MENU_KEY)
      break
  }
}

/**
 * @description: 语言-存储、获取
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getLanguage(): string | null | undefined {
  let result: string | null | undefined
  switch (LANGUAGE_STORAGE) {
    case StorageType.COOKIE:
      result = cookie.get(LANGUAGE_KEY)
      break
    case StorageType.SESSION:
      result = sessionStorage.getItem(LANGUAGE_KEY)
      break
    case StorageType.LOCAL:
      result = localStorage.getItem(LANGUAGE_KEY)
      break
    default:
      result = localStorage.getItem(LANGUAGE_KEY)
      break
  }
  return result
}
export function setLanguage(language: string = LanguageType.Chinese): void {
  switch (LANGUAGE_STORAGE) {
    case StorageType.COOKIE:
      cookie.set(LANGUAGE_KEY, language)
      break
    case StorageType.SESSION:
      sessionStorage.setItem(LANGUAGE_KEY, language)
      break
    case StorageType.LOCAL:
      localStorage.setItem(LANGUAGE_KEY, language)
      break
    default:
      localStorage.setItem(LANGUAGE_KEY, language)
      break
  }
}
export function clearLanguage(): void {
  switch (LANGUAGE_STORAGE) {
    case StorageType.COOKIE:
      cookie.remove(LANGUAGE_KEY)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(LANGUAGE_KEY)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(LANGUAGE_KEY)
      break
    default:
      cookie.remove(LANGUAGE_KEY)
      break
  }
}

/**
 * @description: 清除缓存 退出登录
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function clear(): void {
  clearMenuAndPermissions()
  clearLanguage()
  clearIsGet()
}
export function exit(): void {
  clear()
  clearToken()
}
