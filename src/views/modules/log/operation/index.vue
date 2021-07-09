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
    <el-form ref="refForm" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.username" placeholder="管理员帐号" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.operation" placeholder="操作" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.ip" placeholder="IP地址" clearable />
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
        <gl-button sort="query" v-repeat @click="getList()" />
        <gl-button sort="reset" v-repeat @click="clearJson(form), getList()" />
        <gl-button
          sort="clear"
          v-permission="'backstage:log:operation:truncate'"
          type="danger"
          @click="truncateHandle()" />
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
        label="管理员帐号"
        prop="username"
        width="100"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="操作"
        prop="operation"
        min-width="100"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="请求URL"
        prop="url"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="请求方法"
        prop="method"
        width="80"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="参数"
        prop="params"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="类名、方法名"
        prop="class_name"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="执行时长"
        prop="times"
        width="80"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="IP地址"
        prop="ip"
        width="120"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="User-Agent"
        prop="agent"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="创建时间"
        prop="created_at"
        width="160" />
    </el-table>
    <page :page="page" @change="pageChangeHandle" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import usePage from '@/mixins/page'
import useInstance from '@/mixins/instance'
import Page from '@/components/page/index.vue'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, truncateApi } from '@/api/log/operation'

export default defineComponent({
  components: { Page },
  setup() {
    const { $message, $confirm } = useInstance()

    const refForm = ref()
    const refBackupSet = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        username: '',
        operation: '',
        ip: '',
        date: []
      },
      list: [],
      selection: []
    })

    const getList = () => {
      const params = {
        username: data.form.username,
        operation: data.form.operation,
        ip: data.form.ip,
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
     * @description: 清除
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const truncateHandle = () => {
      $confirm('确定进行[清除操作日志]操作', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        truncateApi().then(r => {
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
      refBackupSet,
      page,
      ...toRefs(data),
      getList,
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
