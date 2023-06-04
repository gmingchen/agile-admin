<script>
import { ElMessage, ElNotification } from 'element-plus'

import { SUCCESS_CODE } from '@/utils/constant'

export default defineComponent({
  render() { return '' },
  setup() {
    const router = useRouter()

    const websocketStore = useWebsocketStore()
    const rootStroe = useRootStore()
    const noticeStore = useNoticeStore()

    const { response } = storeToRefs(websocketStore)

    const successHandle = ({ type, data }) => {
      if (type === -1) return
      ElNotification({
        title: '通知',
        message: data,
        type: 'success',
        duration: 3000,
        onClick: () => {
          console.log('点击')
        },
        onClose: () => {
          console.log('关闭')
        }
      })
      noticeStore.getList(1)
    }

    const codeHandle = (code, _message) => {
      let tip = ''
      switch (code) {
        case 4001:
          tip = '凭证已过期，请重新登录！'
          break
        case 4032:
          tip = '已在其它地方连接，将不会收到推送消息！'
          break
        case 4033:
          tip = '已在其它地方登录！'
          break
        case 4034:
          tip = '你已被强制退出登录！'
          break
      }
      ElMessage({ message: tip, type: 'warning' })
      websocketStore.close()
      if (code !== 4032) {
        rootStroe.logout()
        router.push({ name: 'login' })
      }
    }

    watch(() => response, (newVal, _oldVal) => {
      if (newVal.value) {
        const { code, message, data } = newVal.value
        if (SUCCESS_CODE.includes(code)) {
          successHandle(data)
        } else {
          codeHandle(code, message)
        }
      }
    }, { deep: true })

    onBeforeMount(() => {
      websocketStore.init()
    })

    onUnmounted(() => {
      websocketStore.close()
    })

    return {}
  }
})
</script>
