/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 14:55:34
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 17:43:07
 */
import { Po } from 'Type/index'

export namespace File {

  export interface Base extends Po.BaseUnderline {
    original: string
    actual: string
    extension: string
    size: number
    path: string
    url: string
  }
  
}
