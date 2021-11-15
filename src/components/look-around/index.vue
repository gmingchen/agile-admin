<template>
  <el-dropdown @command="commandHandle" placement="bottom-start">
    <el-button type="success">随便看看</el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="frame">管理后台框架</el-dropdown-item>
        <el-dropdown-item command="im">即时聊天系统</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const commandHandle = (command) => {
      let url = 'https://github.com/gmingchen'
      switch (command) {
        case 'frame':
          url = 'https://github.com/gmingchen/vue3-element-plus-admin'
          break
        case 'im':
          url = 'https://github.com/gmingchen/vue3-element-plus-im'
          break
      }
      window.open(url)
    }

    return {
      commandHandle
    }
  }
})
</script>

<style>

</style>
