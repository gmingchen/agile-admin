// 接口返回数据通用
export namespace Po {
  export interface Base {
    id?: number | null
    creator?: number
    updater?: number
    created_at?: string
    updated_at?: string
  }
}
// 通用对象
export interface IObject {
  [key: string]: any
}
// 通用函数
export interface IFn {
  (...args: any[]): any
}
// axios 通用
export namespace IAxios {
  export interface ResponseData<T> {
    code: number,
    status: string,
    message: string,
    data: T
  }
  export interface ResponseStream {
    blob: Blob
    name: string
  }
  export interface PageData<T> {
    current: number,
    size: number,
    total: number,
    pages: string,
    list: T[]
  }
  export interface PageParams {
    current: number
    size: number
  }
  export interface DateParams {
    start: string
    end: string
  }
  export interface PageDateParams {
    current: number
    size: number
    start: string
    end: string
  }
  export interface StatusParams {
    key: number
    value: number
  }
}

// 树形结构
export namespace Tree {
  type KeyType = number | string
  export enum TreeKey {
    ID = 'id'
  }
  export enum TreeParentKey {
    SMALLHUMP = 'parentId',
    UNDERLINE = 'parent_id'
  }
  export enum TreeChildrenKey {
    CHILDREN = 'children'
  }
  export enum TreeLevelKey {
    LEVEL = '_level'
  }
  export interface Base {
    [TreeKey.ID]: KeyType
    [TreeParentKey.UNDERLINE]: KeyType
    [TreeParentKey.SMALLHUMP]: KeyType
    [TreeChildrenKey.CHILDREN]: Base[]
    [TreeLevelKey.LEVEL]: number
  }
  export interface Temp {
    [key: KeyType]: Base
  }
}
// 日期转化工具
export enum DateFormatKey {
  y = 'y',
  M = 'M',
  d = 'd',
  h = 'h',
  m = 'm',
  s = 's',
  a = 'a'
}
// 权限判断
export enum PermissionSeparator {
  or = '|',
  and = '&'
}
