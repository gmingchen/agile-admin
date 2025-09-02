<template>
  <Container :class="n.b()" custom>
    123
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import { useNamespace } from '@/hooks';

const n = useNamespace('personal')
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(personal) {}
</style>
