/*
 * @Description: 全国区域
 * @Author: 拖孩
 * @Email: 1240235512@qq.com
 * @Date: 2023-06-02 09:14:46
 */
import service from '..'

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 */
export function listApi(params) {
  return service({
    url: '/admin/region/list',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 */
export function infoApi(params) {
  return service({
    url: '/admin/region/info',
    method: 'get',
    params
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 */
export function createApi(data) {
  return service({
    url: '/admin/region/create',
    method: 'post',
    data
  })
}

/**
 * @description: 更新
 * @param {*}
 * @return {*}
 */
export function updateApi(data) {
  return service({
    url: '/admin/region/update',
    method: 'post',
    data
  })
}

/**
 * @description: 删除
 * @param {*}
 * @return {*}
 */
export function deleteApi(data) {
  return service({
    url: '/admin/region/delete',
    method: 'post',
    data
  })
}

/**
 * @description: 选择列表
 * @param {*}
 * @return {*}
 */
export function selectApi(params) {
  return service({
    url: '/admin/region/select',
    method: 'get',
    params
  })
}
