/*
 * @Description: 文件
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 22:06:57
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
    url: '/base/backup/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 备份
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function backupApi() {
  return service({
    url: '/base/backup/backup',
    method: 'post'
  })
}

/**
 * @description: 恢复
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function recoveryApi(params) {
  return service({
    url: '/base/backup/recovery',
    method: 'post',
    data: params
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
    url: '/base/backup/delete',
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
    url: '/base/backup/clear',
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
  const url = `/base/backup/download/${ params }`
  result = `${ process.env.VUE_APP_BASE_API + url }`
  const param = {
    [TOKEN_KEY]: tokenVal
  }
  result += `?${ parseJson2Param(param) }`
  return result
}

/**
 * @description: 清库
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function truncateApi() {
  return service({
    url: '/base/backup/truncate',
    method: 'post'
  })
}
