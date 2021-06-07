<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-21 08:47:55
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 14:03:29
-->
<template>
  <el-submenu :index="menu.routeName || menu.id + ''" v-if="menu.children.length">
    <template #title>
      <svg-icon :name="menu.icon" class="sidebar-menu-icon" size="14px" />
      <span>{{ menu[`name_${ language }`] }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item :index="menu.routeName || menu.id + ''" @click="routeHandle()" v-else>
    <svg-icon :name="menu.icon" class="sidebar-menu-icon" size="14px" />
    <template #title>
      <span>{{ menu[`name_${ language }`] }}</span>
    </template>
  </el-menu-item>
</template>

<script lang="ts">
import { key, useStore } from '@/store'
import { computed, defineComponent } from 'vue'
import { isURL } from '@/utils/regular'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SubMenu',
  props: {
    menu: {
      type: Object,
      required: true,
      default: () => { return {} }
    }
  },
  setup(props) {
    const store = useStore(key)
    const router = useRouter()

    const language = computed(() => store.getters['setting/language'])

    /**
     * @description: 路由跳转处理
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const routeHandle = (): void => {
      router.push({ name: props.menu.routeName })
    }

    return {
      language,
      routeHandle
    }
  }
})
</script>

<style lang="scss" scoped>
::v-deep(.sidebar-menu-icon) {
  margin: 0 5px;
  font-size: 12px;
}
</style>
