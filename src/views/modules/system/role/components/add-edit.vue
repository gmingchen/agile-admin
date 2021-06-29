<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:58:28
-->
<template>
  <el-dialog
    width="500px"
    :title="!form.id ? '新增' : '编辑'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      v-loading="loading"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" placeholder="角色名称" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注" />
      </el-form-item>
      <el-form-item label="授权" prop="parent_id">
        <el-cascader
          ref="refCascader"
          v-model="form.menu_ids"
          :options="menus"
          :props="menusProps"
          :show-all-levels="false"
          collapse-tags
          clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <gl-button sort="cancel" @click="visible = false" />
        <gl-button
          sort="confirm"
          v-repeat
          type="primary"
          @click="submit()" />
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import useInstance from '@/mixins/instance'
import { addApi, editApi, infoApi } from '@/api/system/role'
import { selfSelectListApi } from '@/api/develop/menu'
import { parseData2Tree } from '@/utils'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const { $message } = useInstance()

    const refForm = ref()
    const refCascader = ref()
    const data = reactive({
      visible: false,
      loading: false,
      menus: [],
      form: {
        id: null,
        name: '',
        remark: '',
        menu_ids: []
      }
    })

    const rules = reactive(function() {
      return {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      }
    }())
    const menusProps = computed(() => {
      const prop = {
        multiple: true,
        emitPath: false,
        checkStrictly: false,
        value: 'id',
        label: `name_cn`,
        children: 'children'
      }
      return prop
    })

    /**
     * @description: 初始化数据
     * @param {*} async
     * @return {*}
     * @author: gumingchen
     */
    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      const res = await selfSelectListApi()
      if (res) {
        res.data.push({
          id: 0,
          parent_id: 0,
          name_cn: '一级菜单',
          name_en: 'First level menu',
          children: []
        })
        data.menus = parseData2Tree(res.data, 'id', 'parent_id')
      }
      if (data.form.id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form = r.data
        }
      }
      nextTick(() => {
        data.loading = false
      })
    }

    /**
     * @description: 表单验证提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(async valid => {
        if (valid) {
          // 处理菜单权限ID
          const checkedNodes = refCascader.value.getCheckedNodes(true)
          let menuIds = []
          checkedNodes.forEach(item => {
            menuIds.push.apply(menuIds, item.pathValues)
          })
          menuIds = Array.from(new Set(menuIds)).filter(item => {
            return item !== 0
          })
          data.form.menu_ids = menuIds

          const r = !data.form.id ? await addApi(data.form) : await editApi(data.form)
          if (r) {
            data.visible = false
            $message({
              message: '操作成功!',
              type: 'success'
            })
            emit('refresh')
          }
        }
      })
    }

    /**
     * @description: 弹窗关闭动画结束时的回调
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const dialogClosedHandle = () => {
      refForm.value.resetFields()
    }

    return {
      refForm,
      refCascader,
      ...toRefs(data),
      rules,
      menusProps,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
