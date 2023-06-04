// 请求头-内容类型
export const ContentType = {
  JSON: 'application/json;charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD: 'multipart/form-data',
  STREAM: 'application/octet-stream'
}
// 令牌键值
export const AuthKey = {
  TOKEN: 'token',
  ACCESS: 'access'
}
// 本地存储类型
export const StorageType = {
  COOKIE: 'cookie',
  SESSION: 'sessionStorage',
  LOCAL: 'localStorage'
}
// 请求成功状态码
export const SuccessCode = {
  ZERO: 0,
  TWO_HUNDRED: 200
}
// 请求 mapping
export const RequestMapping = {
  SLIPPER: '/slipper',
  API: '/api'
}
// 双向绑定名
export const ModelBinding = {
  MODEL_VALUE: 'update:modelValue',
  MODEL_EVENT: 'update:modelEvent'
}
// 主题模式
export const ThemeMode = {
  DARK: 'dark',
  LIGHT: 'light'
}
// 通用状态枚举
export const Status = {
  DISABLE: 0,
  ENABLE: 1
}
// 是否
export const Whether = {
  NO: 0,
  YES: 1
}
// 菜单类型
export const MenuType = {
  CATALOG: 0,
  MENU: 1,
  BUTTON: 2,
  IFRAME: 3,
  URL: 4
}
// 文件存储类型
export const FileStorageType = {
  LOCAL: 0,
  KODO: 1,
  OSS: 2,
  COS: 3
}
// 数据权限
export const DataPermission = {
  ALL: 0,
  SELF: 1,
  IN: 2,
  BELOW: 3,
  CUSTOM: 4
}
// 性别
export const Sex = {
  FEMALE: 0,
  MALE: 1,
  UNKNOWN: 2
}
// 通知范围
export const NoticeScope = {
  ALL: 0,
  ADMINER: 1,
  DEPT: 2
}
// 通知范围
export const NoticeType = {
  SYSTEM: 0,
  NOTICE: 1
}
// 通知状态
export const NoticeStatus = {
  UNREAD: 0,
  READ: 1
}
// 操作状态
export const OperationalStatus = {
  FAIL: 0,
  SUCCESS: 1,
  RUNNING: 2
}

