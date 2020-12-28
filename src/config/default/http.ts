import { ContentType } from "./http.type";

const http = {
  /* 请求数据类型 */
  contentType: ContentType.JSON,
  /* 请求超时时长 */
  timeout: 10000,
  /* 请求成功Code */
  successCode: [0, 200]
}

module.exports = http
