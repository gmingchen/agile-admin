/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-06 13:58:51
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 23:01:48
 */
import { AxiosRequestConfig } from 'axios'

export type IRequest = AxiosRequestConfig

export interface IResponse<T> {
  code: number,
  status: string,
  message: string,
  data: T
}

export interface IPageData<T> {
  current: number,
  size: number,
  total: number,
  pages: string,
  list: T[]
}

export interface IPageParams {
  current: number
  size: number
}

export interface IStatusParams {
  key: number
  value: number
}
