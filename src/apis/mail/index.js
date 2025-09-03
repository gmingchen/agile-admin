import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 邮件记录分页列表
 * @param {*} params
 * @returns
 */
export const mailPageApi = params => doGet('/admin/mail/page', params)

/**
 * 邮件记录详情
 * @param {*} params
 * @returns
*/
export const mailInfoApi = params => doGet('/admin/mail/info', params)

/**
 * 邮件记录删除
 * @param {*} params
 * @returns
*/
export const mailDeleteApi = params => doJson('/admin/mail/delete', params)

/**
 * 邮件记录发送
 * @param {*} params
 * @returns
*/
export const mailSendApi = params => doJson('/admin/mail/send', params)

/**
 * 邮件记录导出
 * @param {*} params
 * @returns
*/
export const mailExportApi = params => doGetBlob('/admin/mail/export', params)
