<template>
  <el-form
    :class="n.b()"
    :model="form"
    :rules="rules"
    ref="formRef"
    label-position="top"
    :disabled="!hasPermission('auth:updateBasic')"
    @keyup.enter="onSubmit()">
    <el-form-item label="头像" prop="avatar">
      <UploadImage v-model="form.avatar" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="form.nickname" placeholder="昵称" maxlength="20" show-word-limit />
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="form.mobile" placeholder="手机号" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="邮箱" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <Dict v-model="form.sex" :code="DICT_CODE_ENUM.SEX" />
    </el-form-item>
    <el-form-item>
      <el-button v-repeat type="primary" @click="onSubmit()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { UploadImage, Dict } from '@/components'
import { useAdminerStore } from '@/stores'
import { DICT_CODE_ENUM } from '@/common/enums'
import { hasPermission } from '@/permission'
import { isMobile, isEmail } from '@/common/utils'
import { updateLoginBasicApi } from '@/apis'
import { useNamespace } from '@/hooks'
import { onBeforeMount } from 'vue'

const n = useNamespace('basic')

const adminerStore = useAdminerStore()

const formRef = useTemplateRef('formRef')
const form = reactive({
  avatar: '',
  nickname: '',
  mobile: '',
  email: '',
  sex: ''
})
const rules = computed(() => {
  return {
    nickname: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
    mobile: [
      {
        validator: (_rule, value, callback) => {
          if (!value) {
            callback()
          } else if (!isMobile(value)) {
            callback(new Error('请输入正确的手机号'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
    email: [
      {
        validator: (_rule, value, callback) => {
          if (!value) {
            callback()
          } else if (!isEmail(value)) {
            callback(new Error('请输入正确的邮箱'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
  }
})

const getData = () => {
  const { avatar, nickname, mobile, email, sex } = adminerStore
  console.log(avatar);

  form.avatar = avatar || ''
  form.nickname = nickname
  form.mobile = mobile
  form.email = email
  form.sex = sex
}

const onSubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      updateLoginBasicApi(form).then(r => {
        if (r) {
          adminerStore.getAdminer()
          ElMessage({
            message: '操作成功!',
            type: 'success'
          })
        }
      })
    }
  })
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: basic#{$element-separator};
@include b(basic) {
  min-width: 350px;
  max-width: 500px;
}
</style>
