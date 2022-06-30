<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item>
          <el-input v-model="form.subject" placeholder="标题" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.from" placeholder="发送邮箱" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.to" placeholder="收件邮箱" clearable />
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
            v-permission="'mail:create'"
            type="primary"
            @click="addHandle()">发送邮件</el-button>
          <el-button
            v-permission="'mail:delete'"
            type="danger"
            @click="deleteHandle()"
            :disabled="selection.length <= 0">批量删除</el-button>
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
          width="80"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="发送邮箱"
          prop="from_email"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="收件邮箱"
          prop="to_email"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="标题"
          prop="subject"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="内容"
          prop="content"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="附件"
          prop="enclosure"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="状态"
          prop="status"
          width="100">
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
          width="80"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'mail:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Add ref="refAdd" v-if="visible" @refresh="getList" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import Add from './components/add.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str } from '@/utils'

import { pageApi, delApi } from '@/api/mail'

export default defineComponent({
  components: { Add },
  setup() {
    const refForm = ref()
    const refTable = ref()
    const refAdd = ref()

    const { page } = usePage()
    const { dictionaryMap, getDictionary } = useDictionary()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        subject: '',
        from: '',
        to: '',
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
     * @description: 发送邮件弹窗
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const addHandle = () => {
      data.visible = true
      nextTick(() => {
        refAdd.value.init()
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
      getDictionary('operation')
      getList()
    })

    return {
      refForm,
      refTable,
      refAdd,
      page,
      dictionaryMap,
      ...toRefs(data),
      getList,
      reacquireHandle,
      addHandle,
      deleteHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>
