import { print, printError } from '@/common/utils'
import { useAuthStore, useRootStore } from '@/stores'
import router from '@/router'
import { TOKEN_KEY, TENANT_KEY, BASE_URL } from './constant'

const getPrintTitle = (config) => {
  return `API: ${config.url}`
}
const requestSuccessPrint = (config) => {
  const title = getPrintTitle(config)
  const { params, data } = config
  const args = []
  if (params) args.push(params)
  if (data) args.push(data)
  if (!args.length) args.push('无参')
  print(title, ...args)
}
const requestFailPrint = (config) => {
  const title = getPrintTitle(config)
  printError(title, '请求失败')
}
const responseSuccessPrint = (response) => {
  const { config, data } = response
  const title = getPrintTitle(config)
  print(title, data)
}
const statusMap = {
  400: '错误请求',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '请求错误,未找到该资源',
  405: '请求方法未允许',
  408: '请求超时',
  411: '需要知道长度',
  413: '请求的实体太大',
  414: '请求的URL太长',
  415: '不支持的媒体类型',
  500: '服务器端出错',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求',
}
const responseFailPrint = (error) => {
  let message = '连接服务器失败'
  const { config, response } = error
  if (response) {
    const { status } = response
    message = statusMap[status] || '连接服务器失败'
    message += `：${status}`
  }
  const title = getPrintTitle(config)
  printError(title, message)
}

export const handleResponse = (data) => {
  const { code, message } = data
  if (code !== 0 && code !== 200) {
    ElMessage.error({ message: message || '服务器开小差，稍后再试~', grouping: true })
    if (code === 4000 || code === 4001) {
      useRootStore().clear()
      useAuthStore().clear()
      router.replace({ name: 'login' })
    }
    return null
  }
  return data
}

export const requestInterceptor = config => {
  config.url = BASE_URL + config.url
  requestSuccessPrint(config)
  // 设置认证信息
  const { token, tenantId } = useAuthStore()
  config.headers[TOKEN_KEY] = token ? token.trim() : ''
  config.headers[TENANT_KEY] = tenantId || ''

  return config
}
export const requestRejected = error => {
  requestFailPrint(error)
  return Promise.reject(error)
}

export const responseInterceptor = response => {
  responseSuccessPrint(response)
  const { config: { responseType }, data, headers } = response

  const responseTypes = ['arraybuffer', 'blob']
  if (responseTypes.includes(responseType)) {
    return { data, type: headers['content-type'] }
  }

  return handleResponse(data)
}
export const responseRejected = error => {
  responseFailPrint(error)
  return Promise.reject(error)
}
