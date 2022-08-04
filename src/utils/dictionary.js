// 请求头-内容类型
export const ContentType = {
  JSON: 'application/json;charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded;charset=UTF-8',
  UPLOAD: 'multipart/form-data',
  STREAM: 'application/octet-stream;charset=UTF-8'
}
// 令牌键值
export const TokenKey = {
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
// 菜单类型
export const MenuTypes = [
  { value: 0, label: '目录' },
  { value: 1, label: '菜单' },
  { value: 2, label: '按钮' },
  { value: 3, label: 'iframe' },
  { value: 4, label: '外链' }
]
export const MenuType = (() => {
  const result = {}
  MenuTypes.forEach(item => {
    result[item.value] = item.label
  })
  return result
})()
// 性别
export const Sexs = [
  { value: 0, label: '女' },
  { value: 1, label: '男' },
  { value: 2, label: '未知' }
]
export const Sex = (() => {
  const result = {}
  Sexs.forEach(item => {
    result[item.value] = item.label
  })
  return result
})()
