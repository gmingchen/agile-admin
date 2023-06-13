import service from '@/utils/request'

/**
 * 分页
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/admin/online/page',
    method: 'get',
    params
  })
}

/**
 * 强制退出
 * @param {*} data
 * @returns
 */
export function logoutApi(data) {
  return service({
    url: '/admin/online/logout',
    method: 'post',
    data
  })
}
