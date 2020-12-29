import cookie from 'js-cookie'
import { tokenKey, storage } from '@C/index'

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
