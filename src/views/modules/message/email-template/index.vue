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
        <el-button v-permission="'backstage:config:update:value'" type="primary" @click="configHandle()">配置</el-button>
        <el-button v-permission="'backstage:email:template:create'" type="primary" @click="addEditHandle()">新增</el-button>
        <el-button
          v-permission="'backstage:email:template:delete'"
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
        width="80" />
      <el-table-column
        align="center"
        label="标题"
        prop="subject"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="内容"
        prop="content"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="备注"
        prop="remark"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="创建时间"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        label="操作"
        width="190"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'backstage:email:template:update'"
            type="text"
            size="small"
            @click="addEditHandle(row.id)">编辑</el-button>
          <el-button
            v-permission="'backstage:email:template:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <mail-set ref="refMailSet" v-if="visible" />
    <add-edit ref="refAddEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import useInstance from '@/mixins/instance'
import MailSet from './components/mail-set.vue'
import AddEdit from './components/add-edit.vue'

import { delApi, listApi } from '@/api/message/email-template'

export default defineComponent({
  components: { MailSet, AddEdit },
  setup() {
    const { $message, $confirm } = useInstance()

    const refForm = ref()
    const refMailSet = ref()
    const refAddEdit = ref()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        type: '',
        date: []
      },
      list: [],
      selection: []
    })

    const getList = () => {
      data.loading = true
      listApi({}).then(r => {
        if (r) {
          data.list = r.data
        }
        nextTick(() => {
          data.loading = false
        })
      })
    }

    /**
     * @description: oss配置
     * @return {*}
     * @author: gumingchen
     */
    const configHandle = () => {
      data.visible = true
      nextTick(() => {
        refMailSet.value.init()
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
     * @description: table多选事件
     * @param {*} val
     * @return {*}
     * @author: gumingchen
     */
    const selectionHandle = val => {
      data.selection = val
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      refForm,
      refMailSet,
      refAddEdit,
      ...toRefs(data),
      getList,
      configHandle,
      addEditHandle,
      delHandle,
      selectionHandle
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
