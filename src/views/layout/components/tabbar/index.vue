<template>
  <div :class="n.b()">
    <el-tabs class="mb-1" type="card" v-model="active" @tab-click="onClick" @tab-remove="onRemove">
      <el-tab-pane v-for="tab in tabs" :key="tab.value" :label="tab.label" :name="tab.value" :closable="tabs.length > 1" />
    </el-tabs>
  </div>
</template>

<script setup>
import { useTabStore } from '@/stores'
import { useNamespace } from '@/hooks'
import { onBeforeMount } from 'vue'

const n = useNamespace('tabbar')

const router = useRouter()
const route = useRoute()

const tabStore = useTabStore()
const { active, tabs } = storeToRefs(tabStore)

const onClick = ({ index }) => {
  const { name, query, params} = tabs.value[+index]
  router.push({ name, query, params})
}

const onRemove = (value) => {
  tabStore.handleRemove([value])
}

onBeforeRouteUpdate((to) => {
  tabStore.handleChange(to)
})

onBeforeMount(() => {
  tabStore.handleChange(route)
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: tabbar#{$element-separator};
@include b(tabbar) {
  padding: 0 10px;
  height: var(--headbar-height);
  background-color: var(--headbar-background-color);
  box-shadow: var(--el-box-shadow-light);
  display: flex;
  align-items: flex-end;

  ::v-deep(.el-tabs) {
    width: 100%;
    .el-tabs__header {
      margin: 0;
      border: none;
    }
  }
}
</style>
