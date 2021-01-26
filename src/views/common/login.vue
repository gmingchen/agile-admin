<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-26 17:14:03
-->
<template>
  <fog>
    <el-card class="login-card">
      <!-- <el-input v-model="form.username" placeholder="帐号"> </el-input> -->
      <el-form :model="form" :rules="rules" ref="form" @keyup.enter="submit()" status-icon>
        <el-form-item prop="username"> </el-form-item>
        <!-- <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码">
            <template #prefix>
              <svg-icon name="lock"></svg-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model="form.captcha" placeholder="验证码">
                <template #prefix>
                  <svg-icon name="verification"></svg-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="10" class="login-captcha">
              <img :src="captchaPath" @click="getCaptcha()" alt="验证码" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn-submit" type="primary" @click="submit()">登录</el-button>
        </el-form-item> -->
      </el-form>
    </el-card>
  </fog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Fog from './fog.vue'
import { $getUUID } from '@U/index'
import { getCaptcha } from '@API/user'

@Options({
  components: { Fog }
})
export default class extends Vue {
  private captchaPath: string = ''
  form = {
    username: '222',
    password: '',
    uuid: '',
    captcha: ''
  }
  private rules = {
    username: [{ required: true, message: '帐号不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }
  created() {
    this.getCaptcha()
  }
  getCaptcha() {
    this.form.uuid = $getUUID()
    this.captchaPath = getCaptcha({ uuid: this.form.uuid })
  }
}
</script>

<style lang="scss"></style>
