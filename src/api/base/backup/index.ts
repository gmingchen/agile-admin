/*
 * @Description: 文件
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 17:23:03
 */
import { parseJson2Param } from '@/utils'
import service from '@/utils/request'
import { PageData, PageParams, ResponseData } from 'axios'
import { Backup } from 'Type/backup'
import { store } from '@/store'
import { TOKEN_KEY } from '@/utils/constants'

const tokenVal = store.getters['user/tokenVal']

interface pageParams extends PageParams {
  type?: number | string
  start?: string
  end?: string
}

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params: pageParams): Promise<ResponseData<PageData<Backup.Base>>> {
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
export function backupApi(): Promise<ResponseData<null>> {
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
export function recoveryApi(params: { id: number }): Promise<ResponseData<null>> {
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
export function delApi(params: number[]): Promise<ResponseData<null>> {
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
export function clearApi(): Promise<ResponseData<null>> {
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
export function downloadApi(params: number): string {
  let result: string = ''
  const url = `/base/backup/download/${ params }`
  result = `${ process.env.VUE_APP_BASE_API! + url }`
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
export function truncateApi(): Promise<ResponseData<null>> {
  return service({
    url: '/base/backup/truncate',
    method: 'post'
  })
}
