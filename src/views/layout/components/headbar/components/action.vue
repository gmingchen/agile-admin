<template>
  <div class="action-container flex-item_f-1 flex-box flex_j_c-flex-end flex_a_i-center">
    <Iconfont
      class="margin_r-15 cursor-pointer"
      size="16px"
      :name="`full-screen-${!fullScreen}`"
      @click="iconfontClickHandle('full-screen')" />
    <Iconfont
      class="margin_r-15 cursor-pointer"
      size="16px"
      name="refresh"
      @click="iconfontClickHandle('refresh')" />
    <Iconfont
      class="margin_r-15 cursor-pointer"
      size="16px"
      name="clear"
      @click="iconfontClickHandle('clear')" />
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
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'

import screenfull from 'screenfull'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const fullScreen = computed(() => store.state.settings.fullScreen)

    const administrator = computed(() => store.state.administrator.administrator)

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

    const dropdownHandle = (command) => {
      switch (command) {
        case 'personal':
          router.push({ name: 'personal' })
          break
        case 'logout':
          router.push({ name: 'login' })
          break
      }
    }

    return {
      fullScreen,
      administrator,
      iconfontClickHandle,
      dropdownHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.action-container {
  .iconfont {
    margin-right: 15px;
  }
}
</style>
