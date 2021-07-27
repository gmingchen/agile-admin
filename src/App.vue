<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-29 17:23:32
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 18:12:40
-->
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default defineComponent({
  components: {
    [ElConfigProvider.name]: ElConfigProvider
  },
  setup() {
    const locale = ref(zhCn)
    return {
      locale
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/sass/_variable.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: nth($fontColor, 1);
}
</style>
