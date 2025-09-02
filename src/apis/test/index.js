import { doGet, doJson, doBinary, doBlob } from '@/common/utils'


export function testGetApi(params) {
  return doGet(
    'https://admin.gumingchen.icu/slipper/admin/auth/captcha',
    params
  )
}

export function testBinaryApi() {
  return doBinary(
    'https://ovopark-oss-wanji.oss-cn-hangzhou.aliyuncs.com/ovopark-wanji/211/2025/07/11/small/1752224798223.png',
  )
}

export function testBlobApi() {
  return doBlob(
    'https://ovopark-oss-wanji.oss-cn-hangzhou.aliyuncs.com/ovopark-wanji/211/2025/07/11/small/1752224798223.png',
  )
}
