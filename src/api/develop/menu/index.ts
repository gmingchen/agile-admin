/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 23:00:11
 */
import service from '@/utils/request'
import { Axios } from '@/types/axios'
import { Menu } from '@/types/menu'

/**
 * @description: 获取权限菜单
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getList(params: { parent_id: number }): Promise<Axios.Response<Menu.Vo[]>> {
  return service({
    url: '/base/menu/list',
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
export function info(params: number): Promise<Axios.Response<Menu.Dto>> {
  return service({
    url: `/base/menu/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function add(params: Menu.Base): Promise<Axios.Response<null>> {
  return service({
    url: '/base/menu/create',
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
export function edit(params: Menu.Base): Promise<Axios.Response<null>> {
  return service({
    url: '/base/menu/update',
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
export function del(params: { id: number }): Promise<Axios.Response<null>> {
  return service({
    url: '/base/menu/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否显示
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function setDisplay(params: Axios.StatusParams): Promise<Axios.Response<null>> {
  return service({
    url: '/base/menu/display',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否缓存
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function setAlive(params: Axios.StatusParams): Promise<Axios.Response<null>> {
  return service({
    url: '/base/menu/alive',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否显示在标签栏
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function setTab(params: Axios.StatusParams): Promise<Axios.Response<null>> {
  return service({
    url: '/base/menu/tab',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否在标签栏多开
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function setMultiple(params: Axios.StatusParams): Promise<Axios.Response<null>> {
  return service({
    url: '/base/menu/multiple',
    method: 'post',
    data: params
  })
}

/**
 * @description: 下拉列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function select(): Promise<Axios.Response<Menu.Simple[]>> {
  return service({
    url: '/base/menu/select',
    method: 'get'
  })
}

/**
 * @description: 当前用户下拉列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function selfSelect(): Promise<Axios.Response<Menu.Simple[]>> {
  return service({
    url: '/base/menu/self/select',
    method: 'get'
  })
}
