<template>
  <div class="action-container flex-item_f-1 flex-box flex_j_c-flex-end flex_a_i-center">
    <el-tooltip
      content="全屏"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        :name="`full-screen-${!fullScreen}`"
        @click="iconfontClickHandle('full-screen')" />
    </el-tooltip>
    <el-tooltip
      content="刷新页面"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        name="refresh"
        @click="iconfontClickHandle('refresh')" />
    </el-tooltip>
    <!--
 <el-tooltip
      content="主题设置"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        name="set"
        @click="iconfontClickHandle('setting')" />
    </el-tooltip>
-->
    <el-tooltip
      content="清理缓存"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        name="clear"
        @click="iconfontClickHandle('clear')" />
    </el-tooltip>
    <el-tooltip
      content="暗黑模式"
      placement="bottom"
      :show-after="500">
      <el-switch
        class="margin_r-15"
        v-model="mode"
        :active-value="ThemeMode.DARK"
        :inactive-value="ThemeMode.LIGHT"
        inline-prompt
        active-text="黑"
        inactive-text="亮"
        active-color="#222222" />
    </el-tooltip>
    <el-dropdown trigger="click" @command="dropdownHandle">
      <el-avatar
        class="cursor-pointer"
        :src="administrator.avatar">
        {{ administrator.nickname || administrator.username }}
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import screenfull from 'screenfull'

import { ElMessage } from 'element-plus'

import { ThemeMode } from '@/utils/dictionary'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const fullScreen = computed(() => store.state.settings.fullScreen)

    const administrator = computed(() => store.state.administrator.administrator)

    const mode = computed({
      get: () => {
        return store.state.theme.mode
      },
      set: (val) => {
        store.dispatch('theme/setMode', val)
      }
    })

    const iconfontClickHandle = (type) => {
      switch (type) {
        case 'full-screen':
          if (screenfull.isEnabled) {
            screenfull.toggle()
            store.dispatch('settings/setFullScreen', !screenfull.isFullscreen)
          } else {
            ElMessage({
              message: `Your browser doesn't support full screen`,
              type: 'warning'
            })
          }
          break
        case 'refresh':
          store.dispatch('settings/setRefresh', true)
          nextTick(() => {
            store.dispatch('settings/setRefresh', false)
          })
          break
        case 'clear':
          store.dispatch('clear')
          break
      }
    }

    const dropdownHandle = async (command) => {
      switch (command) {
        case 'personal':
          router.push({ name: 'personal' })
          break
        case 'logout':
          await store.dispatch('administrator/logout')
          store.dispatch('logout')
          router.push({ name: 'login' })
          break
      }
    }

    return {
      ThemeMode,
      fullScreen,
      administrator,
      mode,
      iconfontClickHandle,
      dropdownHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.action-container {
  .iconfont {
    // margin-right: 15px;
  }
}
</style>
