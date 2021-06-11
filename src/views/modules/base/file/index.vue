<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-21 22:52:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 22:40:48
-->
<template>
  <div class="g-container">
    <el-form ref="refForm" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.extension" :placeholder="t('field.fullName', [t('base.file.extension')])" clearable />
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
        <el-upload
          class="upload-demo"
          :action="uploadApi()"
          :on-success="successHandle"
          :show-file-list="false">
          <el-button type="primary">{{ t('base.file.upload') }}</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">{{ t('button.query') }}</el-button>
        <el-button @click="clearJson(form), getList()">{{ t('button.reset') }}</el-button>
        <el-button
          v-permission="'base:file:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0">{{ t('button.batchDelete') }}</el-button>
        <el-button
          v-permission="'base:file:clear'"
          type="danger"
          @click="clearHandle()">{{ t('button.clear') }}</el-button>
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
        :label="t('base.file.file')"
        width="80">
        <template v-slot="{ row }">
          <el-avatar
            :src="flowApi(row.id)"
            shape="square"
            fit="contain">{{ row.extension }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('field.fullName', [t('base.file.original')])"
        prop="original"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        :label="t('field.fullName', [t('base.file.actual')])"
        prop="actual"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        :label="t('field.fullName', [t('base.file.extension')])"
        prop="extension"
        min-width="100" />
      <el-table-column
        align="center"
        :label="t('base.file.size')"
        prop="size" />
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
        :label="t('field.time', [t('base.file.upload')])"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        :label="t('field.operation')"
        width="130"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'base:file:download'"
            type="text"
            size="small"
            @click="downloadHandle(row.id)">{{ t('button.download') }}</el-button>
          <el-button
            v-permission="'base:file:delete'"
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

import { delApi, pageApi, uploadApi, clearApi, flowApi, downloadApi } from '@/api/base/file'
import { File } from 'Type/file'
import { ResponseData } from 'axios'
import { SUCCESS_CODE } from '@/utils/constants'

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
        extension: '',
        date: []
      },
      list: [] as File.Base[],
      selection: [] as File.Base[]
    })

    const getList = (): void => {
      const params = {
        extension: data.form.extension,
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
     * @description: 上传成功
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const successHandle = (response: ResponseData<File.Base>): void => {
      if (SUCCESS_CODE.includes(response.code)) {
        $message({
          message: t('tip.success'),
          type: 'success'
        })
        getList()
      } else {
        $message({
          message: t('tip.fail'),
          type: 'warning'
        })
      }
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
      $confirm(t('tip.confirmTips', [t('base.file.file'), t('button.clear')]), t('tip.tips'), {
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
     * @description: table多选事件
     * @param {*} val
     * @return {*}
     * @author: gumingchen
     */
    const selectionHandle = (val: File.Base[]): void => {
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
      successHandle,
      delHandle,
      clearHandle,
      uploadApi,
      flowApi,
      downloadHandle,
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
