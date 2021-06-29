/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 22:59:24
 */
import service from '@/utils/request'
import { Axios } from '@/types/axios'
import { Role } from '@/types/role'

interface pageParams extends Axios.PageParams {
  name: string
}

/**
 * @description: 获取角色
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getPage(params: pageParams): Promise<Axios.Response<Axios.PageData<Role.Base>>> {
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
export function info(params: number): Promise<Axios.Response<Role.Dto>> {
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
export function add(params: Role.Dto): Promise<Axios.Response<null>> {
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
export function edit(params: Role.Dto): Promise<Axios.Response<null>> {
  return service({
    url: '/base/role/update',
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
export function del(params: number[]): Promise<Axios.Response<null>> {
  return service({
    url: '/base/role/delete',
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
export function select(): Promise<Axios.Response<Role.Simple[]>> {
  return service({
    url: '/base/role/select',
    method: 'get'
  })
}
