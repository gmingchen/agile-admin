/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-30 11:19:00
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 13:20:08
 */
import { Po } from 'Type/index'

export namespace Role {

  export interface Simple extends Po.BaseUnderline {
    name: string
  }

  export interface Base extends Simple {
    remark: string
  }

  export interface Dto extends Base {
    menu_ids: number[]
  }

}
