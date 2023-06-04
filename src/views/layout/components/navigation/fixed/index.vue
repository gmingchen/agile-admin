<script setup>
const themeStore = useThemeStore()
const contanierMode = computed(() => themeStore.layout.contanierMode)
</script>

<template>
  <div class="flex-item_f-1 flex flex_d-column overflow-auto">
    <slot name="headbar" />
    <slot name="tabsbar" />
    <slot v-if="contanierMode === 2" />
    <el-scrollbar class="flex-item_f-1" :view-class="`flex flex_d-column`" v-else>
      <slot />
    </el-scrollbar>
  </div>

</template>

<style lang="scss" scoped>

</style>
