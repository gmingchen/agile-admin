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
        <el-input v-model="form.extension" placeholder="扩展名称" clearable />
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
        <el-upload
          class="upload-demo"
          :action="uploadApi()"
          :on-success="successHandle"
          :show-file-list="false">
          <gl-button sort="upload" type="primary" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <gl-button sort="query" v-repeat @click="getList()" />
        <gl-button sort="reset" v-repeat @click="clearJson(form), getList()" />
        <gl-button
          sort="batchDelete"
          v-permission="'base:file:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0" />
        <gl-button
          sort="clear"
          v-permission="'base:file:clear'"
          type="danger"
          @click="clearHandle()" />
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
        label="文件"
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
        label="原始名称"
        prop="original"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="实际名称"
        prop="actual"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="扩展名称"
        prop="extension"
        min-width="100" />
      <el-table-column
        align="center"
        label="大小"
        prop="size" />
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
        label="上传时间"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        label="操作"
        width="130"
        fixed="right">
        <template v-slot="{ row }">
          <gl-button
            sort="download"
            v-permission="'base:file:download'"
            type="text"
            size="small"
            @click="downloadHandle(row.id)" />
          <gl-button
            sort="delete"
            v-permission="'base:file:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <page :page="page" @change="pageChangeHandle" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import usePage from '@/mixins/page'
import useInstance from '@/mixins/instance'
import Page from '@/components/page/index.vue'
import { clearJson, parseDate2Str } from '@/utils'

import { delApi, pageApi, uploadApi, clearApi, flowApi, downloadApi } from '@/api/develop/file'
import { SUCCESS_CODE } from '@/utils/constants'

export default defineComponent({
  components: { Page },
  setup() {
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
      list: [],
      selection: []
    })

    const getList = () => {
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
    const successHandle = response => {
      if (SUCCESS_CODE.includes(response.code)) {
        $message({
          message: '操作成功!',
          type: 'success'
        })
        getList()
      } else {
        $message({
          message: '操作失败',
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
     * @description: 清除文件
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const clearHandle = () => {
      $confirm('确定进行[清除]操作?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearApi().then(r => {
          if (r) {
            $message({
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
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
