/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-19 17:14:56
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 16:01:49
 */
/* eslint-disable */
import { ElMessage, ElLoading } from 'element-plus'
import { ElMessageBoxShortcutMethod } from 'element-plus/lib/el-message-box/src/message-box.type'
import { getCurrentInstance } from 'vue'

interface Ctx {
  $message: typeof ElMessage
  $confirm: ElMessageBoxShortcutMethod
  $loading: typeof ElLoading.service
}

export default function () {
  const { ctx } = getCurrentInstance() as any
  const { $message, $confirm, $loading } = ctx as Ctx

  return {
    ctx,
    $message,
    $confirm,
    $loading
  }
}
