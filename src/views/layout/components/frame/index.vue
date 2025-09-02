<template>
  <div :class="[n.b(), n.m(mode)]">
    <slot :name="mode === 'horizontal' ? 'sidebar' : 'headbar'"></slot>
    <div :class="n.e('wrap')">
      <slot :name="mode === 'vertical' ? 'sidebar' : 'headbar'"></slot>
      <div :class="n.e('content')">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNamespace } from '@/hooks';
const n = useNamespace('frame')

const props = defineProps({
  mode: {
    type: String,
    default: () => 'horizontal',
    validator: (val) => ['vertical', 'horizontal'].includes(val)
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;

@include b(frame) {
  height: 100%;
  display: flex;
  @include e(wrap) {
    flex: 1;
    display: flex;
    overflow: auto;
  }
  @include e(content) {
    flex: 1;
    background-color: var(--content-background-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  @include m(horizontal) {
    .frame__wrap {
      flex-direction: column;
    }
  }
  @include m(vertical) {
    flex-direction: column;
  }
}

</style>
