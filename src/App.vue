<template>
  <el-config-provider :locale="locale" :size="size" :z-index="zIndex">
    <View v-if="!reload" />
  </el-config-provider>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useThemeStore } from '@stores/theme'
import { useSettingsStore } from '@stores/settings'

import View from '@/components/view/index.vue'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const themeStore = useThemeStore()
const settingsStore = useSettingsStore()
themeStore.getTheme()
settingsStore.getLayout()

const { reload } = storeToRefs(themeStore)

const locale = ref(zhCn)
const size = ref('default')
const zIndex = ref(3000)
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  display: flex;
  color: var(--el-text-color-primary);
}
</style>
