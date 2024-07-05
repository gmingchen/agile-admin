'use strict'
import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { ElMessage } from 'element-plus'

import { MAPPING, CONTENT_TYPE, SUCCESS_CODE, TIME_OUT, AUTH_KEY, TNEANT_KEY } from '@constants'
import { ContentType } from '@enums'
import { blob2Json } from '@utils'
import { useAuthStore } from '../stores/modules/auth'

/**
 * @description: 异常消息提示
 * @param {string} string
 * @return {*}
 * @author: gumingchen
 */
const prompt = (message) => {
  return ElMessage({
    message: message,
    type: 'warning',
    duration: 3000,
    grouping: true
  })
}

/**
 * @description: code处理
 * @param {number} code
 * @param {string} msg
 * @return {*}
 * @author: gumingchen
 */
const codeHandle = (code, message) => {
  switch (code) {
    case 4000:
    case 4001:
      router.replace({
        name: 'login'
      })
      prompt(message)
      useAuthStore().clear()
      break
    case 401:
      router.replace({
        name: '401'
      })
      break
    case 404:
      router.replace({
        name: '404'
      })
      break
    case 500:
      // router.replace({
      //   name: '500'
      // })
      break
    default:
      prompt(message, false)
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
  baseURL: MAPPING,
  withCredentials: true,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': CONTENT_TYPE
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
    const { token, tenantId } = useAuthStore()
    // 设置 token
    if (token.trim()) {
      config.headers[AUTH_KEY] = token.trim()
    }
    // 设置租户ID
    if (tenantId) {
      config.headers[TNEANT_KEY] = tenantId
    }
    if (config.data) {
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
  async response => {
    if (response.headers['content-type'] === ContentType.STREAM) {
      if (!response.data.code) {
        return {
          blob: response.data,
          name: decodeURI(response.headers['content-disposition'].replace('attachment;filename=', ''))
        }
      } else {
        return response.data || null
      }
    }
    const { responseType } = response.config
    if (responseType === 'blob') {
      response.data = await blob2Json(response.data)
    }
    const { code, message } = response.data
    if (!SUCCESS_CODE.includes(code)) {
      codeHandle(code, message)
      return null
    }
    return response.data || null
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.log('错误请求')
          break
        case 401:
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
          console.log(`连接错误${ error.response.status }`)
      }
    } else {
      console.log('连接到服务器失败')
      // router.replace({
      //   name: '500'
      // })
    }
    return Promise.reject(error)
  }
)

export default service
