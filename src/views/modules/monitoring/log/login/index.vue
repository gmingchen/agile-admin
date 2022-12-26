<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <EnterpriseSidebar v-model="active" @change="changeHandle" />
    </template>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="用户名/昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="创建开始日期"
            end-placeholder="创建结束日期"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()" :disabled="!active">搜索</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()" :disabled="!active">重置</el-button>
          <el-button
            v-permission="'global:loginLog:delete'"
            type="danger"
            :disabled="page.total == 0 || !active"
            @click="deleteHandle()">删除所有日志</el-button>
          <el-button
            v-permission="'global:loginLog:truncate'"
            type="danger"
            @click="celarHandle()">清空日志</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        row-key="id"
        :data="list"
        border>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="帐号"
          prop="account" />
        <el-table-column
          align="center"
          label="登录信息"
          prop="message" />
        <el-table-column
          align="center"
          label="管理员"
          prop="username"
          width="180">
          <template v-slot="{ row }">
            <div class="flex-box flex_j_c-center flex_a_i-center">
              <el-avatar
                class="margin_r-10"
                :size="50"
                :src="row.avatar"
                v-if="row.avatar" />
              <div class="ellipse">{{row.nickname || row.username }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="IP"
          prop="ip"
          width="120" />
        <el-table-column
          align="center"
          label="浏览器"
          prop="browser"
          width="140" />
        <el-table-column
          align="center"
          label="操作系统"
          prop="operating_system" />
        <el-table-column
          align="center"
          label="操作时间"
          prop="created_at"
          width="160" />
      </el-table>
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </ContainerSidebar>
</template>

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import ContainerSidebar from '@/components/container-sidebar/index.vue'
import EnterpriseSidebar from '@/components/enterprise-sidebar/index.vue'

import usePage from '@/mixins/page'
import { clearJson, parseDate2Str } from '@/utils'

import { globalPageApi, globalDeleteApi, globalTruncateApi } from '@/api/login-log'

export default defineComponent({
  components: { ContainerSidebar, EnterpriseSidebar },
  setup() {
    const refContainerSidebar = ref()
    const refForm = ref()
    const refTable = ref()
    const { page } = usePage()
    const data = reactive({
      active: '',
      loading: false,
      form: {
        name: '',
        date: []
      },
      list: []
    })

    const getList = () => {
      const params = {
        id: data.active,
        name: data.form.name,
        start: data.form.date && data.form.date.length > 0 ? parseDate2Str(data.form.date[0]) : '',
        end: data.form.date && data.form.date.length > 1 ? parseDate2Str(data.form.date[1]) : '',
        current: page.current,
        size: page.size
      }
      data.loading = true
      globalPageApi(params).then(r => {
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

    const deleteHandle = () => {
      ElMessageBox.confirm(`确定进行[删除]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        globalDeleteApi({ key: data.active }).then(r => {
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

    const celarHandle = () => {
      ElMessageBox.confirm(`确定进行[清空]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        globalTruncateApi().then(r => {
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

    const pageChangeHandle = (argPage) => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    const changeHandle = (_row) => {
      refContainerSidebar.value.setScrollTop()
      reacquireHandle()
    }

    return {
      refContainerSidebar,
      refForm,
      refTable,
      page,
      ...toRefs(data),
      getList,
      pageChangeHandle,
      reacquireHandle,
      deleteHandle,
      celarHandle,
      changeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
