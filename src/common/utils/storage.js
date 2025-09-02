import cookie from 'js-cookie'
import { STORAGE_TYPE_ENUM } from '@/common/enums'

export const set = (key, value, storage) => {
  if (storage === STORAGE_TYPE_ENUM.COOKIE) {
    cookie.set(key, value)
  } else if (storage === STORAGE_TYPE_ENUM.SESSION) {
    sessionStorage.setItem(key, value)
  } else if (storage === STORAGE_TYPE_ENUM.LOCAL) {
    localStorage.setItem(key, value)
  }
}

export const get = (key, storage) => {
  if (storage === STORAGE_TYPE_ENUM.COOKIE) {
    return cookie.get(key)
  } else if (storage === STORAGE_TYPE_ENUM.SESSION) {
    return sessionStorage.getItem(key)
  } else if (storage === STORAGE_TYPE_ENUM.LOCAL) {
    return localStorage.getItem(key)
  }
}

export const remove = (key, storage) => {
  if (storage === STORAGE_TYPE_ENUM.COOKIE) {
    cookie.remove(key)
  } else if (storage === STORAGE_TYPE_ENUM.SESSION) {
    sessionStorage.removeItem(key)
  } else if (storage === STORAGE_TYPE_ENUM.LOCAL) {
    localStorage.removeItem(key)
  }
}

/**
 * token-存储、获取、清除
 * @returns
 */
export const setAuth = (data) => set('token', JSON.stringify(data), STORAGE_TYPE_ENUM.COOKIE)
export const getAuth = () => JSON.parse(get('token', STORAGE_TYPE_ENUM.COOKIE) || '{}')
export const removeAuth = () => remove('token', STORAGE_TYPE_ENUM.COOKIE)

