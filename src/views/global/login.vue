<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 18:37:12
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
      ref="formR"
      @keyup.enter="submit()"
      class="form"
      status-icon>
      <el-form-item prop="username">
        <el-input v-model="form.username" :placeholder="$t('field.account')">
          <template #prefix>
            <svg-icon name="user" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" :placeholder="$t('field.password')" show-password>
          <template #prefix>
            <svg-icon name="lock" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :gutter="20">
          <el-col :span="16" class="login-col">
            <el-input v-model="form.code" :placeholder="$t('field.captcha')">
              <template #prefix>
                <svg-icon name="verification" />
              </template>
            </el-input>
          </el-col>
          <el-col :span="8" class="login-col login-captcha">
            <img :src="captchaPath" @click="getCaptcha()" :alt="$t('field.captcha')">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submit()">{{ $t('button.login') }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { getCaptcha, login } from '@/api/login'
import { $getUUID } from '@/utils/index'
import Language from '@V/components/language/index.vue'
import { IObject } from '@/types'
import { Token } from '@/types/token'

const userModule = namespace('user')

@Options({
  components: { Language }
})
export default class extends Vue {
  @userModule.Action('setToken')
  setToken!: (arg: Token.Base) => void

  protected list = []

  protected loading: boolean = false
  protected captchaPath: string = ''
  protected form = {
    username: 'test',
    password: 'test',
    uuid: '',
    code: ''
  }
  get rules(): IObject {
    const rules = {
      username: [{ required: true, message: this.$t('rule.notBlank', [this.$t('field.account')]), trigger: 'blur' }],
      password: [{ required: true, message: this.$t('rule.notBlank', [this.$t('field.password')]), trigger: 'blur' }],
      code: [{ required: true, message: this.$t('rule.notBlank', [this.$t('field.captcha')]), trigger: 'blur' }]
    }
    this.$nextTick(() => {
      this.$refs.formR.clearValidate()
    })
    return rules
  }

  created(): void {
    this.getCaptcha()
  }

  /**
   * @description: 获取验证码图片
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  getCaptcha(): void {
    this.form.uuid = $getUUID()
    this.captchaPath = getCaptcha({ uuid: this.form.uuid })
  }

  /**
   * @description: 登录表单提交
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  submit(): void {
    this.$refs.formR.validate((valid: boolean) => {
      if (valid) {
        this.loading = true
        login(this.form).then(r => {
          if (r) {
            this.setToken(r.data)
            this.$router.push({ name: 'home' })
          } else {
            this.getCaptcha()
          }
          this.loading = false
        })
      }
    })
  }
}
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
