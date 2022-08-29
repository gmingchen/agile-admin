<template>
  <router-view v-slot="{ Component }">
    <transition :name="transition" mode="out-in">
      <keep-alive :include="$route.meta.keepalive ? '': []">
        <component :is="Component" class="component flex-item_f-1" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
defineProps({
  transition: {
    type: String,
    default: () => 'el-fade-in'
  }
})
</script>
