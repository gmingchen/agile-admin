/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 22:59:24
 */
import service from '@/utils/request'
import { IPageData, IResponse, IStatusParams } from '@/api/index.type'
import { IUser, IUserPageParams } from './index.type'

/**
 * @description: 获取用户
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getPage(params: IUserPageParams): Promise<IResponse<IPageData<IUser>>> {
  return service({
    url: '/base/user/page',
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
export function info(params: number): Promise<IResponse<IUser>> {
  return service({
    url: `/base/user/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function add(params: IUser): Promise<IResponse<null>> {
  return service({
    url: '/base/user/create',
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
export function edit(params: IUser): Promise<IResponse<null>> {
  return service({
    url: '/base/user/update',
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function del(params: number[]): Promise<IResponse<null>> {
  return service({
    url: '/base/user/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否在标签栏多开
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function setStatus(params: IStatusParams): Promise<IResponse<null>> {
  return service({
    url: '/base/user/status',
    method: 'post',
    data: params
  })
}
