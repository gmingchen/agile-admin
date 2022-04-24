<template>
  <div class="logo-container" v-if="enterprise.name || enterprise.logo">
    {{enterprise.name}}
  </div>
</template>

<script >
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const enterprise = computed(() => store.state.enterprise.enterprise)

    return {
      enterprise
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-container {
  height: var(--gl-headbar-height);
  line-height: var(--gl-headbar-height);
  background-color: var(--gl-sidebar-background-color);
  text-align: center;
}
</style>
