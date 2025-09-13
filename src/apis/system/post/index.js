import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 岗位分页列表
 * @param {*} params
 * @returns
 */
export const postPageApi = params => doGet('/admin/post/page', params)

/**
 * 岗位详情
 * @param {*} params
 * @returns
*/
export const postInfoApi = params => doGet('/admin/post/info', params)

/**
 * 岗位新增
 * @param {*} params
 * @returns
*/
export const postCreateApi = params => doJson('/admin/post/create', params)

/**
 * 岗位修改
 * @param {*} params
 * @returns
*/
export const postUpdateApi = params => doJson('/admin/post/update', params)

/**
 * 岗位删除
 * @param {*} params
 * @returns
*/
export const postDeleteApi = params => doJson('/admin/post/delete', params)

/**
 * 岗位状态设置
 * @param {*} params
 * @returns
*/
export const postSetStatusApi = params => doJson('/admin/post/status', params)

/**
 * 岗位导出
 * @param {*} params
 * @returns
*/
export const postExportApi = params => doGetBlob('/admin/post/export', params)

/**
 * 岗位选择列表
 * @param {*} params
 * @returns
*/
export const postSelectListApi = params => doGet('/admin/post/select', params)
