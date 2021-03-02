/*
 * @Description: 管理员管理
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-02 16:17:32
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
    url: '/admin/user/page',
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
    url: `/admin/user/info/${params}`,
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
    url: '/admin/user/save',
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
    url: '/admin/user/update',
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
    url: '/admin/user/delete',
    method: 'post',
    data: params
  })
}
