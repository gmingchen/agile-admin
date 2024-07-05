import service from '..'

/**
 * 配置分页
 * @param {*} params
 * @returns
 */
export function pageApi(params) {
  return service({
    url: '/admin/job/page',
    method: 'get',
    params
  })
}

/**
 * 详情
 * @param {*} params
 * @returns
 */
export function infoApi(params) {
  return service({
    url: '/admin/job/info',
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
    url: '/admin/job/create',
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
    url: '/admin/job/update',
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
    url: '/admin/job/delete',
    method: 'post',
    data
  })
}

/**
 * 执行
 * @param {*} data
 * @returns
 */
export function runApi(data) {
  return service({
    url: '/admin/job/run',
    method: 'post',
    data
  })
}

/**
 * 恢复
 * @param {*} data
 * @returns
 */
export function resumeApi(data) {
  return service({
    url: '/admin/job/resume',
    method: 'post',
    data
  })
}

/**
 * 暂停
 * @param {*} data
 * @returns
 */
export function pauseApi(data) {
  return service({
    url: '/admin/job/pause',
    method: 'post',
    data
  })
}

