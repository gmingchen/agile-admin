/*
 * @Description: 邮箱模版
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-05-30 18:52:43
 */
import service from '..'
import { download } from '@utils'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 */
export function pageApi(params) {
  return service({
    url: '/admin/mail/template/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 */
export function infoApi(params) {
  return service({
    url: '/admin/mail/template/info',
    method: 'get',
    params
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 */
export function createApi(data) {
  return service({
    url: '/admin/mail/template/create',
    method: 'post',
    data
  })
}

/**
 * @description: 更新
 * @param {*}
 * @return {*}
 */
export function updateApi(data) {
  return service({
    url: '/admin/mail/template/update',
    method: 'post',
    data
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*}
 */
export function deleteApi(data) {
  return service({
    url: '/admin/mail/template/delete',
    method: 'post',
    data
  })
}

/**
 * @description: 状态切换
 * @param {*}
 * @return {*}
 */
export function setStatusApi(data) {
  return service({
    url: '/admin/mail/template/status',
    method: 'post',
    data
  })
}

/**
 * @description: 选择列表
 * @param {*}
 * @return {*}
 */
export function selectApi(params) {
  return service({
    url: '/admin/mail/template/select',
    method: 'get',
    params: params
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: 'admin/mail/template/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
