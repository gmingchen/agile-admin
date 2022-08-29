<template>
  <div class="loading-container height-full" ref="refContainer">
    <div v-loading="loading" class="height-full">
      <iframe
        ref="refIframe"
        :src="url"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="yes" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const refContainer = ref()
const refIframe = ref()

const loading = ref(false)

const url = computed(() => {
  return route.meta.url
})

watch(url, () => {
  loading.value = true
})

onMounted(() => {
  loading.value = true
  refIframe.value.onload = () => {
    loading.value = false
  }
})
</script>
