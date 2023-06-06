<script setup>
import { ElNotification } from 'element-plus'

import Identify from './identify.vue'

import { generateUUID } from '@/utils'
import { captchaApi } from '@/api/auth'

const router = useRouter()
const authStore = useAuthStore()

const refForm = ref()
const refIdentify = ref()
const loading = ref(false)

const captcha = ref('')
const form = reactive({
  account: 'admin1',
  password: 'superadmin',
  uuid: '',
  code: ''
})
const rules = reactive({
  account: [{ required: true, message: `帐号不能为空`, trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})

/**
 * 获取验证码
 */
const getCaptcha = () => {
  const uuid = generateUUID()
  form.uuid = uuid
  captchaApi({ uuid }).then(r => {
    if (r) {
      captcha.value = r.data
    }
  })
}
/**
 * 登录表单提交
 */
const submit = () => {
  if (!refIdentify.value.init()) {
    return
  }
  refForm.value.validate(valid => {
    if (valid) {
      loading.value = true
      authStore.login(form).then(r => {
        if (r) {
          router.push({ name: 'redirect', replace: true })
        }
        nextTick(() => {
          getCaptcha()
          loading.value = false
        })
      })
    }
  })
}
/**
 * @description: 提示
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const notifyHandle = () => {
  const message = `
    <div class="login-notify-content">
      <div class="tip">演示环境，部分权限暂不开放</div>
      因系统禁止多点在线 所以会遇到token失效、退出登录的情况，可以尝试更换帐号登录！
      <div class="margin_t-10">
        <p>总后台帐号：</p>
        <b>admin1,admin2,admin3,admin4</b>
      </div>
      <div class="margin-10-n">
        <p>租户帐号：</p>
        <b>demo1,demo2,demo3,demo4</b>
      </div>
      <p>所有帐号的密码统一为：<b>superadmin</b></p>
    </div>
  `
  ElNotification({
    title: '提示',
    dangerouslyUseHTMLString: true,
    message: message,
    type: 'warning',
    position: 'bottom-right',
    duration: 0,
    customClass: 'login-notify'
  })
}

onBeforeMount(() => {
  getCaptcha()
  notifyHandle()
})
</script>

<template>
  <div class="login-container flex flex_a_i-center flex_j_c-center">
    <el-card class="width-500">
      <div class="title-box margin_b-20">
        <div class="title">AA(Agile Admin)</div>
        <el-divider content-position="right">基于VUE3开箱即用的后台管理系统</el-divider>
      </div>
      <el-form
        ref="refForm"
        :model="form"
        :rules="rules"
        @keyup.enter="submit()">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="用户名/手机号/邮箱" clearable>
            <template #prefix>
              <Iconfont name="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="密码"
            show-password
            clearable>
            <template #prefix>
              <Iconfont name="lock" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            class="flex-item_f-1"
            v-model="form.code"
            placeholder="验证码"
            clearable>
            <template #prefix>
              <Iconfont name="verification" />
            </template>
          </el-input>
          <img
            class="height-32 cursor-pointer"
            :src="captcha"
            @click="getCaptcha()"
            alt="验证码">
        </el-form-item>
        <el-button
          v-repeat
          :loading="loading"
          class="margin_t-20 width-full"
          type="primary"
          @click="submit()">登录</el-button>
      </el-form>
    </el-card>
    <Identify ref="refIdentify" />
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  .title-box {
    .title {
      font-size: 28px;
      color: var(--el-color-primary);
    }
    .describe {
      text-align: right;
    }
  }
}
</style>
