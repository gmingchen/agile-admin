<template>
  <ContainerCustom>
    <template #default>
      <div class="personal-container margin-10 flex-box flex_w-wrap">
        <div class="panel flex-item_f-2 margin-10 padding-30">
          <div class="flex-box flex_d-column flex_a_i-center">
            <el-avatar
              :size="120"
              :src="administrator.avatar"
              v-if="administrator.avatar" />
            <h2>{{administrator.nickname}}</h2>
          </div>
          <el-descriptions :column="1" class="padding-n-30">
            <el-descriptions-item>
              <template #label>
                <Iconfont name="account" />
              </template>
              {{administrator.username}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <Iconfont name="department" />
              </template>
              {{administrator.department_name || '- '}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <Iconfont name="mobile" />
              </template>
              {{administrator.mobile || '-'}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <Iconfont name="email" />
              </template>
              {{administrator.email || '-'}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <Iconfont name="sex" />
              </template>
              <span v-if="administrator.sex === 0">女</span>
              <span v-else-if="administrator.sex === 1">男</span>
              <span v-else>未知</span>
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="panel flex-item_f-5 margin-10 padding-30">
          <el-tabs v-model="active" class="demo-tabs">
            <el-tab-pane label="基本信息" name="basic">
              <BasicInfo :administrator="administrator" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="password" v-if="havePermission('administrator:password')">
              <EditPassword />
            </el-tab-pane>
            <el-tab-pane label="消息通知" name="message" v-if="havePermission('websocketAdministrator:unread:page|websocketAdministrator:page|websocketAdministrator:read|websocketAdministrator:allRead|websocketAdministrator:delete', '|')">
              <Message />
            </el-tab-pane>
            <el-tab-pane label="最近登录日志" name="login">
              <LoginLog />
            </el-tab-pane>
            <el-tab-pane label="最近操作日志" name="operation">
              <OperationLog />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </template>
  </ContainerCustom>
</template>

<script>
import { computed, defineComponent, reactive, toRefs, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import ContainerCustom from '@/components/container-custom/index.vue'
import BasicInfo from './components/basic-info.vue'
import EditPassword from './components/edit-password.vue'
import LoginLog from './components/login-log.vue'
import OperationLog from './components/operation-log.vue'
import Message from './components/message.vue'

import { havePermission } from '@/utils'

export default defineComponent({
  components: { ContainerCustom, BasicInfo, EditPassword, LoginLog, OperationLog, Message },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const administrator = computed(() => store.state.administrator.administrator)

    const data = reactive({
      active: 'basic'
    })

    /**
     * 初始化 判断页面展示的内容
     */
    const init = () => {
      const { panel } = route.query
      if (panel) {
        data.active = panel
        router.push({ name: 'personal' })
      }
    }

    onBeforeMount(() => {
      init()
    })

    return {
      administrator,
      ...toRefs(data),
      havePermission
    }
  }
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
