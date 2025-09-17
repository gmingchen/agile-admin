<template>
  <el-tooltip
    content="刷新页面"
    placement="bottom"
    :show-after="500">
    <Icon class="c-pointer" name="refresh" size="16px" @click="onRefresh" />
  </el-tooltip>
</template>

<script setup>
import { Icon } from '@/components'
import { useSystemStore } from '@/stores'
import { useNamespace } from '@/hooks'

const n = useNamespace('refresh')

const { handleRefresh } = useSystemStore()

const onRefresh = () => {
  handleRefresh()
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(refresh) {}
</style>
