<template>
</template>

<script setup>
import { useWebsocketStore, useRootStore, useNoticeStore } from '@/stores'
import { useNamespace } from '@/hooks'
import { ElMessage } from 'element-plus'

const n = useNamespace('websocket')

const router = useRouter()

const websocketStore = useWebsocketStore()
const { response } = storeToRefs(websocketStore)
const rootStore = useRootStore()
const noticeStore = useNoticeStore()
const { page } = storeToRefs(noticeStore)

const handleNotice = (message) => {
  ElNotification({ title: '通知', type: 'success',  duration: 3000, message, })
  page.value.current = 1
  noticeStore.getData()
}

const handleRemoteConnection = () => {
  ElMessage.warning('已在其它地方连接，将不会收到推送消息！')
  websocketStore.close()
}

const handleLogout = async () => {
  await rootStore.logout()
  router.push({ name: 'login' })
}

const handleSuccess = ({ type, data }) => {
  if (type === -1) return

  handleNotice(data)
}
const handleFail = (code, message) => {
  if (code === 4032) {
    handleRemoteConnection()
  } else {
    ElMessage.warning(message)
    handleLogout()
  }
}

watch(() => response.value, (response) => {
  if (!response) return

  const { code, message, data } = response
  if (code === 0 || code === 200) {
    handleSuccess(data)
  } else {
    handleFail(code, message)
  }
})

onBeforeMount(websocketStore.init)
onBeforeUnmount(websocketStore.close)
</script>
