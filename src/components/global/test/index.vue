<template>
  <el-input ref="refinput" v-bind="$attrs">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-input>
</template>

<script setup>
import useBindExposed from '@/hooks/bind-exposed'

const refinput = ref()

onMounted(() => {
  useBindExposed(refinput)
})
</script>
