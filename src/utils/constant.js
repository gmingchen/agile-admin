import { ContentType, AuthKey, StorageType, SuccessCode, RequestMapping, ModelBinding } from '@/utils/enum'

// request Mapping
export const MAPPING = RequestMapping.SLIPPER
// 请求数据类型
export const CONTENT_TYPE = ContentType.JSON
// 请求超时时长
export const TIME_OUT = 50000
// 访问秘钥 存储
export const AUTH_KEY = AuthKey.TOKEN
// 秘钥本地存储类型
export const AUTH_STORAGE = StorageType.COOKIE
// 租户ID键值
export const TNEANT_KEY = 'tenant-id'
// 菜单本地存储类型
export const MENU_STORAGE = StorageType.SESSION
export const LOAD_MENU_KEY = 'load'
export const MENU_KEY = 'menus'
export const PERMISSION_KEY = 'permissions'
// 主题本地存储类型
export const THEME_STORAGE = StorageType.LOCAL
export const THEME_KEY = 'theme'
export const THEME_MODE_KEY = 'themeMode'
export const LAYOUT_KEY = 'layout'
// 请求成功响应code
export const SUCCESS_CODE = [SuccessCode.ZERO, SuccessCode.TWO_HUNDRED]
// 双向绑定方法名
export const MODEL_NAME = 'modelValue'
export const UPDATE_MODEL_EVENT = ModelBinding.MODEL_VALUE
