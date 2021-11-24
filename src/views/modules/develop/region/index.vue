<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-19 16:53:30
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 16:21:17
-->
<template>
  <div class="g-container">
    <el-form ref="refForm" inline>
      <el-form-item>
        <el-button v-permission="'backstage:menu:create'" type="primary" @click="addEditHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      border
      class="g-table"
      element-loading-spinner="el-icon-loading"
      v-loading="loading"
      :data="list"
      lazy
      :load="loadHandle"
      :tree-props="props"
      row-key="id">
      <el-table-column
        header-align="center"
        label="名称"
        prop="name"
        min-width="150" />
      <el-table-column
        align="center"
        label="编码"
        prop="code" />
      <el-table-column
        align="center"
        label="等级"
        prop="level">
        <template v-slot="{ row }">
          {{ dictionaryMap[row.level] }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="100"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'backstage:menu:update'"
            type="text"
            @click="addEditHandle(row.id)">编辑</el-button>
          <el-button
            v-permission="'backstage:menu:delete'"
            type="text"
            @click="delHandle(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-edit ref="refAddEdit" v-if="visible" @refresh="setList" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import useDictionary from '@/mixins/dictionary'

import { listApi, delApi } from '@/api/develop/region'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const refForm = ref()
    const refAddEdit = ref()

    const props = { children: 'children', hasChildren: 'hasChildren' }
    const { dictionaryMap, getDictionaryMap } = useDictionary()
    const data = reactive({
      loading: false,
      visible: false,
      list: []
    })

    /**
     * @description: 父级ID获取菜单
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = async (parentId = 0) => {
      const r = await listApi(parentId)
      if (r) {
        r.data.forEach(item => {
          if (item.level < 3) {
            item.hasChildren = true
          }
        })
      }
      return r
    }

    /**
     * @description: 首次加载获取值
     * @param {*} async
     * @return {*}
     * @author: gumingchen
     */
    const setList = async () => {
      data.loading = true
      data.list = []
      data.list = (await getList()).data || []
      nextTick(() => {
        data.loading = false
      })
    }

    /**
     * @description: 懒加载事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const loadHandle = (row, _treeNode, resolve) => {
      getList(row.id).then(r => {
        if (r) {
          resolve(r.data)
        } else {
          resolve([])
        }
      })
    }

    /**
     * @description: 新增/编辑弹窗
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const addEditHandle = id => {
      data.visible = true
      nextTick(() => {
        refAddEdit.value.init(id)
      })
    }

    /**
     * @description: 删除
     * @param {number} id
     * @return {*}
     * @author: gumingchen
     */
    const delHandle = id => {
      ElMessageBox.confirm(`确定对[id=${ id }]进行[删除]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApi(id).then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
            setList()
          }
        })
      }).catch(() => {
        // to do something on canceled
      })
    }

    onBeforeMount(() => {
      setList()
      getDictionaryMap('regionLevel')
    })

    return {
      refForm,
      refAddEdit,
      props,
      dictionaryMap,
      ...toRefs(data),
      setList,
      loadHandle,
      addEditHandle,
      delHandle
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
