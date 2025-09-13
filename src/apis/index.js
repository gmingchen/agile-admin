import { http } from '@/common/utils'
import { handleResponse,requestInterceptor, requestRejected, responseInterceptor, responseRejected } from './interceptor'

export * from './constant'

http.interceptors.request.use(requestInterceptor, requestRejected)
http.interceptors.response.use(responseInterceptor, responseRejected)

export * from './auth'
export * from './home'
export * from './demo'
export * from './user'
export * from './system'
export * from './infrastructure'

export { handleResponse }
