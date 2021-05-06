<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-03 23:39:44
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 16:41:43
-->
<template>
  <el-container>
    <sidebar class="sidebar" />
    <!-- // todo: 处理动画问题 -->
    <div
      class="main-wrap"
      :style="{
        'width': `calc(100% - ${ sidebar.width }px)`,
        'transition-duration': isCollapse ? '0s' : '0.9s'
      }">
      <el-scrollbar :style="{ height: dom.clientHeight + 'px' }">
        <div :class="{ 'head-wrap': navbar.fixed }">
          <headbar class="headbar" :style="{ 'height': `${ navbar.headHeight }px` }" />
          <tabsbar class="tabsbar" v-if="navbar.tabsDisplay" :style="{ 'height': `${ navbar.tabsHeight }px` }" />
        </div>
        <div v-if="!set.refresh" :style="{ 'padding-top': navbar.fixed ? `${ navbar.headHeight + (navbar.tabsDisplay ? navbar.tabsHeight : 0) }px` : '0px' }">
          <!-- <el-scrollbar :style="navbar.fixed ? { 'height': `${ dom.clientHeight - navbar.headHeight - (navbar.tabsDisplay ? navbar.tabsHeight : 0) }px` } : {}"> -->
          <router-view v-slot="{ Component }">
            <transition name="el-fade-in">
              <keep-alive v-if="$route.meta.keepAlive">
                <component :is="Component" class="component" />
              </keep-alive>
              <component :is="Component" class="component" v-else />
            </transition>
          </router-view>
          <!-- </el-scrollbar> -->
        </div>
      </el-scrollbar>
    </div>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted } from 'vue'
import { key, useStore } from '@/store'
import Sidebar from './components/sidebar/index.vue'
import Headbar from './components/headbar/index.vue'
import Tabsbar from './components/tabsbar/index.vue'
import { getUserInfo } from '@/api/login'

export default defineComponent({
  components: { Sidebar, Headbar, Tabsbar },
  setup() {
    const store = useStore(key)

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
      getUserInfo().then(r => {
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
      let height: number = document.documentElement['clientHeight']
      store.dispatch('setting/setDocunentClientHeight', height)
      window.onresize = (): void => {
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
@import 'Sass/_mixin.scss';
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
