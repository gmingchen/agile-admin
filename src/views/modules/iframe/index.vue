<template>
  <div :class="n.b()">
    <iframe ref="iframeRef" :src="url" width="100%" height="100%" frameborder="0" scrolling="yes" />
  </div>
</template>

<script setup>
import { useNamespace } from '@/hooks'

const n = useNamespace('iframe')

const route = useRoute()

const iframeRef = useTemplateRef('iframeRef')
const loading = ref(false)

const url = computed(() => route.meta.url)
watch(() => url.value, () => {
  loading.value = true
})

onMounted(() => {
  loading.value = true
  iframeRef.value.onload = () => loading.value = false
})
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: iframe#{$element-separator};
@include b(iframe) {
  height: 100%;
}
</style>
