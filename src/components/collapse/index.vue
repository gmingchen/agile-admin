<template>
  <el-collapse-transition>
    <div v-show="collapse">
      <slot />
    </div>
  </el-collapse-transition>
  <el-button type="primary" link @click="collapseHandle">
    {{collapse ? activeText : inactiveText}}
  </el-button>
</template>

<script setup>


const emits = defineEmits(['collapse'])
const props = defineProps({
  activeText: {
    type: String,
    default: () => '收起'
  },
  inactiveText: {
    type: String,
    default: () => '展开'
  }
})

const collapse = ref(false)

const collapseHandle = () => {
  collapse.value = !collapse.value
  emits('collapse', collapse.value)
}

</script>

<style>

</style>
