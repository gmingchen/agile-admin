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
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-button v-permission="'backstage:config:update:value'" type="primary" @click="configHandle()">配置</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.type" placeholder="备份方式" clearable>
          <el-option label="手动" :value="1" />
          <el-option label="自动" :value="2" />
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
        <el-button v-permission="'backstage:backup:backup'" type="primary" @click="backupHandle()">备份</el-button>
        <el-button
          v-permission="'backstage:backup:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0">批量删除</el-button>
        <el-button v-permission="'backstage:backup:clear'" type="danger" @click="clearHandle()">清除</el-button>
        <el-button v-permission="'backstage:backup:truncate'" type="danger" @click="truncateHandle()">清除数据库</el-button>
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
        label="名称"
        prop="name"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="数据库名称"
        prop="db_name"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="物理路径"
        prop="path"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="虚拟路径"
        prop="url"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="命令"
        prop="cmd"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="备份方式"
        prop="cmd"
        width="120">
        <template v-slot="{ row }">
          <el-tag v-if="row.type === 1" size="small">手动</el-tag>
          <el-tag v-else size="small" type="success">自动</el-tag>
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
        width="190"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'backstage:backup:recovery'"
            type="text"
            size="small"
            @click="recoveryHandle(row.id)">恢复</el-button>
          <el-button
            v-permission="'backstage:backup:download'"
            type="text"
            size="small"
            @click="downloadHandle(row.id)">下载</el-button>
          <el-button
            v-permission="'backstage:backup:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
    <backup-set ref="refBackupSet" v-if="visible" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import BackupSet from './components/backup-set.vue'

import usePage from '@/mixins/page'
import { clearJson, parseDate2Str } from '@/utils'

import { delApi, pageApi, clearApi, downloadApi, recoveryApi, backupApi, truncateApi } from '@/api/develop/backup'

export default defineComponent({
  components: { BackupSet },
  setup() {
    const refForm = ref()
    const refBackupSet = ref()
    const { page } = usePage()
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
      const params = {
        type: data.form.type,
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
     * @description: oss配置
     * @return {*}
     * @author: gumingchen
     */
    const configHandle = () => {
      data.visible = true
      nextTick(() => {
        refBackupSet.value.init()
      })
    }

    /**
     * @description: 备份
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const backupHandle = () => {
      ElMessageBox.confirm('确定进行备份操作?', '提示', {
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
    const recoveryHandle = id => {
      ElMessageBox.confirm('确定进行恢复操作', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recoveryApi(id).then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
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
     * @description: 清除文件
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const clearHandle = () => {
      ElMessageBox.confirm('确定进行[清除]操作?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearApi().then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        // to do something on canceled
      })
    }

    /**
     * @description: 文件下载
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const downloadHandle = id => {
      window.open(downloadApi(id))
    }

    /**
     * @description: 清库
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const truncateHandle = () => {
      ElMessageBox.confirm('确定进行[清除数据库]操作', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        truncateApi().then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
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
      reacquireHandle,
      configHandle,
      backupHandle,
      delHandle,
      clearHandle,
      downloadHandle,
      recoveryHandle,
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
