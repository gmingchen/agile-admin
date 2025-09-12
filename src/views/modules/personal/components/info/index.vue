<template>
  <div :class="n.b()">
    <div class="fd-column f_ai-center">
      <el-avatar
        :size="120"
        :src="adminer.avatar"
        v-if="adminer.avatar" />
      <h2>{{ adminer.nickname }}</h2>
    </div>
    <el-descriptions :column="2" class="ph-30">
      <el-descriptions-item>
        <template #label>
          <Icon name="account" />
        </template>
        {{ adminer.username }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Icon name="role" />
        </template>
        {{ adminer.role || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Icon name="mobile" />
        </template>
        {{ adminer.mobile || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Icon name="department" />
        </template>
        {{ adminer.dept || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Icon name="email" />
        </template>
        {{ adminer.email || '-'}}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Icon name="sex" />
        </template>
        {{ adminer.role || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Icon name="sex" />
        </template>
        {{ adminer.sex_dict || '-' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <Icon name="post" />
        </template>
        {{ adminer.post || '-' }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script setup>
import { Icon } from '@/components'
import { useAdminerStore } from '@/stores'
import { useNamespace } from '@/hooks'

const n = useNamespace('info')

const adminerStore = useAdminerStore()

const adminer = computed(() => {
  const { dept, posts, roles, ...others } = adminerStore
  return {
    ...others,
    dept: dept ? dept.name : '',
    post: posts ? posts.map(item => item.name).join(',') : '',
    role: roles ? roles.map(item => item.name).join(',') : ''
  }
})

</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: info#{$element-separator};
@include b(info) {
  margin: 10px;
  padding: 30px 0px;
  min-width: 350px;
  border-radius: var(--el-border-radius-base);
  background-color: var(--container-background-color);
}
</style>
