// 请求头-内容类型
export enum ContentType {
  JSON = 'application/json;charset=UTF-8',
  FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD = 'multipart/form-data',
  STREAM = 'application/octet-stream;charset=UTF-8'
}

// 令牌键值
export enum TokenKey {
  TOKEN = 'token',
  ACCESS = 'access'
}
// 本地存储类型
export enum StorageType {
  COOKIE = 'cookie',
  SESSION = 'sessionStorage',
  LOCAL = 'localStorage'
}
// 请求成功状态码
export enum SuccessCode {
  ZERO = 0,
  TWO_HUNDRED = 200
}
// 请求 mapping
export enum RequestMapping {
  SLIPPER = '/slipper',
  API = '/api'
}
// 双向绑定名
export enum ModelBinding {
  MODEL_VALUE = 'update:modelValue',
  MODEL_EVENT = 'update:modelEvent'
}
// 主题模式
export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light'
}
