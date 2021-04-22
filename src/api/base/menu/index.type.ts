/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 22:27:32
 */

export interface IMenuSelect {
  id: number | null | undefined
  parent_id: number | null | undefined
  name_cn: string
  name_en: string
  children?: IMenuSelect[]
}

export interface IMenuParams extends IMenuSelect {
  url: string
  type: 0 | 1 | 2
  permission: string
  icon: string | null | undefined
  sort: number
}

export interface IMenu extends IMenuParams {
  is_display: 0 | 1
  is_tab: 0 | 1
  is_multiple: 0 | 1
  is_alive: 0 | 1
  children: IMenu[]
  hasChildren?: boolean
}

