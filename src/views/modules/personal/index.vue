<template>
  <ContainerCustom>
    <template #default>
      <div class="personal-container margin-10 flex flex_w-wrap">
        <InfoPanel class="panel flex-item_f-2 margin-10 padding-30" :adminer="adminer" />
        <div class="panel flex-item_f-5 margin-10 padding-30">
          <el-tabs v-model="active" class="demo-tabs">
            <el-tab-pane label="基本信息" name="basic">
              <BasicInfo :adminer="adminer" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="password">
              <EditPassword />
            </el-tab-pane>
            <el-tab-pane name="message">
              <template #label>
                <el-badge
                  :value="noticeUnreadCount"
                  :max="99"
                  class="cursor-pointer"
                  :hidden="noticeUnreadCount < 1">
                  消息通知
                </el-badge>
              </template>
              <Notice />
            </el-tab-pane>
            <el-tab-pane label="最近操作日志" name="operate">
              <OperateLog />
            </el-tab-pane>
            <el-tab-pane label="最近登录日志" name="login">
              <LoginLog />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </template>
  </ContainerCustom>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

import InfoPanel from './components/info-panel.vue'
import BasicInfo from './components/basic-info.vue'
import EditPassword from './components/edit-password.vue'
import Notice from './components/notice.vue'
import OperateLog from './components/operate-log.vue'
import LoginLog from './components/login-log.vue'

import { havePermission } from '@/utils'

const route = useRoute()
const router = useRouter()

const adminerStore = useAdminerStore()
const noticeStore = useNoticeStore()

const noticeUnreadCount = computed(() => noticeStore.page.total)

const adminer = computed(() => {
  const { username, nickname, avatar, mobile, email, sex, sex_dict, dept, posts, roles } = adminerStore
  return {
    username: username,
    nickname: nickname,
    avatar: avatar,
    mobile: mobile,
    email: email,
    sex: sex,
    sex_dict: sex_dict,
    dept: dept ? dept.name : '',
    post: posts ? posts.map(item => item.name).join(',') : '',
    role: roles ? roles.map(item => item.name).join(',') : ''
  }
})

const active = ref('basic')

/**
 * 初始化 判断页面展示的内容
 */
const init = () => {
  const { panel } = route.query
  if (panel) {
    active.value = panel
    router.push({ name: 'personal' })
  }
}

onBeforeMount(() => {
  init()
})
</script>

<style lang="scss" scoped>
.personal-container {
  & > div:first-child {
    height: fit-content;
    min-width: 350px;
  }
  .panel {
    border-radius: var(--el-border-radius-base);
    background-color: var(--gl-content-panel-background-color);
  }
}
</style>
