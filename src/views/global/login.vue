<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:49:00
-->
<template>
  <el-card
    class="login-card"
    v-loading="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.2)">
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      class="form"
      status-icon>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="账户">
          <template #prefix>
            <gl-svg name="user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" show-password>
          <template #prefix>
            <gl-svg name="lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16" class="login-col">
            <el-input v-model="form.code" placeholder="验证码">
              <template #prefix>
                <gl-svg name="verification" />
              </template>
            </el-input>
          </el-col>
          <el-col :span="8" class="login-col login-captcha">
            <img :src="captchaPath" @click="captcha()" alt="验证码">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <gl-button
          sort="login"
          class="login-btn"
          type="primary"
          @click="submit()" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, onBeforeMount } from 'vue'
import { captchaApi, loginApi } from '@/api/login'
import { getUUID } from '@/utils/index'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const data = reactive({
      loading: false,
      captchaPath: ''
    })

    const refForm = ref()
    const form = reactive({
      username: 'test',
      password: 'test',
      uuid: '',
      code: ''
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
    const captcha = () => {
      form.uuid = getUUID()
      data.captchaPath = captchaApi({ uuid: form.uuid })
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
          loginApi(form).then(r => {
            if (r) {
              store.dispatch('user/setToken', r.data)
              router.push({ name: 'home' })
            } else {
              captcha()
            }
            data.loading = false
          })
        }
      })
    }

    onBeforeMount(() => {
      captcha()
    })

    return {
      ...toRefs(data),
      refForm,
      form,
      rules,
      captcha,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_mixin.scss';
.login-card {
  position: absolute;
  @include position($t: 50%, $l: 50%);
  transform: translate(-50%, -50%);
  width: 500px;
  ::v-deep(.el-card) {
    background-color: transparent;
  }
  .form {
    .login-col {
      height: 36px;
    }
    .login-captcha img, .login-btn {
      width: 100%;
      cursor: pointer;
    }
    .login-btn {
      margin-top: 22px;
    }
  }
}
</style>
