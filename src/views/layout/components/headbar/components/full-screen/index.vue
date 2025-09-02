<template>
  <el-tooltip
    content="全屏"
    placement="bottom"
    :show-after="500">
    <Icon class="c-pointer" :name="`full-screen-${!isFullscreen}`" size="16px" @click="onToggle" />
  </el-tooltip>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
import { Icon } from '@/components'
import { useNamespace } from '@/hooks'

const n = useNamespace('full-screen')

const { isSupported, isFullscreen, toggle } = useFullscreen()

const onToggle = () => {
  if (isSupported.value) {
    toggle()
  } else {
    ElMessage.warning('你的浏览器暂不支持全屏功能')
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(full-screen) {}
</style>
