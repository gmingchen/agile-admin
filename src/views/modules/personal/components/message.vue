<template>
  <div>
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-select v-model="form.type" placeholder="消息类型" clearable>
          <el-option
            v-for="item in dictionaryList"
            :key="item.value"
            :value="item.value"
            :label="item.label" />
        </el-select>
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
        <el-button
          v-repeat
          v-permission="'websocketAdministrator:allRead'"
          type="primary"
          @click="readAllHandle()">全部已读</el-button>
        <el-button
          v-permission="'websocketAdministrator:delete'"
          type="danger"
          @click="deleteHandle()"
          :disabled="selection.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="refTable"
      v-loading="loading"
      :data="list"
      @selection-change="selectionHandle"
      border>
      <el-table-column align="center" type="selection" width="50" />
      <el-table-column
        align="center"
        label="ID"
        prop="id"
        width="80" />
      <el-table-column
        align="center"
        label="推送内容"
        prop="content"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="消息类型"
        prop="type"
        width="120">
        <template v-slot="{ row }">
          <el-tag>{{ dictionaryMap[row.type] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="推送时间"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        label="操作"
        width="120"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-if="row.read === 0"
            v-permission="'websocketAdministrator:read'"
            type="primary"
            link
            @click="readHandle(row)">已读</el-button>
          <el-button
            v-permission="'websocketAdministrator:delete'"
            type="danger"
            link
            @click="deleteHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Page
      :page="page"
      @change="pageChangeHandle"
      class="margin_t-10"
      small />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'

import { ElMessage, ElMessageBox } from 'element-plus'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'

import { clearJson, parseDate2Str, havePermission } from '@/utils'

import { pageApi, setAllReadApi, delApi } from '@/api/websocket-administrator'

export default defineComponent({
  setup() {
    const store = useStore()

    const refForm = ref()
    const refTable = ref()

    const { page } = usePage()

    const { dictionaryMap, dictionaryList, getDictionary } = useDictionary()

    const data = reactive({
      loading: false,
      form: {
        type: '',
        read: '',
        date: []
      },
      list: [],
      selection: []
    })

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = () => {
      const params = {
        ...data.form,
        start: data.form.date && data.form.date.length ? parseDate2Str(data.form.date[0]) : '',
        end: data.form.date && data.form.date.length ? parseDate2Str(data.form.date[1]) : '',
        current: page.current,
        size: page.size
      }
      delete params.date
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
     * 设置已读
     * @param {*} row
     */
    const readHandle = (row) => {
      store.dispatch('message/read', [row.id])
      getList()
    }

    /**
     * 设置全部已读
     * @param {*} row
     */
    const readAllHandle = () => {
      setAllReadApi().then(r => {
        if (r) {
          store.dispatch('message/clear')
          getList()
        }
      })
    }

    /**
     * @description: 删除
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const deleteHandle = id => {
      const ids = id ? [id] : data.selection.map(item => item.id)
      ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApi({ keys: ids }).then(r => {
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
      getDictionary('websocket')
      getList()
    })

    return {
      refForm,
      refTable,
      page,
      dictionaryMap,
      dictionaryList,
      ...toRefs(data),
      getList,
      reacquireHandle,
      readHandle,
      readAllHandle,
      deleteHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson,
      havePermission
    }
  }
})
</script>

<style>

</style>
