<template>
  <el-dialog
    v-model="visible"
    title="详情"
    :close-on-click-modal="false"
    width="600px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-descriptions :class="n.b()" v-loading="loading" :column="4" border>
      <el-descriptions-item label="发送邮箱">{{ data.fromMail }}</el-descriptions-item>
      <el-descriptions-item label="接收邮箱" :span="3">
        <el-tag class="mr-5" v-for="(mail, index) in data.toMail" :key="index">{{ mail }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="标题" :span="2">{{ data.templateTitle }}</el-descriptions-item>
      <el-descriptions-item label="发送状态">
        <el-tag :type="data.status_type">{{ data.status_dict }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="发送时间">{{ data.createdAt }}</el-descriptions-item>
      <el-descriptions-item label="邮件内容" :span="4">
        <div v-html="data.content" />
      </el-descriptions-item>
      <el-descriptions-item label="模版编码">{{ data.templateCode }}</el-descriptions-item>
      <el-descriptions-item label="模版参数" :span="3" v-if="data.templateParams">
        <el-tag class="mr-5" v-for="(param, index) in data.templateParams" :key="index">{{ param }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="模版内容" :span="4">
        <div v-html="data.templateContent" />
      </el-descriptions-item>
      <el-descriptions-item label="异常信息" :span="4" v-if="data.sendException">
        <el-input v-model="data.sendException" type="textarea" rows="10" readonly />
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { mailInfoApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('detail')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const data = ref({})

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

const open = (id) => {
  visible.value = true
  loading.value = true
  mailInfoApi({ id }).then(r => {
    if (r) {
      data.value = r.data
    }
    nextTick(() => loading.value = false)
  })
}

defineExpose({ open })
</script>
<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: details#{element-separator};
@include b(detail) {
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
