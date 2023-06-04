import service from '@/utils/request'
import { parseJson2Param, getApiBaseUrl, download } from '@/utils'
import { ContentType } from '@/utils/enum'

/**
 * 配置分页
 * @param {*} params
 * @returns
 */
export function configPageApi(params) {
  return service({
    url: '/admin/file/config/page',
    method: 'get',
    params
  })
}

/**
 * 详情
 * @param {*} params
 * @returns
 */
export function configInfoApi(params) {
  return service({
    url: '/admin/file/config/info',
    method: 'get',
    params
  })
}

/**
 * 新增
 * @param {*} data
 * @returns
 */
export function configCreateApi(data) {
  return service({
    url: '/admin/file/config/create',
    method: 'post',
    data
  })
}

/**
 * 更新
 * @param {*} data
 * @returns
 */
export function configUpdateApi(data) {
  return service({
    url: '/admin/file/config/update',
    method: 'post',
    data
  })
}

/**
 * 删除
 * @param {*} data
 * @returns
 */
export function configDeleteApi(data) {
  return service({
    url: '/admin/file/config/delete',
    method: 'post',
    data
  })
}

/**
 * 设置主配置
 * @param {*} data
 * @returns
 */
export function configSetMasterApi(data) {
  return service({
    url: '/admin/file/config/master',
    method: 'post',
    data
  })
}

/**
 * 导出
 * @returns
 */
export async function configExportApi(params) {
  const r = await service({
    url: 'admin/file/config/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}

/* ****************************************************************************************** */

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
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function deleteApi(params) {
  return service({
    url: '/admin/file/delete',
    method: 'post',
    data: params
  })
}
