<template>
  <div
    class="logo-container padding-n-10 flex-box"
    :class="{ 'logo-container-collapse': collapse }"
    v-if="enterprise.name || enterprise.logo">
    <transition name="el-fade-in" mode="out-in">
      <div class="flex-box flex-item_f-1 flex_j_c-center flex_a_i-center" v-if="!collapse">
        <el-image class="width-34 height-34" :src="enterprise.logo" />
        <div class="margin_l-10 ellipse-1">
          {{ enterprise.name }}
        </div>
      </div>
      <div class="flex-box flex-item_f-1 flex_j_c-center flex_a_i-center" v-else>
        <el-image class="width-34 height-34" :src="enterprise.logo" v-if="enterprise.logo" />
        <div class="margin_l-10 ellipse-1" v-else>
          {{ enterprise.name }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script >
import { computed, defineComponent, ref } from 'vue'
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
  transition: width 0.4s;
  &-collapse {
    width: var(--gl-sidebar-collapse-width);
  }
}
</style>
