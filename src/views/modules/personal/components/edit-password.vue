<template>
  <el-form
    class="basic-info-container"
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

<script>
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'

import { isPassword } from '@/utils/regular'

import { editPasswordApi } from '@/api/administrator'

export default defineComponent({
  setup() {
    const refForm = ref()
    const data = reactive({
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    })
    const rules = computed(() => {
      const checkNewPassword = (_rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('用户名由8-16位的数字、字母、中横线、下划线组成'))
        } else {
          callback()
        }
      }
      const checkConfirmPassword = (_rule, value, callback) => {
        if (data.form.newPassword && data.form.newPassword !== value) {
          callback(new Error('新密码与确认密码不一致'))
        } else {
          callback()
        }
      }
      return {
        oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: checkNewPassword, trigger: 'blur' }
        ],
        confirmPassword: [{ validator: checkConfirmPassword, trigger: 'blur' }]
      }
    })

    const submit = () => {
      refForm.value.validate(valid => {
        if (valid) {
          const params = {
            old_password: data.form.oldPassword,
            new_password: data.form.newPassword
          }
          editPasswordApi(params).then(r => {
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

    return {
      refForm,
      ...toRefs(data),
      rules,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
.basic-info-container {
  min-width: 350px;
  max-width: 500px;
}
</style>
