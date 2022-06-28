<template>
  <div :class="`
    container-custom-container
    flex-box
    flex_d-column
    overflow-auto
    ${panelMode !== 1 ? 'container-panel' : ''}`">
    <el-scrollbar
      ref="refScrollbar"
      :class="`
      content-container
      ${contanierMode === 2 ? 'flex-item_f-1' : 'height-unset'}`">
      <div class="content-wrap">
        <slot />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup(props) {
    const store = useStore()

    const refScrollbar = ref()

    const contanierMode = computed(() => store.state.settings.contanierMode)
    const panelMode = computed(() => props.mode || store.state.settings.panelMode)

    const setScrollTop = (top = 0) => {
      refScrollbar.value.setScrollTop(top)
    }

    return {
      contanierMode,
      panelMode,
      refScrollbar,
      setScrollTop
    }
  }
})
</script>

<style lang="scss" scoped>
.container-custom-container {
  margin: unset;
}
</style>
