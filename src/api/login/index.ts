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
import { AxiosRequestConfig, ResponseData } from 'axios'
import { Token } from 'Type/token'
import { User } from 'Type/user'
import { Menu } from 'Type/menu'

interface LoginParams {
  username: string
  password: string
  uuid: string
  code: string
}

export interface UserMenus {
  menus: Menu.Vo[]
  permissions: string[]
}
interface UserEditParams {
  nickname?: string
  mobile?: string
  email?: string
  old_password?: string
  new_password?: string
  confirm_password?: string
}

/**
 * @description: 验证码
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function captchaApi(params: { uuid: string }): string {
  let result: string = ''
  const options: AxiosRequestConfig = {
    url: '/base/captcha.jpg',
    method: 'get',
    params: params
  }
  result = `${ process.env.VUE_APP_BASE_API! + options.url }?${ parseJson2Param(options.params) }`
  return result
}

/**
 * @description: 登录
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function loginApi(params: LoginParams): Promise<ResponseData<Token.Base>> {
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
export function userInfoApi(): Promise<ResponseData<User.Vo>> {
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
export function userMenusApi(): Promise<ResponseData<UserMenus>> {
  return service({
    url: '/base/menu/self/info',
    method: 'get'
  })
}

/**
 * @description: 修改用户信息
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function editUserInfoApi(params: UserEditParams): Promise<ResponseData<number>> {
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
export function logoutApi(): Promise<ResponseData<null>> {
  return service({
    url: '/base/logout',
    method: 'post'
  })
}
