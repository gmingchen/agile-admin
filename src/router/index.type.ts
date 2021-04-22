/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-18 17:19:03
 */

export interface IMeta {
  id: number | string
  title_cn: string
  title_en: string
  isTab: boolean
  type: number | string
  isDynamic: boolean
  keepAlive: boolean
  multiple: boolean
}
