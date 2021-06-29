<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-21 22:52:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 22:36:10
-->
<template>
  <div class="g-container">
    <el-form ref="refForm" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.bean_name" placeholder="Bean名称" clearable />
      </el-form-item>
      <el-form-item>
        <gl-button sort="query" v-repeat @click="getList()" />
        <gl-button
          sort="reset"
          v-repeat
          @click="clearJson(form), getList()" />
        <gl-button
          sort="add"
          v-permission="'base:schedule:task:create'"
          type="primary"
          @click="addEditHandle()" />
        <gl-button
          sort="batchImplement"
          v-permission="'base:schedule:task:run'"
          type="danger"
          @click="runHandle()"
          :disabled="selection.length <= 0" />
        <gl-button
          sort="batchRecovery"
          v-permission="'base:schedule:task:resume'"
          type="danger"
          @click="resumeHandle()"
          :disabled="selection.length <= 0" />
        <gl-button
          sort="batchPause"
          v-permission="'base:schedule:task:pause'"
          type="danger"
          @click="pauseHandle()"
          :disabled="selection.length <= 0" />
        <gl-button
          sort="batchDelete"
          v-permission="'base:schedule:task:delete'"
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
        label="ID"
        prop="id"
        width="80" />
      <el-table-column
        align="center"
        label="Bean名称"
        prop="bean_name"
        min-width="120" />
      <el-table-column
        align="center"
        label="Cron表达式"
        prop="cron_expression"
        width="160px" />
      <el-table-column
        align="center"
        label="参数"
        prop="params" />
      <el-table-column
        align="center"
        label="状态"
        prop="status"
        width="80px">
        <template v-slot="{ row }">
          <el-tag v-if="row.status === 1" type="success">正常</el-tag>
          <el-tag v-if="row.status === 0" type="info">暂停</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注"
        prop="remark"
        min-width="200px" />
      <el-table-column
        align="center"
        label="操作"
        width="240"
        fixed="right">
        <template v-slot="{ row }">
          <gl-button
            sort="edit"
            v-permission="'base:schedule:task:update'"
            type="text"
            size="small"
            @click="addEditHandle(row.id)" />
          <gl-button
            sort="implement"
            v-permission="'base:schedule:task:run'"
            type="text"
            size="small"
            @click="runHandle(row.id)" />
          <gl-button
            sort="recovery"
            v-if="row.status === 0"
            v-permission="'base:schedule:task:resume'"
            type="text"
            size="small"
            @click="resumeHandle(row.id)" />
          <gl-button
            sort="pause"
            v-if="row.status === 1"
            v-permission="'base:schedule:task:pause'"
            type="text"
            size="small"
            @click="pauseHandle(row.id)" />
          <gl-button
            sort="delete"
            v-permission="'base:schedule:task:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <page :page="page" @change="pageChangeHandle" />
    <add-edit ref="refAddEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import usePage from '@/mixins/page'
import useInstance from '@/mixins/instance'
import Page from '@/components/page/index.vue'
import AddEdit from './components/add-edit.vue'
import { clearJson } from '@/utils'
import { delApi, pageApi, pauseApi, resumeApi, runApi } from '@/api/develop/task'

export default defineComponent({
  components: { Page, AddEdit },
  setup() {
    const { $message, $confirm } = useInstance()

    const refForm = ref()
    const refAddEdit = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        bean_name: ''
      },
      list: [],
      selection: []
    })

    const getList = () => {
      const params = {
        ...data.form,
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
     * @author: gumingchen
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
     * @author: gumingchen
     */
    const delHandle = id => {
      let params
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id)
      }
      $confirm(`确定对[id=${ params.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApi(params).then(r => {
          if (r) {
            $message({
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
     * @description: 立即执行
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const runHandle = id => {
      let params
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id)
      }
      $confirm(`确定对[id=${ params.join(',') }]进行[${ id ? '立即执行' : '批量立即执行' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        runApi(params).then(r => {
          if (r) {
            $message({
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
     * @description: 恢复
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const resumeHandle = id => {
      let params
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id)
      }
      $confirm(`确定对[id=${ params.join(',') }]进行[${ id ? '恢复' : '批量恢复' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resumeApi(params).then(r => {
          if (r) {
            $message({
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
     * @description: 暂停
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const pauseHandle = id => {
      let params
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id)
      }
      $confirm(`确定对[id=${ params.join(',') }]进行[${ id ? '暂停' : '批量暂停' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pauseApi(params).then(r => {
          if (r) {
            $message({
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
     * @author: gumingchen
     */
    const selectionHandle = val => {
      data.selection = val
    }

    /**
     * @description: 分页变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
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
      runHandle,
      resumeHandle,
      pauseHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
