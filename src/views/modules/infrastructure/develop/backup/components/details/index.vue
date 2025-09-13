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
    <el-descriptions :class="n.b()" v-loading="loading" :column="2" border>
      <el-descriptions-item label="数据库名">{{ data.database }}</el-descriptions-item>
      <el-descriptions-item label="备份时间">{{ data.createdAt }}</el-descriptions-item>
      <el-descriptions-item label="备份方式">
        <el-tag :type="data.type_type">{{ data.type_dict }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="文件名称">{{ data.name }}</el-descriptions-item>
      <el-descriptions-item label="文件URL">{{ data.url }}</el-descriptions-item>
      <el-descriptions-item label="备份状态">
        <el-tag :type="data.status_type">{{ data.status_dict }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="文件路径" :span="3">{{ data.path }}</el-descriptions-item>
      <el-descriptions-item label="执行命令" :span="3">{{ data.cmd }}</el-descriptions-item>
      <el-descriptions-item label="进程输出" :span="3" v-if="data.backupMessage">
        <el-input v-model="data.backupMessage" type="textarea" :rows="10" readonly />
      </el-descriptions-item>
      <el-descriptions-item label="异常信息" :span="3" v-if="data.backupException">
        <el-input v-model="data.backupException" type="textarea" :rows="10" readonly />
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { backupInfoApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('details')

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
  backupInfoApi({ id }).then(r => {
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
