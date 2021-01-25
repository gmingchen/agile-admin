<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-25 10:50:12
-->
<template>
  <fog>
    <el-card class="login-card"> </el-card>
  </fog>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Fog from './fog.vue'

@Options({
  components: { Fog }
})
export default class extends Vue {
  private form = {
    username: '',
    password: '',
    uuid: '',
    captcha: ''
  }
  private rules = {
    username: [{ required: true, message: '帐号不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }
}
</script>

<style lang="scss"></style>
