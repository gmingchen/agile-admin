/*
 * @Description: 邮件记录
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-06-01 09:16:10
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
    url: '/admin/mail/page',
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
    url: '/admin/mail/info',
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
    url: '/admin/mail/delete',
    method: 'post',
    data
  })
}

/**
 * @description: 推送
 * @param {*}
 * @return {*}
 */
export function sendApi(data) {
  return service({
    url: '/admin/mail/send',
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
    url: 'admin/mail/export',
    method: 'get',
    responseType: 'blob',
    params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}
