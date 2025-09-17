import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 定时任务分页列表
 * @param {*} params
 * @returns
 */
export const jobPageApi = params => doGet('/admin/job/page', params)

/**
 * 定时任务详情
 * @param {*} params
 * @returns
*/
export const jobInfoApi = params => doGet('/admin/job/info', params)

/**
 * 定时任务新增
 * @param {*} params
 * @returns
*/
export const jobCreateApi = params => doJson('/admin/job/create', params)

/**
 * 定时任务修改
 * @param {*} params
 * @returns
*/
export const jobUpdateApi = params => doJson('/admin/job/update', params)

/**
 * 定时任务删除
 * @param {*} params
 * @returns
*/
export const jobDeleteApi = params => doJson('/admin/job/delete', params)

/**
 * 定时任务执行
 * @param {*} params
 * @returns
*/
export const jobRunApi = params => doJson('/admin/job/run', params)

/**
 * 定时任务恢复
 * @param {*} params
 * @returns
*/
export const jobResumeApi = params => doJson('/admin/job/resume', params)

/**
 * 定时任务暂停
 * @param {*} params
 * @returns
*/
export const jobPauseApi = params => doJson('/admin/job/pause', params)

/* ***************************************************************************************** */

/**
 * 定时任务日志分页列表
 * @param {*} params
 * @returns
 */
export const jobLogPageApi = params => doGet('/admin/log/job/page', params)

/**
 * 定时任务日志导出
 * @param {*} params
 * @returns
*/
export const jobLogExportApi = params => doGetBlob('/admin/log/job/export', params)
