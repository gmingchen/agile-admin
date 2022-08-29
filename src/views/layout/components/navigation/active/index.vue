<template>
  <el-scrollbar
    class="flex-item_f-1 "
    :view-class="`flex-box flex_d-column`">
    <slot name="headbar" />
    <slot name="tabsbar" />
    <slot />
  </el-scrollbar>
</template>
