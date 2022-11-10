/*
 * @Description: 本地信息存取
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-11-07 16:36:31
 */
import cookie from 'js-cookie'
import { IS_GET_MENU_KEY, MENU_KEY, MENU_STORAGE, PERMISSION_KEY, TOKEN_KEY, TOKEN_STORAGE, THEME_KEY, THEME_MODE_KEY, THEME_STORAGE, LAYOUT_KEY } from '@/utils/constant'
import { StorageType, ThemeMode } from '@/utils/dictionary'
import type { Token } from '@/types/token'
import type { Menu } from '@/types/menu'
import type { Theme } from '@/types/theme'

/**
 * @description: 本地存储、获取、清除
 * @param {String} key 存储键值
 * @param {String} value 存储值
 * @param {String} storage 存储位置
 * @author: gumingchen
 */
function set(key: string, value: string = '', storage: string) {
  switch (storage) {
    case StorageType.COOKIE:
      cookie.set(key, value)
      break
    case StorageType.SESSION:
      sessionStorage.setItem(key, value)
      break
    case StorageType.LOCAL:
      localStorage.setItem(key, value)
      break
    default:
      cookie.set(key, value)
      break
  }
}
function get(key: string, storage: string) {
  let result
  switch (storage) {
    case StorageType.COOKIE:
      result = cookie.get(key)
      break
    case StorageType.SESSION:
      result = sessionStorage.getItem(key)
      break
    case StorageType.LOCAL:
      result = localStorage.getItem(key)
      break
    default:
      result = cookie.get(key)
      break
  }
  return result
}
function clear(key: string, storage: string) {
  switch (storage) {
    case StorageType.COOKIE:
      cookie.remove(key)
      break
    case StorageType.SESSION:
      sessionStorage.removeItem(key)
      break
    case StorageType.LOCAL:
      localStorage.removeItem(key)
      break
    default:
      cookie.remove(key)
      break
  }
}

/**
 * @description: token-存储、获取、清除
 * @author: gumingchen
 */
export function getToken(): Token.Base {
  return JSON.parse(get(TOKEN_KEY, TOKEN_STORAGE) || '{}')
}
export function setToken(token: string) {
  set(TOKEN_KEY, token, TOKEN_STORAGE)
}
export function clearToken() {
  clear(TOKEN_KEY, TOKEN_STORAGE)
}

/**
 * @description: 菜单、权限-存储、获取、清除
 * @author: gumingchen
 */
export function getMenuAndPermission(): Menu.MenuPermission {
  return {
    menus: JSON.parse(get(MENU_KEY, MENU_STORAGE) || '[]') || [],
    permissions: JSON.parse(get(PERMISSION_KEY, MENU_STORAGE) || '[]') || []
  }
}
export function setMenuAndPermission(data: Menu.MenuPermission) {
  set(MENU_KEY, JSON.stringify(data.menus), MENU_STORAGE)
  set(PERMISSION_KEY, JSON.stringify(data.permissions), MENU_STORAGE)
}
export function clearMenuAndPermission() {
  clear(MENU_KEY, MENU_STORAGE)
  clear(PERMISSION_KEY, MENU_STORAGE)
}
export function getGet() {
  return get(IS_GET_MENU_KEY, MENU_STORAGE) === 'true'
}
export function setGet(val = true) {
  set(IS_GET_MENU_KEY, val + '', MENU_STORAGE)
}
export function clearGet() {
  clear(IS_GET_MENU_KEY, MENU_STORAGE)
}

/**
 * @description: 主题颜色-存储、获取、清除
 * @author: gumingchen
 */
export function getTheme(): Theme.Base {
  const theme = get(THEME_KEY, THEME_STORAGE)
  return theme ? JSON.parse(theme) : null
}
export function setTheme(theme: Theme.Base) {
  set(THEME_KEY, JSON.stringify(theme), THEME_STORAGE)
}
export function clearTheme() {
  clear(THEME_KEY, THEME_STORAGE)
}

/**
 * @description: 主题模式-存储、获取、清除
 * @author: gumingchen
 */
export function getThemeMode(): ThemeMode {
  const mode = get(THEME_MODE_KEY, THEME_STORAGE) as ThemeMode
  return mode || null
}
export function setThemeMode(mode: ThemeMode) {
  set(THEME_MODE_KEY, mode, THEME_STORAGE)
}
export function clearThemeMode() {
  clear(THEME_MODE_KEY, THEME_STORAGE)
}

/**
 * @description: 布局-存储、获取、清除
 * @author: gumingchen
 */
export function getLayout(): Theme.Layout {
  const layout = get(LAYOUT_KEY, THEME_STORAGE)
  return layout ? JSON.parse(layout) : null
}
export function setLayout(layout: Theme.Layout) {
  set(LAYOUT_KEY, JSON.stringify(layout), THEME_STORAGE)
}
export function clearLayout() {
  clear(LAYOUT_KEY, THEME_STORAGE)
}
