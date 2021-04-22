/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 23:00:11
 */
import service from '@/utils/request'
import { IResponse, IStatusParams } from '@/api/index.type'
import { IMenu, IMenuParams, IMenuSelect } from './index.type'

/**
 * @description: 获取权限菜单
 * @param {params} IGetListParams
 * @return {*}
 * @author: gumingchen
 */
export function getList(params: { parent_id: number }): Promise<IResponse<IMenu[]>> {
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
export function info(params: number): Promise<IResponse<IMenuParams>> {
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
export function add(params: IMenuParams): Promise<IResponse<null>> {
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
export function edit(params: IMenuParams): Promise<IResponse<null>> {
  return service({
    url: '/base/menu/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {IStatusParams} params
 * @return {*}
 * @author: gumingchen
 */
export function del(params: { id: number }): Promise<IResponse<null>> {
  return service({
    url: '/base/menu/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否显示
 * @param {IStatusParams} params
 * @return {*}
 * @author: gumingchen
 */
export function setDisplay(params: IStatusParams): Promise<IResponse<null>> {
  return service({
    url: '/base/menu/display',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否缓存
 * @param {IStatusParams} params
 * @return {*}
 * @author: gumingchen
 */
export function setAlive(params: IStatusParams): Promise<IResponse<null>> {
  return service({
    url: '/base/menu/alive',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否显示在标签栏
 * @param {IStatusParams} params
 * @return {*}
 * @author: gumingchen
 */
export function setTab(params: IStatusParams): Promise<IResponse<null>> {
  return service({
    url: '/base/menu/tab',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否在标签栏多开
 * @param {IStatusParams} params
 * @return {*}
 * @author: gumingchen
 */
export function setMultiple(params: IStatusParams): Promise<IResponse<null>> {
  return service({
    url: '/base/menu/multiple',
    method: 'post',
    data: params
  })
}

/**
 * @description: 下拉列表
 * @param {params} IGetListParams
 * @return {*}
 * @author: gumingchen
 */
export function select(): Promise<IResponse<IMenuSelect[]>> {
  return service({
    url: '/base/menu/select',
    method: 'get'
  })
}

/**
 * @description: 下拉列表
 * @param {params} IGetListParams
 * @return {*}
 * @author: gumingchen
 */
export function selfSelect(): Promise<IResponse<IMenuSelect[]>> {
  return service({
    url: '/base/menu/self/select',
    method: 'get'
  })
}
