/*
 * @Description: 设置
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-28 16:36:27
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-19 10:01:27
 */
import { ContentType, PromptComponentType, PromptMesssageType } from '@/config/index.type'

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
// token存储key
export const tokenKey: string = 'token'
// token存储位置 cookie / sessionStorage / localStorage
export const storage: string = 'cookie'
// TODO: theme
// 是否固定导航栏
export const fixedNavigation: boolean = true
// 是否显示标签栏
export const showTabs: boolean = true
// 是否固定标签栏
export const fixedTabs: boolean = true
// 是否显示全屏组件
export const showFullScreen: boolean = true
