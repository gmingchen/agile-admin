<template>
  <ContainerSidebar>
    <template #sidebar>
      <div>
        sidebar
        <p v-for="item in 15" :key="item">{{item}}</p>
      </div>
    </template>
    <template #header>
      head
    </template>
    <template #default>
      <div>
        <p v-for="item in 15" :key="item">{{item}}</p>
      </div>
    </template>
    <template #footer>
      footer
    </template>
  </ContainerSidebar>
</template>

<script>
import { defineComponent } from 'vue'

import ContainerSidebar from '@/components/container-sidebar'

export default defineComponent({
  components: { ContainerSidebar },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
