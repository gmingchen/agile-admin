/*
 * @Description: 文件
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-06-21 05:29:36
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-06-21 05:29:36
 */
import service from '@/utils/request'
import { parseJson2Param, getApiBaseUrl } from '@/utils'
import { ContentType } from '@/utils/dictionary'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params) {
  return service({
    url: '/admin/file/page',
    method: 'get',
    params: params
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
    url: '/admin/file/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 更新配置
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function updateConfigApi(params) {
  return service({
    url: '/admin/file/update/config',
    method: 'post',
    data: params
  })
}

/**
 * @description: 上传
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function uploadUrlApi(params) {
  let result = ''
  const options = {
    url: '/admin/file/upload',
    method: 'post',
    params: params
  }
  result = `${ getApiBaseUrl(import.meta.env) + options.url }${ options.params ? parseJson2Param(options.params) : '' }`
  return result
}

/**
 * @description: 文件上传
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function uploadApi(params) {
  const formData = new FormData()
  for (const key in params) {
    formData.append(key, params[key])
  }
  return service({
    url: '/admin/file/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': ContentType.UPLOAD
    }
  })
}

/**
 * @description: 分片上传
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function uploadSliceApi(params) {
  const formData = new FormData()
  for (const key in params) {
    formData.append(key, params[key])
  }
  return service({
    url: '/admin/file/slice/upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': ContentType.UPLOAD
    }
  })
}

/**
 * @description: 分片合并
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function mergeSliceApi(params) {
  return service({
    url: '/admin/file/slice/merge',
    method: 'post',
    data: params
  })
}

/**
 * @description: 分片删除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function deleteSliceApi(params) {
  return service({
    url: '/admin/file/slice/delete',
    method: 'post',
    data: params
  })
}
