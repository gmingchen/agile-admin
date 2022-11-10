import type { Po } from '..'
import type { Role } from '../role'

export namespace Administrator {

  export interface Simple extends Po.Base {
    username: string
    nickname: string
  }

  export interface Base extends Simple {
    username: string
    nickname: string
    avatar: string
    mobile: string
    email: string
    sex: 0 | 1 | 2
    status: 0 | 1
    supervisor: 0 | 1
    enterprise_id: number | null
  }

  export interface Expand extends Base {
    department_custom: string
    department_id: number | null
    department_name: string
    department_permission: number | null
    roles: Role.Base[]
    token?: string
  }

}
