<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in crumbs"
      :key="item.value"
      :to="{ name: item.value }">
      {{ item.label_cn }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const data = reactive({
      pages: store.getters['menu/pages'],
      crumbs: []
    })

    console.log(data.pages)
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style>

</style>
