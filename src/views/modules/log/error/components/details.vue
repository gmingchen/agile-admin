<script setup>
import { infoApi } from '@/api/error-log'

const refForm = ref()

const visible = ref(false)
const loading = ref(false)
const info = ref({})

const init = async (id) => {
  visible.value = true
  loading.value = true
  const r = await infoApi({ id })
  if (r) {
    const { requestData, requestHeader } = r.data
    r.data.requestData = requestData ? JSON.parse(requestData) : {}
    r.data.requestHeader = requestHeader ? JSON.parse(requestHeader) : {}
    info.value = r.data
  }
  nextTick(() => { loading.value = false })
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const confirm = () => {
  visible.value = false
}

defineExpose({
  init
})
</script>

<template>
  <el-dialog
    width="80%"
    title="日志详情"
    v-model="visible"
    :close-on-click-modal="false"
    append-to-body>
    <el-descriptions v-loading="loading" :column="4" border>
      <el-descriptions-item label="发生时间">{{ info.createdAt }}</el-descriptions-item>
      <el-descriptions-item label="浏览器">{{ info.browser }}</el-descriptions-item>
      <el-descriptions-item label="操作系统" :span="2">{{ info.operatingSystem }}</el-descriptions-item>

      <el-descriptions-item label="IP">{{ info.ip }}</el-descriptions-item>
      <el-descriptions-item label="地址">{{ info.address || '-' }}</el-descriptions-item>
      <el-descriptions-item label="用户代理" :span="4">{{ info.agent }}</el-descriptions-item>

      <el-descriptions-item label="请求方式" :span="1">{{ info.method }}</el-descriptions-item>
      <el-descriptions-item label="URL" :span="3">{{ info.url }}</el-descriptions-item>
      <el-descriptions-item label="请求参数" :span="4">
        <pre>{{ info.requestData }}</pre>
      </el-descriptions-item>
      <el-descriptions-item label="请求头" :span="4">
        <pre>{{ info.requestHeader }}</pre>
      </el-descriptions-item>

      <el-descriptions-item label="异常信息" :span="4">{{ info.exceptionMessage }}</el-descriptions-item>
      <el-descriptions-item label="异常类" :span="2">{{ info.exceptionClass }}</el-descriptions-item>
      <el-descriptions-item label="异常方法" :span="2">{{ info.exceptionMethod }}</el-descriptions-item>
      <el-descriptions-item label="堆栈跟踪" :span="4">
        <el-input
          v-model="info.exceptionStackTrace"
          type="textarea"
          rows="10"
          readonly />
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          v-repeat
          type="primary"
          @click="confirm()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
}
::v-deep(.el-descriptions__label) {
  width: 80px;
}
::v-deep(.el-descriptions__content) {
  word-break: break-all!important;
}
</style>
