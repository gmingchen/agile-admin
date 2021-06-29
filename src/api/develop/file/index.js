/*
 * @Description: 文件
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-27 13:24:10
 */
import { parseJson2Param } from '@/utils'
import service from '@/utils/request'
import store from '@/store'
import { TOKEN_KEY } from '@/utils/constants'

const tokenVal = store.getters['user/tokenVal']

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/base/file/page',
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
  const url = `/base/file/flow/${ params }`
  result = `${ process.env.VUE_APP_BASE_API + url }`
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
  const url = '/base/file/upload'
  result = `${ process.env.VUE_APP_BASE_API + url }`
  if (!params) {
    params = {
      [TOKEN_KEY]: tokenVal
    }
  } else {
    params[TOKEN_KEY] = tokenVal
  }
  result += `?${ parseJson2Param(params) }`
  return result
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function delApi(params) {
  return service({
    url: '/base/file/delete',
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
    url: '/base/file/clear',
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
  const url = `/base/file/download/${ params }`
  result = `${ process.env.VUE_APP_BASE_API + url }`
  const param = {
    [TOKEN_KEY]: tokenVal
  }
  result += `?${ parseJson2Param(param) }`
  return result
}
