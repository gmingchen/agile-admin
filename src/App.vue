<template>
  <el-config-provider :locale="locale">
    <View />
    <el-empty />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'

import View from '@/components/view/index.vue'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  components: { View },
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
  color: var(--el-text-color-primary);
}
</style>
