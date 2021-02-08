import { IObject } from "@/utils/index.type";

/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 13:28:59
 */

export enum MenuType {
  CATALOG = 0,
  MENU = 1,
  BUTTON = 2
}
export interface IMenu {
  id: number
  name: string
  parentId: number
  parentName: string
  type: number
  url: string
  icon: string
  perms: string
  display: boolean
  open: boolean | null
  tab: boolean
  orderNum: number
  list: Array<IMenu>
}

export interface IAuth {
  menus: Array<IMenu>
  permissions: string[]
  isGetAuth: boolean
}
