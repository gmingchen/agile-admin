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
    <el-form ref="refForm" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.username" placeholder="账户" clearable />
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.nickname" placeholder="昵称" clearable />
      </el-form-item>
      <el-form-item>
        <gl-button sort="query" v-repeat @click="getList()" />
        <gl-button sort="reset" v-repeat @click="clearJson(form), getList()" />
        <gl-button
          sort="add"
          v-permission="'base:user:create'"
          type="primary"
          @click="addEditHandle()" />
        <gl-button
          sort="batchDelete"
          v-permission="'base:user:delete'"
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
        label="创建时间"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        label="操作"
        width="150"
        fixed="right">
        <template v-slot="{ row }">
          <gl-button
            :sort="row.status === 1 ? 'disable' : 'enable'"
            v-permission="'base:user:status'"
            type="text"
            size="small"
            @click="statusHandle(row)" />
          <gl-button
            sort="edit"
            v-permission="'base:user:update'"
            type="text"
            size="small"
            @click="addEditHandle(row.id)" />
          <gl-button
            sort="delete"
            v-permission="'base:user:delete'"
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
import { delApi, pageApi, statusApi } from '@/api/system/user'

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
     * @description: 状态
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const statusHandle = row => {
      $confirm(`'确定对[id=${ row.id }]进行[${ row.status === 1 ? '禁用' : '启用' }]操作`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          key: row.id,
          value: row.status === 1 ? 0 : 1
        }
        statusApi(params).then(r => {
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
