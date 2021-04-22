/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 23:04:14
 */

import { IPageParams } from '@/api/index.type'
import { IRole } from '@/api/login/index.type';

export interface IUserPageParams extends IPageParams {
  username: string
  nickname: string
}

export interface IUser {
  id: number | null | undefined
  username: string
  nickname: string
  password?: string
  mobile: string
  email: string
  avatar?: number | null | undefined
  status: 0 | 1
  roles?: IRole[]
  role_ids?: number[]
  confirmPassword?: string
}
