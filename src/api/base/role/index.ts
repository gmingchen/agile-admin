/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 22:59:24
 */
import service from '@/utils/request'
import { IPageData, IResponse } from '@/api/index.type'
import { IRole, IRolePageParams } from './index.type'

/**
 * @description: 获取角色
 * @param {params} IGetListParams
 * @return {*}
 * @author: gumingchen
 */
export function getPage(params: IRolePageParams): Promise<IResponse<IPageData<IRole>>> {
  return service({
    url: '/base/role/page',
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
export function info(params: number): Promise<IResponse<IRole>> {
  return service({
    url: `/base/role/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function add(params: IRole): Promise<IResponse<null>> {
  return service({
    url: '/base/role/create',
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
export function edit(params: IRole): Promise<IResponse<null>> {
  return service({
    url: '/base/role/update',
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
export function del(params: number[]): Promise<IResponse<null>> {
  return service({
    url: '/base/role/delete',
    method: 'post',
    data: params
  })
}

// /**
//  * @description: 下拉列表
//  * @param {params} IGetListParams
//  * @return {*}
//  * @author: gumingchen
//  */
// export function select(): Promise<IResponse<IMenuSelect[]>> {
//   return service({
//     url: '/base/menu/select',
//     method: 'get'
//   })
// }
