<script>
import { computed, defineComponent, onBeforeMount, onUnmounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { ElMessage, ElNotification } from 'element-plus'

export default defineComponent({
  render() { return '' },
  setup() {
    const store = useStore()
    const router = useRouter()

    const response = computed(() => {
      return store.state.websocket.response
    })

    watch(() => response, (newVal, _oldVal) => {
      if (newVal.value) {
        switch (newVal.value.type) {
          case -3:
            ElMessage({
              message: '你已被强制退出登录！',
              type: 'warning'
            })
            store.dispatch('websocket/close')
            store.dispatch('logout')
            router.push({ name: 'login' })
            break
          case -2:
            ElMessage({
              message: '凭证已过期，请重新登录！',
              type: 'warning'
            })
            store.dispatch('websocket/close')
            store.dispatch('logout')
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
      store.dispatch('websocket/init')
    })

    onUnmounted(() => {
      store.dispatch('websocket/close')
    })

    return {}
  }
})

</script>
