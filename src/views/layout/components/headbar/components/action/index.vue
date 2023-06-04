<script setup>
import { useFullscreen } from '@vueuse/core'

import { useRootStore } from '@/stores/root'

import { ElMessage } from 'element-plus'
import Theme from '../theme/index.vue'
import Notice from '../notice/index.vue'

import { ThemeMode } from '@/utils/enum'

import { havePermission } from '@/utils'

const router = useRouter()
const { isSupported, isFullscreen, toggle } = useFullscreen()

const rootStore = useRootStore()

const adminerStore = useAdminerStore()
const { username, nickname, avatar } = storeToRefs(adminerStore)

const themeStore = useThemeStore()
const refresh = computed({
  get: () => themeStore.refresh,
  set: val => {
    themeStore.refresh = val
  }
})

const mode = computed({
  get: () => {
    return themeStore.mode
  },
  set: (val) => {
    themeStore.mode = val
    themeStore.setTheme()
  }
})

const name = computed(() => {
  const result = nickname.value || username.value
  return result ? result.substring(0, 1) : ''
})

const refTheme = ref()

const visible = ref(false)

const iconfontClickHandle = (type) => {
  switch (type) {
    case 'full-screen':
      if (isSupported.value) {
        toggle()
      } else {
        ElMessage({
          message: `Your browser doesn't support full screen`,
          type: 'warning'
        })
      }
      break
    case 'refresh':
      refresh.value = true
      nextTick(() => {
        refresh.value = false
      })
      break
    case 'setting':
      visible.value = true
      nextTick(() => {
        refTheme.value.init()
      })
      break
    case 'clear':
      rootStore.clear()
      break
  }
}

const dropdownHandle = async (command) => {
  switch (command) {
    case 'personal':
      router.push({ name: 'personal' })
      break
    case 'logout':
      await adminerStore.logout()
      rootStore.logout()
      router.push({ name: 'login' })
      break
  }
}

/**
 * 阻止 F11 默认事件 使用项目内的方式全屏
 * @param {*} event
 */
const fullScreenHandle = (event) => {
  const { key } = event
  if (key === 'F11') {
    event.preventDefault()
    toggle()
  }
}

onBeforeMount(() => {
  if (isSupported.value) {
    window.addEventListener('keydown', fullScreenHandle, true)
  }
})

onBeforeUnmount(() => {
  if (isSupported.value) {
    window.removeEventListener('keydown', fullScreenHandle, true)
  }
})
</script>

<template>
  <div class="action-container flex-item_f-1 flex flex_j_c-flex-end flex_a_i-center">
    <el-tooltip
      content="全屏"
      placement="bottom"
      :show-after="500">
      <Iconfont
        class="margin_r-15 cursor-pointer"
        size="16px"
        :name="`full-screen-${!isFullscreen}`"
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
    <Notice />
    <el-dropdown trigger="click" @command="dropdownHandle">
      <el-avatar
        class="cursor-pointer"
        :src="avatar">
        {{ name }}
      </el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="personal">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <Theme ref="refTheme" v-if="visible" />
  </div>
</template>

<style lang="scss" scoped>
.action-container {
  .iconfont {
    // margin-right: 15px;
  }
}
</style>
