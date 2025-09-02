import axios from 'axios'
import { CONTENT_TYPE_ENUM } from '@/common/enums'

const http = axios.create({
  baseURL: '/',
  headers: { 'Content-Type': CONTENT_TYPE_ENUM.JSON }
})

const request = async (url, method, params, headers, responseType) => {
  const config = { url,  method, headers, responseType }
  if (method === 'get') config.params = params
  else if (method === 'post') config.data = params
  const res = await http.request(config)
  return res
}

/**
 * get请求
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 * @param {*} headers 请求头
 * @returns
 */
const doGet = (url, params, headers) =>
  request(url, 'get', params, headers)

/**
 * post请求
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 * @param {*} headers 请求头
 * @returns
 */
const doJson = (url, params, headers) =>
  request(url, 'post', params, headers)

/**
 * form请求
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 * @param {*} headers 请求头
 * @returns
 */
const doForm = (url, params, headers = {}) =>
  request(url, 'post', params, {
    headers: { 'Content-Type': CONTENT_TYPE_ENUM.FORM_URLENCODED, ...headers
  }})

/**
 * 二进制请求
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 * @param {*} headers 请求头
 * @returns
 */
const doBinary = (url, params, headers) =>
  request(url, 'get', params, headers, 'arraybuffer')

/**
 * blob请求
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 * @param {*} headers 请求头
 * @returns
 */
const doBlob = (url, params, headers) =>
  request(url, 'get', params, headers, 'blob')

export {
  http,
  doGet,
  doJson,
  doForm,
  doBinary,
  doBlob,
};
