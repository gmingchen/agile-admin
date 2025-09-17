<template>
  <el-dropdown trigger="click" @command="onCommand">
    <el-avatar :src="avatar" class="c-pointer">
      {{ name }}
    </el-avatar>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useAdminerStore, useRootStore } from '@/stores'
import { useNamespace } from '@/hooks'

const n = useNamespace('user')

const router = useRouter()
const adminerStore = useAdminerStore()
const { nickname, username, avatar } = storeToRefs(adminerStore)
const { logout } = useRootStore()

const name = computed(() => {
  const name = nickname.value || username.value
  return name ? name.substring(0, 1) : ''
})

const onCommand = async (command) => {
  if (command === 'personal') {
    router.push({ name: 'personal' })
  } else if (command === 'logout') {
    await logout()
    router.push({ name: 'login' })
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(user) {}
</style>
