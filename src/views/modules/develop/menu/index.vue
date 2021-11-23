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
        label="中文名称"
        prop="name_cn"
        min-width="150" />
      <el-table-column
        align="center"
        label="英文名称"
        prop="name_en"
        min-width="150">
        <template v-slot="{ row }">
          {{ row.name_en ? row.name_en : '—' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="图标"
        width="80">
        <template v-slot="{ row }">
          <g-svg v-if="row.type !== 2" :name="row.icon || ''" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="类型"
        prop="type"
        width="90">
        <template v-slot="{ row }">
          <el-tag :type="row.type === 0 ? '' : (row.type === 1 ? 'success' : 'info')">
            {{ dictionaryMap[row.type] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="URL"
        prop="url"
        min-width="150"
        :show-overflow-tooltip="true">
        <template v-slot="{ row }">
          <span v-if="row.type !== 0">{{ row.url }}</span>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="授权标识"
        prop="permission"
        min-width="150"
        :show-overflow-tooltip="true">
        <template v-slot="{ row }">
          <span v-if="row.type !== 0">{{ row.permission }}</span>
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="排序"
        prop="sort"
        width="80" />
      <el-table-column
        align="center"
        label="是否显示"
        prop="is_display"
        min-width="90">
        <template v-slot="{ row }">
          <el-switch
            v-permission="'backstage:menu:display'"
            @change="displayHandle(row)"
            v-model="row.is_display"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否缓存"
        prop="is_alive"
        min-width="110">
        <template v-slot="{ row }">
          <el-switch
            v-if="row.type !== 0 && row.url"
            v-permission="'backstage:menu:alive'"
            @change="keepAliveHandle(row)"
            v-model="row.is_alive"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否在tab显示"
        prop="is_tab"
        min-width="130">
        <template v-slot="{ row }">
          <el-switch
            v-if="row.type !== 0 && row.url"
            :disabled="row.is_display === 0"
            v-permission="'backstage:menu:tab'"
            @change="tabHandle(row)"
            v-model="row.is_tab"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否支持tab多开"
        prop="is_multiple"
        min-width="160">
        <template v-slot="{ row }">
          <el-switch
            v-if="row.type !== 0 && row.url"
            :disabled="row.is_display === 0 || row.is_tab === 0"
            v-permission="'backstage:menu:multiple'"
            @change="multipleHandle(row)"
            v-model="row.is_multiple"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0" />
          <span v-else>—</span>
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

import { tabApi, aliveApi, displayApi, listApi, multipleApi, delApi } from '@/api/develop/menu'

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
      const params = {
        parent_id: parentId
      }
      const r = await listApi(params)
      if (r) {
        r.data.forEach(item => {
          if (item.type !== 2) {
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
        const params = {
          id: id
        }
        delApi(params).then(r => {
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

    /**
     * @description: 是否显示
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const displayHandle = row => {
      if (row.id) {
        const params = {
          key: row.id,
          value: row.is_display
        }
        displayApi(params).then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
          } else {
            row.is_display = row.is_display === 1 ? 0 : 1
          }
        })
      }
    }

    /**
     * @description: 是否缓存
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const keepAliveHandle = row => {
      if (row.id) {
        const params = {
          key: row.id,
          value: row.is_alive
        }
        aliveApi(params).then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
          } else {
            row.is_alive = row.is_alive === 1 ? 0 : 1
          }
        })
      }
    }

    /**
     * @description: 是否在tab显示
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const tabHandle = row => {
      if (row.id) {
        const params = {
          key: row.id,
          value: row.is_tab
        }
        tabApi(params).then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
          } else {
            row.is_tab = row.is_tab === 1 ? 0 : 1
          }
        })
      }
    }

    /**
     * @description: 是否支持tab多开
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const multipleHandle = row => {
      if (row.id) {
        const params = {
          key: row.id,
          value: row.is_multiple
        }
        multipleApi(params).then(r => {
          if (r) {
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
          } else {
            row.is_multiple = row.is_multiple === 1 ? 0 : 1
          }
        })
      }
    }

    onBeforeMount(() => {
      setList()
      getDictionaryMap('menu')
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
      delHandle,
      displayHandle,
      keepAliveHandle,
      tabHandle,
      multipleHandle
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
