<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-04-19 10:54:45
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-04-26 14:39:52
-->
<template>
  <router-view v-slot="{ Component }">
    <transition :name="transition" mode="out-in">
      <keep-alive :include="$route.meta.keepAlive ? '': []">
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

