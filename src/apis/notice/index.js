import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 通知分页列表
 * @param {*} params
 * @returns
 */
export const noticePageApi = params => doGet('/admin/notice/page', params)

/**
 * 通知删除
 * @param {*} params
 * @returns
*/
export const noticeDeleteApi = params => doJson('/admin/notice/delete', params)

/**
 * 通知导出
 * @param {*} params
 * @returns
*/
export const noticeExportApi = params => doGetBlob('/admin/notice/export', params)

/**
 * 通知推送
 * @param {*} params
 * @returns
*/
export const noticePushApi = params => doJson('/admin/notice/push', params)
