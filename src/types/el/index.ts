import { CascaderProps as ElCascaderProps, CascaderOption as ElCascaderOption } from 'node_modules/element-plus/lib/el-cascader-panel/src/types'

export namespace El {

  export type CascaderProps = ElCascaderProps
  export type CascaderOption = ElCascaderOption

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
