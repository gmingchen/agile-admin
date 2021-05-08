<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-19 16:53:30
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-08 11:16:13
-->
<template>
  <div class="g-container">
    <el-form ref="formR" inline>
      <el-form-item>
        <el-button v-permission="'base:menu:create'" type="primary" @click="addEditHandle()">{{t('button.add')}}</el-button>
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
        :label="t('field.fullName',[t('base.menu.chinese')])"
        prop="name_cn"
        min-width="150" />
      <el-table-column
        align="center"
        :label="t('field.fullName',[t('base.menu.english')])"
        prop="name_en"
        min-width="150">
        <template v-slot="{ row }">
          {{ row.name_en ? row.name_en : '—' }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('field.icon')"
        width="80">
        <template v-slot="{ row }">
          <svg-icon v-if="row.type !== 2" :name="row.icon || ''" />
          <span v-else>—</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="t('field.type')"
        prop="type"
        width="90">
        <template v-slot="{ row }">
          <el-tag v-if="row.type === 0" size="small">{{ t('base.menu.catalog') }}</el-tag>
          <el-tag v-else-if="row.type === 1" size="small" type="success">{{ t('base.menu.menu') }}</el-tag>
          <el-tag v-else-if="row.type === 2" size="small" type="info">{{ t('base.menu.button') }}</el-tag>
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
        :label="t('base.menu.authMark')"
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
        :label="t('field.sort')"
        prop="sort"
        width="80" />
      <el-table-column
        align="center"
        :label="t('field.is', [t('base.menu.display')])"
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
        :label="t('field.is', [t('base.menu.alive')])"
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
        :label="t('field.is', [t('base.menu.tab')])"
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
        :label="t('field.is', [t('base.menu.multiple')])"
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
        :label="t('field.operation')"
        width="100"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'base:menu:update'"
            type="text"
            size="small"
            @click="addEditHandle(row.id)">{{ t('button.edit') }}</el-button>
          <el-button
            v-permission="'base:menu:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)">{{ t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-edit ref="refAddEdit" v-if="visible" @refresh="setList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import useInstance from '@/mixins/instance'
import AddEdit from './components/add-edit.vue'
import { setTab, setAlive, setDisplay, getList, setMultiple, del } from '@/api/base/menu'

import { Menu } from 'Type/menu'
import { TreeNode } from 'Type/el'
import { ResponseData } from 'axios'
import { IFn } from 'Type/index'

export default defineComponent({
  components: { AddEdit },
  setup() {
    const { t } = useI18n()

    const { $message, $confirm } = useInstance()

    const refAddEdit = ref()
    const props = { children: 'children', hasChildren: 'hasChildren' }
    const data = reactive({
      loading: false,
      visible: false,
      list: [] as Menu.Vo[]
    })

    /**
     * @description: 父级ID获取菜单
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const get = async (parentId = 0): Promise<ResponseData<Menu.Vo[]>> => {
      const params = {
        parent_id: parentId
      }
      const r = await getList(params)
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
    const setList = async (): Promise<void> => {
      data.loading = true
      data.list = (await get()).data || []
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
    const loadHandle = (row: Menu.Vo, _treeNode: TreeNode<Menu.Vo>, resolve: IFn): void => {
      get(row.id!).then(r => {
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
    const addEditHandle = (id?: number): void => {
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
    const delHandle = (id: number): void => {
      $confirm(t('tip.confirmTips', [id, t('button.delete')]), t('tip.tips'), {
        confirmButtonText: t('button.confirm'),
        cancelButtonText: t('button.cancel'),
        type: 'warning'
      }).then(() => {
        const params = {
          id: id
        }
        del(params).then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const displayHandle = (row: Menu.Vo): void => {
      if (row.id) {
        const params = {
          key: row.id,
          value: row.is_display
        }
        setDisplay(params).then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const keepAliveHandle = (row: Menu.Vo): void => {
      if (row.id) {
        const params = {
          key: row.id,
          value: row.is_alive
        }
        setAlive(params).then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const tabHandle = (row: Menu.Vo): void => {
      if (row.id) {
        const params = {
          key: row.id,
          value: row.is_tab
        }
        setTab(params).then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
    const multipleHandle = (row: Menu.Vo): void => {
      if (row.id) {
        const params = {
          key: row.id,
          value: row.is_multiple
        }
        setMultiple(params).then(r => {
          if (r) {
            $message({
              message: t('tip.success'),
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
      multipleHandle,
      t
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
