import type { Po } from '..'

export namespace Enterprise {

  export interface Simple extends Po.Base {
    name: string
  }

  export interface Base extends Simple {
    name: string
    logo: string
    describe: string
    status: 0 | 1
  }

}
