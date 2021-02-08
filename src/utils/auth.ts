/*
 * @Description: 权限菜单信息存储
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-08 10:23:26
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 15:05:06
 */
import cookie from 'js-cookie'
import { isGetAuthKey, menuKey, permissionKey, authStorage } from '@C/index'
import { IObject } from './index.type'
import { IMenu } from '@/store/modules/auth/index.type'

/**
 * @description: 设置是否已经请求权限信息
 * @param {boolean} arg
 * @return {*}
 * @author: gumingchen
 */
export function setIsGet(arg: boolean): void {
  switch (authStorage) {
    case 'cookie':
      cookie.set(isGetAuthKey, JSON.stringify(arg))
      break
    case 'sessionStorage':
      sessionStorage.setItem(isGetAuthKey, JSON.stringify(arg))
      break
    case 'localStorage':
      localStorage.setItem(isGetAuthKey, JSON.stringify(arg))
      break
    default:
      cookie.set(isGetAuthKey, JSON.stringify(arg))
      break
  }
}

/**
 * @description: 获取是否已经请求权限信息
 * @param {boolean} arg
 * @return {*}
 * @author: gumingchen
 */
export function getIsGet(): boolean {
  let result: boolean = false
  switch (authStorage) {
    case 'cookie':
      result = JSON.parse(cookie.get(isGetAuthKey))
      break
    case 'sessionStorage':
      result = JSON.parse(sessionStorage.getItem(isGetAuthKey) as string)
      break
    case 'localStorage':
      result = JSON.parse(localStorage.getItem(isGetAuthKey) as string)
      break
    default:
      result = JSON.parse(cookie.get(isGetAuthKey))
      break
  }
  return result || false
}

/**
 * @description: 设置菜单
 * @param {array} menus
 * @return {*}
 * @author: gumingchen
 */
export function setMenu(menus: Array<IMenu>): void {
  switch (authStorage) {
    case 'cookie':
      cookie.set(menuKey, JSON.stringify(menus))
      break
    case 'sessionStorage':
      sessionStorage.setItem(menuKey, JSON.stringify(menus))
      break
    case 'localStorage':
      localStorage.setItem(menuKey, JSON.stringify(menus))
      break
    default:
      cookie.set(menuKey, JSON.stringify(menus))
      break
  }
}

/**
 * @description: 设置权限
 * @param {array} permission
 * @return {*}
 * @author: gumingchen
 */
export function setPermission(permissions: Array<string>): void {
  switch (authStorage) {
    case 'cookie':
      cookie.set(permissionKey, JSON.stringify(permissions))
      break
    case 'sessionStorage':
      sessionStorage.setItem(permissionKey, JSON.stringify(permissions))
      break
    case 'localStorage':
      localStorage.setItem(permissionKey, JSON.stringify(permissions))
      break
    default:
      cookie.set(permissionKey, JSON.stringify(permissions))
      break
  }
}

/**
 * @description: 获取菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getMenus(): Array<IMenu> {
  let menus: Array<IMenu> = []
  switch (authStorage) {
    case 'cookie':
      menus = JSON.parse(cookie.get(menuKey))
      break
    case 'sessionStorage':
      menus = JSON.parse(sessionStorage.getItem(menuKey) as string)
      break
    case 'localStorage':
      menus = JSON.parse(localStorage.getItem(menuKey) as string)
      break
    default:
      menus = JSON.parse(cookie.get(menuKey))
      break
  }
  return menus || []
}

/**
 * @description: 获取权限
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getPermissions(): Array<string> {
  let permission: Array<string> = []
  switch (authStorage) {
    case 'cookie':
      permission = JSON.parse(cookie.get(permissionKey))
      break
    case 'sessionStorage':
      permission = JSON.parse(sessionStorage.getItem(permissionKey) as string)
      break
    case 'localStorage':
      permission = JSON.parse(localStorage.getItem(permissionKey) as string)
      break
    default:
      permission = JSON.parse(cookie.get(permissionKey))
      break
  }
  return permission || []
}

/**
 * @description: 设置认证信息
 * @param {Array} menus
 * @param {Array} permissions
 * @return {*}
 * @author: gumingchen
 */
export function setAuth(menus: Array<IMenu>, permissions: Array<string>): void {
  setMenu(menus)
  setPermission(permissions)
}

/**
 * @description: 获取认证信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getAuth(): IObject {
  const auth: IObject = {
    [menuKey]: getMenus(),
    [permissionKey]: getPermissions()
  }
  return auth
}

/**
 * @description: 清除认证信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function clearAuth(): void {
  switch (authStorage) {
    case 'cookie':
      cookie.remove(menuKey)
      cookie.remove(permissionKey)
      break
    case 'sessionStorage':
      sessionStorage.removeItem(menuKey)
      sessionStorage.removeItem(permissionKey)
      break
    case 'localStorage':
      localStorage.removeItem(menuKey)
      localStorage.removeItem(permissionKey)
      break
    default:
      cookie.remove(menuKey)
      cookie.remove(permissionKey)
      break
  }
  setIsGet(false)
}
