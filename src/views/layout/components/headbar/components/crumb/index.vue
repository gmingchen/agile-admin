<script setup>
const route = useRoute()
const menuStore = useMenuStore()

const { allMenus } = storeToRefs(menuStore)

const crumbs = ref([])

const crumbHandle = (menus) => {
  let flag = false
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]

    if (route.name === menu.name) {
      flag = true
      crumbs.value.push({
        id: menu.id,
        name: menu.name,
        label: menu.label,
        query: route.query,
        params: route.params
      })
    }
    if (menu.children && menu.children.length > 0) {
      if (crumbHandle(menu.children)) {
        flag = true
        crumbs.value.push({
          id: menu.id,
          name: menu.name,
          label: menu.label
        })
      }
    }
  }
  return flag
}

watchEffect(() => {
  crumbs.value = []
  crumbHandle(allMenus.value)
  crumbs.value = crumbs.value.reverse()
})

</script>

<template>
  <el-breadcrumb separator="/" class="crumb-container flex">
    <transition-group name="right-in-out">
      <el-breadcrumb-item
        v-for="item in crumbs"
        :key="item.id"
        :to="item.name ? { name: item.name, query: item.query, params: item.params } : ''">
        {{ item.label }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.crumb-container {
  ::v-deep(.right-in-out-leave-active) {
    .el-breadcrumb__separator {
      // display: none;
      visibility: hidden;
    }
  }
}
</style>
