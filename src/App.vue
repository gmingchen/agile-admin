<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const themeStore = useThemeStore()
themeStore.getTheme()

const { reload } = storeToRefs(themeStore)

const locale = ref(zhCn)
const size = ref('default')
const zIndex = ref(3000)
</script>

<template>
  <el-config-provider :locale="locale" :size="size" :z-index="zIndex">
    <View v-if="!reload" transition="el-fade-in" class="flex-item_f-1" />
  </el-config-provider>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  display: flex;
  color: var(--el-text-color-primary);
  font-size: var(--el-font-size-base);
}
</style>
