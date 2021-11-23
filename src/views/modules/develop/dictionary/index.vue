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
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
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
        <el-button v-repeat @click="reacquireHandle()">查询</el-button>
        <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
        <el-button
          v-permission="'backstage:dictionary:create'"
          type="primary"
          @click="addEditHandle()">新增</el-button>
        <el-button
          v-permission="'backstage:dictionary:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0">批量删除</el-button>
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
        label="ID"
        prop="id"
        width="80"
        :show-overflow-tooltip="true" />
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
        label="备注"
        prop="remark"
        min-width="200px"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="状态"
        prop="status"
        width="80px"
        :show-overflow-tooltip="true">
        <template v-slot="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'info'">
            {{ dictionaryMap[row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="created_at"
        width="160"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="操作"
        width="170"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'backstage:dictionary:status'"
            type="text"
            @click="statusHandle({id: row.id, status: row.status === 1 ? 0 : 1})">
            {{row.status === 1 ? '禁用' : '启用'}}
          </el-button>
          <el-button
            v-permission="'backstage:dictionary:update'"
            type="text"
            @click="addEditHandle(row.id)">编辑</el-button>
          <el-button
            v-permission="'backstage:dictionary:detail:list'"
            type="text"
            @click="setHandle(row.id)">配置</el-button>
          <el-button
            v-permission="'backstage:dictionary:delete'"
            type="text"
            @click="delHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
    <add-edit ref="refAddEdit" v-if="visible" @refresh="getList" />
    <set-drawer ref="refSetDrawer" v-if="setVisible" @refresh="getList" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'
import SetDrawer from './components/set-drawer.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, delApi, statusApi } from '@/api/develop/dictionary'

export default defineComponent({
  components: { AddEdit, SetDrawer },
  setup() {
    const refForm = ref()
    const refAddEdit = ref()
    const refSetDrawer = ref()

    const { page } = usePage()
    const { dictionaryMap, getDictionaryMap } = useDictionary()
    const data = reactive({
      loading: false,
      visible: false,
      setVisible: false,
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
     * @Author: gumingchen
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
     * @description: 重新获取、重置 数据
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const reacquireHandle = () => {
      page.current = 1
      getList()
    }

    /**
     * @description: 新增/编辑弹窗
     * @param {*}
     * @return {*}
     * @Author: gumingchen
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
     * @Author: gumingchen
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
     * @description: 状态
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const statusHandle = row => {
      ElMessageBox.confirm(`确定对[id=${ row.id }]进行[${ dictionaryMap.value[row.status] }]操作`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          key: row.id,
          value: row.status
        }
        statusApi(params).then(r => {
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
     * @description: 配置
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const setHandle = id => {
      data.setVisible = true
      nextTick(() => {
        refSetDrawer.value.init(id)
      })
    }

    /**
     * @description: table多选事件
     * @param {*} val
     * @return {*}
     * @Author: gumingchen
     */
    const selectionHandle = val => {
      data.selection = val
    }

    /**
     * @description: 分页变化事件
     * @param {*}
     * @return {*}
     * @Author: gumingchen
     */
    const pageChangeHandle = argPage => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeMount(() => {
      getList()
      getDictionaryMap('status')
    })

    return {
      refForm,
      refAddEdit,
      refSetDrawer,
      page,
      dictionaryMap,
      ...toRefs(data),
      getList,
      reacquireHandle,
      addEditHandle,
      delHandle,
      statusHandle,
      setHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
