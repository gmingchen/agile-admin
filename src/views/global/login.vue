<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-03-07 11:03:55
-->
<template>
  <el-card
    class="login-card width-500"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      status-icon>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="账户" clearable>
          <template #prefix>
            <span><g-iconfont name="user" /></span>
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
            <span><g-iconfont name="lock" /></span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16" class="height-36">
            <el-input v-model="form.code" placeholder="验证码" clearable>
              <template #prefix>
                <span><g-iconfont name="verification" /></span>
              </template>
            </el-input>
          </el-col>
          <el-col :span="8" class="height-36 cursor-pointer">
            <img
              :src="captchaPath"
              @click="captcha()"
              alt="验证码"
              class="width-full">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button class="margin_t-22 width-full" type="primary" @click="submit()">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, onBeforeMount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { getUUID } from '@/utils/index'

import { captchaApi } from '@/api/login'

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
          store.dispatch('user/login', form).then(r => {
            if (r) {
              router.push({ name: 'home' })
            } else {
              captcha()
            }
            nextTick(() => {
              data.loading = false
            })
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
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
}
</style>
