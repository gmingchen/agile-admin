<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2020-12-17 09:47:33
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-03-01 15:45:02
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
        <el-button @click="jump(0)">返回上一页</el-button>
        <el-button type="primary" class="not-found-btn-gohome" @click="jump(1)">进入首页</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Options({})
export default class extends Vue {
  protected endTime: number = 5
  protected timer: number | null = null

  @Watch('endTime')
  onEndTime(newVal: number) {
    if (newVal === 0) {
      clearTimeout(this.timer as number)
      this.$router.push({ name: 'login' })
    }
  }

  mounted() {
    this.timer = window.setInterval((): void => {
      this.endTime--
    }, 1000)
  }

  /**
   * @description: 跳转
   * @param {number} type
   * @return {*}
   * @author: gumingchen
   */
  jump(type: number): void {
    switch (type) {
      case 0:
        this.$router.go(-1)
        break
      case 1:
        this.$router.push({ name: 'home' })
        break
    }
    clearTimeout(this.timer as number)
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
