<script setup>
import { ElMessage } from 'element-plus'

import UploadImage from '@/components/upload-image/index.vue'

import { isEmail, isMobile } from '@/utils/regular'
import { havePermission } from '@/utils'

import { updateBasicApi } from '@/api/auth'

const props = defineProps({
  adminer: {
    type: Object,
    required: true
  }
})

const adminerStore = useAdminerStore()

const refForm = ref()
const form = reactive({
  avatar: '',
  nickname: '',
  mobile: '',
  email: '',
  sex: 2
})
const rules = computed(() => {
  const checkMobile = (_rule, value, callback) => {
    if (form.mobile !== '' && !isMobile(value)) {
      callback(new Error('请输入正确的手机号'))
    }
    callback()
  }
  const checkEmail = (_rule, value, callback) => {
    if (form.email !== '' && !isEmail(value)) {
      callback(new Error('请输入正确的邮箱'))
    }
    callback()
  }
  return {
    nickname: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
    mobile: [{ validator: checkMobile, trigger: 'blur' }],
    // email: [{ validator: checkEmail, trigger: 'blur' }]
  }
})

const submit = () => {
  refForm.value.validate(valid => {
    if (valid) {
      updateBasicApi(form).then(r => {
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

onBeforeMount(() => {
  form.avatar = props.adminer.avatar || ''
  form.nickname = props.adminer.nickname
  form.mobile = props.adminer.mobile
  form.email = props.adminer.email
  form.sex = props.adminer.sex
})
</script>

<template>
  <el-form
    class="basic-info-container"
    :model="form"
    :rules="rules"
    ref="refForm"
    @keyup.enter="submit()"
    label-position="top"
    :disabled="!havePermission('auth:updateBasic')">
    <el-form-item label="头像" prop="avatar">
      <UploadImage v-model="form.avatar" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input
        v-model="form.nickname"
        placeholder="昵称"
        maxlength="20"
        show-word-limit />
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="form.mobile" placeholder="手机号" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="邮箱" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <DictRadio v-model="form.sex" code="SEX" />
    </el-form-item>
    <el-form-item>
      <el-button v-repeat type="primary" @click="submit()">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.basic-info-container {
  min-width: 350px;
  max-width: 500px;
}
</style>
