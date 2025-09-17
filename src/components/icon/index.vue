<template>
  <i class="iconfont" :style="style" :class="`icon-${name}`" />
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: () => '14px'
  },
  color: {
    type: String,
    default: ''
  }
})

const style = computed(() => {
  return {
    'font-size': props.size,
    color: props.color
  }
})
</script>

<style lang="scss" scoped>
@import '//at.alicdn.com/t/c/font_3225946_t2saxllrdm.css';
</style>
