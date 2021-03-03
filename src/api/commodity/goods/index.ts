/*
 * @Description: 商品
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-03 15:29:29
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
    url: '/admin/goods/page',
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
    url: '/admin/goods/info',
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
    url: '/admin/goods/save',
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
    url: '/admin/goods/update',
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
    url: '/admin/goods/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 上下架
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function status(params: IObject) {
  return service({
    url: '/admin/goods/status',
    method: 'post',
    data: params
  })
}

/**
 * @description: 推荐
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function recommended(params: IObject) {
  return service({
    url: '/admin/goods/recommended',
    method: 'post',
    data: params
  })
}
