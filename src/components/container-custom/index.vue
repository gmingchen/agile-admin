<template>
  <div :class="`
    container-custom-container
    flex
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

<script setup>

const themeStore = useThemeStore()

const contanierMode = computed(() => themeStore.layout.contanierMode)
const panelMode = computed(() => themeStore.layout.panelMode)

const refScrollbar = ref()

const setScrollTop = (top = 0) => {
  refScrollbar.value.setScrollTop(top)
}
</script>

<style lang="scss" scoped>
.container-custom-container {
  margin: unset;
}
</style>
