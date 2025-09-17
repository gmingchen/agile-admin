<template>
  <div :class="n.b()">
    <div :class="n.e('item')" v-for="item in list" :key="item.label">
      <Icon :name="item.icon" size="60px"></Icon>
      <div class="fd-column f_ai-center">
        <div :class="n.e('label')">{{ item.label }}</div>
        <CountTo :class="n.e('value')" :startVal="0" :endVal="item.value" :duration="2000" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon, CountTo } from '@/components'
import { userStatApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('count-stat')

const list = ref([
  { label: '总用户量', value: 0, icon: 'user-volume', },
  { label: '新增用户量', value: 0, icon: 'new-user-volume', },
  { label: '今日访问量', value: 0, icon: 'visits', },
  { label: '在线用户量', value: 0, icon: 'user-online', },
])

const getData = async () => {
  const r = await userStatApi()
  if (r) {
    list.value[0].value = r.data.userVolume
    list.value[1].value = r.data.newUserVolume
    list.value[2].value = r.data.todayVisits
    list.value[3].value = r.data.onlineUserVolume
  }
}

onBeforeMount(getData)
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(count-stat) {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: space-between;
  gap: 24px 10px;
  @include e(item) {
    height: 90px;
    padding: 10px;
    background-color: var(--container-background-color);
    border-radius: var(--el-border-radius-base);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  @include e(label) {
    font-size: 16px;
    color: var(--el-text-color-placeholder);
  }
  @include e(value) {
    margin-top: 10px;
    font-size: 24px;
  }
}
</style>
