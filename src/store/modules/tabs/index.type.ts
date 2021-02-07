/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-07 16:08:38
 */
import { IObject } from '@/utils/index.type'
export interface ITabDelParam {
  type: string,
  value: string
}
export interface ITab {
  label: string
  value: string
  name: string
  path: string
  query: IObject
  params: IObject
  multiple?: boolean
  closable?: boolean
}
export interface ITabs {
  tabsList: Array<ITab>
  tabsActive: string
  activeIndex: number
}
