/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-30 11:19:00
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 13:19:59
 */
import { Po } from 'Type/index'

export namespace Menu {

  export interface Simple extends Po.BaseUnderline {
    parent_id: number
    name_cn: string
    name_en: string
    children?: Simple[]
  }

  export interface Base extends Simple {
    url: string
    type: 0 | 1 | 2
    icon: string | null
    sort: number
    permission: string
  }

  export interface Vo extends Base {
    is_display: 0 | 1
    is_tab: 0 | 1
    is_multiple: 0 | 1
    is_alive: 0 | 1
    hasChildren?: boolean
    children?: Vo[]
  }

  export interface Dto extends Base {
    menu_ids?: number[]
  }

  export interface Side {
    id?: number | null
    parentId: number
    name_cn: string
    name_en: string
    icon: string | null
    routePath: string
    routeName: string
    type: 0 | 1 | 2
    children?: Side[]
  }

}
