import { doGet, doJson, doGetBlob } from '@/common/utils'

/**
 * 备份分页列表
 * @param {*} params
 * @returns
 */
export const backupPageApi = params => doGet('/admin/backup/page', params)

/**
 * 备份详情
 * @param {*} params
 * @returns
*/
export const backupInfoApi = params => doGet('/admin/backup/info', params)

/**
 * 备份删除
 * @param {*} params
 * @returns
*/
export const backupDeleteApi = params => doJson('/admin/backup/delete', params)

/**
 * 备份
 * @param {*} params
 * @returns
*/
export const backupBackupApi = params => doJson('/admin/backup/backup', params)

/**
 * 恢复
 * @param {*} params
 * @returns
 */
export const backupRecoveryApi = params => doJson('/admin/backup/recovery', params)

/**
 * 备份导出
 * @param {*} params
 * @returns
*/
export const backupExportApi = params => doGetBlob('/admin/backup/export', params)
