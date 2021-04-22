/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-27 15:33:13
 */
export interface ILoginParams {
  username: string
  password: string
  uuid: string
  code: string
}

export interface IUserEditParams {
  mobile?: string
  email?: string
  old_password?: string
  new_password?: string
  confirm_password?: string
}

export interface IToken {
  user_id: number
  token: string
  expired_at: string
  updated_at: string
}

export interface IRole {
  id: number
  name: string
  remark : string
}

export interface IUser {
  id: number
  username: string
  nickname: string
  mobile: string
  email: string
  avatar: number | string
  status: number
  roles: IRole[]
}

export interface IMenu {
  id: number
  parent_id: number
  name_cn: string
  name_en: string
  url: string
  type: number
  icon: string | null
  sort: number
  is_display: 0 | 1
  is_tab: 0 | 1
  is_multiple: 0 | 1
  is_alive: 0 | 1
  children: IMenu[]
}

export interface IMenuResponseData {
  menus: IMenu[]
  permissions: string[]
}
