<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑邮件模板' : '新增邮件模板'"
    :close-on-click-modal="false"
    width="70%"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <div class="f g-15">
        <el-form-item class="f_f-1" label="名称" prop="name">
          <el-input v-model="form.name" placeholder="名称" maxlength="20" show-word-limit />
        </el-form-item>
        <el-form-item class="f_f-1" label="编码" prop="code">
          <el-input v-model="form.code" placeholder="编码" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item class="f_f-1" label="标题" prop="title">
          <el-input v-model="form.title" placeholder="标题" maxlength="50" show-word-limit />
        </el-form-item>
      </div>
      <el-form-item label="模版内容" prop="content">
        <Tinymce v-model="form.content" placeholder="模版内容，变量使用 ${name} 表示" top />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注" type="textarea" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <Dict v-model="form.status" :code="DICT_CODE_ENUM.STATUS" default-value></Dict>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Dict, Tinymce } from '@/components'
import { DICT_CODE_ENUM } from '@/common/enums'
import { mailTemplateInfoApi, mailTemplateCreateApi, mailTemplateUpdateApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  code: '',
  title: '',
  content: '',
  remark: '',
  status: ''
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
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
      const r = await (form.id ? mailTemplateUpdateApi(form) : mailTemplateCreateApi(form))
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
      loading.value = false
    }
  })
}

const open = (id) => {
  visible.value = true
  if (id) {
    loading.value = true
    form.id = id
    mailTemplateInfoApi({ id }).then(r => {
      if (r) {
        form.name = r.data.name
        form.code = r.data.code
        form.title = r.data.title
        form.content = r.data.content + '<p><br/></p>'
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
