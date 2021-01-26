/*
 * @Description: 工具类
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-19 14:41:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-26 15:08:29
 */
import { IObject } from './index.type'

/**
 * @description: 生成UUID
 * @param {*}
 * @return {string}
 * @author: gumingchen
 */
export function $getUUID(): string {
  let result: string = ''
  const str = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  result = str.replace(/[xy]/gu, c => {
    const r: number = (Math.random() * 16) | 0
    const v: number | string = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
  return result
}

/**
 * @description: 树形数据转换
 * @param {Array} data
 * @param {string} key
 * @param {string} parentKey
 * @param {string} childrenKey
 * @return {Array}
 * @author: gumingchen
 */
export function $parseData2Tree(
  data: Array<IObject>,
  key: string = 'id',
  parentKey: string = 'parentId',
  childrenKey: string = 'children'
): Array<IObject> {
  const result: Array<IObject> = []
  const temp = {}
  for (let i = 0; i < data.length; i++) {
    temp[data[i][key]] = data[i]
  }
  for (let k = 0; k < data.length; k++) {
    if (temp[data[k][parentKey]] && data[k][key] !== data[k][parentKey]) {
      if (!temp[data[k][parentKey]][childrenKey]) {
        temp[data[k][parentKey]][childrenKey] = []
      }
      if (!temp[data[k][parentKey]]['_level']) {
        temp[data[k][parentKey]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][parentKey]]._level + 1
      temp[data[k][parentKey]][childrenKey].push(data[k])
    } else {
      result.push(data[k])
    }
  }
  return result
}

/**
 * @description: 日期转字符串
 * @param {Date} time 日期 默认当前日期
 * @param {string} format 格式
 * @return {string}
 * @author: gumingchen
 */
export function $parseDate2Str(time: Date | number = new Date(), format: string = '{y}-{M}-{d} {h}:{m}:{s}'): string {
  let result: string = ''
  let date: Date = new Date()
  const type: string = typeof time
  if (type === 'object') {
    date = time as Date
  } else if (type === 'number') {
    date = new Date(time)
  }
  const formatObj: IObject = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  result = format.replace(/\{[yMdhmsa]+\}/gu, (val: string) => {
    const key: string = val.replace(/\{|\}/gu, '')
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
 * @param {string} time 日期字符串
 * @param {string} separator 分隔符
 * @return {Date}
 * @author: gumingchen
 */
export function $parseStr2Date(time: string = '', separator: string[] = ['-', ' ', ':']): Date {
  let result: Date = new Date()
  const regexp: string = `/[${separator.join('')}]/gu`
  const data: string[] = time.split(eval(regexp))
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
 * @param {IObject} json
 * @return {string}
 * @author: gumingchen
 */
export function $parseJson2Param(json: IObject): string {
  let result: string = ''
  result = Object.keys(json)
    .map(key => {
      if (!json[key]) return ''
      const temp: string = encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      return temp
    })
    .join('&')
  return result
}

/**
 * @description: param 转 json
 * @param {string} url
 * @return {IObject}
 * @author: gumingchen
 */
export function $parseParam2Json(url: string): IObject {
  const result: IObject = {}
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
 * @param {IObject} json
 * @return {*}
 * @author: gumingchen
 */
export function $clearJson(json: IObject): void {
  let key: string
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
