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
    <iframe
      :src="url"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="yes" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore, key } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const url = ref(route.query.url)
    const store = useStore(key)
    const style = computed(() => {
      const result = {
        height: `${ store.state.setting.document.clientHeight
                  - store.state.setting.navbar.headHeight
                  - (store.state.setting.navbar.tabsDisplay ? store.state.setting.navbar.tabsHeight : 0) }px`
      }
      return result
    })

    return {
      url,
      style
    }
  }
})

</script>

<style lang="scss" scoped></style>
