<template>
  <div class="logo-container padding-n-10" v-if="enterprise.name || enterprise.logo">
    <div class="flex-box">
      <el-image :src="enterprise.logo" />
      <div class="ellipse-1 flex-item_f-1">
        {{ enterprise.name }}
      </div>
    </div>
  </div>
</template>

<script >
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const enterprise = computed(() => store.state.enterprise.enterprise)

    const collapse = computed(() => store.state.menu.collapse)

    return {
      enterprise,
      collapse
    }
  }
})
</script>

<style lang="scss" scoped>
.logo-container {
  height: var(--gl-headbar-height);
  width: var(--gl-sidebar-width);
  line-height: var(--gl-headbar-height);
  background-color: var(--gl-sidebar-background-color);
}
</style>
