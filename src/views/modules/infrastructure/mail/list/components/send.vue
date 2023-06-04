<script setup>
import { ElMessage } from 'element-plus'

import { Status } from '@/utils/enum'
import { isEmail } from '@/utils/regular'

import { selectApi } from '@/api/mail-template'

import { sendApi } from '@/api/mail'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  toMails: [], // 邮箱地址
  templateId: '',
  templateContent: '',
  templateParams: []
})
const rules = reactive(function() {
  return {
    toMails: [{ type: 'array', min: 1, required: true, message: '请输入接收邮箱', trigger: 'blur' }],
    templateId: [{ required: true, message: '请选择模版ID', trigger: 'change' }],
    templateParams: [{ required: true, message: '请输入模版参数', trigger: 'blur' }]
  }
}())
const templates = ref([])
const mailInputVisible = ref(false)
const mailInputValue = ref('')
const mailInputRef = ref()

const getTemplateList = async () => {
  const r = await selectApi()
  if (r) {
    templates.value = r.data
  }
}

const init = async () => {
  visible.value = true
  loading.value = true
  await getTemplateList()
  nextTick(() => { loading.value = false })
}

const mailCloseHandle = (index) => {
  form.toMails.splice(index, 1)
}

const mailInputShowHandle = () => {
  mailInputVisible.value = true
  nextTick(() => {
    mailInputRef.value.input.focus()
  })
}

const mailInputConfirmHandle = () => {
  if (!isEmail(mailInputValue.value)) {
    ElMessage({
      message: '请输入正确的邮箱!',
      type: 'warning'
    })
    return
  }
  if (form.toMails.includes(mailInputValue.value)) {
    ElMessage({
      message: '该邮箱已添加，请重新输入邮箱!',
      type: 'warning'
    })
    return
  }
  form.toMails.push(mailInputValue.value)
  mailInputVisible.value = false
  mailInputValue.value = ''
}

const templateChangeHandle = (val) => {
  const template = templates.value.find(item => item.id === val)
  if (template) {
    const { content, params } = template
    form.templateContent = content
    form.templateParams = params.map(param => ({ label: param, value: '' }))
  } else {
    form.templateContent = ''
    form.templateParams = []
  }
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 */
const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const { templateId, templateParams, toMails } = form
      const params = {
        templateId,
        toMails,
        params: {}
      }
      templateParams.forEach(item => {
        const { label, value } = item
        params.params[label] = value
      })
      const r = await sendApi(params)
      if (r) {
        visible.value = false
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        emits('refresh')
      }
    }
  })
}

/**
 * @description: 弹窗关闭动画结束时的回调
 * @param {*}
 * @return {*}
 */
const dialogClosedHandle = () => {
  refForm.value.resetFields()
}

defineExpose({
  init
})
</script>

<template>
  <el-dialog
    width="50%"
    title="发送通知"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      label-width="80px"
      @keyup.enter="submit()">
      <el-form-item label="接收邮箱" prop="toMails">
        <el-tag
          class="margin_r-5 margin_b-5"
          size="large"
          v-for="mail in form.toMails"
          :key="mail"
          closable
          :disable-transitions="true"
          @close="mailCloseHandle(tag)">
          {{ mail }}
        </el-tag>
        <div class="width-200 margin_b-5">
          <el-input
            v-if="mailInputVisible"
            ref="mailInputRef"
            v-model="mailInputValue"
            @keyup.enter="mailInputConfirmHandle"
            @blur="mailInputConfirmHandle" />
          <el-button v-else @click="mailInputShowHandle">+</el-button>
        </div>
      </el-form-item>
      <el-form-item label="模版" prop="templateId">
        <el-select v-model="form.templateId" placeholder="模版" @change="templateChangeHandle">
          <el-option
            v-for="item in templates"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
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
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          v-repeat
          type="primary"
          @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.content-box {
  border: 1px solid var(--el-border-color);
}
</style>
