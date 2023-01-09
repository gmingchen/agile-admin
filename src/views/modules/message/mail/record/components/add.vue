<template>
  <el-dialog
    width="800px"
    :title="form.id ? '编辑' : '新增'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      label-position="top">
      <el-form-item label="邮件标题" prop="subject">
        <el-input
          v-model="form.subject"
          placeholder="邮件标题"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="邮件内容" prop="content">
        <Wang v-model="form.content" placeholder="输入邮件内容..." />
      </el-form-item>
      <el-form-item label="发送类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">私发</el-radio>
          <el-radio :label="2">群发</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收件人" prop="email" v-if="form.type === 1">
        <el-input
          v-model="form.email"
          placeholder="收件人"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="收件人" prop="emails" v-if="form.type === 2">
        <el-tag
          class="margin_r-10 margin_b-10"
          v-for="item in form.emails"
          :key="item"
          closable
          :disable-transitions="false"
          @close="closeHandle(item)">
          {{item}}
        </el-tag>
        <el-input
          ref="refInput"
          v-if="inputVisible"
          v-model="inputValue"
          @keyup.enter="confirmHandle" />
        <el-button
          v-else
          class="margin_b-10"
          size="small"
          @click="addHandle">
          <Iconfont name="plus" />
        </el-button>
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

<script setup>
import { nextTick, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'

import { isEmail } from '@/utils/regular'

import { addApi } from '@/api/mail'

const emits = defineEmits(['refresh'])

const refForm = ref()
const refInput = ref()
const visible = ref(false)
const inputVisible = ref(false)
const inputValue = ref('')
const form = reactive({
  subject: '',
  content: '',
  type: 1,
  email: '',
  emails: []
})
const rules = reactive(function() {
  const checkEmail = (_rule, value, callback) => {
    if (value === '' || !isEmail(value)) {
      callback(new Error('请输入正确的邮箱地址'))
    } else {
      callback()
    }
  }
  return {
    subject: [{ required: true, message: '请输入邮件标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入邮件内容', trigger: 'blur' }],
    email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
    emails: [{ type: 'array', required: true, message: '请至少输入一个邮箱地址', trigger: 'blur' }]
  }
}())

const init = () => {
  visible.value = true
}

/**
 * @description: 群发添加邮箱
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const addHandle = () => {
  inputVisible.value = true
  nextTick(_ => {
    refInput.value.$refs.input.focus()
  })
}

/**
 * @description: 群发输入邮箱验证
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const confirmHandle = () => {
  let message = '请输入正确的邮箱!'
  if (isEmail(inputValue.value)) {
    if (!form.emails.includes(inputValue.value)) {
      form.emails.push(inputValue.value)
      inputValue.value = ''
      inputVisible.value = false
      return
    }
    message = '该邮箱已存在!'
  }
  ElMessage({
    message: message,
    type: 'warning'
  })
  refInput.value.$refs.input.focus()
}

/**
 * @description: 删除群发邮箱
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const closeHandle = (email) => {
  form.emails.splice(form.emails.indexOf(email), 1)
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const params = {
        subject: form.subject,
        content: encodeURI(form.content),
        type: form.type,
        emails: form.type === 1 ? [form.email] : form.emails,
        enclosures: []
      }
      const r = await addApi(params)
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
 * @author: gumingchen
 */
const dialogClosedHandle = () => {
  refForm.value.resetFields()
}

defineExpose({
  init
})
</script>
