<template>
  <div>
    <el-form ref="refForm" :model="form" label-width="80px">
      <el-form-item label="状态：">
        <el-tag :type="socket.status === 1 ? 'success' : 'info'">已{{socket.status === 1? '连接' : '断开'}}</el-tag>
      </el-form-item>
      <el-form-item label="WS：">
        {{ws}}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickHandle">{{socket.status === 1 ? '断开' : '连接'}}</el-button>
      </el-form-item>
      <el-form-item label="内容：" class="width-500">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitHandle">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { defineComponent, computed, ref, reactive, toRefs, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'

import { ElMessage, ElNotification } from 'element-plus'

import { sendApi } from '@/api/websocket'

export default defineComponent({
  setup() {
    const store = useStore()

    const ws = computed(() => process.env.VUE_APP_WS_URL + store.state.user.token.token)
    const socket = computed(() => store.state.websocket.socket || {})
    const response = computed(() => {
      return store.state.websocket.response
    })

    const refForm = ref()

    const data = reactive({
      form: {
        content: ''
      },
      messages: []
    })

    watch(() => response, (newVal, _oldVal) => {
      if (newVal.value) {
        switch (newVal.value.type) {
          case 1:
            data.messages.push(newVal.value.message)
            ElNotification({
              title: '通知',
              message: newVal.value.message,
              type: 'success',
              duration: 300000
            })
            break
          case 2:
            store.dispatch('websocket/close')
            break
        }
      }
    }, { deep: true })

    /**
     * 连接 / 断开 websocket
     */
    const clickHandle = () => {
      if (socket.value.status === 1) {
        store.dispatch('websocket/close')
      } else {
        store.dispatch('websocket/init')
      }
    }

    /**
     * 消息推送
     */
    const submitHandle = () => {
      if (socket.value.status === 1) {
        sendApi(data.form.content).then(r => {
          if (r) {
            ElMessage({
              message: '推送成功',
              type: 'success',
              duration: 3000
            })
          }
        })
      } else {
        ElMessage({
          message: '请先打开连接!',
          type: 'warning',
          duration: 3000
        })
      }
    }

    onUnmounted(() => {
      store.dispatch('websocket/close')
    })

    return {
      refForm,
      ws,
      socket,
      ...toRefs(data),
      clickHandle,
      submitHandle
    }
  }
})
</script>

<style>

</style>
