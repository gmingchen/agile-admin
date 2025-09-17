import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 测试分页列表
 * @param {*} params
 * @returns
 */
export const testPageApi = params => doGet('/admin/test/page', params)

/**
 * 测试详情
 * @param {*} params
 * @returns
*/
export const testInfoApi = params => doGet('/admin/test/info', params)

/**
 * 测试新增
 * @param {*} params
 * @returns
*/
export const testCreateApi = params => doJson('/admin/test/create', params)

/**
 * 测试修改
 * @param {*} params
 * @returns
*/
export const testUpdateApi = params => doJson('/admin/test/update', params)

/**
 * 测试删除
 * @param {*} params
 * @returns
*/
export const testDeleteApi = params => doJson('/admin/test/delete', params)

/**
 * 测试状态设置
 * @param {*} params
 * @returns
*/
export const testSetStatusApi = params => doJson('/admin/test/status', params)

/**
 * 测试导出
 * @param {*} params
 * @returns
*/
export const testExportApi = params => doGetBlob('/admin/test/export', params)

/**
 * 测试选择列表
 * @param {*} params
 * @returns
*/
export const testSelectListApi = params => doGet('/admin/test/select', params)
