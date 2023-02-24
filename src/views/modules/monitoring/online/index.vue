<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.name" placeholder="用户名/昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button v-repeat @click="reacquireHandle()">搜索</el-button>
          <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        :data="list"
        border>
        <el-table-column
          align="center"
          label="ID"
          prop="id"
          width="80" />
        <el-table-column
          align="center"
          label="头像"
          prop="username"
          width="80">
          <template v-slot="{ row }">
            <el-avatar :size="50" :src="row.avatar" v-if="row.avatar" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="用户名"
          prop="username" />
        <el-table-column
          align="center"
          label="昵称"
          prop="nickname" />
        <el-table-column
          align="center"
          label="企业"
          prop="enterprise_name" />
        <el-table-column
          align="center"
          label="手机号"
          prop="mobile" />
        <el-table-column
          align="center"
          label="电子邮箱"
          prop="email" />
        <el-table-column
          align="center"
          label="性别"
          prop="sex">
          <template v-slot="{row}">
            {{ row.sex_dict }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="登录时间"
          prop="login_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="90"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'websocket:logout'"
              type="danger"
              link
              @click="logoutHandle(row)">强制退出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson } from '@/utils'

import { onlinePageApi, logoutApi } from '@/api/websocket'

export default defineComponent({
  setup() {
    const refForm = ref()
    const refTable = ref()

    const { page } = usePage()
    const { getDictionary } = useDictionary()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        name: '',
        date: []
      },
      list: []
    })

    const getList = () => {
      const params = {
        name: data.form.name,
        current: page.current,
        size: page.size
      }
      data.loading = true
      onlinePageApi(params).then(r => {
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

    const logoutHandle = (row) => {
      ElMessageBox.confirm(`确定进行[强制退出]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logoutApi({ id: row.id, token: row.token }).then(r => {
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

    onBeforeMount(() => {
      getDictionary('sex')
      getList()
    })

    return {
      refForm,
      refTable,
      page,
      ...toRefs(data),
      getList,
      pageChangeHandle,
      reacquireHandle,
      logoutHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
