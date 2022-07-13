<template>
  <router-view v-slot="{ Component }">
    <transition :name="transition" mode="out-in">
      <keep-alive :include="$route.meta.keepalive ? '': []">
        <component :is="Component" class="component flex-item_f-1" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    transition: {
      type: String,
      default: () => 'el-fade-in'
    }
  }
})
</script>
