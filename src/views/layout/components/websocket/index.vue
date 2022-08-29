<script>
import { defineComponent, onBeforeMount, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useWebsocketStore } from '@stores/websocket'
import { useRootStore } from '@/stores/root'

import { ElMessage, ElNotification } from 'element-plus'

export default defineComponent({
  render() { return '' },
  setup() {
    const router = useRouter()

    const websocketStore = useWebsocketStore()
    const rootStroe = useRootStore()

    const { response } = storeToRefs(websocketStore)

    watch(() => response, (newVal, _oldVal) => {
      if (newVal.value) {
        switch (newVal.value.type) {
          case -5:
            ElMessage({
              message: '已在其它地方登录！',
              type: 'warning'
            })
            websocketStore.close()
            rootStroe.logout()
            router.push({ name: 'login' })
            break
          case -4:
            ElMessage({
              message: '已在其它地方连接，将不会收到推送消息！',
              type: 'warning'
            })
            websocketStore.close()
            break
          case -3:
            ElMessage({
              message: '你已被强制退出登录！',
              type: 'warning'
            })
            websocketStore.close()
            rootStroe.logout()
            router.push({ name: 'login' })
            break
          case -2:
            ElMessage({
              message: '凭证已过期，请重新登录！',
              type: 'warning'
            })
            websocketStore.close()
            rootStroe.logout()
            router.push({ name: 'login' })
            break
          case 0:
          case 1:
            ElNotification({
              title: '通知',
              message: newVal.value.data,
              type: 'success',
              duration: 3000
            })
            break
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
