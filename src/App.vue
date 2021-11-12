<template>
  <el-config-provider :locale="locale">
    <div>
      <el-button type="primary" v-for="item in 50" :key="item">{{item}}</el-button>
      <el-icon><aim /></el-icon>
    </div>
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  setup() {
    return {
      locale: zhCn
    }
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
}
</style>
