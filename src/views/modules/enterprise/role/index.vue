<template>
  <ContainerSidebar :scroll="false">
    <template #sidebar>
      <EnterpriseSidebar v-model="active" />
    </template>
    <template #header>2</template>
    <template #default>3</template>
    <template #footer>5</template>
  </ContainerSidebar>
</template>

<script >
import { defineComponent, reactive, toRefs } from 'vue'

import ContainerSidebar from '@/components/container-sidebar'
import EnterpriseSidebar from '@/components/enterprise-sidebar'

export default defineComponent({
  components: { ContainerSidebar, EnterpriseSidebar },
  setup() {
    const data = reactive({
      active: ''
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
