export function getToken () {
  return sessionStorage.getItem('token')
}

export function setToken (token: string) {
  sessionStorage.setItem('token', token)
}

export function clearToken () {
  sessionStorage.removeItem('token')
}
