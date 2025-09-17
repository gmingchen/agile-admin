import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 角色分页列表
 * @param {*} params
 * @returns
 */
export const rolePageApi = params => doGet('/admin/role/page', params)

/**
 * 角色详情
 * @param {*} params
 * @returns
*/
export const roleInfoApi = params => doGet('/admin/role/info', params)

/**
 * 角色新增
 * @param {*} params
 * @returns
*/
export const roleCreateApi = params => doJson('/admin/role/create', params)

/**
 * 角色修改
 * @param {*} params
 * @returns
*/
export const roleUpdateApi = params => doJson('/admin/role/update', params)

/**
 * 角色删除
 * @param {*} params
 * @returns
*/
export const roleDeleteApi = params => doJson('/admin/role/delete', params)

/**
 * 角色状态设置
 * @param {*} params
 * @returns
*/
export const roleSetStatusApi = params => doJson('/admin/role/status', params)

/**
 * 角色导出
 * @param {*} params
 * @returns
*/
export const roleExportApi = params => doGetBlob('/admin/role/export', params)

/**
 * 角色选择列表
 * @param {*} params
 * @returns
*/
export const roleSelectListApi = params => doGet('/admin/role/select', params)

/**
 * 角色设置权限
 * @param {*} params
 * @returns
*/
export const roleSetPermissionApi = params => doJson('/admin/role/permission', params)

/**
 * 角色设置数据权限
 * @param {*} params
 * @returns
*/
export const roleSetDataPermissionApi = params => doJson('/admin/role/data', params)
