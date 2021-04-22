/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-15 22:16:08
 */

import { IMenu } from '@/api/login/index.type'

export interface ISideMenu {
  id: number
  parentId: number
  name_cn: string
  name_en: string
  icon: string | null
  routePath: string
  routeName: string
  type: number
  children?: ISideMenu[]
}

export interface IMenuState {
  active: string
  isCollapse: boolean
  isGet: boolean
  menus: IMenu[]
  permissions: string[]
}
