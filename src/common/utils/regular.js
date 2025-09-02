/**
 * @description: 整数
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export const isInteger = input => {
  const reg = /^-?[1-9]\d*$/
  return reg.test(input)
}

/**
 * @description: 正整数
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export const isPositiveInteger = input => {
  const reg = /^[1-9]\d*$/
  return reg.test(input)
}

/**
 * @description: 负整数
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export const isNegtiveInteger = input => {
  const reg = /^-[1-9]\d*$/
  return reg.test(input)
}

/**
 * @description: 两位小数
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export const isTwoDecimal = input => {
  const reg = /^-?\d*(\.\d{1,2})?$/
  return reg.test(input)
}

/**
 * @description: 邮箱
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export const isEmail = input => {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/
  return reg.test(input)
}

/**
 * @description: URL地址
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export const isURL = input => {
  const reg = /^http[s]?:\/\/.*/
  return reg.test(input)
}

/**
 * @description: 域名（带协议）
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export const isDomain = input => {
  const reg = /^http[s]?:\/\/[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+$/
  return reg.test(input)
}

/**
 * @description: 端口
 * @param {*} input
 * @return {*}
 * @author: gumingchen
 */
export const isPort = input => {
  const reg = /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])$/
  return reg.test(input)
}

/**
 * 手机号码
 * @param {*} input
 */
export const isMobile = input => {
  const reg = /^1[0-9]{10}$/
  return reg.test(input)
}

/**
 * 用户名
 * @param {*} input
 */
export const isUsername = input => {
  const reg = /^[a-zA-Z]\w{3,11}$/
  return reg.test(input)
}

/**
 * 密码
 * @param {*} input
 */
export const isPassword = input => {
  const reg = /^[a-zA-Z0-9_-]{8,16}$/
  return reg.test(input)
}

/**
 * json 字符串
 * @param {*} input
 */
export const isJson = input => {
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
