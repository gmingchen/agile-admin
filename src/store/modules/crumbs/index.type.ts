/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-02 16:50:33
 */

import { IObject } from "@/utils/index.type";

interface ITo {
  path?: string
  name?: string
  params?: IObject
  query?: IObject
}

export interface ICrumb {
  id: number
  title: string
  to: ITo | string
  replace: boolean
}

export interface ICrumbs {
  separator: string
  separatorClass: string
  crumbList: Array<ICrumb>
}
