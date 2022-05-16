<template>
  <div :class="`
    container
    flex-box
    flex_d-column
    overflow-auto
    ${panelMode !== 1 ? 'container-panel' : ''}`">
    <div class="header-container margin_b-10 padding-10" v-if="slots.header">
      <slot name="header" />
    </div>
    <el-scrollbar
      :class="`
      content-container
      ${contanierMode === 2 ? 'flex-item_f-1' : 'height-unset'}`"
      v-if="slots.default">
      <div class="content-wrap padding-10">
        <slot />
      </div>
    </el-scrollbar>
    <div class="footer-container margin_t-10 padding-10" v-if="slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, getCurrentInstance } from 'vue'
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
    }
  },
  setup(props) {
    const store = useStore()

    const { slots } = getCurrentInstance()

    const contanierMode = computed(() => store.state.settings.contanierMode)
    const panelMode = computed(() => props.mode || store.state.settings.panelMode)

    return {
      slots,
      contanierMode,
      panelMode
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  border-radius: var(--el-border-radius-base);
  &-panel {
    background-color: var(--gl-content-panel-background-color);
    // .header-container {
    //   border-bottom: 1px solid var(--el-border-color);
    //   border-radius: 0!important;
    // }
    // .footer-container {
    //   border-top: 1px solid var(--el-border-color);
    //   border-radius: 0!important;
    // }
  }
  .header-container, .content-container, .footer-container {
    background-color: var(--gl-content-panel-background-color);
    border-radius: var(--el-border-radius-base);
  }
  // todo: 主要处理左侧菜单折叠起来后再展开表格宽度不缩减问题
  // .content-wrap {
  //   width: 99%;
  // }
}
</style>
