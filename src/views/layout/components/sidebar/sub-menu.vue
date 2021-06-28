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
      <gl-svg :name="menu.icon" class="sidebar-menu-icon" size="14px" />
      <span>{{ menu.name_cn }}</span>
    </template>
    <sub-menu v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-submenu>
  <el-menu-item :index="menu.routeName || menu.id + ''" @click="routeHandle()" v-else>
    <gl-svg :name="menu.icon" class="sidebar-menu-icon" size="14px" />
    <template #title>
      <span>{{ menu.name_cn }}</span>
    </template>
  </el-menu-item>
</template>

<script>
import { defineComponent } from 'vue'
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
    const router = useRouter()

    /**
     * @description: 路由跳转处理
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const routeHandle = () => {
      router.push({ name: props.menu.routeName })
    }

    return {
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
