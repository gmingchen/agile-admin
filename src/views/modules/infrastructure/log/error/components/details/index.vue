<template>
  <el-dialog
    v-model="visible"
    title="详情"
    :close-on-click-modal="false"
    width="80%"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-descriptions :class="n.b()" v-loading="loading" :column="4" border>
      <el-descriptions-item label="发生时间">{{ data.createdAt }}</el-descriptions-item>
      <el-descriptions-item label="浏览器">{{ data.browser }}</el-descriptions-item>
      <el-descriptions-item label="操作系统" :span="2">{{ data.operatingSystem }}</el-descriptions-item>

      <el-descriptions-item label="IP">{{ data.ip }}</el-descriptions-item>
      <el-descriptions-item label="地址">{{ data.address || '-' }}</el-descriptions-item>
      <el-descriptions-item label="用户代理" :span="4">{{ data.agent }}</el-descriptions-item>

      <el-descriptions-item label="请求方式" :span="1">{{ data.method }}</el-descriptions-item>
      <el-descriptions-item label="URL" :span="3">{{ data.url }}</el-descriptions-item>
      <el-descriptions-item label="请求参数" :span="4">
        <pre>{{ data.requestData }}</pre>
      </el-descriptions-item>
      <el-descriptions-item label="请求头" :span="4">
        <pre>{{ data.requestHeader }}</pre>
      </el-descriptions-item>

      <el-descriptions-item label="异常信息" :span="4">{{ data.exceptionMessage }}</el-descriptions-item>
      <el-descriptions-item label="异常类" :span="2">{{ data.exceptionClass }}</el-descriptions-item>
      <el-descriptions-item label="异常方法" :span="2">{{ data.exceptionMethod }}</el-descriptions-item>
      <el-descriptions-item label="堆栈跟踪" :span="4">
        <el-input v-model="data.exceptionStackTrace" type="textarea" :rows="10" readonly />
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { errorLogInfoApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('details')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const data = ref({})

const getData = async (id) => {
  const r = await errorLogInfoApi({ id })
  if (r) {
    const { requestData, requestHeader } = r.data
    r.data.requestData = requestData ? JSON.parse(requestData) : {}
    r.data.requestHeader = requestHeader ? JSON.parse(requestHeader) : {}
    data.value = r.data
  }
}

const onClosed = () => {
}

const onCancel = () => {
  visible.value = false
  emits('cancel')
}

const onConfirm = () => {
  visible.value = false
  emits('confirm')
}

const open = async (id) => {
  visible.value = true
  loading.value = true
  await getData(id)
  nextTick(() => loading.value = false)
}

defineExpose({ open })
</script>
<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: module#{$element-separator};
@include b(details) {
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
}
</style>
