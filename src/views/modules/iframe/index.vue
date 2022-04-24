<!--
 * @Description: iframe
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-03-01 15:53:12
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-30 17:58:06
-->
<template>
  <div
    class="loading-container"
    ref="refContainer">
    <div v-loading="loading">
      <iframe
        ref="refIframe"
        :src="url"
        width="100%"
        :height="`${height}px`"
        frameborder="0"
        scrolling="yes" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, ref, watch, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const route = useRoute()
    const store = useStore()

    const headHeight = computed(() => store.state.setting.navbar.headHeight)
    const fixed = computed(() => store.state.setting.navbar.fixed)
    const tabsHeight = computed(() => store.state.setting.navbar.tabsHeight)
    const tabsDisplay = computed(() => store.state.setting.navbar.tabsDisplay)

    const refContainer = ref()
    const refIframe = ref()

    const loading = ref(false)
    const height = ref(100)

    const url = computed(() => {
      return route.meta.url
    })

    watch(url, () => {
      loading.value = true
    })

    /**
     * 计算出 iframe 的高度
     */
    const calculateIframeHeight = () => {
      // 当前组件的样式 主要用于获取 当前容器的 padding-top padding-bottom
      const cssStyle = getComputedStyle(refContainer.value)
      const paddingTop = +cssStyle['paddingTop'].replace('px', '')
      const paddingBottom = +cssStyle['paddingBottom'].replace('px', '')

      let elementId = 'bodyScrollbar'
      let beyond = paddingTop + paddingBottom + 4
      if (fixed.value) {
        elementId = 'contentScrollbar'
      } else {
        beyond += headHeight.value
        if (tabsDisplay.value) {
          beyond += tabsHeight.value
        }
      }
      height.value = document.getElementById(elementId).offsetHeight - beyond
      window.onresize = () => {
        height.value = document.getElementById(elementId).offsetHeight - beyond
      }
    }

    onMounted(() => {
      loading.value = true
      refIframe.value.onload = () => {
        loading.value = false
      }
      calculateIframeHeight()
    })

    onActivated(() => {
      calculateIframeHeight()
    })

    return {
      refContainer,
      refIframe,
      loading,
      height,
      url
    }
  }
})

</script>

<style lang="scss" scoped>
.loading-container {
  height: 100%;
}
</style>
