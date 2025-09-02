<template>
  <Container :class="n.b()" custom>
    <h1 v-for="item in 30" :key="item">{{ item }}</h1>
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import { useNamespace } from '@/hooks';
import { onMounted } from 'vue';
const n = useNamespace('home')

onMounted(() => {
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(home) {}
</style>

