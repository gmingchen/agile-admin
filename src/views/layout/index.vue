<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-03 23:39:44
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:49:22
-->
<template>
  <el-container>
    <sidebar class="sidebar" />
    <div
      class="main-wrap absolute_r-0"
      :style="{ 'width': `calc(100% - ${ sidebar.width }px)`, 'transition-duration': '0.3s' }">
      <el-scrollbar :height="dom.clientHeight + 'px'">
        <div :class="{ 'head-wrap': navbar.fixed }">
          <headbar class="headbar" :style="{ 'height': `${ navbar.headHeight }px` }" />
          <tabsbar class="tabsbar" v-if="navbar.tabsDisplay" :style="{ 'height': `${ navbar.tabsHeight }px` }" />
        </div>
        <div v-if="!set.refresh" :style="{ 'padding-top': navbar.fixed ? `${ navbar.headHeight + (navbar.tabsDisplay ? navbar.tabsHeight : 0) }px` : '0px' }">
          <!-- <el-scrollbar :style="navbar.fixed ? { 'height': `${ dom.clientHeight - navbar.headHeight - (navbar.tabsDisplay ? navbar.tabsHeight : 0) }px` } : {}"> -->
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in">
              <keep-alive :include="$route.meta.keepAlive ? '': []">
                <component :is="Component" class="component" />
              </keep-alive>
            </transition>
          </router-view>
          <!-- </el-scrollbar> -->
        </div>
      </el-scrollbar>
    </div>
  </el-container>
</template>

<script>
import { computed, defineComponent, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import Sidebar from './components/sidebar/index.vue'
import Headbar from './components/headbar/index.vue'
import Tabsbar from './components/tabsbar/index.vue'
import { userInfoApi } from '@/api/login'

export default defineComponent({
  components: { Sidebar, Headbar, Tabsbar },
  setup() {
    const store = useStore()

    const dom = computed(() => store.state.setting.document)
    const sidebar = computed(() => store.state.setting.sidebar)
    const navbar = computed(() => store.state.setting.navbar)
    const set = computed(() => store.state.setting.set)
    const isCollapse = computed(() => store.state.menu.isCollapse)

    /**
     * @description: 获取登录用户信息存储到vuex
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    onBeforeMount(() => {
      userInfoApi().then(r => {
        if (r) {
          store.dispatch('user/setUser', r.data)
        }
      })
    })

    /**
     * @description: 重置页面文档可视高度
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    onMounted(() => {
      let height = document.documentElement['clientHeight']
      store.dispatch('setting/setDocunentClientHeight', height)
      window.onresize = () => {
        height = document.documentElement['clientHeight']
        store.dispatch('setting/setDocunentClientHeight', height)
      }
    })

    return {
      dom,
      sidebar,
      navbar,
      set,
      isCollapse
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_mixin.scss';
.sidebar {
  @include box-shadow;
}
.headbar, .tabsbar {
  @include box-shadow1;
}
.el-fade-in-leave-active { // 处理动画不流畅闪烁的问题
  display: none;
}
.main-wrap {
  background-color: white;
  .head-wrap {
    width: 100%;
    position: absolute;
    z-index: 20;
    background-color: white;
  }
  .component {
    padding: 20px 10px;
  }
}
</style>
