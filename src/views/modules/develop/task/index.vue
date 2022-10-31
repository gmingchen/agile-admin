<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2022-04-25 16:50:13
 * @LastEditors: gumingchen
 * @LastEditTime: 2022-05-16 10:37:09
-->
<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.bean" placeholder="Spring Bean" clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">搜索</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
          <el-button v-permission="'quartz:timedTask:create'" type="primary" @click="addEditHandle()">新增</el-button>
          <el-button
            v-permission="'quartz:timedTask:run'"
            type="success"
            @click="runHandle()"
            :disabled="selection.length <= 0">批量立即执行</el-button>
          <el-button
            v-permission="'quartz:timedTask:resume'"
            type="success"
            @click="resumeHandle()"
            :disabled="selection.length <= 0">批量恢复</el-button>
          <el-button
            v-permission="'quartz:timedTask:pause'"
            type="success"
            @click="pauseHandle()"
            :disabled="selection.length <= 0">批量暂停</el-button>
          <el-button
            v-permission="'quartz:timedTask:delete'"
            type="danger"
            :disabled="selection.length <= 0"
            @click="deleteHandle()">批量删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
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
          label="Spring Bean"
          prop="bean" />
        <el-table-column
          align="center"
          label="Cron表达式"
          prop="expression" />
        <el-table-column
          align="center"
          label="参数"
          prop="params" />
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="100">
          <template v-slot="{row}">
            <el-tag v-if="row.status === 1">{{dictionaryMap[row.status]}}</el-tag>
            <el-tag type="info" v-if="row.status === 0">{{dictionaryMap[row.status]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备注"
          prop="remark" />
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          width="160" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="160"
          fixed="right">
          <template v-slot="{ row }">
            <div class="flex-box flex_j_c-center">
              <el-button
                v-permission="'quartz:timedTask:update'"
                type="primary"
                link
                @click="addEditHandle(row.id)">编辑</el-button>
              <el-button
                v-permission="'quartz:timedTask:delete'"
                type="danger"
                link
                @click="deleteHandle(row.id)">删除</el-button>
              <el-dropdown
                trigger="click"
                @command="(command) => commandHandle(command, row.id)"
                v-if="havePermission('quartz:timedTask:run|quartz:timedTask:resume|quartz:timedTask:pause', '|')">
                <el-button
                  class="margin_l-12"
                  type="primary"
                  link>更多</el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="run" v-if="havePermission('quartz:timedTask:run')">立即执行</el-dropdown-item>
                    <el-dropdown-item
                      command="resume"
                      v-if="havePermission('quartz:timedTask:resume')"
                      :disabled="row.status === 1">恢复</el-dropdown-item>
                    <el-dropdown-item
                      command="pause"
                      v-if="havePermission('quartz:timedTask:pause')"
                      :disabled="row.status === 0">暂停</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="getList" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson, havePermission } from '@/utils'

import { pageApi, deleteApi, runApi, resumeApi, pauseApi } from '@/api/timed-task'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const refForm = ref()
    const refTable = ref()
    const refAddEdit = ref()
    const { page } = usePage()
    const { dictionaryMap, getDictionary } = useDictionary()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        bean: ''
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
        nextTick(() => { data.loading = false })
      })
    }

    const reacquireHandle = () => {
      page.current = 1
      getList()
    }

    const addEditHandle = (id) => {
      data.visible = true
      nextTick(() => {
        refAddEdit.value.init(id)
      })
    }

    const runHandle = (id) => {
      const ids = id ? [id] : data.selection.map(item => item.id)
      ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '立即执行' : '批量立即执行' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        runApi({ keys: ids }).then(r => {
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

    const resumeHandle = (id) => {
      const ids = id ? [id] : data.selection.map(item => item.id)
      ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '恢复' : '批量恢复' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resumeApi({ keys: ids }).then(r => {
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

    const pauseHandle = (id) => {
      const ids = id ? [id] : data.selection.map(item => item.id)
      ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '恢复' : '批量恢复' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pauseApi({ keys: ids }).then(r => {
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

    const deleteHandle = (id) => {
      const ids = id ? [id] : data.selection.map(item => item.id)
      ElMessageBox.confirm(`确定对[id=${ ids.join(',') }]进行[${ id ? '删除' : '批量删除' }]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApi({ keys: ids }).then(r => {
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

    const commandHandle = (command, id) => {
      switch (command) {
        case 'run':
          runHandle(id)
          break
        case 'resume':
          resumeHandle(id)
          break
        case 'pause':
          pauseHandle(id)
          break
      }
    }

    const selectionHandle = (val) => {
      data.selection = val
    }

    const pageChangeHandle = (argPage) => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeMount(() => {
      getDictionary('task')
      getList()
    })

    return {
      refForm,
      refTable,
      refAddEdit,
      page,
      dictionaryMap,
      ...toRefs(data),
      getList,
      pageChangeHandle,
      reacquireHandle,
      addEditHandle,
      runHandle,
      resumeHandle,
      pauseHandle,
      deleteHandle,
      commandHandle,
      selectionHandle,
      clearJson,
      havePermission
    }
  }
})
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 5px;
}
</style>
