<template>
  <div class="sidebar-subfield-container flex-box">
    <div class="side flex-box flex_d-column">
      <Logo />
      <el-scrollbar class="flex-item_f-1">
        <div class="piece-group flex-box flex_d-column flex_a_i-center">
          <div
            class="piece-box margin_b-5 width-62 height-60 padding-5-n flex-box flex_d-column flex_a_i-center flex_j_c-space-around cursor-pointer"
            :class="{ 'piece-box-active': item.id === active.id }"
            v-for="item in menus"
            :key="item.value"
            @click="clickHandle(item)">
            <Iconfont
              v-if="item.icon"
              size="20px"
              :name="item.icon" />
            <div class="width-full text-align-center ellipse">{{ item.name_cn }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="menu flex-box flex_d-column" v-show="active.children && active.children.length">
      <!-- <div class="name-box padding-n-10 ellipse">{{ active.name_cn }}</div> -->
      <el-scrollbar class="flex-item_f-1">
        <el-menu
          :default-active="menuActive"
          :background-color="theme.backgroundColor !== '#fff' ? theme.backgroundColor : ''"
          :text-color="theme.textColor"
          :active-text-color="theme.activeTextColor"
          :unique-opened="true"
          :collapse="collapse">
          <SubItem
            v-for="item in active.children"
            :key="item.id"
            :data="item"
            :collapse="collapse" />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import Logo from '../components/logo.vue'
import SubItem from '../components/sub-item.vue'

export default defineComponent({
  components: { Logo, SubItem },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const theme = computed(() => store.state.theme.theme.menu)

    const menus = computed(() => store.getters['menu/menus'])

    const menuActive = computed(() => store.state.menu.active)

    const collapse = computed(() => store.state.menu.collapse)

    const active = ref({})

    /**
     * 菜单点击事件
     * @param {*} row
     */
    const clickHandle = (row) => {
      active.value = row
      switch (row.type) {
        case 4: // 外链
          window.open(row.url)
          break
        case 1: // 菜单
        case 3: // iframe
          router.push({ name: row.name })
          break
      }
    }

    /**
     * 递归查找当前菜单
     */
    const findMenu = (list) => {
      let result = null
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (item.name === route.name) {
          result = item
          break
        } else if (item.children && item.children.length) {
          result = findMenu(item.children)
          break
        }
      }
      return result
    }

    /**
     * 找出根菜单
     * @param {*} list
     */
    const findRootMenu = (list) => {
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        if (item.name === route.name) {
          return item
        }
        if (item.children && findMenu(item.children)) {
          return item
        }
      }
    }

    watchEffect(() => {
      const menu = findRootMenu(menus.value)
      if (menu) {
        active.value = menu
      }
    })

    return {
      theme,
      menus,
      menuActive,
      collapse,
      active,
      clickHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar-subfield-container {
  z-index: 10;
  background-color: var(--gl-sidebar-background-color);
  // width: var(--gl-sidebar-subfield-width);
  .side {
    width: var(--gl-sidebar-subfield-side-width);
    z-index: 10;
    box-shadow: var(--el-box-shadow-light);
    .piece-group {
      .piece-box {
        border-radius: var(--el-border-radius-base);
        transition: background-color 0.2s;
        &:hover {
          background-color: var(--el-color-primary-light-9);
        }
        &-active {
          background-color: var(--el-color-primary)!important;
          color: white;
        }
      }
    }
  }
  .menu {
    .name-box {
      min-height: var(--gl-headbar-height);
      line-height: var(--gl-headbar-height);
      font-weight: 700;
    }
    .el-menu:not(.el-menu--collapse) {
      width: var(--gl-sidebar-subfield-menu-width); // todo: 侧边栏的宽度
    }
    .el-menu {
      border: none;
      ::v-deep(.el-menu-item) {
        padding-right: 20px;
      }
      ::v-deep(.el-menu-item), ::v-deep(.el-sub-menu), ::v-deep(.el-sub-menu__title) {
        display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        & > .el-sub-menu__icon-arrow {
          position: absolute;
          right: 8px;
        }
      }
    }
  }
}
</style>
