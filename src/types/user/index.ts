import { Po } from '@/types'
import { Role } from '@/types/role';

export namespace User {

  export interface Base extends Po.BaseUnderline {
    username: string
    nickname: string
    mobile: string
    email: string
    status: 0 | 1
  }

  export interface Vo extends Base {
    roles: Role.Simple[]
  }

  export interface Dto extends Base{
    password: string
    role_ids: (number|null|undefined)[]
    confirmPassword: string
  }
  
}
