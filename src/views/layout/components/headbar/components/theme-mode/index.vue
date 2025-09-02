<template>
  <el-tooltip
    content="暗黑模式"
    placement="bottom"
    :show-after="500">
    <el-switch
      :class="n.b()"
      v-model="mode"
      active-value="dark"
      inactive-value="light"
      active-text="黑"
      inactive-text="亮"
      inline-prompt />
  </el-tooltip>
</template>

<script setup>
import { useNamespace } from '@/hooks';

const n = useNamespace('theme-mode')

const mode = ref('light')

const handleTransition = (transition, isDark) => {
  transition.ready.then(() => {
    const clientX = document.documentElement.clientWidth - 10
    const clientY = 10
    // const clientX = document.documentElement.clientWidth / 2
    // const clientY = document.documentElement.clientHeight / 2
    const radius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY)
    )
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${radius}px at ${clientX}px ${clientY}px)`
    ]

    document.documentElement.animate(
      { clipPath: isDark ? clipPath.reverse() : clipPath },
      { duration: 500, pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)' }
    )
  })
}

const toggle = () => {
  const isDark = mode.value === 'dark'
  const transition = document.startViewTransition(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
  handleTransition(transition, isDark)
}

watch(() => mode.value, toggle, { immediate: false })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(theme-mode) {
  --el-switch-on-color: #2c2c2c;
}
</style>

<style lang="scss">
::view-transition-new(root),
::view-transition-old(root) {
  animation: none;
}
.dark::view-transition-old(root) {
  z-index: 100;
}
</style>
