<template>
  <el-container class="layout-container">
    <sidebar class="sidebar" />
    <el-scrollbar class="flex-item_f-1" :view-class="navbar.fixed ? 'height-full' : ''">
      <div class="flex-box flex_d-column flex-item_f-1 height-full">
        <div class="head-wrap">
          <headbar class="headbar" />
          <tabsbar class="tabsbar" v-if="navbar.tabsDisplay" :style="{ 'height': `${ navbar.tabsHeight }px` }" />
        </div>
        <div class="flex-item_f-1 overflow-auto">
          <el-scrollbar>
            <router-view v-slot="{ Component }">
              <transition name="el-fade-in">
                <keep-alive :include="$route.meta.keepAlive ? '': []">
                  <component :is="Component" class="component" />
                </keep-alive>
              </transition>
            </router-view>
          </el-scrollbar>
        </div>
      </div>
    </el-scrollbar>
  </el-container>
</template>

<script>
import { defineComponent, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

import Sidebar from './components/sidebar'
import Headbar from './components/headbar'
import Tabsbar from './components/tabsbar/index.vue'

export default defineComponent({
  components: {
    Sidebar,
    Headbar,
    Tabsbar
  },
  setup() {
    const store = useStore()

    const navbar = computed(() => store.state.setting.navbar)

    onBeforeMount(() => {
      store.dispatch('user/getUser')
    })

    return {
      navbar
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_mixin.scss';
.layout-container {
  height: 100%;
  .sidebar {
    @include box-shadow;
  }
  .head-wrap {
    z-index: 10;
    .headbar, .tabsbar {
      @include box-shadow1;
    }
  }
  .component {
    padding: 20px 10px;
  }
}
</style>
