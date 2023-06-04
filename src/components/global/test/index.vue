<template>
  <el-input ref="refinput" v-bind="$attrs">
    <template v-for="(_value, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </el-input>
</template>

<script setup>
const refinput = ref()

onMounted(() => {
  const instance = getCurrentInstance()
  const entries = Object.entries(refinput.value.$.exposed)
  for (const [key, value] of entries) {
    instance.exposed[key] = value
  }
})
</script>
