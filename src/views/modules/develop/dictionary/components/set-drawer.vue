<template>
  <drawer
    v-model="visible"
    title="配置"
    :fixed="false"
    size="700px">
    <el-button
      v-permission="'backstage:dictionary:create'"
      type="primary"
      @click="addEditHandle()">新增</el-button>
    <el-table
      border
      class="g-table margin_t-20"
      element-loading-spinner="el-icon-loading"
      v-loading="loading"
      :data="list"
      @selection-change="selectionHandle">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column
        align="center"
        label="编码"
        prop="code"
        min-width="120"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="名称"
        prop="name"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="操作"
        width="150"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'backstage:dictionary:update'"
            type="text"
            @click="addEditHandle(row.id)">编辑</el-button>
          <el-button
            v-permission="'backstage:dictionary:delete'"
            type="text"
            @click="delHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </drawer>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'

import Drawer from '@/components/drawer'

export default defineComponent({
  components: { Drawer },
  setup(props) {
    const data = reactive({
      visible: false,
      loading: false,
      list: [],
      selection: []
    })

    const init = () => {
      data.visible = true
    }

    const addEditHandle = () => {
      //
    }

    /**
     * @description: table多选事件
     * @param {*} val
     * @return {*}
     * @author: slipper
     */
    const selectionHandle = val => {
      data.selection = val
    }

    return {
      ...toRefs(data),
      init,
      addEditHandle,
      selectionHandle
    }
  }
})
</script>

<style>

</style>
