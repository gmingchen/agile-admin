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
        <el-select v-model="form.type" :placeholder="t('base.backup.backupMode')" clearable>
          <el-option :label="t('base.backup.manual')" :value="1" />
          <el-option :label="t('base.backup.automatic')" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="-"
          :start-placeholder="t('field.date', [t('field.start')])"
          :end-placeholder="t('field.date', [t('field.end')])"
          clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">{{ t('button.query') }}</el-button>
        <el-button @click="clearJson(form), getList()">{{ t('button.reset') }}</el-button>
        <el-button v-permission="'base:backup:backup'" type="primary" @click="backupHandle()">{{ t('base.backup.backup') }}</el-button>
        <el-button
          v-permission="'base:backup:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0">{{ t('button.batchDelete') }}</el-button>
        <el-button
          v-permission="'base:backup:clear'"
          type="danger"
          @click="clearHandle()">{{ t('button.clear') }}</el-button>
        <el-button
          v-permission="'base:backup:truncate'"
          type="danger"
          @click="truncateHandle()">{{ t('base.backup.clearDatabase') }}</el-button>
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
        :label="t('field.name')"
        prop="name"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        :label="t('base.backup.databaseName')"
        prop="db_name"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        :label="t('base.file.physicalPath')"
        prop="path"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        :label="t('base.file.virtualPath')"
        prop="url"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        :label="t('base.backup.command')"
        prop="cmd"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        :label="t('base.backup.backupMode')"
        prop="cmd"
        width="120">
        <template v-slot="{ row }">
          <el-tag v-if="row.type === 1" size="small">{{ t('base.backup.manual') }}</el-tag>
          <el-tag v-else size="small" type="success">{{ t('base.backup.automatic') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('field.time', [t('field.create')])"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        :label="t('field.operation')"
        width="190"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'base:backup:recovery'"
            type="text"
            size="small"
            @click="recoveryHandle(row.id)">{{ t('base.backup.recovery') }}</el-button>
          <el-button
            v-permission="'base:backup:download'"
            type="text"
            size="small"
            @click="downloadHandle(row.id)">{{ t('button.download') }}</el-button>
          <el-button
            v-permission="'base:backup:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)">{{ t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :page="page" @change="pageChangeHandle" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import usePage, { IPage } from '@/mixins/page'
import useInstance from '@/mixins/instance'
import Page from 'V/components/page/index.vue'
import { clearJson, parseDate2Str } from '@/utils'

import { delApi, pageApi, clearApi, downloadApi, recoveryApi, backupApi, truncateApi } from '@/api/develop/backup'
import { Backup } from 'Type/backup'

export default defineComponent({
  components: { Page },
  setup() {
    const { t } = useI18n()
    const { $message, $confirm } = useInstance()

    const refForm = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        type: '',
        date: []
      },
      list: [] as Backup.Base[],
      selection: [] as Backup.Base[]
    })

    const getList = (): void => {
      const params = {
        type: data.form.type,
        start: data.form.date.length ? parseDate2Str(data.form.date[0]) : '',
        end: data.form.date.length ? parseDate2Str(data.form.date[1]) : '',
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
     * @description: 备份
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const backupHandle = (): void => {
      $confirm(t('tip.confirmTips', [t('base.backup.backup')]), t('tip.tips'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        backupApi().then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const recoveryHandle = (id: number): void => {
      $confirm(t('tip.confirmTips', [t('base.backup.recovery')]), t('tip.tips'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        recoveryApi(id).then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const delHandle = (id: number): void => {
      let params: number[]
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id!)
      }
      $confirm(t('tip.confirmOptionTips', [params.join(','), t(id ? 'button.delete' : 'button.batchDelete')]), t('tip.tips'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        delApi(params).then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const clearHandle = (): void => {
      $confirm(t('tip.confirmTips', [t('base.backup.backup'), t('button.clear')]), t('tip.tips'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        clearApi().then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const downloadHandle = (id: number): void => {
      window.open(downloadApi(id))
    }

    /**
     * @description: 清库
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const truncateHandle = (): void => {
      $confirm(t('tip.confirmTips', [t('base.backup.clearDatabase')]), t('tip.tips'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        truncateApi().then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const selectionHandle = (val: Backup.Base[]): void => {
      data.selection = val
    }

    /**
     * @description: 分页变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const pageChangeHandle = (argPage: IPage): void => {
      page.current = argPage.current
      page.size = argPage.size
      getList()
    }

    onBeforeMount(() => {
      getList()
    })

    return {
      refForm,
      page,
      ...toRefs(data),
      getList,
      backupHandle,
      delHandle,
      clearHandle,
      downloadHandle,
      recoveryHandle,
      truncateHandle,
      selectionHandle,
      pageChangeHandle,
      t,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
