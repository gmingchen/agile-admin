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
import { User } from '@/types/user'

interface pageParams extends Axios.PageParams {
  username: string
  nickname: string
}

/**
 * @description: 获取用户
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function getPage(params: pageParams): Promise<Axios.Response<Axios.PageData<User.Vo>>> {
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
export function info(params: number): Promise<Axios.Response<User.Vo>> {
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
export function add(params: User.Dto): Promise<Axios.Response<null>> {
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
export function edit(params: User.Dto): Promise<Axios.Response<null>> {
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
export function del(params: number[]): Promise<Axios.Response<null>> {
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
export function setStatus(params: Axios.StatusParams): Promise<Axios.Response<null>> {
  return service({
    url: '/base/user/status',
    method: 'post',
    data: params
  })
}
