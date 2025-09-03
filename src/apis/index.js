import { http } from '@/common/utils'
import { handleResponse,requestInterceptor, requestRejected, responseInterceptor, responseRejected } from './interceptor'

export * from './constant'

http.interceptors.request.use(requestInterceptor, requestRejected)
http.interceptors.response.use(responseInterceptor, responseRejected)

export * from './auth'
export * from './dict'
export * from './file'
export * from './permission'
export * from './package'
export * from './tenant'
export * from './data-source'
export * from './job'
export * from './generator'
export * from './ip'
export * from './backup'
export * from './region'
export * from './mail-account'
export * from './mail-template'
export * from './mail'
export * from './test'

export { handleResponse }
