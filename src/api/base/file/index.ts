/*
 * @Description: 文件
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:46:39
 */
import { IObject } from '@/types'
import { parseJson2Param } from '@/utils'
import service from '@/utils/request'
import { PageData, PageParams, ResponseData } from 'axios'
import { File } from 'Type/file'

interface pageParams extends PageParams {
  extension?: string
  start?: string
  end?: string
}

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params: pageParams): Promise<ResponseData<PageData<File.Base>>> {
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
export function flowApi(params: number): String {
  let result: string = ''
  const url = `/base/file/task/info/${ params }`
  result = `${ process.env.VUE_APP_BASE_API! + url }`
  return result
}

/**
 * @description: 上传
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function upload(params?: IObject): String {
  let result: string = ''
  const url = '/base/file/upload'
  result = `${ process.env.VUE_APP_BASE_API! + url }`
  if (params) {
    result += `?${ parseJson2Param(params) }`
  }
  return result
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function delApi(params: number[]): Promise<ResponseData<null>> {
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
export function cleanApi(): Promise<ResponseData<null>> {
  return service({
    url: '/base/file/clean',
    method: 'post'
  })
}
