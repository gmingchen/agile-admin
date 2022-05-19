<template>
  <div :class="`
    container-sidebar
    flex-box
    overflow-auto
    ${panelMode === 3 ? 'container-sidebar-panel' : ''}`">
    <el-scrollbar class="sidebar-container margin_r-10" v-if="scroll && slots.sidebar">
      <div class="padding-10">
        <slot name="sidebar" />
      </div>
    </el-scrollbar>
    <div class="sidebar-container margin_r-10" v-if="!scroll && slots.sidebar">
      <div class="padding-10 height-full">
        <slot name="sidebar" />
      </div>
    </div>
    <Container ref="refContainer" class="container flex-item_f-1 overflow-auto" :mode="panelMode">
      <template #header v-if="slots.header">
        <slot name="header" />
      </template>
      <template #default v-if="slots.default">
        <slot />
      </template>
      <template #footer v-if="slots.footer">
        <slot name="footer" />
      </template>
    </Container>
  </div>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    /**
     * 面板模式
     * 1: 头部 主要内容 脚部 左侧 分离
     * 2: 左右面板分离
     * 3: 整个容器为面板
     */
    mode: {
      type: Number,
      default: null
    },
    /**
     * 侧边栏是否开启滚动
     */
    scroll: {
      type: Boolean,
      default: () => true
    }
  },
  setup(props) {
    const store = useStore()

    const { slots } = getCurrentInstance()

    const refContainer = ref()

    const panelMode = computed(() => props.mode || store.state.settings.panelMode)

    const setScrollTop = (top = 0) => {
      refContainer.value.setScrollTop(top)
    }

    return {
      slots,
      panelMode,
      refContainer,
      setScrollTop
    }
  }
})
</script>

<style lang="scss" scoped>
.container-sidebar {
  border-radius: var(--el-border-radius-base);
  &-panel {
    background-color: var(--gl-content-panel-background-color);
    .sidebar-container {
      margin-right: 0;
    }
    // .container {
    //   border-left: 1px solid var(--el-border-color);
    //   border-radius: 0;
    // }
  }
  .sidebar-container {
    background-color: var(--gl-content-panel-background-color);
    border-radius: var(--el-border-radius-base);
  }
}
</style>
