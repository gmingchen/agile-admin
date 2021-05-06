<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-15 19:20:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-06 15:21:01
-->
<template>
  <div class="tabs">
    <el-tabs
      type="card"
      v-model="active"
      @tab-click="clickHandle"
      @tab-remove="removeHandle">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.value"
        :label="tab[`label_${ language }`]"
        :name="tab.value"
        :closable="tab.closable" />
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onBeforeMount, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { key, useStore } from '@/store'
import { TabsPane } from 'Type/el'

export default defineComponent({

  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore(key)

    const language = computed(() => store.state.setting.set.language)
    const tabActive = computed(() => store.state.tab.active)
    const tabs = computed(() => store.state.tab.tabs)

    const active = computed({
      get: () => {
        return tabActive.value
      },
      set: (val) => {
        store.dispatch('tab/setActive', val)
      }
    })

    // watchEffect(() => {
    //   store.dispatch('tab/changeHandle', route)
    //   const meta = route.meta
    //   if (meta.multiple) {
    //     store.dispatch('setting/setRefresh', true)
    //     nextTick(() => {
    //       store.dispatch('setting/setRefresh', false)
    //     })
    //   }
    // })

    /**
     * @description: 标签点击路由跳转事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const clickHandle = ({ index }: TabsPane): void => {
      const tab = tabs.value[+index]
      router.push({
        name: tab.name,
        query: tab.query,
        params: tab.params
      })
    }

    /**
     * @description: 标签删除事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const removeHandle = (name: string): void => {
      store.dispatch('tab/removeHandle', [name])
    }

    return {
      language,
      active,
      tabs,
      clickHandle,
      removeHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.tabs {
  padding: 9px 10px 0 10px;
  ::v-deep(.el-tabs__header) {
    margin: 0;
    border: none;
  }
}
</style>
