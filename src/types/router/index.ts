/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 17:19:03
 */
import { RouteLocation, RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
export namespace Router {
  export type Route = RouteRecordRaw

  export type RouteLocal = RouteLocation
  
  export type RouteLocalNormalizedLoaded = RouteLocationNormalizedLoaded

  export interface Meta {
    id: number | string
    title_cn: string
    title_en: string
    isTab: boolean
    type: number | string
    isDynamic: boolean
    keepAlive: boolean
    multiple: boolean
  }
}

