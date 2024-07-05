/*
 * @Description: 数据源
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-06-16 11:22:49
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
    url: '/admin/datasource/page',
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
    url: '/admin/datasource/info',
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
    url: '/admin/datasource/create',
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
    url: '/admin/datasource/update',
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
    url: '/admin/datasource/delete',
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
    url: '/admin/datasource/status',
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
    url: '/admin/datasource/select',
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
    url: '/admin/datasource/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
