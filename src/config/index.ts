/*
 * @Description: 设置
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:36:27
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 13:18:25
 */
import { ContentType, PromptComponentType, PromptMesssageType } from '@/config/index.type'
import { ILoadingOptions } from 'element-plus/lib/el-loading/src/loading.type'

// TODO: http
// 请求数据类型
export const contentType: string = ContentType.JSON
// 请求超时时长
export const timeout: number = 10000
// 请求成功Code
export const successCode: number[] = [0, 200]
// TODO: setting
// 提示组件类型
export const promptComponent: string = PromptComponentType.MESSAGE
// 提示组件信息类型
export const promptMessage: 'success' | 'warning' | 'info' | 'error' | undefined = PromptMesssageType.WARING
// 消息提示持续时长
export const promptDuration: number = 3000
// Loading
export const loadSwitch: boolean = true
export const loadTimeout: number = 500
export const loadOptions: ILoadingOptions = {
  // 显示文本
  text: '',
  // 显示图标
  spinner: 'el-icon-loading',
  // 背景色
  background: 'rgba(0, 0, 0, 0.7)',
  // 自定义类名
  customClass: '',
  // 目标dom
  target: document.body,
  // 是否插入目标dom的body上
  body: false,
  // 是否全屏
  fullscreen: true,
  // 是否锁住滚动条
  lock: true
}
// token存储key
export const tokenKey: string = 'token'
// token存储位置 cookie / sessionStorage / localStorage
export const storage: string = 'cookie'
// 是否获取权限信息key
export const isGetAuthKey: string = 'isGetAuth'
// 菜单存储key
export const menuKey: string = 'menus'
// 权限存储key
export const permissionKey: string = 'permissions'
// 授权信息存储位置 cookie / sessionStorage / localStorage
export const authStorage: string = 'sessionStorage'
// TODO: theme
// 是否固定导航栏
export const fixedNavigation: boolean = true
// 是否显示标签栏
export const showTabs: boolean = true
// 是否显示全屏组件
export const showFullScreen: boolean = true
