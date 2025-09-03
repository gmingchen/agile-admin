<template>
  <el-dialog
    v-model="visible"
    title="发送邮件"
    :close-on-click-modal="false"
    width="50%"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="接收邮箱" prop="toMails">
        <el-tag
          class="mr-5 mb-5"
          size="large"
          v-for="mail in form.toMails"
          :key="mail"
          closable
          :disable-transitions="true"
          @close="onMailClose(tag)">
          {{ mail }}
        </el-tag>
        <div class="w-200 mb-5">
          <el-input v-if="mailVisible" ref="mailRef" v-model="mailValue" @keyup.enter="onMailEnter" @blur="onMailBlur" />
          <el-button v-else @click="onMailAdd">+</el-button>
        </div>
      </el-form-item>
      <el-form-item label="模版" prop="templateId">
        <el-select v-model="form.templateId" placeholder="模版" @change="onTemplateChange">
          <el-option v-for="item in templates" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="模版内容" prop="templateContent" v-show="form.templateContent">
        <div class="content-box" v-html="form.templateContent" />
      </el-form-item>
      <el-form-item
        v-for="(item, index) in form.templateParams"
        :key="index"
        label="模版参数"
        :prop="`templateParams[${index}].value`"
        :rules="rules.templateParams">
        <el-input v-model="item.value" :placeholder="`\$\{${item.label}\}`" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { isEmail } from '@/common/utils'
import { mailSendApi, mailTemplateSelectListApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  toMails: [],
  templateId: '',
  templateContent: '',
  templateParams: []
})
const rules = computed(() => {
  return {
    toMails: [{ type: 'array', min: 1, required: true, message: '请输入接收邮箱', trigger: 'blur' }],
    templateId: [{ required: true, message: '请选择模版ID', trigger: 'change' }],
    templateParams: [{ required: true, message: '请输入模版参数', trigger: 'blur' }]
  }
})

const templates = ref([])
const mailVisible = ref(false)
const mailValue = ref('')
const mailRef = useTemplateRef('mailRef')

const getTemplateList = async () => {
  const r = await mailTemplateSelectListApi()
  if (r) {
    templates.value = r.data
  }
}

const handleMail = () => {
  let message = ''
  if (!isEmail(mailValue.value)) {
    message = '请输入正确的邮箱!'
  } else if (form.toMails.includes(mailValue.value)) {
    message = '该邮箱已添加，请重新输入邮箱!'
  }
  if (message) {
    ElMessage.warning(message)
  } else {
    form.toMails.push(mailValue.value)
    mailVisible.value = false
    mailValue.value = ''
  }
}

const onMailEnter = () => handleMail()

const onMailBlur = () => handleMail()

const onMailAdd = () => {
  mailVisible.value = true
  nextTick(mailRef.value.input.focus())
}

const onTemplateChange = (value) => {
  const template = templates.value.find(item => item.id === value)
  if (template) {
    const { content, params } = template
    form.templateContent = content
    form.templateParams = params.map(param => ({ label: param, value: '' }))
  } else {
    form.templateContent = ''
    form.templateParams = []
  }
}

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
      const { templateId, templateParams, toMails } = form
      const params = { templateId, toMails, params: {} }
      templateParams.forEach(({ label, value }) => params.params[label] = value)
      loading.value = true
      const r = await mailSendApi(params)
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
    }
  })
}

const open = async () => {
  visible.value = true
  loading.value = true
  await getTemplateList()
  nextTick(() => loading.value = false)
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: add-edit#{$element-separator};
@include b(add-edit) {}
</style>
