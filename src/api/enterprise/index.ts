/*
 * @Description: 企业
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import type { IAxios } from '@/types'
import type { Enterprise } from '@/types/enterprise'
import service from '@/utils/request'

interface PageDataParams extends IAxios.PageDateParams {
  name: string
}
interface PageParams extends IAxios.PageParams {
  name: string
}

/**
 * @description: 获取当前管理员所在企业
 * @return {*}
 * @author: gumingchen
 */
export function selfInfoApi(): Promise<IAxios.ResponseData<Enterprise.Base>> {
  return service({
    url: '/admin/enterprise/self/info',
    method: 'get'
  })
}

/**
 * @description: 分页
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params: PageDataParams): Promise<IAxios.ResponseData<IAxios.PageData<Enterprise.Base>>> {
  return service({
    url: '/admin/enterprise/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function infoApi(params: number): Promise<IAxios.ResponseData<Enterprise.Base>> {
  return service({
    url: `/admin/enterprise/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function addApi(params: Enterprise.Base): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/enterprise/create`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function editApi(params: Enterprise.Base): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/enterprise/update`,
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
export function deleteApi(params: number[]): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/enterprise/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 设置是否启用
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function setStatusApi(params: IAxios.StatusParams): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/enterprise/status`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 分页-精简信息 只有 id name 字段
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function pageSimplifyApi(params: PageParams): Promise<IAxios.ResponseData<Enterprise.Simple[]>> {
  return service({
    url: '/admin/enterprise/global/page',
    method: 'get',
    params: params
  })
}
