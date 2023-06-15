/*
 * @Description: 测试表
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-06-14 17:21:09
 */
import service from '@/utils/request'
import { download } from '@/utils'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 */
export function pageApi(params) {
  return service({
    url: '/admin/test/page',
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
    url: '/admin/test/info',
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
    url: '/admin/test/create',
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
    url: '/admin/test/update',
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
    url: '/admin/test/delete',
    method: 'post',
    data
  })
}

/**
 * 导出
 * @returns
 */
export async function exportApi(params) {
  const r = await service({
    url: '/admin/test/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
