<template>
  <div :class="n.b()">
    <el-card class="w-500">
      <div class="mb-20">
        <!-- <div :class="n.e('title')">AA(Agile Admin)</div>
        <el-divider content-position="right">基于VUE3开箱即用的后台管理系统</el-divider> -->
      </div>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        @keyup.enter="onSubmit">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="用户名/手机号/邮箱" clearable>
            <template #prefix>
              <Icon name="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码" show-password clearable>
            <template #prefix>
              <Icon name="lock" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input class="f_f-1" v-model="form.code" placeholder="验证码"  clearable>
            <template #prefix>
              <Icon name="verification" />
            </template>
          </el-input>
          <img v-if="captcha" :src="captcha" class="h-32 c-pointer" @click="onCaptchaChange()" alt="验证码">
        </el-form-item>
        <el-button :loading="loading" class="mt-20 w-f" type="primary" @click="onSubmit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { Icon } from '@/components'
import { generateUUID } from '@/common/utils'
import { useAuthStore } from '@/stores'
import { captchaApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('login')
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const captcha = ref('')
const formRef = useTemplateRef('formRef')
const form = reactive({
  account: 'super',
  password: 'gumingchen',
  uuid: '',
  code: '',
})
const rules = computed(() => {
  return {
    account: [{ required: true, message: `帐号不能为空`, trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }
})

const getCaptcha = async () => {
  const uuid = generateUUID()
  form.uuid = uuid
  const r = await captchaApi({ uuid })
  if (r) {
    captcha.value = r.data
  }
}

const handleCaptcha = async () => {
  await getCaptcha()
  form.code = ''
}

const onCaptchaChange = () => {
  handleCaptcha()
}

const onSubmit = () => {
  if (loading.value) return
  formRef.value.validate(async valid => {
    if (!valid)  return
    loading.value = true
    const r = await authStore.login(form)
    if (r) {
      router.push({ name: 'redirect', replace: true })
    } else {
      await handleCaptcha()
      loading.value = false
    }
  })
}

onBeforeMount(() => {
  handleCaptcha()
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(login) {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @include e(title) {
    font-size: 28px;
    color: var(--color-primary);
  }
}
</style>
