/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-19 17:42:06
 */
import service from '@/utils/request'
import { IRequest, IResponse } from '@/api/index.type'
import { ILoginParams, IMenuResponseData, IToken, IUser, IUserEditParams } from './index.type'
import { $parseJson2Param } from '@/utils/index'

/**
 * @description: 获取验证码
 * @param {IObject} params
 * @return {string}
 * @author: gumingchen
 */
export function getCaptcha(params: { uuid: string }): string {
  let result: string = ''
  const options: IRequest = {
    url: '/base/captcha.jpg',
    method: 'get',
    params: params
  }
  result = `${ process.env.VUE_APP_BASE_API! + options.url }?${ $parseJson2Param(options.params) }`
  return result
}

/**
 * @description: 登录
 * @param {ILoginParams} params
 * @return {*}
 * @author: gumingchen
 */
export function login(params: ILoginParams): Promise<IResponse<IToken>> {
  return service({
    url: '/base/login',
    method: 'post',
    data: params
  })
}

/**
 * @description: 获取登录用户信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getUserInfo(): Promise<IResponse<IUser>> {
  return service({
    url: '/base/user/self/info',
    method: 'get'
  })
}

/**
 * @description: 获取登录用户权限菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getUserMenus(): Promise<IResponse<IMenuResponseData>> {
  return service({
    url: '/base/menu/self/info',
    method: 'get'
  })
}

/**
 * @description: 修改用户信息
 * @param {IUserEditParams} params
 * @return {*}
 * @author: gumingchen
 */
export function editUserInfo(params: IUserEditParams): Promise<IResponse<number>> {
  return service({
    url: '/base/user/self/update',
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
export function logout(): Promise<IResponse<null>> {
  return service({
    url: '/base/logout',
    method: 'post'
  })
}
