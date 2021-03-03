/*
 * @Description: 商品模型
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-03 11:50:03
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
    url: '/admin/goodstype/page',
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
    url: '/admin/goodstype/info',
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
    url: '/admin/goodstype/save',
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
    url: '/admin/goodstype/update',
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
    url: '/admin/goodstype/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否显示
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function display(params: IObject) {
  return service({
    url: '/admin/goodstype/display',
    method: 'post',
    data: params
  })
}

/**
 * @description: 下拉选择
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function select() {
  return service({
    url: '/admin/goodstype/select',
    method: 'get'
  })
}

/**
 * @description: 分类查询模型
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function typeModel(params: IObject) {
  return service({
    url: '/admin/goodstype/model',
    method: 'get',
    params: params
  })
}
