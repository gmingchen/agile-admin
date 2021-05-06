/*
 * @Description: 正则判断
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-08 16:07:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-02 16:10:04
 */

/**
 * @description: 邮箱
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isEmail(input: string): boolean {
  const reg: RegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(input)
}

/**
 * @description: URL地址
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isURL(input: string): boolean {
  const reg: RegExp = /^http[s]?:\/\/.*/
  return reg.test(input)
}

/**
 * 手机号码
 * @param {*} input
 */
export function isMobile(input: string): boolean {
  const reg: RegExp = /^1[0-9]{10}$/
  return reg.test(input)
}
