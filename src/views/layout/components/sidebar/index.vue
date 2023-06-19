<script setup>
import Classic from './components/classic/index.vue'
import Subfield from './components/subfield/index.vue'

const route = useRoute()

const menuStore = useMenuStore()
const themeStore = useThemeStore()

const menuLayoutMode = computed(() => themeStore.layout.menuLayoutMode)

const { active } = storeToRefs(menuStore)

const component = computed(() => {
  let result = ''
  switch (menuLayoutMode.value) {
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

<template>
  <component :is="component" />
</template>

<style lang="scss" scoped>

</style>
