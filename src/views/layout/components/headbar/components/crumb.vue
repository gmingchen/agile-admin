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

<script>
import { defineComponent, reactive, toRefs, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    const data = reactive({
      pages: store.getters['menu/pages'],
      crumbs: []
    })

    const crumbHandle = (menus) => {
      let flag = false
      for (let i = 0; i < menus.length; i++) {
        const menu = menus[i]
        if (route.name === menu.name) {
          flag = true
          data.crumbs.push({
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
            data.crumbs.push({
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
      data.crumbs = []
      crumbHandle(data.pages)
      data.crumbs = data.crumbs.reverse()
    })

    return {
      ...toRefs(data)
    }
  }
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
