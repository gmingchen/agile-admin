/*
 * @Description: 正则判断
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-08 16:07:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 16:18:09
 */

/**
 * @description: 邮箱
 * @param {string} input
 * @return {*}
 * @author: gumingchen
 */
export function isEmail(input: string): boolean {
  const reg: RegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/u
  return reg.test(input)
}

/**
 * @description: URL地址
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isURL(input: string): boolean {
  const reg: RegExp = /^http[s]?:\/\/.*/u
  return reg.test(input)
}
