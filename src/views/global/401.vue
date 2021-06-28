<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 18:35:52
-->
<template>
  <div class="error-container">
    <gl-button
      type="primary"
      sort="back"
      icon="el-icon-arrow-left"
      @click="back" />
    <el-row>
      <el-col :span="12">
        <h1 class="font_s-60">Oops!</h1>
        <h2>你没有权限去该页面</h2>
        <h6 class="font_s-18">如有不满请联系你领导</h6>
        <ul class="other-go ">
          <li>或者你可以去:</li>
          <li>
            <router-link to="/home"> 回首页 </router-link>
          </li>
          <li>
            <a href="https://gumingchen.cn/">随便看看</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errorGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import errGif from '@/assets/images/401/401.gif'

export default defineComponent({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const errorGif = ref(errGif + '?' + +new Date())

    /**
     * @description: 回退
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const back = () => {
      if (route.query.noGoBack) {
        router.push({ path: '/login' })
      } else {
        router.go(-1)
      }
    }
    return {
      errorGif,
      back
    }
  }

})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.error-container {
  margin: 0 auto;
  padding-top: 100px;
  width: 800px;
  max-width: 100%;
  .other-go {
    font-size: 14px;
    li {
      padding-bottom: 5px;
      cursor: pointer;
    }
    a {
      color: nth($brandColor, 1);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
