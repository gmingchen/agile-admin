<template>
  <div class="actionbar-wrap">
    <div :style="style">
      <div class="action-item" @click="router.push({ name: 'set' })">
        <gl-svg name="set" />
      </div>
      <div class="action-item" @click="fullScreenHandle()">
        <gl-svg :name="set.fullScreen ? 'exit-full-screen' : 'full-screen'" />
      </div>
      <div class="action-item" @click="refreshHandle()">
        <gl-svg name="refresh" />
      </div>
      <div class="action-item" @click="clearHandle()">
        <gl-svg name="clear" />
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
                  <el-dropdown-item command="webHub">
                    <gl-svg name="github" color="black" />
                    Web-Github
                  </el-dropdown-item>
                  <el-dropdown-item command="javaHub">
                    <gl-svg name="github" color="black" />
                    Java-Github
                  </el-dropdown-item>
                  <el-dropdown-item command="webEe">
                    <gl-svg name="gitee" color="#C71D23" />
                    Web-Gitee
                  </el-dropdown-item>
                  <el-dropdown-item command="javaEe">
                    <gl-svg name="gitee" color="#C71D23" />
                    Java-Gitee
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
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import useInstance from '@/mixins/instance'
import EditInfo from '../edit-info/index.vue'
import screenfull from 'screenfull'
import portrait from '@/assets/images/portrait.gif'
import { logoutApi } from '@/api/login'

export default defineComponent({
  components: { EditInfo },
  setup() {
    const router = useRouter()
    const store = useStore()

    const { $message, $loading, $confirm } = useInstance()

    const avatar = ref(`${ portrait }?${ +new Date() }`)
    const visible = ref(false)
    const refEditInfo = ref()

    const navbar = computed(() => store.state.setting.navbar)
    const user = computed(() => store.state.user.user)
    const set = computed(() => store.state.setting.set)

    const style = computed(() => {
      return {
        'line-height': `${ navbar.value.headHeight }px`
      }
    })

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
        $message({
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
      $loading({
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
        case 'webHub':
          window.open('https://github.com/gmingchen/vue3-element-plus-admin')
          break
        case 'javaHub':
          window.open('https://github.com/1240235512/spring-boot.git')
          break
        case 'webEe':
          window.open('https://gitee.com/shychen/vue3.git')
          break
        case 'javaEe':
          window.open('https://gitee.com/shychen/spring-boot.git')
          break
        case 'edit':
          visible.value = true
          nextTick(() => {
            refEditInfo.value.init()
          })
          break
        case 'exit':
          $confirm('您确定要退出当前账号吗?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            logoutApi().then(r => {
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
      avatar,
      visible,
      refEditInfo,
      navbar,
      user,
      set,
      style,
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
.actionbar-wrap {
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
