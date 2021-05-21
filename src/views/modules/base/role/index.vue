<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-21 22:52:19
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-21 23:25:48
-->
<template>
  <div class="g-container">
    <el-form ref="formR" :inline="true" @keyup.enter="getList()">
      <el-form-item>
        <el-input v-model="form.name" :placeholder="t('field.fullName',[t('base.role.role')])" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getList()">{{ t('button.query') }}</el-button>
        <el-button @click="clearJson(form), getList()">{{ t('button.reset') }}</el-button>
        <el-button v-permission="'base:role:create'" type="primary" @click="addEditHandle()">{{ t('button.add') }}</el-button>
        <el-button
          v-permission="'base:role:delete'"
          type="danger"
          @click="delHandle()"
          :disabled="selection.length <= 0">{{ t('button.batchDelete') }}</el-button>
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
        :label="t('field.fullName',[t('base.role.role')])"
        prop="name" />
      <el-table-column
        align="center"
        :label="t('field.remark')"
        prop="remark" />
      <el-table-column
        align="center"
        :label="t('field.time', [t('field.create')])"
        prop="created_at"
        width="160" />
      <el-table-column
        align="center"
        :label="t('field.operation')"
        width="100"
        fixed="right">
        <template v-slot="{ row }">
          <el-button
            v-permission="'base:role:update'"
            type="text"
            size="small"
            @click="addEditHandle(row.id)">{{ t('button.edit') }}</el-button>
          <el-button
            v-permission="'base:role:delete'"
            type="text"
            size="small"
            @click="delHandle(row.id)">{{ t('button.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <page :page="page" @change="pageChangeHandle" />
    <add-edit ref="refAddEdit" v-if="visible" @refresh="getList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import usePage, { IPage } from '@/mixins/page'
import useInstance from '@/mixins/instance'
import Page from 'V/components/page/index.vue'
import AddEdit from './components/add-edit.vue'

import { clearJson } from '@/utils'
import { delApi, pageApi } from '@/api/base/role'
import { Role } from 'Type/role'

export default defineComponent({
  components: { Page, AddEdit },
  setup() {
    const { t } = useI18n()
    const { $message, $confirm } = useInstance()

    const refAddEdit = ref()
    const { page } = usePage()
    const data = reactive({
      loading: false,
      visible: false,
      form: { name: '' },
      list: [] as Role.Base[],
      selection: [] as Role.Base[]
    })

    /**
     * @description: 获取分页列表
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getList = (): void => {
      const params = {
        ...data.form,
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
      let params: number[]
      if (id) {
        params = [id]
      } else {
        params = data.selection.map(item => item.id!)
      }
      $confirm(t('tip.confirmTips', [params.join(','), t(id ? 'button.delete' : 'button.batchDelete')]), t('tip.tips'), {
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
      })
        .catch(() => {
        // to do something on canceled
        })
    }

    /**
     * @description: table多选事件
     * @param {*} val
     * @return {*}
     * @author: gumingchen
     */
    const selectionHandle = (val: Role.Base[]): void => {
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
      refAddEdit,
      page,
      ...toRefs(data),
      getList,
      addEditHandle,
      delHandle,
      selectionHandle,
      pageChangeHandle,
      t,
      clearJson
    }
  }
})
</script>
