<!--
* @Description: 数据字典-主表
* @Author: slipper
* @Email: 1240235512@qq.com
* @Date: 2021-11-19 05:02:48
* @LastEditors: slipper
* @LastEditTime: 2021-11-19 05:02:48
-->
<template>
  <div class="g-container">
    <el-form ref="refForm" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat @click="getList()" />
        <el-button v-repeat @click="clearJson(form), getList()" />
        <el-button
          v-permission="'backstage:dictionary:create'"
          type="primary"
          @click="addEditHandle()" />
        <el-button
          v-permission="'backstage:dictionary:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0" />
      </el-form-item>
    </el-form>
    <el-table
      border
      class="g-table"
      element-loading-spinner="el-icon-loading"
      v-loading="loading"
      :data="list"
      @selection-change="selectionHandle">
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column
        align="center"
        label=""
        prop="id"
        width="80"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="编码"
        prop="code"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="名称"
        prop="name"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="描述"
        prop="describe"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="状态：0-禁用 1-启用"
        prop="status"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="创建者"
        prop="creator"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="创建时间"
        prop="created_at"
        width="160"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="更新者"
        prop="updater"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="更新时间"
        prop="updated_at"
        width="160"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label=""
        prop="deleted"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="操作"
        width="100"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'backstage:dictionary:update'"
            type="text"
            size="small"
            @click="addEditHandle(row.id)" />
          <el-button
            v-permission="'backstage:dictionary:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
    <add-edit ref="refAddEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import usePage from '@/mixins/page'
import { clearJson, parseDate2Str } from '@/utils'

import { delApi, pageApi } from '@/api/develop/dictionary'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const refForm = ref()
    const refAddEdit = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        date: []
      },
      list: [],
      selection: []
    })

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @author: slipper
     */
    const getList = () => {
      const params = {
        ...data.form,
        start: data.form.date && data.form.date.length ? parseDate2Str(data.form.date[0]) : '',
        end: data.form.date && data.form.date.length ? parseDate2Str(data.form.date[1]) : '',
        current: page.current,
        size: page.size
      }
      data.loading = true
      pageApi(params).then(r => {
        if (r) {
          data.list = r.data.list
          page.total = r.data.total
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    /**
     * @description: 新增/编辑弹窗
     * @param {*}
     * @return {*}
     * @author: slipper
     */
    const addEditHandle = id => {
      data.visible = true
      nextTick(() => {
        refAddEdit.value.init(id)
      })
    }

    /**
     * @description: 删除
     * @param {number} id
     * @return {*}
     * @author: slipper
     */
    const delHandle = id => {
      let params
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id)
      }
      ElMessageBox.confirm(`确定对[id=${ params.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApi(params).then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
            getList()
          }
        })
      }).catch(() => {
        // to do something on canceled
      })
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

    /**
     * @description: 分页变化事件
     * @param {*}
     * @return {*}
     * @author: slipper
     */
    const pageChangeHandle = argPage => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      refForm,
      refAddEdit,
      page,
      ...toRefs(data),
      getList,
      addEditHandle,
      delHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>
