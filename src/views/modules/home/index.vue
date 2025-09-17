<template>
  <Container :class="n.b()" custom>
    <CountStat />
    <div :class="n.e('overview')">
      <Introduction class="f_f-1" />
      <div class="f_f-1">
        <Project />
        <Interacted class="mt-15" />
      </div>
    </div>
    <RegionChart class="mt-15" />
    <VisitsChart class="mt-15" />
    <GrowthChart class="mt-15" />
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import { CountStat, Introduction, Project, Interacted, RegionChart, VisitsChart, GrowthChart } from './components'
import { useNamespace } from '@/hooks'

const n = useNamespace('home')

</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(home) {
  @include e(overview) {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }
}
</style>

