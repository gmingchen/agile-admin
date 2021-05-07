<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 15:49:42
-->
<template>
  <language class="language" />
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
        <el-input v-model="form.username" :placeholder="t('field.account')">
          <template #prefix>
            <svg-icon name="user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" :placeholder="t('field.password')" show-password>
          <template #prefix>
            <svg-icon name="lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16" class="login-col">
            <el-input v-model="form.code" :placeholder="t('field.captcha')">
              <template #prefix>
                <svg-icon name="verification" />
              </template>
            </el-input>
          </el-col>
          <el-col :span="8" class="login-col login-captcha">
            <img :src="captchaPath" @click="captcha()" :alt="t('field.captcha')">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submit()">{{ t('button.login') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, nextTick, ref, onBeforeMount } from 'vue'
import { getCaptcha, login } from '@/api/login'
import { getUUID } from '@/utils/index'
import Language from 'V/components/language/index.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { key, useStore } from '@/store'

export default defineComponent({
  components: { Language },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const store = useStore(key)

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
    const rules = computed(() => {
      const rule = {
        username: [{ required: true, message: t('rule.notBlank', [t('field.account')]), trigger: 'blur' }],
        password: [{ required: true, message: t('rule.notBlank', [t('field.password')]), trigger: 'blur' }],
        code: [{ required: true, message: t('rule.notBlank', [t('field.captcha')]), trigger: 'blur' }]
      }
      nextTick(() => {
        refForm.value.clearValidate()
      })
      return rule
    })

    /**
     * @description: 获取验证码图片
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const captcha = (): void => {
      form.uuid = getUUID()
      data.captchaPath = getCaptcha({ uuid: form.uuid })
    }

    /**
     * @description: 登录表单提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = (): void => {
      refForm.value.validate((valid: boolean) => {
        if (valid) {
          data.loading = true
          login(form).then(r => {
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
      t,
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
.language {
  position: absolute;
  top: 10px;
  right: 20px;
}
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
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
