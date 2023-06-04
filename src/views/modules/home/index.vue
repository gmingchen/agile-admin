<script setup>
import useDict from '@/hooks/dict'
</script>

<template>
  <ContainerCustom>
    <h1 v-for="item in 20" :key="item"> {{ item }}</h1>
  </ContainerCustom>
</template>

<style lang="scss" scoped>

</style>
