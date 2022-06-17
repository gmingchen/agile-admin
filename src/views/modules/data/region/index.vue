<template>
  <Container>
    <template #header v-if="havePermission('region:create')">
      <el-form ref="refForm" :inline="true">
        <el-form-item>
          <el-button
            v-permission="'region:create'"
            type="primary"
            @click="addEditHandle()">新增</el-button>
        </el-form-item>
      </el-form>
    </template>
    <template #default>
      <el-table
        ref="refTable"
        v-loading="loading"
        lazy
        row-key="id"
        :data="list"
        :load="loadHandle"
        :tree-props="props"
        border>
        <el-table-column
          align="left"
          label="名称"
          prop="name" />
        <el-table-column
          align="center"
          label="编号"
          prop="id"
          width="80" />
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
          label="区域编码"
          prop="code" />
        <el-table-column
          align="center"
          label="创建时间"
          prop="created_at"
          width="160" />
        <el-table-column
          align="center"
          label="更新时间"
          prop="updated_at"
          width="160" />
        <el-table-column
          align="center"
          label="操作"
          width="100"
          fixed="right">
          <template v-slot="{ row }">
            <el-button
              v-permission="'region:update'"
              type="text"
              size="small"
              @click="addEditHandle(row.id)">编辑</el-button>
            <el-button
              v-permission="'region:delete'"
              type="text"
              size="small"
              @click="deleteHandle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <AddEdit ref="refAddEdit" v-if="visible" @refresh="init" />
    </template>
  </Container>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'
import AddEdit from './components/add-edit.vue'

import useDictionary from '@/mixins/dictionary'
import { havePermission } from '@/utils'

import { listApi, delApi } from '@/api/region'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const refForm = ref()
    const refTable = ref()
    const refAddEdit = ref()

    const props = { children: 'children', hasChildren: 'hasChildren' }
    const { dictionaryMap, getDictionaryMap } = useDictionary()
    const data = reactive({
      loading: false,
      visible: false,
      list: []
    })

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = async (id = 0) => {
      const r = await listApi(id)
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
    const init = async () => {
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
    const deleteHandle = id => {
      ElMessageBox.confirm(`确定对[id=${ id }]进行[删除]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delApi({ key: id }).then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
            init()
          }
        })
      }).catch(() => {
        // to do something on canceled
      })
    }

    onBeforeMount(() => {
      getDictionaryMap('region')
      init()
    })

    return {
      refForm,
      refTable,
      refAddEdit,
      props,
      dictionaryMap,
      ...toRefs(data),
      init,
      loadHandle,
      addEditHandle,
      deleteHandle,
      havePermission
    }
  }
})
</script>
