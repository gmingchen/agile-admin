<template>
  <el-dropdown @command="commandHandle" placement="bottom-start">
    <el-button type="success">随便看看</el-button>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="frame-vue">管理后台框架</el-dropdown-item>
        <el-dropdown-item command="frame-java-base">管理后台基础版后端代码</el-dropdown-item>
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
        case 'frame-vue':
          url = 'https://github.com/gmingchen/vue3-element-plus-admin'
          break
        case 'frame-java-base':
          url = 'https://github.com/gmingchen/java-admin-base'
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
