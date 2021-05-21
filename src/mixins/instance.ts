/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-19 17:14:56
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 16:01:49
 */
/* eslint-disable */
import { ElMessage, ElLoading, ElNotification } from 'element-plus'
import { ElMessageBoxShortcutMethod } from 'element-plus/lib/el-message-box/src/message-box.type'
import { ComponentInternalInstance, getCurrentInstance } from 'vue'

interface GlobalProperties {
  $message: typeof ElMessage
  $confirm: ElMessageBoxShortcutMethod
  $loading: typeof ElLoading.service
  $alert: ElMessageBoxShortcutMethod
  $prompt: ElMessageBoxShortcutMethod
  $notify: typeof ElNotification
}

export default function () {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  
  const { $message, $confirm, $loading } = appContext.config.globalProperties as GlobalProperties

  return {
    $message,
    $confirm,
    $loading
  }
}
