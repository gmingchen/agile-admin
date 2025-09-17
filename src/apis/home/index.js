import { doGet } from '@/common/utils'

/**
 * 用户量统计
 * @param {*} params
 * @returns
 */
export const userStatApi = params => doGet('/admin/home/user/counting', params)

/**
 * 用户区域统计
 * @param {*} params
 * @returns
 */
export const userRegionStatApi = params => doGet('/admin/home/user/region', params)

/**
 * 近一个月用户访问量统计
 * @param {*} params
 * @returns
 */
export const userVisitsStatApi = params => doGet('/admin/home/user/visits', params)

/**
 * 近一个月用户增长量统计
 * @param {*} params
 * @returns
 */
export const userGrowthStatApi = params => doGet('/admin/home/user/growth', params)
