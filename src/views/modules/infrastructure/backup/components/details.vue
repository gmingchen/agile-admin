<script setup>
import { infoApi } from '@/api/backup'

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
    <el-descriptions v-loading="loading" :column="3" border>
      <el-descriptions-item label="数据库名">{{ info.database }}</el-descriptions-item>
      <el-descriptions-item label="备份时间">{{ info.createdAt }}</el-descriptions-item>
      <el-descriptions-item label="备份方式">
        <el-tag :type="info.type_type">{{ info.type_dict }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="文件名称">{{ info.name }}</el-descriptions-item>
      <el-descriptions-item label="文件URL">{{ info.url }}</el-descriptions-item>
      <el-descriptions-item label="备份状态">
        <el-tag :type="info.status_type">{{ info.status_dict }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="文件路径" :span="3">{{ info.path }}</el-descriptions-item>
      <el-descriptions-item label="执行命令" :span="3">{{ info.cmd }}</el-descriptions-item>
      <el-descriptions-item label="进程输出" :span="3" v-if="info.backupMessage">
        <el-input
          v-model="info.backupMessage"
          type="textarea"
          rows="10"
          readonly />
      </el-descriptions-item>
      <el-descriptions-item label="异常信息" :span="3" v-if="info.backupException">
        <el-input
          v-model="info.backupException"
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
