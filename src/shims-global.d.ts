/*
 * @Description: 
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-15 19:20:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 18:09:13
 */
declare module 'nprogress'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: IMessage
    $confirm: ElMessageBoxShortcutMethod
    $loading: ILoadingInstance
  }
}
