<template>
  <Container>
    <template #header>
      <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
        <el-form-item v-if="havePermission('configuration:list&backup:updateConfig', '&')">
          <el-button
            v-permission="'backup:updateConfig'"
            type="primary"
            @click="setHandle()">配置</el-button>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.type" placeholder="备份方式" clearable>
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
            v-permission="'backup:backup'"
            type="primary"
            @click="backupHandle()">备份</el-button>
          <el-button
            v-permission="'backup:delete'"
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
          width="80" />
        <el-table-column
          align="center"
          label="文件名"
          prop="name" />
        <el-table-column
          align="center"
          label="数据库名称"
          prop="database"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="物理路径"
          prop="path"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="虚拟路径"
          prop="url" />
        <el-table-column
          align="center"
          label="执行命令"
          prop="cmd"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="备份方式"
          prop="type">
          <template v-slot="{ row }">
            <el-tag :type="row.type === 1 ? 'success' : 'info'">
              {{ dictionaryMap[row.type] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="备份时间"
          prop="created_at"
          width="160"
          :show-overflow-tooltip="true" />
        <el-table-column
          align="center"
          label="操作"
          width="110"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'backup:recovery'"
              type="primary"
              link
              @click="recoveryHandle(row.id)">恢复</el-button>
            <el-button
              v-permission="'backup:delete'"
              type="danger"
              link
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Set ref="refSet" v-if="visible" />
    </template>
    <template #footer>
      <Page :page="page" @change="pageChangeHandle" />
    </template>
  </Container>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import Set from './components/set.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str, havePermission } from '@/utils'

import { pageApi, delApi, backupApi, recoveryApi } from '@/api/backup'

export default defineComponent({
  components: { Set },
  setup() {
    const refForm = ref()
    const refTable = ref()
    const refSet = ref()

    const { page } = usePage()
    const { dictionaryMap, dictionaryList, getDictionary } = useDictionary()
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
     * @description: 配置弹窗
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const setHandle = () => {
      data.visible = true
      nextTick(() => {
        refSet.value.init()
      })
    }

    /**
     * @description: 备份
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const backupHandle = () => {
      ElMessageBox.confirm(`确定进行[备份]操作`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        backupApi().then(r => {
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
     * @description: 恢复
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const recoveryHandle = (id) => {
      ElMessageBox.confirm(`确定进行[恢复]操作`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recoveryApi({ key: id }).then(r => {
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
      getDictionary('backup')
      getList()
    })

    return {
      refForm,
      refTable,
      refSet,
      page,
      dictionaryMap,
      dictionaryList,
      ...toRefs(data),
      getList,
      reacquireHandle,
      setHandle,
      backupHandle,
      recoveryHandle,
      deleteHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson,
      havePermission
    }
  }
})
</script>
