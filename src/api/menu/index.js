/*
 * @Description: 菜单
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'

/**
 * @description: 获取所有菜单 权限
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selectListApi() {
  return service({
    url: '/backstage/menu/select/list',
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
    url: `/backstage/menu/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function addApi(params) {
  return service({
    url: `/backstage/menu/create`,
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
export function editApi(params) {
  return service({
    url: `/backstage/menu/update`,
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
    url: `/backstage/menu/delete`,
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
    url: `/backstage/menu/drag`,
    method: 'post',
    data: params
  })
}
