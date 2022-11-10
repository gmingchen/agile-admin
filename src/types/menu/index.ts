import type { Po } from '..'

export namespace Menu {

  export interface Simple extends Po.Base {
    name_cn: string
    name_en: string
    parent_id: number
    children?: Simple[]
  }

  export interface Base extends Simple {
    path: string
    name: string
    url: string
    permission: string
    type: number
    icon: string
    show: number
    tab: number
    multiple: number
    keepalive: number
    sort: number
  }

  export interface Expand extends Base {
    enterprise_id: number
  }

  export interface MenuPermission {
    menus: Expand[]
    permissions: string[]
  }

  export interface EnterpriseMenu extends Simple {
    enterprise_id?: number
    menu_id: number
    icon: string
    sort: number
    type: number
  }

}
