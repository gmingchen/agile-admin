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
        <gl-button
          sort="add"
          v-permission="'base:menu:create'"
          type="primary"
          @click="addEditHandle()" />
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
          <gl-svg v-if="row.type !== 2" :name="row.icon || ''" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="类型"
        prop="type"
        width="90">
        <template v-slot="{ row }">
          <el-tag v-if="row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="row.type === 2" size="small" type="info">按钮</el-tag>
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
            v-permission="'base:menu:display'"
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
            v-permission="'base:menu:alive'"
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
            v-permission="'base:menu:tab'"
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
            v-permission="'base:menu:multiple'"
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
          <gl-button
            sort="edit"
            v-permission="'base:menu:update'"
            type="text"
            size="small"
            @click="addEditHandle(row.id)" />
          <gl-button
            sort="delete"
            v-permission="'base:menu:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)" />
        </template>
      </el-table-column>
    </el-table>
    <add-edit ref="refAddEdit" v-if="visible" @refresh="setList" />
  </div>
</template>

<script>
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'

import useInstance from '@/mixins/instance'
import AddEdit from './components/add-edit.vue'
import { tabApi, aliveApi, displayApi, listApi, multipleApi, delApi } from '@/api/develop/menu'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const { $message, $confirm } = useInstance()

    const refForm = ref()
    const refAddEdit = ref()
    const props = { children: 'children', hasChildren: 'hasChildren' }
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
      $confirm(`确定对[id=${ id }]进行[删除]操作?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: id
        }
        delApi(params).then(r => {
          if (r) {
            $message({
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
            $message({
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
            $message({
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
            $message({
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
            $message({
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
    })

    return {
      refForm,
      refAddEdit,
      props,
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
