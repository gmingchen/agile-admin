/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2020-12-29 17:32:35
 */
import cookie from 'js-cookie'
import { tokenKey, storage } from '@C/index'
/**
 * @description:
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getToken (): string | null {
  let token: string | null
  switch (storage) {
    case 'cookie':
      token = cookie.get(tokenKey)
      break
    case 'sessionStorage':
      token = sessionStorage.getItem(tokenKey)
      break
    case 'localStorage':
      token = localStorage.getItem(tokenKey)
      break
    default:
      token = cookie.get(tokenKey)
      break
  }
  return token
}

export function setToken (token: string): void {
  switch (storage) {
    case 'cookie':
      cookie.set(tokenKey, token)
      break
    case 'sessionStorage':
      sessionStorage.setItem(tokenKey, token)
      break
    case 'localStorage':
      localStorage.setItem(tokenKey, token)
      break
    default:
      cookie.set(tokenKey, token)
      break
  }
}

export function clearToken (): void {
  switch (storage) {
    case 'cookie':
      cookie.remove(tokenKey)
      break
    case 'sessionStorage':
      sessionStorage.removeItem(tokenKey)
      break
    case 'localStorage':
      localStorage.removeItem(tokenKey)
      break
    default:
      cookie.remove(tokenKey)
      break
  }
}
