/*
 * @Description: element-plus 提示信息混入
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-21 15:30:44
 * @LastEditors: gumingchen
 * @LastEditTime: 2020-12-30 09:31:16
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ILoading from 'element-plus/lib/el-loading/src/loading.type'
import { IMessage } from 'element-plus/lib/el-message/src/types'
import { INotification } from 'element-plus/lib/el-notification/src/notification.type'

import { Options, Vue } from 'vue-class-component'
import { Inject } from 'vue-property-decorator'

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
  $msgbox!: Promise<any>
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
