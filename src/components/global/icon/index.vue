<!--
 * @Description: Element-plus svg 组件 封装
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 1995-08-30 05:20:00
 * @LastEditors: gumingchen
 * @LastEditTime: 1995-08-30 05:20:00
-->
<template>
  <span>
    <el-icon>
      <component :is="name" />
    </el-icon>
  </span>
</template>
<!--
 * 使用:
 *   1.组件模版中使用
 *      [<g-icon name="icon"></g-icon>]
 * 注意:
 *    1.name      为 element-plus svg组件名称（必填）
-->
<script>
import { defineComponent } from 'vue'
import * as ElIconModules from '@element-plus/icons'

export default defineComponent({
  components: {
    ...ElIconModules
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style>

</style>
