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

<script setup>
import { nextTick, ref } from 'vue'

import { infoApi } from '@/api/error-log'

const visible = ref(false)
const loading = ref(false)
const details = ref('')

const init = (id) => {
  visible.value = true
  loading.value = true
  infoApi(id).then(r => {
    if (r && r.data) {
      details.value = r.data.message ? r.data.message.replace(/\n/g, '<br />') : ''
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

const dialogClosedHandle = () => {
  details.value = ''
}

defineExpose({
  init
})
</script>

<style lang="scss" scoped>
.details {
  line-height: 20px;
}
</style>
