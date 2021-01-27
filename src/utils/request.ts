/*
 * @Description: axios二次封装
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-21 16:45:49
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-27 16:47:33
 */
'use strict'
import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'
import store from '@/store/index'
import { ContentType, PromptComponentType } from '@/config/index.type'
import { timeout, contentType, successCode, promptComponent, promptMessage, promptDuration, loadSwitch, loadTimeout, loadOptions } from '@C/index'
import { ElMessage, ElNotification, ElMessageBox, ElLoading } from 'element-plus'

let loadingService

/**
 * @description: loading
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const loadHandle = (): void => {
  if (loadSwitch && !loadingService) {
    loadingService = ElLoading.service(loadOptions)
  }
}

/**
 * 异常消息提示
 * @param msg
 */
const prompt = (msg: string | ''): void => {
  switch (promptComponent) {
    case PromptComponentType.MESSAGE:
      ElMessage({
        message: msg,
        type: promptMessage,
        duration: promptDuration
      })
      break
    case PromptComponentType.NOTIFY:
      ElNotification({
        message: msg,
        type: promptMessage,
        duration: promptDuration
      })
      break
    case PromptComponentType.ALERT:
      ElMessageBox({
        message: msg,
        type: promptMessage,
        showConfirmButton: true
      })
      break
  }
}

/**
 * @description: code处理
 * @param {number} code
 * @param {string} msg
 * @return {*}
 * @author: gumingchen
 */
const codeHandle = (code: number | null, msg: string | ''): void => {
  switch (code) {
    case 401:
      prompt(msg)
      break
  }
}

/**
 * @description: axios创建
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: timeout,
  headers: {
    'Content-Type': contentType
  }
})

/**
 * @description: axios请求拦截器
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
service.interceptors.request.use(
  config => {
    loadHandle()
    if (store.getters['user/token']) {
      config.headers['token'] = store.getters['user/token']
    }
    if (config.data) {
      // 过滤 key
      config.data = _.pickBy(config.data, _.identity)
      if (config.headers['Content-Type'] === ContentType.FORM) {
        config.data = qs.stringify(config.data)
      }
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

/**
 * @description: axios响应拦截器
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
service.interceptors.response.use(
  response => {
    if (loadSwitch) {
      setTimeout(() => {
        loadingService.close()
      }, loadTimeout)
    }
    const { code, msg } = response.data
    if (successCode.includes(code)) {
      return response.data
    } else {
      codeHandle(code, msg)
      return response.data || ''
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.log('错误请求')
          break
        case 401:
          store.dispatch('user/clearToken')
          console.log('未授权，请重新登录')
          break
        case 403:
          console.log('拒绝访问')
          break
        case 404:
          console.log('请求错误,未找到该资源')
          break
        case 405:
          console.log('请求方法未允许')
          break
        case 408:
          console.log('请求超时')
          break
        case 411:
          console.log('需要知道长度')
          break
        case 413:
          console.log('请求的实体太大')
          break
        case 414:
          console.log('请求的URL太长')
          break
        case 415:
          console.log('不支持的媒体类型')
          break
        case 500:
          console.log('服务器端出错')
          break
        case 501:
          console.log('网络未实现')
          break
        case 502:
          console.log('网络错误')
          break
        case 503:
          console.log('服务不可用')
          break
        case 504:
          console.log('网络超时')
          break
        case 505:
          console.log('http版本不支持该请求')
          break
        default:
          console.log(`连接错误${error.response.status}`)
      }
    } else {
      console.log('连接到服务器失败')
    }
    return Promise.reject(error)
  }
)

export default service
