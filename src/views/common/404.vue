<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-18 16:15:04
-->
<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">400</h2>
        <p class="not-found-desc">抱歉！您访问的页面<em>失联</em>啦 ...</p>
        <p class="not-found-time">
          <em>{{ endTime }}</em
          >秒后自动返回首页
        </p>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button type="primary" class="not-found-btn-gohome" @click="$router.push({ name: 'home' })">进入首页</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Options({})
export default class extends Vue {
  private endTime: number = 5
  private timer: number | null = null

  @Watch('endTime')
  onChange(newVal: number) {
    if (newVal === 0) {
      clearTimeout(this.timer as number)
      this.$router.push({ name: 'login' })
    }
  }

  mounted() {
    this.timer = window.setInterval(() => {
      this.endTime--
      console.log(this.endTime)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.site-wrapper.site-page--not-found {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  .site-content__wrapper {
    padding: 0;
    margin: 0;
    background-color: #fff;
  }
  .site-content {
    position: fixed;
    top: 15%;
    left: 50%;
    z-index: 2;
    padding: 30px;
    text-align: center;
    transform: translate(-50%, 0);
  }
  .not-found-title {
    margin: 20px 0 15px;
    font-size: 10em;
    font-weight: 400;
    color: rgb(55, 71, 79);
  }
  .not-found-desc {
    margin: 0 0 30px;
    font-size: 26px;
    text-transform: uppercase;
    color: rgb(118, 131, 143);
    > em {
      font-style: normal;
      color: #ee8145;
    }
  }
  .not-found-time {
    margin: 0 0 30px;
    font-size: 18px;
    text-transform: uppercase;
    color: rgb(118, 131, 143);
    > em {
      margin: 0 10px;
      color: red;
    }
  }
  .not-found-btn-gohome {
    margin-left: 30px;
  }
}
</style>
