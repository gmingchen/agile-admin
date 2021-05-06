/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 18:08:22
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 14:03:08
 */
import { ElMessage, ElLoading } from 'element-plus'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage
    $confirm: ElMessageBoxShortcutMethod
    $loading: typeof ElLoading.service
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    id?: number | string | null
    title_cn: string
    title_en: string
    isTab?: boolean
    type?: number | string
    isDynamic?: boolean
    keepAlive?: boolean
    multiple?: boolean
  }
}

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
  interface ResponseData<T> {
    code: number,
    status: string,
    message: string,
    data: T
  }
  interface PageData<T> {
    current: number,
    size: number,
    total: number,
    pages: string,
    list: T[]
  }
  interface PageParams {
    current: number
    size: number
  }
  interface StatusParams {
    key: number
    value: number
  }
}
