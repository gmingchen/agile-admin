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
        <el-input v-model="form.name" placeholder="表名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button v-repeat @click="reacquireHandle()">查询</el-button>
        <el-button v-repeat @click="clearJson(form), reacquireHandle()">重置</el-button>
        <el-button v-permission="'generator:table:create'" type="danger" @click="generateHandle()">生成</el-button>
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
        type="index"
        label="#"
        width="80" />
      <el-table-column
        align="center"
        label="名称"
        prop="name"
        min-width="120"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="Engine"
        prop="engine"
        width="100"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="Rows"
        prop="row"
        width="100"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="编码集"
        prop="collation"
        width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="备注"
        prop="comment"
        min-width="150"
        :show-overflow-tooltip="true" />
      <el-table-column
        align="center"
        label="更新时间"
        prop="updated_at"
        width="160" />
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
            v-permission="'generator:table:create'"
            type="text"
            size="small"
            @click="generateHandle(row.name)">生成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <g-page :page="page" @change="pageChangeHandle" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import usePage from '@/mixins/page'
import { clearJson } from '@/utils'

import { pageApi, generatorApi } from '@/api/develop/generator'

export default defineComponent({
  setup() {
    const refForm = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        name: ''
      },
      list: [],
      selection: []
    })

    const getList = () => {
      const params = {
        name: data.form.username,
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

    const generateHandle = async (name) => {
      const names = name ? [name] : data.selection.map(item => {
        return item.name
      })
      const blob = await generatorApi(names)
      if (blob) {
        const href = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = href
        a.download = 'code.zip'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(href)
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
    })

    return {
      refForm,
      page,
      ...toRefs(data),
      getList,
      reacquireHandle,
      generateHandle,
      selectionHandle,
      pageChangeHandle,
      clearJson
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
