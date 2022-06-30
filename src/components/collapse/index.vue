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

<script >
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emit: ['collapse'],
  props: {
    activeText: {
      type: String,
      default: () => '收起'
    },
    inactiveText: {
      type: String,
      default: () => '展开'
    }
  },
  setup(_props, { emit }) {
    const collapse = ref(false)

    const collapseHandle = () => {
      collapse.value = !collapse.value
      emit('collapse', collapse.value)
    }

    return {
      collapse,
      collapseHandle
    }
  }
})
</script>

<style>

</style>
