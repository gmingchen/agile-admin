/**
 * 生成文件名称
 * @param {*} type
 * @returns
 */
const generateFileName = (suffix) => {
  // const suffix = type.split('/')[1]
  return `${ +new Date() }.${ suffix }`
}

/**
 * @description: 文件下载
 * @param {*} href 文件资源路径
 * @param {*} name 文件名称
 * @return {*}
 * @author: gumingchen
 */
export const _download = (href, name) => {
  const a = document.createElement('a')
  a.href = href
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(href)
}

/**
 * @description: blob文件下载
 * @param {*} blob blob数据
 * @param {*} name 文件名称
 * @param {*} suffix 文件后缀
 * @return {*}
 * @author: gumingchen
 */
export const downloadBlob = (blob, name = '', suffix = '') => {
  if (blob) {
    if (!name) name = generateFileName(suffix)
    const href = URL.createObjectURL(blob)
    _download(href, name)
  }
}

/**
 * @description: 二进制文件下载
 * @param {*} arraybuffer 二进制数据
 * @param {*} name 文件名称
 * @param {*} suffix 文件后缀
 * @param {*} type 文件类型
 * @return {*}
 * @author: gumingchen
 */
export const downloadBinary = (arraybuffer, name = '', suffix = '', type = '') => {
  let blob = new Blob([arraybuffer], { type })
  downloadBlob(blob, name, suffix)
}

/**
 * 文件下载
 * @param {*} data 数据
 * @param {*} name 文件名称
 * @param {*} suffix 文件后缀
 * @param {*} type 文件类型
 */
export const download = (data, name, suffix, type) => {
  if (data instanceof ArrayBuffer) {
    downloadBinary(data, name, suffix, type)
  } else if (data instanceof Blob) {
    downloadBlob(data, name, suffix)
  }
}

/**
 * 格式化存储单位
 * @param {*} value 计量单位为 bit
 */
export const formatStorageUnit = (value) => {
  const base = 1024
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0
  while (value > 1000 && index < units.length) {
    value = value / base
    index++
  }
  return value.toFixed(2) + units[index]
}
