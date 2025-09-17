import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 通知模板分页列表
 * @param {*} params
 * @returns
 */
export const noticeTemplatePageApi = params => doGet('/admin/notice/template/page', params)

/**
 * 通知模板详情
 * @param {*} params
 * @returns
*/
export const noticeTemplateInfoApi = params => doGet('/admin/notice/template/info', params)

/**
 * 通知模板新增
 * @param {*} params
 * @returns
*/
export const noticeTemplateCreateApi = params => doJson('/admin/notice/template/create', params)

/**
 * 通知模板修改
 * @param {*} params
 * @returns
*/
export const noticeTemplateUpdateApi = params => doJson('/admin/notice/template/update', params)

/**
 * 通知模板删除
 * @param {*} params
 * @returns
*/
export const noticeTemplateDeleteApi = params => doJson('/admin/notice/template/delete', params)

/**
 * 通知模板状态设置
 * @param {*} params
 * @returns
*/
export const noticeTemplateSetStatusApi = params => doJson('/admin/notice/template/status', params)

/**
 * 通知模板导出
 * @param {*} params
 * @returns
*/
export const noticeTemplateExportApi = params => doGetBlob('/admin/notice/template/export', params)

/**
 * 通知模板选择列表
 * @param {*} params
 * @returns
*/
export const noticeTemplateSelectListApi = params => doGet('/admin/notice/template/select', params)

/* ***************************************************************************************** */

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

/* ***************************************************************************************** */

/**
 * 当前管理员通知分页列表
 * @param {*} params
 * @returns
 */
export const selfNoticePageApi = params => doGet('/admin/adminer/notice/page', params)

/**
 * 当前管理员通知未读分页列表
 * @param {*} params
 * @returns
 */
export const selfNoticeUnreadPageApi = params => doGet('/admin/adminer/notice/unread/page', params)

/**
 * 当前管理员通知删除
 * @param {*} params
 * @returns
*/
export const selfNoticeDeleteApi = params => doJson('/admin/adminer/notice/delete', params)

/**
 * 当前管理员通知状态设置
 * @param {*} params
 * @returns
*/
export const selfNoticeSetStatusApi = params => doJson('/admin/adminer/notice/status', params)
