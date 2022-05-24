<template>
  <el-dialog
    width="1200px"
    title="异常信息"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body>
    <div v-loading="loading" class="details" v-html="details" />
    <template #footer>
      <span class="dialog-footer">
        <el-button
          v-repeat
          type="primary"
          @click="visible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, nextTick, reactive, toRefs } from 'vue'

import { infoApi } from '@/api/error-log'

export default defineComponent({
  setup() {
    const data = reactive({
      visible: false,
      loading: false,
      details: ''
    })

    const init = (id) => {
      data.visible = true
      data.loading = true
      infoApi(id).then(r => {
        if (r && r.data) {
          data.details = r.data.message.replace(/\n/g, '<br />')
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    const dialogClosedHandle = () => {
      data.details = ''
    }

    return {
      ...toRefs(data),
      init,
      dialogClosedHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.details {
  line-height: 20px;
}
</style>
