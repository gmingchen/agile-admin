<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑定时任务' : '新增定时任务'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="50" show-word-limit />
      </el-form-item>
      <el-form-item label="处理器名称" prop="bean">
        <el-input v-model="form.bean" placeholder="处理器名称" maxlength="200" />
      </el-form-item>
      <el-form-item label="cron表达式" prop="cron">
        <el-input v-model="form.cron" placeholder="cron表达式" maxlength="100" />
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input v-model="form.params" placeholder="参数" type="textarea" maxlength="500" show-word-limit />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <Dict v-model="form.status" :code="DICT_CODE_ENUM.STATUS" default-value></Dict>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注" type="textarea" maxlength="200" show-word-limit />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Dict } from '@/components'
import { DICT_CODE_ENUM } from '@/common/enums'
import { jobInfoApi, jobCreateApi, jobUpdateApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  bean: '',
  params: '',
  cron: '',
  remark: '',
  status: ''
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    bean: [{ required: true, message: '请输入处理器名称', trigger: 'blur' }],
    cron: [{ required: true, message: '请输入cron表达式', trigger: 'blur' }]
  }
})

const onClosed = () => {
  form.id = null
  formRef.value.resetFields()
}

const onCancel = () => {
  visible.value = false
  emits('cancel')
}

const onConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      loading.value = true
      const r = await (form.id ? jobUpdateApi(form) : jobCreateApi(form))
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
    }
  })
}

const open = (id) => {
  visible.value = true
  if (id) {
    form.id = id
    loading.value = true
    jobInfoApi({ id }).then(r => {
      if (r) {
        form.name = r.data.name
        form.bean = r.data.bean
        form.params = r.data.params
        form.cron = r.data.cron
        form.remark = r.data.remark
        form.status = r.data.status
      }
      nextTick(() => loading.value = false)
    })
  }
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: add-edit#{$element-separator};
@include b(add-edit) {}
</style>
