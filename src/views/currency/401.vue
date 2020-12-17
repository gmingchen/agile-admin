<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/home">
              回首页
            </router-link>
          </li>
          <li class="link-type">
            <a href="http://www.pdm.so/">随便看看</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="errorGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts'>
import errGif from '@/assets/images/401.gif'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const errorGif: string = errGif + '?' + +new Date()
    const { push, go } = useRouter()
    return {
      errorGif,
      push,
      go
    }
  },
  methods: {
    back () {
      if (this.$route.query.noGoBack) {
        this.push({ path: '/home' })
      } else {
        this.go(-1)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
