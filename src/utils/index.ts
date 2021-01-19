/*
 * @Description: 工具类
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-19 14:41:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-19 14:53:50
 */

/**
 * @description: 获取UUID
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function $getUUID(): string {
  let result: string
  const str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  result = str.replace(/[xy]/g, c => {
    let r: number = Math.random() * 16 | 0
    let v: number | string = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
  return result
}
