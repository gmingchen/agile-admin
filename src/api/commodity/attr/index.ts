/*
 * @Description: 模型参数
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-03 10:32:42
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
    url: '/admin/goodsmodelattr/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 详情
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function info(params: IObject) {
  return service({
    url: '/admin/goodsmodelattr/info',
    method: 'get',
    params: params
  })
}

/**
 * @description: 新增
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function save(params: IObject) {
  return service({
    url: '/admin/goodsmodelattr/save',
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function edit(params: IObject) {
  return service({
    url: '/admin/goodsmodelattr/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function del(params: number[]) {
  return service({
    url: '/admin/goodsmodelattr/delete',
    method: 'post',
    data: params
  })
}
