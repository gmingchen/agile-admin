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

    const codeHandle = (code, message) => {
      let tip = message
      switch (code) {
        case 4032:
          tip = '已在其它地方连接，将不会收到推送消息！'
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
