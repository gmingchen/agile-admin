<template>
  <el-breadcrumb separator="/" :class="n.b()">
    <transition-group name="right-in-out">
      <el-breadcrumb-item
        v-for="item in list"
        :key="item.value"
        :to="item.name ? { name: item.name, query: item.query, params: item.params } : ''">
        {{ item.label }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { usePermissionStore } from '@/stores'
import { useNamespace } from '@/hooks'
import { storeToRefs } from 'pinia'

const n = useNamespace('crumb')

const route = useRoute()

const permissionStore = usePermissionStore()
const { permissions } = storeToRefs(permissionStore)

const list = ref([])

const handleCrumb = (permissions) => {
  const result = []
  for (let i = 0; i < permissions.length; i++) {
    const permission = permissions[i]
    const crumb = {
      value: permission.value,
      label: permission.label,
      name: permission.route ? permission.route.name : '',
    }
    if (permission.route && permission.route.name === route.name) {
      result.push({ ...crumb, query: route.query, params: route.params })
    }
    if (permission.children && permission.children.length > 0) {
      const list = handleCrumb(permission.children)
      if (list.length) {
        result.push(...list, crumb)
      }
    }
  }
  return result
}

watchEffect(() => {
  list.value = []
  list.value = handleCrumb(permissions.value).reverse()
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: crumb#{$element-separator};
@include b(crumb) {
  display: flex;
  ::v-deep(.right-in-out-leave-active) {
    .el-breadcrumb__separator {
      visibility: hidden;
    }
  }
}
</style>
