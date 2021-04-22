/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 23:04:14
 */

import { IPageParams } from '@/api/index.type'

export interface IRolePageParams extends IPageParams {
  name: string
}

export interface IRole {
  id: number | null | undefined
  name: string
  remark: string
  created_at?: string
  menu_ids?: number[]
}
