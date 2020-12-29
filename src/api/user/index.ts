/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2020-12-29 17:34:31
 */
import service from '@U/request'
import { ILoginParams } from './index.type'
/**
 * @description:
 * @param {ILoginParams} params
 * @return {*}
 * @author: gumingchen
 */
export function login (params: ILoginParams) {
  return service({
    url: '/antman_user_api/sys/login',
    method: 'post',
    data: params
  })
}

/**
 * @description:
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getUserInfo () {
  return service({
    url: '',
    method: 'get'
  })
}

/**
 * @description:
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function logout () {
  return service({
    url: '',
    method: 'get'
  })
}
