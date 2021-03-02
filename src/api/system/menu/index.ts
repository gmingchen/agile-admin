/*
 * @Description: 菜单管理
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-22 10:24:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-02 13:27:31
 */
import service from '@U/request'
import { IObject } from '@/utils/index.type'
import store from '@/store'

/**
 * @description: 列表
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function list() {
  return service({
    url: '/admin/menu/list',
    method: 'get'
  })
}

/**
 * @description: 详情
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function info(params: number) {
  return service({
    url: `/admin/menu/info/${params}`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function save(params: IObject) {
  return service({
    url: '/admin/menu/save',
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
export function edit(params: IObject) {
  return service({
    url: '/admin/menu/update',
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
export function del(params: number) {
  return service({
    url: `/admin/menu/delete/${params}`,
    method: 'post'
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
    url: '/admin/menu/display',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否在标签页上显示
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function tab(params: IObject) {
  return service({
    url: '/admin/menu/tab',
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
    url: '/admin/menu/select',
    method: 'get'
  })
}

/**
 * @description: 当前用户拥有的列表
 * @param {IObject} params
 * @return {*}
 * @author: gumingchen
 */
export function owned() {
  return service({
    url: '/admin/menu/owned',
    method: 'get'
  })
}
