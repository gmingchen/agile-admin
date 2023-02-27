<template>
  <component :is="component" />
</template>

<script setup>
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@stores/menu'
import { useSettingsStore } from '@stores/settings'

import Classic from './classic/index.vue'
import Subfield from './subfield/index.vue'

const route = useRoute()

const menuStore = useMenuStore()
const settingsStore = useSettingsStore()

const sidebarMode = computed(() => settingsStore.sidebarMode)

const { active } = storeToRefs(menuStore)

const component = computed(() => {
  let result = ''
  switch (sidebarMode.value) {
    case 1:
      result = Classic
      break
    case 2:
      result = Subfield
      break
  }
  return result
})

/**
 * @description: 路由变化事件
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const routeHandle = argRoute => {
  const name = argRoute.name
  active.value = name
}

watchEffect(() => {
  routeHandle(route)
})
</script>

<style>

</style>
