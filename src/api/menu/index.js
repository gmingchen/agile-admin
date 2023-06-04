import service from '@/utils/request'

/**
 * @description: 获取所有菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function listApi() {
  return service({
    url: '/admin/menu/list',
    method: 'get'
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function infoApi(params) {
  return service({
    url: '/admin/menu/info',
    method: 'get',
    params
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function createApi(params) {
  return service({
    url: `/admin/menu/create`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function updateApi(params) {
  return service({
    url: `/admin/menu/update`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function deleteApi(params) {
  return service({
    url: `/admin/menu/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 拖拽 更新 父级ID 和 排序
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function dragApi(params) {
  return service({
    url: `/admin/menu/drag`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 获取未禁用的所有菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selectApi() {
  return service({
    url: '/admin/menu/select',
    method: 'get'
  })
}
