/*
 * @Description: 管理员
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:25:18
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:47:56
 */
import service from '@/utils/request'
import { download } from '@/utils'
import type { IAxios } from '@/types'
import type { Administrator } from '@/types/administrator'

interface EditBasicParams {
  avatar: string
  nickname: string
  mobile: string
  email: string
  sex: 0 | 1 | 2
}

interface EditPasswordParams {
  ew_password: string
  old_password: string
}

interface PageDataParams extends IAxios.PageDateParams {
  name: string
  department: string
}

export interface ExportParams extends IAxios.DateParams {
  name: string
  department: string
}

/**
 * @description: 获取当前管理员
 * @return {*}
 * @author: gumingchen
 */
export function selfInfoApi(): Promise<IAxios.ResponseData<Administrator.Expand>> {
  return service({
    url: '/admin/administrator/self/info',
    method: 'get'
  })
}

/**
 * @description: 编辑基础信息
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function editBasicApi(params: EditBasicParams): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/update/basic`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑密码
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function editPasswordApi(params: EditPasswordParams): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/update/password`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 超级管理员获取当前企业下的所有管理员 否则 获取当前管理员创建的管理员
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function pageApi(params: PageDataParams): Promise<IAxios.ResponseData<IAxios.PageData<Administrator.Expand>>> {
  return service({
    url: '/admin/administrator/page',
    method: 'get',
    params: params
  })
}

/**
 * @description: 信息
 * @return {*}
 * @author: gumingchen
 */
export function infoApi(params: number): Promise<IAxios.ResponseData<Administrator.Expand>> {
  return service({
    url: `/admin/administrator/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @return {*}
 * @author: gumingchen
 */
export function addApi(params: Administrator.Expand): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/create`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 编辑
 * @return {*}
 * @author: gumingchen
 */
export function editApi(params: Administrator.Expand): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/update`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 删除
 * @return {*}
 * @author: gumingchen
 */
export function deleteApi(params: number[]): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/delete`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 设置是否启用
 * @return {*}
 * @author: gumingchen
 */
export function setStatusApi(params: IAxios.StatusParams): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/status`,
    method: 'post',
    data: params
  })
}

/**
 * @description: 导出
 * @return {*} params
 * @author: gumingchen
 */
export async function exportApi(params: ExportParams): Promise<void> {
  const r: IAxios.ResponseStream = await service({
    url: '/admin/administrator/export',
    method: 'get',
    responseType: 'blob',
    params: params
  })
  if (r) {
    const { blob, name } = r
    download(blob, name)
  }
}

// todo:------------------------------------------------------------------------------------

/**
 * @description: 获取企业下所有的管理员
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function globalPageApi(params: PageDataParams): Promise<IAxios.ResponseData<IAxios.PageData<Administrator.Expand>>> {
  return service({
    url: '/admin/administrator/global/page',
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
export function globalInfoApi(params: number): Promise<IAxios.ResponseData<Administrator.Expand>> {
  return service({
    url: `/admin/administrator/global/info/${ params }`,
    method: 'get'
  })
}

/**
 * @description: 新增
 * @param {*} params
 * @return {*}
 * @author: gumingchen
 */
export function globalAddApi(params: Administrator.Expand): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/global/create`,
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
export function globalEditApi(params: Administrator.Expand): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/global/update`,
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
export function globalDeleteApi(params: number[]): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/global/delete`,
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
export function globalSetStatusApi(params: IAxios.StatusParams): Promise<IAxios.ResponseData<null>> {
  return service({
    url: `/admin/administrator/global/status`,
    method: 'post',
    data: params
  })
}
