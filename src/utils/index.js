import store from '@/store'
import { MAPPING } from '@/utils/constant'

/**
 * @description: 生成UUID
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function generateUUID() {
  let result = ''
  const code = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  result = code.replace(/[xy]/gu, item => {
    const random = (Math.random() * 16) | 0
    const value = item === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
  return result
}

/**
 * @description: 树形数据转换
 * @param {Array} data 树形数据数组
 * @param {String} key 键值
 * @param {String} parentKey 父级键值
 * @param {String} childrenKey 下级键值
 * @return {*}
 * @author: gumingchen
 */
export function parseData2Tree(
  data,
  key = 'id',
  parentKey = 'parentId',
  childrenKey = 'children'
) {
  const result = []
  const temp = {}
  for (let i = 0; i < data.length; i++) {
    temp[(data[i])[key]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[(data[k])[parentKey]] && (data[k])[key] !== (data[k])[parentKey]) {
      if (!temp[(data[k])[parentKey]][childrenKey]) {
        temp[(data[k])[parentKey]][childrenKey] = []
      }
      if (!temp[(data[k])[parentKey]]['_level']) {
        temp[(data[k])[parentKey]]['_level'] = 1
      }
      (data[k])['_level'] = temp[(data[k])[parentKey]]._level + 1
      temp[(data[k])[parentKey]][childrenKey].push(data[k])
    } else {
      result.push(data[k])
    }
  }
  return result
}

/**
 * @description: 日期转字符串
 * @param {Date} time 日期 默认当前日期
 * @param {String} format 格式
 * @return {*}
 * @author: gumingchen
 */
export function parseDate2Str(time = new Date(), format = '{y}-{M}-{d} {h}:{m}:{s}') {
  let result = ''
  let date = new Date()
  const type = typeof time
  if (type === 'object') {
    date = time
  } else if (type === 'number') {
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  result = format.replace(/\{[yMdhmsa]+\}/g, (val) => {
    const key = val.replace(/\{|\}/g, '')
    const value = formatObj[key]
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return result
}

/**
 * @description: 字符串转日期
 * @param {String} time 日期字符串
 * @param {Array} separator 分隔符
 * @return {*}
 * @author: gumingchen
 */
export function parseStr2Date(time = '', separator = ['-', ' ', ':']) {
  let result = new Date()
  const regexp = `/[${ separator.join('') }]/g`
  const data = time.split(eval(regexp))
  switch (data.length) {
    case 3:
      result = new Date(+data[0], +data[1] - 1, +data[2])
      break
    case 6:
      result = new Date(+data[0], +data[1] - 1, +data[2], +data[3], +data[4], +data[5])
      break
  }
  return result
}

/**
 * @description: json 转 param
 * @param {Object} json json数据
 * @return {*}
 * @author: gumingchen
 */
export function parseJson2Param(json) {
  let result = ''
  result = Object.keys(json)
    .map(key => {
      if (!json[key]) return ''
      const temp = encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      return temp
    })
    .join('&')
  return result
}

/**
 * @description: param 转 json
 * @param {String} url 链接
 * @return {*}
 * @author: gumingchen
 */
export function parseParam2Json(url) {
  const result = {}
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/gu, ' ')
  if (search) {
    const searchArr = search.split('&')
    searchArr.forEach(r => {
      const index = r.indexOf('=')
      if (index !== -1) {
        const key = r.substring(0, index)
        const val = r.substring(index + 1, r.length)
        result[key] = val
      }
    })
  }
  return result
}

/**
 * @description: 置空json数据
 * @param {*} data json数据
 * @return {*}
 * @author: gumingchen
 */
export function clearJson(data) {
  const json = data
  let key
  for (key in json) {
    if (json[key] instanceof Array) {
      json[key] = []
    } else if (typeof json[key] === 'object' && Object.prototype.toString.call(json[key]).toLowerCase() === '[object object]' && !json[key].length) {
      json[key] = {}
    } else {
      json[key] = ''
    }
  }
}

/**
 * @description: 判断是否有按钮级权限
 * @param {String} permission 多个使用 & 或 | 分隔开
 * @param {String} separator 分隔符：&-并且 |-或者
 * @return {*}
 * @author: gumingchen
 */
export function havePermission(permission, separator = '&') {
  let result = false
  const permissions = permission.split(separator)
  let fn = ''
  switch (separator) {
    case '&':
      fn = 'every'
      break
    case '|':
      fn = 'some'
      break
  }
  result = fn && permissions[fn](item => {
    return store.getters['menu/permissions'].indexOf(item)
  })
  return result
}

/**
 * @description: 获取Api BaseUrl
 * @param {*} key
 * @return {*}
 * @author: gumingchen
 */
export function getApiBaseUrl () {
  const baseUrl = process.env.VUE_APP_PROXY === 'true'
    ? `/proxy${ MAPPING }`
    : process.env.VUE_APP_BASE_API + MAPPING
  return baseUrl
}

/**
 * @description: 获取数据字典列表
 * @param {*} code 编码
 * @return {*}
 * @author: gumingchen
 */
export async function getDictionaryList(code) {
  const result = await store.dispatch('dictionary/getDictionary', code)
  return result
}

/**
 * @description: 获取数据字典键值对
 * @param {*} key
 * @return {*}
 * @author: gumingchen
 */
export async function getDictionaryMap(code) {
  const response = await store.dispatch('dictionary/getDictionary', code)
  const result = {}
  response.forEach(item => {
    result[item.value] = item.label
  })
  return result
}

