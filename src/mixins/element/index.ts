/*
 * @Description: element-plus 提示信息混入
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-21 15:30:44
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-19 10:03:10
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject } from 'vue-property-decorator'
import { Options, Vue } from 'vue-class-component'

import { promptComponent, promptMessage, promptDuration } from '@C/index'

import ILoading from 'element-plus/lib/el-loading/src/loading.type'
import { IMessage } from 'element-plus/lib/el-message/src/types'
import { INotification } from 'element-plus/lib/el-notification/src/notification.type'
import { PromptComponentType } from '@/config/index.type'
import { ElMessageBoxOptions } from 'element-plus/lib/el-message-box/src/message-box.type'

@Options({})
export class Loading extends Vue {
  @Inject('$loading')
  $loading!: (options?: ILoading.ILoadingOptions) => ILoading.ILoadingInstance
}

@Options({})
export class Message extends Vue {
  @Inject('$message')
  $message!: IMessage
}

@Options({})
export class Msgbox extends Vue {
  @Inject('$msgbox')
  $msgbox!: ElMessageBoxOptions
}

@Options({})
export class Alert extends Vue {
  @Inject('$alert')
  $alert!: any
}

@Options({})
export class Confirm extends Vue {
  @Inject('$confirm')
  $confirm!: any
}

@Options({})
export class Prompt extends Vue {
  @Inject('$prompt')
  $prompt!: any
}

@Options({})
export class Notify extends Vue {
  @Inject('$notify')
  $notify!: INotification
}

@Options({})
export class Tips extends Vue {
  @Inject('$message')
  $message!: IMessage
  @Inject('$notify')
  $notify!: INotification
  @Inject('$alert')
  $alert!: any

  /**
   * @description: 全局提示消息
   * @param {string} msg 消息内容
   * @return {'success' | 'warning' | 'info' | 'error' | undefined} type 可选
   * @author: gumingchen
   */
  $tips(msg: string, type?: 'success' | 'warning' | 'info' | 'error' | undefined): void {
    switch (promptComponent) {
      case PromptComponentType.MESSAGE:
        this.$message({
          message: msg,
          type: type || promptMessage,
          iconClass: '',
          dangerouslyUseHTMLString: false,
          customClass: '',
          duration: promptDuration,
          showClose: false,
          center: false,
          offset: 20
        })
        break
      case PromptComponentType.NOTIFY:
        this.$notify({
          title: '提示',
          message: msg,
          dangerouslyUseHTMLString: false,
          type: type || promptMessage,
          iconClass: '',
          customClass: '',
          duration: promptDuration,
          position: 'top-right', // top-right/top-left/bottom-right/bottom-left
          showClose: true,
          offset: 0
        })
        break
      case PromptComponentType.ALERT:
        this.$alert({
          title: '提示',
          message: msg,
          dangerouslyUseHTMLString: false,
          type: type || promptMessage,
          iconClass: '',
          customClass: '',
          duration: promptDuration,
          position: 'top-right', // top-right/top-left/bottom-right/bottom-left
          showClose: true,
          offset: 0
        })
        break
    }
  }
}
