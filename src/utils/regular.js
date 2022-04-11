/**
 * @description: 整数
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isInteger(input) {
  const reg = /^-?[1-9]\d*$/
  return reg.test(input)
}

/**
 * @description: 正整数
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isPositiveInteger(input) {
  const reg = /^[1-9]\d*$/
  return reg.test(input)
}

/**
 * @description: 负整数
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isNegtiveInteger(input) {
  const reg = /^-[1-9]\d*$/
  return reg.test(input)
}

/**
 * @description: 邮箱
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isEmail(input) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(input)
}

/**
 * @description: URL地址
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isURL(input) {
  const reg = /^http[s]?:\/\/.*/
  return reg.test(input)
}

/**
 * @description: 端口
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export function isPort(input) {
  const reg = /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])$/
  return reg.test(input)
}

/**
 * 手机号码
 * @param {*} input
 */
export function isMobile(input) {
  const reg = /^1[0-9]{10}$/
  return reg.test(input)
}

/**
 * json 字符串
 * @param {*} input
 */
export function isJson(input) {
  if (typeof input === 'string') {
    try {
      const obj = JSON.parse(input)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}

