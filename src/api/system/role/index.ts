/*
 * @Description: 版本控制
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-02 13:29:09
 */
import service from '@U/request'
import { IObject } from '@/utils/index.type'

/**
 * @description: 列表
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function pageList(params: IObject) {
  return service({
    url: '/admin/role/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 详情
 * @param {number} params
 * @return {*}
 * @author: gumingchen
 */
export function info(params: number) {
  return service({
    url: `/admin/role/info/${params}`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {IObject}
 * @return {*}
 * @author: gumingchen
 */
export function save(params: IObject) {
  return service({
    url: '/admin/role/save',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {IObject}
 * @return {*}
 * @author: gumingchen
 */
export function edit(params: IObject) {
  return service({
    url: '/admin/role/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {number[]} params
 * @return {*}
 * @author: gumingchen
 */
export function del(params: number[]) {
  return service({
    url: '/admin/role/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 下拉列表
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function select() {
  return service({
    url: '/admin/role/select',
    method: 'get'
  })
}
