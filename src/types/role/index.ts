import { Po } from '@/types'

export namespace Role {

  export interface Simple extends Po.BaseUnderline {
    name: string
  }

  export interface Base extends Simple {
    remark: string
  }

  export interface Dto extends Base {
    menu_ids: number[]
  }

}
