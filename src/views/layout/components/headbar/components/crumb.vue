<template>
  <el-breadcrumb separator="/" class="crumb-container flex-box">
    <transition-group name="right-in-out">
      <el-breadcrumb-item
        v-for="(item, index) in crumbs"
        :key="index"
        :to="{ name: item.name, query: item.query, params: item.params }">
        {{ item.label_cn }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useMenuStore } from '@stores/menu'

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
        name: menu.name,
        label_cn: menu.name_cn,
        label_en: menu.name_en,
        query: route.query,
        params: route.params
      })
    }
    if (menu.children && menu.children.length > 0) {
      if (crumbHandle(menu.children)) {
        flag = true
        crumbs.value.push({
          name: menu.name,
          label_cn: menu.name_cn,
          label_en: menu.name_en
        })
      }
    }
  }
  return flag
}

watchEffect(() => {
  crumbs.value = []
  crumbHandle(allMenus)
  crumbs.value = crumbs.value.reverse()
})

</script>

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
