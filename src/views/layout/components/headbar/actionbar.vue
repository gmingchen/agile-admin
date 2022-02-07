<template>
  <div class="actionbar-contanier">
    <div class="flex-box flex_j_c-flex-end" :style="style">
      <div class="action-item" @click="setHandle()">
        <g-icon name="setting" />
      </div>
      <div class="action-item" @click="fullScreenHandle()">
        <g-icon name="full-screen" />
      </div>
      <div class="action-item" @click="refreshHandle()">
        <g-icon name="refresh-right" />
      </div>
      <div class="action-item" @click="clearHandle()">
        <g-icon name="refresh" />
      </div>
      <div class="action-item">
        <el-skeleton :loading="!user.username" animated :style="{ 'margin-top': (navbar.headHeight - 40) / 2 + 'px' }">
          <template #template>
            <div class="skeleton">
              <el-skeleton-item variant="image" class="portrait" />
              <el-skeleton-item variant="text" class="text" />
            </div>
          </template>
          <template #default>
            <el-dropdown
              trigger="click"
              :style="{ 'margin-top': (navbar.headHeight - 40) / 2 + 'px' }"
              @command="selfHandle">
              <div>
                <el-avatar class="portrait margin_r-10" v-if="user.avatar" :src="avatar" />
                <el-avatar class="portrait margin_r-10" v-else>{{ user.nickname ? user.nickname.substr(0, 1) : 'user' }}</el-avatar>
                <!-- <el-image class="portrait margin_r-10" :src="portrait" /> -->
                <span class="username">{{ user.nickname }}</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="vue3-element-plus-admin">
                    <g-svg name="github" color="black" />
                    vue3-element-plus-admin
                  </el-dropdown-item>
                  <el-dropdown-item command="java-admin-base">
                    <g-svg name="github" color="black" />
                    java-admin-base
                  </el-dropdown-item>
                  <el-dropdown-item command="vue3-element-plus-im">
                    <g-svg name="github" color="black" />
                    vue3-element-plus-im
                  </el-dropdown-item>
                  <el-dropdown-item command="java-im">
                    <g-svg name="github" color="black" />
                    java-im
                  </el-dropdown-item>
                  <el-dropdown-item command="edit">编辑信息</el-dropdown-item>
                  <el-dropdown-item command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-skeleton>
      </div>
    </div>
    <edit-info ref="refEditInfo" v-if="visible" />
    <set-drawer ref="refSetDrawer" v-if="setVisible" />
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import EditInfo from '../edit-info/index.vue'
import SetDrawer from './set-drawer.vue'

import screenfull from 'screenfull/dist/screenfull'

export default defineComponent({
  components: { EditInfo, SetDrawer },
  setup() {
    const router = useRouter()
    const store = useStore()

    const navbar = computed(() => store.state.setting.navbar)
    const user = computed(() => store.state.user.user)
    const set = computed(() => store.state.setting.set)
    const style = computed(() => {
      return {
        'line-height': `${ navbar.value.headHeight }px`
      }
    })

    const refEditInfo = ref()
    const refSetDrawer = ref()
    const data = reactive({
      visible: false,
      setVisible: false,
      avatar: 'http://139.196.182.46:8800/images/slipper.jpeg'
    })

    /**
     * @description: 设置
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const setHandle = () => {
      data.setVisible = true
      nextTick(() => {
        refSetDrawer.value.init()
      })
    }

    /**
     * @description: 设置全屏
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const fullScreenHandle = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle()
        store.dispatch('setting/setFullScreen', !screenfull.isFullscreen)
      } else {
        ElMessage({
          message: `Your browser doesn't support full screen`,
          type: 'warning'
        })
      }
    }

    /**
     * @description: 组件刷新事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const refreshHandle = () => {
      store.dispatch('setting/setRefresh', true)
      nextTick(() => {
        store.dispatch('setting/setRefresh', false)
      })
    }

    /**
     * @description: 清理缓存
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const clearHandle = () => {
      ElLoading.service({
        lock: true,
        text: '清理缓存',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.2)'
      })
      store.dispatch('setting/clear')
    }

    /**
     * @description: 头像下拉菜单操作
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const selfHandle = command => {
      switch (command) {
        case 'vue3-element-plus-admin':
          window.open('https://github.com/gmingchen/vue3-element-plus-admin')
          break
        case 'java-admin-base':
          window.open('https://github.com/gmingchen/java-admin-base')
          break
        case 'vue3-element-plus-im':
          window.open('https://github.com/gmingchen/vue3-element-plus-im')
          break
        case 'java-im':
          window.open('https://github.com/gmingchen/java-im')
          break
        case 'edit':
          data.visible = true
          nextTick(() => {
            refEditInfo.value.init()
          })
          break
        case 'exit':
          ElMessageBox.confirm('您确定要退出当前账号吗?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/logout').then(r => {
              if (r) {
                router.replace({ name: 'login' })
              }
            })
          }).catch(() => {
            // to do something
          })
          break
      }
    }

    return {
      refEditInfo,
      refSetDrawer,
      ...toRefs(data),
      navbar,
      user,
      set,
      style,
      setHandle,
      fullScreenHandle,
      refreshHandle,
      clearHandle,
      selfHandle,
      router
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_variable.scss';
.actionbar-contanier {
  height: 100%;
  .action-item {
    height: 100%;
    float: left;
    &, .link {
      cursor: pointer;
      &:hover {
        color: nth($brandColor, 1);
      }
    }
    .portrait {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .skeleton {
    display: flex;
    align-items: center;
    justify-items: space-between;
    .text {
      width: 80px;
      height: 20px
    }
  }
  ::v-deep(.action-item + .action-item) {
    margin-left: 10px;
  }
}
</style>
