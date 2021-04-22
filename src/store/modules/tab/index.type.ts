/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 17:19:03
 */
import { IObject } from '@/utils/index.type'

export interface ITab {
  value: string
  label_cn: string
  label_en: string
  name: string
  path: string
  query: IObject
  params: IObject
  closable: boolean
}

export interface ITabState {
  active: string
  tabs: ITab[]
}
