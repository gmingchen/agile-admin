<template>
  <Container :class="n.b()">
    <template #sidebar>
      <div>sidebar</div>
    </template>
    <template #headbar>
      <div>headbar</div>
    </template>
    <div>content</div>
    <template #footbar>
      <div>footbar</div>
    </template>
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import { useNamespace } from '@/hooks'
const n = useNamespace('test')
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(test) {}
</style>
