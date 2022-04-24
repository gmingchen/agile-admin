<template>
  <div class="login-container flex-box flex_a_i-center flex_j_c-center">
    <el-card class="width-500">
      <el-form
        ref="refForm"
        :model="form"
        :rules="rules"
        @keyup.enter="submit()">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="账户" clearable>
            <template #prefix>
              <g-iconfont name="user" />
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
              <g-iconfont name="lock" />
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
              <g-iconfont name="verification" />
            </template>
          </el-input>
          <img
            class="height-32 cursor-pointer"
            :src="captcha"
            @click="getCaptcha()"
            alt="验证码">
        </el-form-item>
        <el-button
          v-loading="loading"
          class="margin_t-20 width-full"
          type="primary"
          @click="submit()">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script >
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { generateUUID } from '@/utils'

import { captchaApi } from '@/api/login'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const refForm = ref()
    const data = reactive({
      loading: false,
      captcha: '',
      form: {
        username: 'gumingchen',
        password: 'gumingchen',
        uuid: '',
        code: ''
      }
    })
    const rules = reactive(function() {
      return {
        username: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
    }())

    /**
     * @description: 获取验证码图片
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getCaptcha = () => {
      const uuid = generateUUID()
      data.form.uuid = uuid
      data.captcha = captchaApi({ uuid })
    }

    /**
     * @description: 登录表单提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(valid => {
        if (valid) {
          data.loading = true
          store.dispatch('administrator/login', data.form).then(r => {
            if (r) {
              router.push({ name: 'redirect', replace: true })
            } else {
              getCaptcha()
            }
            nextTick(() => {
              data.loading = false
            })
          })
        }
      })
    }

    onBeforeMount(() => {
      getCaptcha()
    })

    return {
      refForm,
      ...toRefs(data),
      rules,
      getCaptcha,
      submit
    }
  }
})
</script>

<style lang="scss">
.login-container {
  input:focus + .el-input__prefix {
    color: var(--el-color-primary);
  }
}
</style>
