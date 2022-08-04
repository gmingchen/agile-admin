/*
 * @Description: 文件
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-06-21 05:29:36
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-06-21 05:29:36
 */
import { parseJson2Param, getApiBaseUrl } from '@/utils'

/**
 * @description: 上传
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function uploadApi(params) {
  let result = ''
  const options = {
    url: '/backstage/file/upload',
    method: 'get',
    params: params
  }
  result = `${ getApiBaseUrl() + options.url }${ options.params ? parseJson2Param(options.params) : '' }`
  return result
}
