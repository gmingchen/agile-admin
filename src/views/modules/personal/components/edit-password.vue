<script setup>
import { ElMessage } from 'element-plus'

import { updatePasswordApi } from '@/api/auth'

const refForm = ref()
const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const rules = computed(() => {
  const checkConfirmPassword = (_rule, value, callback) => {
    if (form.newPassword && form.newPassword !== value) {
      callback(new Error('新密码与确认密码不一致'))
    } else {
      callback()
    }
  }
  return {
    oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmPassword: [{ validator: checkConfirmPassword, trigger: 'blur' }]
  }
})

const submit = () => {
  refForm.value.validate(valid => {
    if (valid) {
      const params = {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      }
      updatePasswordApi(params).then(r => {
        if (r) {
          ElMessage({
            message: '操作成功!',
            type: 'success'
          })
        }
      })
    }
  })
}
</script>

<template>
  <el-form
    class="edit-password-container"
    :model="form"
    :rules="rules"
    ref="refForm"
    @keyup.enter="submit()"
    label-position="top">
    <el-form-item label="原密码" prop="oldPassword">
      <el-input
        v-model="form.oldPassword"
        placeholder="原密码"
        type="password"
        show-password />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input
        v-model="form.newPassword"
        placeholder="新密码"
        type="password"
        show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input
        v-model="form.confirmPassword"
        placeholder="确认密码"
        type="password"
        show-password />
    </el-form-item>
    <el-form-item>
      <el-button v-repeat type="primary" @click="submit()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.edit-password-container {
  min-width: 350px;
  max-width: 500px;
}
</style>
