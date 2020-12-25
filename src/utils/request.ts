'use strict'
import axios from 'axios'
import qs from 'qs'

/**
 * code处理
 * @param code 
 * @param msg 
 */
const codeHandle = (code: number|null, msg: string|null) => {
  switch (code) {
    case 401:
      console.log(msg)
      break
  }
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': ContentType.JSON
  }
})

service.interceptors.request.use(
  config => {
    if (config.data) {
      config.headers['Content-Type'] = ContentType.FORM
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      codeHandle(res.code, res.msg)
      return Promise.reject(new Error(res.message || 'Error'))
      
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default service
