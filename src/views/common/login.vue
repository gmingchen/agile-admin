<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-08 15:25:13
-->
<template>
  <fog>
    <el-card class="login-card">
      <el-form :model="form" :rules="rules" ref="formRef" @keyup.enter="submit()" class="form" status-icon>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="帐号">
            <template #prefix>
              <svg-icon name="user"></svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码">
            <template #prefix>
              <svg-icon name="lock"></svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.captcha" placeholder="验证码">
                <template #prefix>
                  <svg-icon name="verification"></svg-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="8" class="login-captcha">
              <img :src="captchaPath" @click="getCaptcha()" alt="验证码" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submit()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </fog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import Fog from './fog.vue'
import { $getUUID } from '@U/index'
import { getCaptcha, login } from '@API/common'

const userModule = namespace('user')

@Options({
  components: { Fog }
})
export default class extends Vue {
  $refs!: {
    [key: string]: HTMLFormElement
  }

  @userModule.Action('setToken')
  setToken!: (arg: string) => void

  protected captchaPath: string = ''
  protected form = {
    username: 'test',
    password: 'test',
    uuid: '',
    captcha: ''
  }
  protected rules = {
    username: [{ required: true, message: '帐号不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
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
    this.$refs['formRef'].validate(async (valid: boolean) => {
      if (valid) {
        const r = await login(this.form)
        if (r && r.code === 0) {
          this.setToken(r.token)
          this.$router.push({ name: 'home' })
        } else {
          this.getCaptcha()
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@SASS/mixin.scss';
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
    .login-captcha img {
      @include width-full;
    }
    .login-btn {
      @include width-full;
    }
  }
}
</style>
