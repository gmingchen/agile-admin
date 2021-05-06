<template>
  <div class="actionbar-wrap">
    <div :style="style">
      <div class="action-item" @click="router.push({ name: 'set' })">
        <svg-icon name="set" />
      </div>
      <div class="action-item" @click="fullScreenHandle()">
        <svg-icon :name="set.fullScreen ? 'exit-full-screen' : 'full-screen'" />
      </div>
      <div class="action-item" @click="refreshHandle()">
        <svg-icon name="refresh" />
      </div>
      <div class="action-item" @click="clearHandle()">
        <svg-icon name="clear" />
      </div>
      <language class="action-item" />
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
                <el-avatar class="portrait" v-if="user.avatar" :src="avatar" />
                <el-avatar class="portrait" v-else>{{ user.nickname ? user.nickname.substr(0, 1) : 'user' }}</el-avatar>
                <!-- <el-image class="portrait" :src="portrait" /> -->
                <span class="username">{{ user.nickname }}</span>
                <i class="el-icon-arrow-down el-icon--right" />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="webHub">
                    <svg-icon name="github" color="black" />
                    Web-Github
                  </el-dropdown-item>
                  <el-dropdown-item command="javaHub">
                    <svg-icon name="github" color="black" />
                    Java-Github
                  </el-dropdown-item>
                  <el-dropdown-item command="webEe">
                    <svg-icon name="gitee" color="#C71D23" />
                    Web-Gitee
                  </el-dropdown-item>
                  <el-dropdown-item command="javaEe">
                    <svg-icon name="gitee" color="#C71D23" />
                    Java-Gitee
                  </el-dropdown-item>
                  <el-dropdown-item command="edit">{{ t('button.editInfo') }}</el-dropdown-item>
                  <el-dropdown-item command="exit">{{ t('button.logout') }}</el-dropdown-item>
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

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { key, useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import useInstance from '@/mixins/instance'
import Language from 'V/components/language/index.vue'
import EditInfo from '../edit-info/index.vue'
import screenfull from 'screenfull'
import portrait from 'Img/portrait.gif'
import { logout } from '@/api/login'

export default defineComponent({
  components: { Language, EditInfo },
  setup() {
    const router = useRouter()
    const store = useStore(key)
    const { t } = useI18n()

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
    const fullScreenHandle = (): void => {
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
    const refreshHandle = (): void => {
      store.dispatch('setting/setRefresh', true)
      nextTick(() => {
        store.dispatch('setting/setRefresh', false)
      })
    }

    /**
     * @description: 清楚缓存
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const clearHandle = (): void => {
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
    const selfHandle = (command: string): void => {
      switch (command) {
        case 'webHub':
          window.open('https://github.com/1240235512/vue3.git')
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
          $confirm(t('tip.exitAccount'), t('tip.tips'), {
            confirmButtonText: t('button.confirm'),
            cancelButtonText: t('button.cancel'),
            type: 'warning'
          }).then((): void => {
            logout().then(r => {
              if (r) {
                router.replace({ name: 'login' })
              }
            })
          }).catch((): void => {
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
      router,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'Sass/_variable.scss';
.actionbar-wrap {
  height: 100%;
  .action-item {
    height: 100%;
    float: left;
    &, .link {
      cursor: pointer;
      &:hover {
        color: $brandColor;
      }
    }
    .portrait {
      width: 40px;
      height: 40px;
      margin-right: 10px;
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
