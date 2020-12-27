import service from '@U/request'
import { ILoginParams } from './index.type'

export function login (params: ILoginParams) {
  return service({
    url: '/antman_user_api/sys/login',
    method: 'post',
    data: params
  })
}

export function getUserInfo () {
  return service({
    url: '',
    method: 'get'
  })
}

export function logout () {
  return service({
    url: '',
    method: 'get'
  })
}
