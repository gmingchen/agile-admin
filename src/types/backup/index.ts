/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 14:55:34
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 15:39:00
 */
import { Po } from 'Type/index'

export namespace Backup {

  export interface Base extends Po.BaseUnderline {
    name: string
    db_name: string
    path: string
    url: number
    cmd: string
    type: number
  }

}
