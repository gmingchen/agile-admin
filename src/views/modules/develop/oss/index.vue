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
    <el-form ref="refForm" :inline="true" @keyup.enter="reacquireHandle()">
      <el-form-item>
        <el-button v-permission="'backstage:config:update:value'" type="primary" @click="configHandle()">配置</el-button>
      </el-form-item>
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
        <el-button v-repeat @click="reacquireHandle()">查询</el-button>
        <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          :action="uploadApi()"
          :on-success="successHandle"
          :headers="{
            [TOKEN_KEY]: token
          }"
          :show-file-list="false">
          <el-button type="primary">上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          v-permission="'oss:file:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0">批量删除</el-button>
        <el-button v-permission="'oss:file:clear'" type="danger" @click="clearHandle()">清除</el-button>
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
            :src="row.url"
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
        label="存储位置"
        prop="created_at"
        width="100">
        <template v-slot="{ row }">
          {{ dictionaryMap[row.type] }}
        </template>
      </el-table-column>
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
          <el-button
            v-permission="'oss:file:download'"
            type="text"
            @click="downloadHandle(row)">下载</el-button>
          <el-button
            v-permission="'oss:file:delete'"
            type="text"
            @click="delHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
    <oss-set ref="refOssSet" v-if="visible" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useStore } from 'vuex'

import { ElMessage, ElMessageBox } from 'element-plus'
import OssSet from './components/oss-set.vue'

import usePage from '@/mixins/page'
import useDictionary from '@/mixins/dictionary'
import { clearJson, parseDate2Str } from '@/utils'
import { SUCCESS_CODE, TOKEN_KEY } from '@/utils/constant'

import { delApi, pageApi, uploadApi, clearApi, flowApi, downloadApi, qiniuDownloadApi } from '@/api/develop/oss'

export default defineComponent({
  components: { OssSet },
  setup() {
    const store = useStore()
    const token = store.state.user.token.token

    const refForm = ref()
    const refOssSet = ref()
    const { page } = usePage()
    const { dictionaryMap, getDictionaryMap } = useDictionary()
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
        refOssSet.value.init()
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
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        getList()
      } else {
        ElMessage({
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
    const downloadHandle = row => {
      switch (row.type) {
        case 1:
          window.open(downloadApi(row.id))
          break
        case 2:
          qiniuDownloadApi(row.id).then(r => {
            if (r) {
              window.open(r.data)
            }
          })
          break
      }
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
      getDictionaryMap('oss')
    })

    return {
      refForm,
      refOssSet,
      page,
      dictionaryMap,
      ...toRefs(data),
      getList,
      reacquireHandle,
      configHandle,
      successHandle,
      delHandle,
      clearHandle,
      uploadApi,
      flowApi,
      downloadHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson,
      token,
      TOKEN_KEY
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
