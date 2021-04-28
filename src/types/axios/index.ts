import { AxiosRequestConfig } from 'axios'

export namespace Axios {

  export type Request = AxiosRequestConfig

  export interface Response<T> {
    code: number,
    status: string,
    message: string,
    data: T
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

  export interface StatusParams {
    key: number
    value: number
  }
  
}









