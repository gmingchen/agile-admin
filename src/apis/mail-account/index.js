import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 邮箱账号分页列表
 * @param {*} params
 * @returns
 */
export const mailAccountPageApi = params => doGet('/admin/mail/account/page', params)

/**
 * 邮箱账号详情
 * @param {*} params
 * @returns
*/
export const mailAccountInfoApi = params => doGet('/admin/mail/account/info', params)

/**
 * 邮箱账号新增
 * @param {*} params
 * @returns
*/
export const mailAccountCreateApi = params => doJson('/admin/mail/account/create', params)

/**
 * 邮箱账号修改
 * @param {*} params
 * @returns
*/
export const mailAccountUpdateApi = params => doJson('/admin/mail/account/update', params)

/**
 * 邮箱账号删除
 * @param {*} params
 * @returns
*/
export const mailAccountDeleteApi = params => doJson('/admin/mail/account/delete', params)

/**
 * 邮箱账号主配置设置
 * @param {*} params
 * @returns
*/
export const mailAccountSetMasterApi = params => doJson('/admin/mail/account/master', params)

/**
 * 邮箱账号导出
 * @param {*} params
 * @returns
*/
export const mailAccountExportApi = params => doGetBlob('/admin/mail/account/export', params)
