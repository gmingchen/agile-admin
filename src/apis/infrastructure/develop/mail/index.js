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

/* ***************************************************************************************** */

/**
 * 邮箱模板分页列表
 * @param {*} params
 * @returns
 */
export const mailTemplatePageApi = params => doGet('/admin/mail/template/page', params)

/**
 * 邮箱模板详情
 * @param {*} params
 * @returns
*/
export const mailTemplateInfoApi = params => doGet('/admin/mail/template/info', params)

/**
 * 邮箱模板新增
 * @param {*} params
 * @returns
*/
export const mailTemplateCreateApi = params => doJson('/admin/mail/template/create', params)

/**
 * 邮箱模板修改
 * @param {*} params
 * @returns
*/
export const mailTemplateUpdateApi = params => doJson('/admin/mail/template/update', params)

/**
 * 邮箱模板删除
 * @param {*} params
 * @returns
*/
export const mailTemplateDeleteApi = params => doJson('/admin/mail/template/delete', params)

/**
 * 邮箱模板状态设置
 * @param {*} params
 * @returns
*/
export const mailTemplateSetStatusApi = params => doJson('/admin/mail/template/status', params)

/**
 * 邮箱模板导出
 * @param {*} params
 * @returns
*/
export const mailTemplateExportApi = params => doGetBlob('/admin/mail/template/export', params)

/**
 * 邮箱模板选择列表
 * @param {*} params
 * @returns
*/
export const mailTemplateSelectListApi = params => doGet('/admin/mail/template/select', params)

/* ***************************************************************************************** */

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
