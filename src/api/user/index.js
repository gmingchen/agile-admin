/*
 * @Description: 用户
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-07-22 17:36:32
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
    url: '/admin/user/page',
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
    url: '/admin/user/info',
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
    url: '/admin/user/create',
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
    url: '/admin/user/update',
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
    url: '/admin/user/delete',
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
    url: '/admin/user/status',
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
    url: '/admin/user/select',
    method: 'get',
    params
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: '/admin/user/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
