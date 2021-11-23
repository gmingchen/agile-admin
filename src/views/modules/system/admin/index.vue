<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-21 22:52:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 16:00:52
-->
<template>
  <div class="g-container">
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-input v-model="form.username" placeholder="账户" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.nickname" placeholder="昵称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat @click="reacquireHandle()">查询</el-button>
        <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
        <el-button v-permission="'backstage:admin:create'" type="primary" @click="addEditHandle()">新增</el-button>
        <el-button
          v-permission="'backstage:admin:delete'"
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
        label="账户"
        prop="username" />
      <el-table-column
        align="center"
        label="昵称"
        prop="nickname" />
      <el-table-column
        align="center"
        label="手机号"
        prop="mobile"
        width="120" />
      <el-table-column
        align="center"
        label="邮箱"
        prop="email" />
      <el-table-column
        align="center"
        label="角色名称"
        prop="roles">
        <template v-slot="{ row }">
          <span class="role-name-span" v-for="item in row.roles" :key="item.id">{{ item.name }}</span>
        </template>
      </el-table-column>
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
        width="160" />
      <el-table-column
        align="center"
        label="操作"
        width="150"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'backstage:admin:status'"
            type="text"
            @click="statusHandle({id: row.id, status: row.status === 1 ? 0 : 1})">
            {{row.status === 1 ? '禁用' : '启用'}}
          </el-button>
          <el-button
            v-permission="'backstage:admin:update'"
            type="text"
            @click="addEditHandle(row.id)">编辑</el-button>
          <el-button
            v-permission="'backstage:admin:delete'"
            type="text"
            @click="delHandle(row.id)">删除</el-button>
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
import useDictionary from '@/mixins/dictionary'
import { clearJson } from '@/utils'

import { pageApi, delApi, statusApi } from '@/api/system/admin'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const refForm = ref()
    const refAddEdit = ref()

    const { page } = usePage()
    const { dictionaryMap, getDictionaryMap } = useDictionary()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        username: '',
        nickname: ''
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
      getDictionaryMap('status')
    })

    return {
      refForm,
      refAddEdit,
      page,
      dictionaryMap,
      ...toRefs(data),
      getList,
      reacquireHandle,
      addEditHandle,
      delHandle,
      statusHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
.role-name-span + .role-name-span {
  margin-left: 10px;
}
</style>
