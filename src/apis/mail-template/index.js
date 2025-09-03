import { doGet, doJson, doGetBlob } from '@/common/utils'

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
