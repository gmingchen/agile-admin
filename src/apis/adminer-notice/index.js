import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 当前管理员通知分页列表
 * @param {*} params
 * @returns
 */
export const adminerNoticePageApi = params => doGet('/admin/adminer/notice/page', params)

/**
 * 当前管理员通知未读分页列表
 * @param {*} params
 * @returns
 */
export const adminerNoticeUnreadPageApi = params => doGet('/admin/adminer/notice/unread/page', params)

/**
 * 当前管理员通知删除
 * @param {*} params
 * @returns
*/
export const adminerNoticeDeleteApi = params => doJson('/admin/adminer/notice/delete', params)

/**
 * 当前管理员通知状态设置
 * @param {*} params
 * @returns
*/
export const adminerNoticeSetStatusApi = params => doJson('/admin/adminer/notice/status', params)
