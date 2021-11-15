<!--
 * @Description: iframe
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-03-01 15:53:12
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 17:58:06
-->
<template>
  <div :style="style">
    <div class="loading-container" v-loading="loading">
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
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const store = useStore()
    const refIframe = ref()
    const loading = ref(false)
    const style = computed(() => {
      const result = {
        height: `${ store.state.setting.document.clientHeight
                  - store.state.setting.navbar.headHeight
                  - (store.state.setting.navbar.tabsDisplay ? store.state.setting.navbar.tabsHeight : 0) }px`
      }
      return result
    })

    const url = computed(() => {
      return route.meta.iframeUrl
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
      refIframe,
      loading,
      url,
      style
    }
  }
})

</script>

<style lang="scss" scoped>
.loading-container {
  height: 100%;
}
</style>
