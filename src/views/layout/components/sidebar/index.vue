<template>
  <component :is="component" />
</template>

<script>
import { computed, defineComponent, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import Classic from './classic/index.vue'
import Subfield from './subfield/index.vue'

export default defineComponent({
  components: { Classic, Subfield },
  setup() {
    const store = useStore()
    const route = useRoute()

    const sidebarMode = computed(() => store.state.settings.sidebarMode)

    const component = computed(() => {
      let result = ''
      switch (sidebarMode.value) {
        case 1:
          result = Classic
          break
        case 2:
          result = Subfield
          break
      }
      return result
    })

    /**
     * @description: 路由变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const routeHandle = argRoute => {
      const name = argRoute.name
      store.dispatch('menu/setActive', name)
    }

    watchEffect(() => {
      routeHandle(route)
    })

    return {
      component
    }
  }
})
</script>

<style>

</style>
