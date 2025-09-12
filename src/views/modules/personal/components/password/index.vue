<template>
  <el-form
    :class="n.b()"
    :model="form"
    :rules="rules"
    ref="formRef"
    label-position="top"
    @keyup.enter="onSubmit()">
    <el-form-item label="原密码" prop="oldPassword">
      <el-input v-model="form.oldPassword" placeholder="原密码" type="password" show-password />
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="form.newPassword" placeholder="新密码" type="password" show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" placeholder="确认密码" type="password" show-password />
    </el-form-item>
    <el-form-item>
      <el-button v-repeat type="primary" @click="onSubmit()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { updateLoginPasswordApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('password')

const formRef = useTemplateRef('formRef')
const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const rules = computed(() => {
  return {
    oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
    newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    confirmPassword: [{
      validator: (_rule, value, callback) => {
        if (form.newPassword && form.newPassword !== value) {
          callback(new Error('新密码与确认密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }]
  }
})

const onSubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      const { oldPassword, newPassword } = form
      const params = { oldPassword, newPassword }
      updateLoginPasswordApi(params).then(r => {
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

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: password#{$element-separator};
@include b(password) {
  min-width: 350px;
  max-width: 500px;
}
</style>
