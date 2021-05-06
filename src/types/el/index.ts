/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-28 14:35:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 15:17:52
 */
import { Pane } from 'element-plus/lib/el-tabs/src/tabs.vue'
import { CascaderProps as ElCascaderProps, CascaderOption as ElCascaderOption } from 'node_modules/element-plus/lib/el-cascader-panel/src/types'

export type CascaderProps = ElCascaderProps
export type CascaderOption = ElCascaderOption
export type TabsPane = Pane
export interface CascaderCheckedNode<T> {
  pathValues: T[]
}

export interface TreeNode<T> {
  children: T[]
  display: boolean
  expanded: boolean
  lazy: boolean
  level: number
  loaded: boolean
  loading: boolean
}
