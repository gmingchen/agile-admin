/*
 * @Description: 商品模型
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-22 11:13:54
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
    url: '/admin/goodsmodel/page',
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
    url: '/admin/goodsmodel/info',
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
    url: '/admin/goodsmodel/save',
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
    url: '/admin/goodsmodel/update',
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
    url: '/admin/goodsmodel/update',
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
    url: '/admin/goodsmodel/select',
    method: 'get'
  })
}
