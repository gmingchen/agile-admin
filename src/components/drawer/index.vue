<template>
  <div :class="{'drawer-not-fixed': !fixed}">
    <el-drawer
      v-model="visible"
      :title="title"
      :direction="direction"
      :size="size"
      :modal="modal">
      <el-scrollbar class="padding_r-10">
        <slot />
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'

import { UPDATE_MODEL_EVENT } from '@/utils/constant'

export default defineComponent({
  emits: [UPDATE_MODEL_EVENT],
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    title: { // 标题
      type: String,
      default: ''
    },
    direction: { // 弹出位置
      type: String,
      default: 'rtl'
    },
    size: { // 大小
      type: [Number, String],
      default: '30%'
    },
    fixed: { // 定位方式
      type: Boolean,
      default: true
    },
    modal: { // 是否需要遮罩层
      type: Boolean,
      default: true
    }
  },
  setup(props, { emit }) {
    const visible = computed({
      get: () => {
        return props.modelValue
      },
      set: (val) => {
        emit(UPDATE_MODEL_EVENT, val)
      }
    })

    return {
      visible
    }
  }
})
</script>

<style lang="scss" scoped>
.drawer-not-fixed {
  ::v-deep(.el-overlay) {
    position: absolute;
    z-index: 50!important;
  }
}

::v-deep(.el-drawer__header) {
  margin-bottom: 0!important;
}
::v-deep(.el-drawer__body) {
  overflow: auto;
}
</style>
