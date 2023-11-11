<script setup>
import Introduction from './components/introduction.vue'
import Project from './components/project.vue'
import Interacted from './components/interacted.vue'

import UserCounting from './components/user-counting.vue'
import UserRegion from './components/user-region.vue'
import UserVisits from './components/user-visits.vue'
import UserGrowth from './components/user-growth.vue'

import Applet from './components/applet.vue'

defineOptions({
  name: 'Home'
})
</script>

<template>
  <ContainerCustom>
    <div class="margin-10">
      <UserCounting />

      <div class="flex flex_w-wrap">
        <Introduction class="flex-item_f-1" />
        <div class="flex-item_f-1 padding-10">
          <Project />
          <Interacted class="margin_t-20" />
        </div>
      </div>

      <UserRegion />
      <UserVisits />
      <UserGrowth />
    </div>
    <Applet />
  </ContainerCustom>
</template>

<style lang="scss" scoped>

</style>
