/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-30 14:02:12
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 15:39:56
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
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
export enum ContentType {
  JSON = 'application/json;charset=UTF-8',
  FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD = 'multipart/form-data'
}
export enum TokenKey {
  TOKEN = 'token',
  ACCESS = 'access'
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
export enum LanguageType {
  Chinese = 'cn',
  English = 'en'
}
export enum SuccessCode {
  ZERO = 0,
  TWO_HUNDRED = 200
}
