/**
 * @description: 置空json数据
 * @param {*} data json数据
 * @return {*}
 * @author: gumingchen
 */
export const clearJson = data => {
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
 * @description: 树形数据转换
 * @param {Array} data 树形数据数组
 * @param {String} key 键值
 * @param {String} parentKey 父级键值
 * @param {String} childrenKey 下级键值
 * @return {*}
 * @author: gumingchen
 */
export const parseDataToTree = (data, key = 'id', parentKey = 'parentId', childrenKey = 'children') => {
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
 * @description: json 转 param
 * @param {Object} json json数据
 * @return {*}
 * @author: gumingchen
 */
export const parseJsonToParam = (json) => {
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
export const parseParamToJson = (url) => {
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
