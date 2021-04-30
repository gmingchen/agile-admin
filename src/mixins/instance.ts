/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-19 17:14:56
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 18:41:55
 */
/* eslint-disable */
import { ElMessage } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { ElMessageBoxShortcutMethod } from 'element-plus/lib/el-message-box/src/message-box.type'
import { getCurrentInstance } from 'vue'

interface Ctx {
  $message: typeof ElMessage
  $confirm: ElMessageBoxShortcutMethod
  $loading: ILoadingInstance
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
