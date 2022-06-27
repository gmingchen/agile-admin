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

<script>
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
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

    return {
      refContainer,
      refIframe,
      loading,
      url
    }
  }
})

</script>
