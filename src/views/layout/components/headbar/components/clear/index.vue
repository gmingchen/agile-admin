<template>
  <el-tooltip
    content="清理缓存"
    placement="bottom"
    :show-after="500">
    <Icon class="c-pointer" name="clear" size="16px" @click="onClear" />
  </el-tooltip>
</template>

<script setup>
import { Icon } from '@/components'
import { useRootStore } from '@/stores'
import { useNamespace } from '@/hooks';

const n = useNamespace('clear')

const { clear } = useRootStore()

const onClear = () => {
  ElLoading.service({ text: '清理缓存中...', lock: true, })
  setTimeout(() => {
    clear()
    window.location.reload()
  }, 1000)
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(clear) {}
</style>
