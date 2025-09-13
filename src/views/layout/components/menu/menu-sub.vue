<template>
  <el-menu-item-group :title="data.label" v-if="data.type === PERMISSION_TYPE_ENUM.GROUP" :index="data.value + ''">
    <template #title>
      <Icon v-if="data.icon" :name="data.icon" class="pr-5" />
      <span>{{ data.label }}</span>
    </template>
    <MenuSub v-for="item in data.children" :key="item.value" :data="item" />
  </el-menu-item-group>
  <el-sub-menu v-else-if="data.children && data.children.length > 0" :index="data.value + ''">
    <template #title>
      <Icon v-if="data.icon" :name="data.icon" class="pr-5" />
      <span>{{ data.label }}</span>
    </template>
    <MenuSub v-for="item in data.children" :key="item.value" :data="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="data.route && data.route.name ? data.route.name : data.value + ''" @click="onClick">
    <Icon v-if="data.icon" :name="data.icon" class="pr-5" />
    <template #title>
      <span>{{ data.label }}</span>
    </template>
  </el-menu-item>
</template>

<script setup>
import { Icon } from '@/components'
import MenuSub from './menu-sub.vue'
import { PERMISSION_TYPE_ENUM } from '@/common/enums'
import { useNamespace } from '@/hooks'

const n = useNamespace('menu-sub')

const { data } = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const onClick = () => {
  const { type, route, url } = data
  if (type === PERMISSION_TYPE_ENUM.MENU || type === PERMISSION_TYPE_ENUM.ROUTER || type === PERMISSION_TYPE_ENUM.IFRAME) {
    router.push({ name: route.name })
  } else if (type === PERMISSION_TYPE_ENUM.URL) {
    window.open(url)
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(menu-sub) {}
</style>
