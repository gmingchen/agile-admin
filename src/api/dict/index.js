import service from '@/utils/request'

/**
 * 所有数据
 * @returns
 */
export function listApi() {
  return service({
    url: '/admin/dict/list',
    method: 'get'
  })
}

/**
 * 详情
 * @param {*} params
 * @returns
 */
export function infoApi(params) {
  return service({
    url: '/admin/dict/info',
    method: 'get',
    params
  })
}

/**
 * 新增
 * @param {*} data
 * @returns
 */
export function createApi(data) {
  return service({
    url: '/admin/dict/create',
    method: 'post',
    data
  })
}

/**
 * 更新
 * @param {*} data
 * @returns
 */
export function updateApi(data) {
  return service({
    url: '/admin/dict/update',
    method: 'post',
    data
  })
}

/**
 * 删除
 * @param {*} data
 * @returns
 */
export function deleteApi(data) {
  return service({
    url: '/admin/dict/delete',
    method: 'post',
    data
  })
}

/* ****************************************************************************************** */

/**
 * 副表所有数据
 * @param {*} params
 * @returns
 */
export function subListApi(params) {
  return service({
    url: '/admin/dict/sub/list',
    method: 'get',
    params
  })
}

/**
 * 详情
 * @param {*} params
 * @returns
 */
export function subInfoApi(params) {
  return service({
    url: '/admin/dict/sub/info',
    method: 'get',
    params
  })
}

/**
 * 新增
 * @param {*} data
 * @returns
 */
export function subCreateApi(data) {
  return service({
    url: '/admin/dict/sub/create',
    method: 'post',
    data
  })
}

/**
 * 更新
 * @param {*} data
 * @returns
 */
export function subUpdateApi(data) {
  return service({
    url: '/admin/dict/sub/update',
    method: 'post',
    data
  })
}

/**
 * 删除
 * @param {*} data
 * @returns
 */
export function subDeleteApi(data) {
  return service({
    url: '/admin/dict/sub/delete',
    method: 'post',
    data
  })
}

/**
 * 状态切换
 * @param {*} data
 * @returns
 */
export function subSetStatusApi(data) {
  return service({
    url: '/admin/dict/sub/status',
    method: 'post',
    data
  })
}

/**
 * 通过字典编码查询有效数据
 * @param {*} data
 * @returns
 */
export function subSelectListApi(params) {
  return service({
    url: '/admin/dict/sub/select/list',
    method: 'get',
    params
  })
}
