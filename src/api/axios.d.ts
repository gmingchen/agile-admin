/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-27 15:38:36
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-27 15:40:32
 */
import * as axios from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>
  }
}
