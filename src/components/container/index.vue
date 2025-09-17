<template>
  <div :class="[n.b(), n.is('custom', custom)]">
    <div :class="n.e('sidebar')" v-if="$slots.sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div :class="n.e('wrap')">
      <div :class="n.e('headbar')" v-if="$slots.headbar">
        <slot name="headbar"></slot>
      </div>
      <el-scrollbar ref="scrollbarRef" :class="n.e('content')">
        <div :class="n.e('content-inner')">
          <slot></slot>
        </div>
      </el-scrollbar>
      <div :class="n.e('footbar')" v-if="$slots.footbar">
        <slot name="footbar"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNamespace } from '@/hooks'
const n = useNamespace('container')

const props = defineProps({
  custom: {
    type: Boolean,
    default: () => false,
  }
})

const scrollbarRef = useTemplateRef('scrollbarRef')
const setScrollTop = (top = 0) => {
  scrollbarRef.value.setScrollTop(top)
}

defineExpose({ setScrollTop })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;

.container-common {
  background-color: var(--container-background-color);
  border-radius: var(--el-border-radius-base);
}

@include b(container) {
  --gap-size: 15px;

  padding: var(--gap-size);
  height: 100%;
  display: flex;
  @include e(sidebar) {
    @extend .container-common;
    margin-right: var(--gap-size);
    // padding: var(--gap-size);
    // overflow: hidden;
  }
  @include e(wrap) {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  @include e(headbar) {
    @extend .container-common;
    margin-bottom: var(--gap-size);
    padding: var(--gap-size) var(--gap-size) 0 var(--gap-size);
  }
  @include e(content) {
    @extend .container-common;
    flex: 1;
  }
  @include e(content-inner) {
    margin: var(--gap-size);
  }
  @include e(footbar) {
    @extend .container-common;
    margin-top: var(--gap-size);
    padding: var(--gap-size);
  }

  @include when(custom) {
    padding: 0px;
    .container-common {
      background-color: transparent;
    }
  }
}
</style>
