/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 14:55:34
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 17:43:07
 */
import { Po } from 'Type/index'
import { Role } from 'Type/role'

export namespace User {

  export interface Base extends Po.BaseUnderline {
    username: string
    nickname: string
    mobile: string
    email: string
    status: 0 | 1
  }

  export interface Vo extends Base {
    roles: Role.Simple[]
  }

  export interface Dto extends Base{
    password: string
    role_ids: (number|null|undefined)[]
    confirmPassword: string
  }
  
}
