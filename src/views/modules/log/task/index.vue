<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-21 22:52:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 22:18:35
-->
<template>
  <div class="g-container">
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-input v-model="form.beanName" placeholder="Bean名称" clearable />
      </el-form-item>
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
        <el-button v-permission="'quartz:schedule:log:truncate'" type="danger" @click="truncateHandle()">清除</el-button>
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
        label="任务ID"
        prop="task_id"
        width="80"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="Bean名称"
        prop="bean_name"
        min-width="100"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="参数"
        prop="params"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="状态"
        prop="status"
        width="80px">
        <template v-slot="{ row }">
          <el-tag v-if="row.status === 1" type="success">成功</el-tag>
          <el-tag v-if="row.status === 0" type="info">失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="执行时长"
        prop="times"
        width="80"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="信息"
        min-width="150"
        :show-overflow-tooltip="true">
        <template v-slot="{ row }">
          <span v-if="row.status === 1">{{ row.message }}</span>
          <span v-if="row.status === 0">{{ row.error }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        prop="created_at"
        width="160" />
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import usePage from '@/mixins/page'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, truncateApi } from '@/api/log/task'

export default defineComponent({
  setup() {
    const refForm = ref()
    const refBackupSet = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        beanName: '',
        date: []
      },
      list: [],
      selection: []
    })

    const getList = () => {
      const params = {
        bean_name: data.form.beanName,
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
     * @description: 清除
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const truncateHandle = () => {
      ElMessageBox.confirm('确定进行[清除定时任务日志]操作', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        truncateApi().then(r => {
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
      refBackupSet,
      page,
      ...toRefs(data),
      getList,
      reacquireHandle,
      truncateHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
