import type { Po } from '..'

export namespace Role {

  export interface Simple extends Po.Base {
    name: string
  }

  export interface Base extends Simple {
    custom: string
    permission: number
    show: 0 | 1
    enterprise_id: number
    remark: string
  }

  export interface Expand extends Base {
    enterprise_menu_ids: number[]
  }

}
