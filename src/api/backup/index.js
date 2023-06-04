/*
 * @Description: 数据库备份
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-06-02 13:17:23
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
    url: '/admin/backup/page',
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
    url: '/admin/backup/info',
    method: 'get',
    params
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*}
 */
export function deleteApi(data) {
  return service({
    url: '/admin/backup/delete',
    method: 'post',
    data
  })
}

/**
 * @description: 备份
 * @param {*}
 * @return {*}
 */
export function backupApi() {
  return service({
    url: '/admin/backup/backup',
    method: 'post'
  })
}

/**
 * @description: 恢复
 * @param {*}
 * @return {*}
 */
export function recoveryApi(data) {
  return service({
    url: '/admin/backup/recovery',
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
    url: 'admin/backup/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
