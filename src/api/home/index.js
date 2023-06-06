import service from '@/utils/request'

/**
 * 用户量统计
 * @param {*} params
 * @returns
 */
export function userCountingApi(params) {
  return service({
    url: '/admin/home/user/counting',
    method: 'get',
    params
  })
}

/**
 * 用户区域统计
 * @param {*} params
 * @returns
 */
export function userRegionApi(params) {
  return service({
    url: '/admin/home/user/region',
    method: 'get',
    params
  })
}

/**
 * 近一个月用户访问量统计
 * @param {*} params
 * @returns
 */
export function userVisitsApi(params) {
  return service({
    url: '/admin/home/user/visits',
    method: 'get',
    params
  })
}

/**
 * 近一个月用户增长量统计
 * @param {*} params
 * @returns
 */
export function userGrowthApi(params) {
  return service({
    url: '/admin/home/user/growth',
    method: 'get',
    params
  })
}
