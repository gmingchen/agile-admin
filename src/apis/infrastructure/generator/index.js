import { doGet, doJsonBlob } from '@/common/utils'

/**
 * 表格分页列表
 * @param {*} params
 * @returns
 */
export const generatorPageApi = params => doGet('/admin/generator/page', params)

/**
 * 代码生成
 * @param {*} params
 * @returns
 */
export const generatorGenerateApi = params => doJsonBlob('/admin/generator/generate', params)
