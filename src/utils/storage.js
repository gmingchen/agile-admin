/*
 * @Description: 凭证信息存取
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 14:01:54
 */
import cookie from 'js-cookie'
import { AUTH_KEY, AUTH_STORAGE, LOAD_MENU_KEY, MENU_KEY, MENU_STORAGE, PERMISSION_KEY, THEME_KEY, THEME_MODE_KEY, THEME_STORAGE, LAYOUT_KEY } from '@/utils/constant'
import { StorageType } from '@/utils/enum'

/**
 * @description: 本地存储、获取、清除
 * @param {String} key 存储键值
 * @param {String} value 存储值
 * @param {String} storage 存储位置
 * @return {*}
 * @author: gumingchen
 */
function set(key, value = '', storage) {
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
function get(key, storage) {
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
function clear(key, storage) {
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
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getAuth() {
  return JSON.parse(get(AUTH_KEY, AUTH_STORAGE) || '{}')
}
export function setAuth(auth) {
  set(AUTH_KEY, JSON.stringify(auth), AUTH_STORAGE)
}
export function clearAuth() {
  clear(AUTH_KEY, AUTH_STORAGE)
}

/**
 * @description: 菜单、权限-存储、获取、清除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getMenuAndPermission() {
  return {
    menus: JSON.parse(get(MENU_KEY, MENU_STORAGE) || '[]') || [],
    permissions: JSON.parse(get(PERMISSION_KEY, MENU_STORAGE) || '[]') || []
  }
}
export function setMenuAndPermission(data) {
  set(MENU_KEY, JSON.stringify(data.menus), MENU_STORAGE)
  set(PERMISSION_KEY, JSON.stringify(data.permissions), MENU_STORAGE)
}
export function clearMenuAndPermission() {
  clear(MENU_KEY, MENU_STORAGE)
  clear(PERMISSION_KEY, MENU_STORAGE)
}
export function getLoad() {
  return get(LOAD_MENU_KEY, MENU_STORAGE) === 'true'
}
export function setLoad(val = true) {
  set(LOAD_MENU_KEY, val, MENU_STORAGE)
}
export function clearLoad() {
  clear(LOAD_MENU_KEY, MENU_STORAGE)
}

/**
 * @description: 主题颜色-存储、获取、清除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getTheme() {
  const theme = get(THEME_KEY, THEME_STORAGE)
  return theme ? JSON.parse(theme) : null
}
export function setTheme(theme) {
  set(THEME_KEY, JSON.stringify(theme), THEME_STORAGE)
}
export function clearTheme() {
  clear(THEME_KEY, THEME_STORAGE)
}

/**
 * @description: 人机识别
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getHuman() {
  return get('human', StorageType.LOCAL)
}
export function setHuman(human) {
  set('human', human, StorageType.LOCAL)
}
