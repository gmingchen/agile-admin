/* eslint-disable @typescript-eslint/no-explicit-any */
export namespace Po {
  export interface Base {
    id?: number | null
    creator?: number
    updater?: number
  }
  export interface BaseSmallHump extends Base {
    createdAt?: string
    updatedAt?: string
  }
  export interface BaseUnderline extends Base {
    created_at?: string
    updated_at?: string
  }
}

export interface IObject {
  [key: string]: any
}

export interface IFn {
  (...args: any[]): any
}

export interface App {
  component: (arg0: any, arg1: any) => void
  use: (arg0: any) => void
  config: {
    globalProperties: {
      $ELEMENT: {
        size: string
        zIndex: number
      }
    }
  }
  directive: (arg0: string, arg1: (el: any, binding: any) => void) => void 
}

export enum ContentType {
  JSON = 'application/json;charset=UTF-8',
  FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD = 'multipart/form-data'
}

export enum TokenKey {
  TOKEN = 'token',
  ACCESS = 'access'
}

export enum TimeOut {
  TEN = 10000
}

export enum StorageType {
  COOKIE = 'cookie',
  SESSION = 'sessionStorage',
  LOCAL = 'localStorage'
}

export enum LanguageKey {
  LANG = 'lang',
  LANGUAGE = 'language'
}

export enum SuccessCode {
  ZERO = 0,
  TWO_HUNDRED = 200
}

export enum LanguageType {
  Chinese = 'cn',
  English = 'en'
}

export enum ModelKey {
  UPDATE = 'update:modelValue'
}
