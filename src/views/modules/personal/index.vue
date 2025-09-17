<template>
  <Container :class="n.b()" custom>
    <div :class="n.e('content')">
      <Info class="f_f-2"></Info>
      <div :class="n.e('other')">
        <el-tabs v-model="active">
          <template v-for="item in tabs" :key="item.value">
            <el-tab-pane v-if="!item.permission || hasPermission(item.permission)" :label="item.label" :name="item.value">
              <template #label>
                <el-badge v-if="item.badge" :value="item.badgeCount" :max="99" class="cursor-pointer" :hidden="item.badgeCount === 0">
                  {{ item.label }}
                </el-badge>
                <span v-else>{{ item.label }}</span>
              </template>
              <component :is="item.component" />
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
  </Container>
</template>

<script setup>
import { Container } from '@/components'
import { Info, Basic, Password, Notice, Operate, Login } from './components'
import { hasPermission } from '@/permission'
import { useNamespace } from '@/hooks'
import { onBeforeMount } from 'vue'

const n = useNamespace('personal')

const router = useRouter()
const route = useRoute()

const active = ref('basic')
const tabs = ref([
  { label: '基本信息', value: 'basic', component: markRaw(Basic), },
  { label: '修改密码', value: 'password', component: markRaw(Password), permission: 'auth:updatePassword' },
  { label: '消息通知', value: 'notice', component: markRaw(Notice), badge: true, badgeCount: 0 },
  { label: '最近操作', value: 'operate', component: markRaw(Operate), permission: 'operateLog:latest' },
  { label: '最近登录', value: 'login', component: markRaw(Login), permission: 'loginLog:latest' },
])

watch(() => active.value, (value) => {
  router.push({ query: { ...route.query, tab: value } })
})

const init = () => {
  const { tab } = route.query
  if (tab) {
    active.value = tab
  }
}

onBeforeMount(init)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(personal) {
  @include e(content) {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  @include e(other) {
    overflow-x: hidden;
    flex: 5;
    margin: 10px;
    padding: 0 15px 0 15px;
    height: fit-content;
    border-radius: var(--el-border-radius-base);
    background-color: var(--container-background-color);
  }
}
</style>
