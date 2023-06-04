<script setup>
import { infoApi } from '@/api/mail'

const refForm = ref()

const visible = ref(false)
const loading = ref(false)
const info = ref({})

const init = async (id) => {
  visible.value = true
  loading.value = true
  const r = await infoApi({ id })
  if (r) {
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
    title="详情"
    v-model="visible"
    :close-on-click-modal="false"
    append-to-body>
    <el-descriptions v-loading="loading" :column="4" border>
      <el-descriptions-item label="发送邮箱">{{ info.fromMail }}</el-descriptions-item>
      <el-descriptions-item label="接收邮箱" :span="3">
        <el-tag class="margin_r-5" v-for="(mail, index) in info.toMail" :key="index">{{ mail }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="标题" :span="2">{{ info.templateTitle }}</el-descriptions-item>
      <el-descriptions-item label="发送状态">
        <el-tag :type="info.status_type">{{ info.status_dict }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="发送时间">{{ info.createdAt }}</el-descriptions-item>
      <el-descriptions-item label="邮件内容" :span="4">
        <div v-html="info.content" />
      </el-descriptions-item>

      <el-descriptions-item label="模版编码">{{ info.templateCode }}</el-descriptions-item>
      <el-descriptions-item label="模版参数" :span="3" v-if="info.templateParams">
        <el-tag class="margin_r-5" v-for="(param, index) in info.templateParams" :key="index">{{ param }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="模版内容" :span="4">
        <div v-html="info.templateContent" />
      </el-descriptions-item>

      <el-descriptions-item label="异常信息" :span="4" v-if="info.sendException">
        <el-input
          v-model="info.sendException"
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
