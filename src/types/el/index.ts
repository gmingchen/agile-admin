/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-28 14:35:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 13:50:55
 */
import { CascaderProps as ElCascaderProps, CascaderOption as ElCascaderOption } from 'node_modules/element-plus/lib/el-cascader-panel/src/types'

export namespace El {

  export type CascaderProps = ElCascaderProps
  export type CascaderOption = ElCascaderOption
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
  
}
