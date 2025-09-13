<template>
  <Container :class="n.b()" custom>
    <CountStat />
    <Introduction />
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import { CountStat, Introduction } from './components'
import { useNamespace } from '@/hooks'

const n = useNamespace('home')

</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(home) {}
</style>

