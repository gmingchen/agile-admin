/*
 * @Description: 登录
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'
import { parseJson2Param } from '@/utils/index'
import { getApiBaseUrl } from '@/utils'

/**
 * @description: 验证码
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function captchaApi(params) {
  let result = ''
  const options = {
    url: '/admin/captcha.jpg',
    method: 'get',
    params: params
  }
  result = `${ getApiBaseUrl() + options.url }?${ parseJson2Param(options.params) }`
  return result
}

/**
 * @description: 登录
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function loginApi(params) {
  return service({
    url: '/admin/login',
    method: 'post',
    data: params
  })
}

/**
 * @description: 退出
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function logoutApi() {
  return service({
    url: '/admin/logout',
    method: 'post'
  })
}
