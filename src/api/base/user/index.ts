/*
 * @Description: 用户
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:03
 */
import service from '@/utils/request'
import { PageData, PageParams, ResponseData, StatusParams } from 'axios'
import { User } from 'Type/user'

interface pageParams extends PageParams {
  username: string
  nickname: string
}

/**
 * @description: 分页列表
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params: pageParams): Promise<ResponseData<PageData<User.Vo>>> {
  return service({
    url: '/base/user/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export function infoApi(params: number): Promise<ResponseData<User.Vo>> {
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
export function addApi(params: User.Dto): Promise<ResponseData<null>> {
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
export function editApi(params: User.Dto): Promise<ResponseData<null>> {
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
export function delApi(params: number[]): Promise<ResponseData<null>> {
  return service({
    url: '/base/user/delete',
    method: 'post',
    data: params
  })
}

/**
 * @description: 是否禁用
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function statusApi(params: StatusParams): Promise<ResponseData<null>> {
  return service({
    url: '/base/user/status',
    method: 'post',
    data: params
  })
}
