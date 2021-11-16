/*
 * @Description: oss
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-27 13:24:10
 */
import { parseJson2Param, getApiBaseUrl } from '@/utils'
import service from '@/utils/request'
import store from '@/store'
import { TOKEN_KEY } from '@/utils/constant'
import { ContentType } from '@/utils/dictionary'

const tokenVal = store.getters['user/tokenVal']

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/oss/file/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 文件流
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function flowApi(params) {
  let result = ''
  const url = `/oss/file/flow/${ params }`
  result = `${ getApiBaseUrl() + url }`
  return result
}

/**
 * @description: 上传
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function uploadApi(params) {
  let result = ''
  const url = '/oss/file/upload'
  result = `${ getApiBaseUrl() + url }`
  result += params ? `?${ parseJson2Param(params) }` : ''
  return result
}

/**
 * @description: 上传
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function uploadAxiosApi(params) {
  return service({
    url: '/oss/file/upload',
    method: 'post',
    data: params,
    headers: {
      'Content-Type': ContentType.UPLOAD
    }
  })
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function delApi(params) {
  return service({
    url: '/oss/file/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 文件清除
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function clearApi() {
  return service({
    url: '/oss/file/clear',
    method: 'post'
  })
}

/**
 * @description: 下载
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function downloadApi(params) {
  let result = ''
  const url = `/oss/file/download/${ params }`
  result = `${ getApiBaseUrl() + url }`
  const param = {
    [TOKEN_KEY]: tokenVal
  }
  result += `?${ parseJson2Param(param) }`
  return result
}
