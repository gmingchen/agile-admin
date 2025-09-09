import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 部门列表
 * @param {*} params
 * @returns
 */
export const deptListApi = params => doGet('/admin/dept/list', params)

/**
 * 部门详情
 * @param {*} params
 * @returns
*/
export const deptInfoApi = params => doGet('/admin/dept/info', params)

/**
 * 部门新增
 * @param {*} params
 * @returns
*/
export const deptCreateApi = params => doJson('/admin/dept/create', params)

/**
 * 部门修改
 * @param {*} params
 * @returns
*/
export const deptUpdateApi = params => doJson('/admin/dept/update', params)

/**
 * 部门删除
 * @param {*} params
 * @returns
*/
export const deptDeleteApi = params => doJson('/admin/dept/delete', params)

/**
 * 部门状态设置
 * @param {*} params
 * @returns
*/
export const deptSetStatusApi = params => doJson('/admin/dept/status', params)

/**
 * 部门导出
 * @param {*} params
 * @returns
*/
export const deptExportApi = params => doGetBlob('/admin/dept/export', params)

/**
 * 部门选择列表
 * @param {*} params
 * @returns
*/
export const deptSelectListApi = params => doGet('/admin/dept/select', params)

/**
 * 设置数据权限
 * @param {*} data
 * @returns
 */
export const deptSetDataPermissionApi = params => doJson('/admin/dept/data', params)
