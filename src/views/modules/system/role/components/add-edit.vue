<template>
  <el-dialog
    width="450px"
    :title="form.id ? '编辑' : '新增'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="角色名称"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="备注"
          maxlength="100"
          show-word-limit />
      </el-form-item>
      <el-form-item label="权限" prop="enterprise_menu_ids">
        <el-cascader
          class="width-full"
          ref="refCascader"
          v-model="form.enterprise_menu_ids"
          :options="menus"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          v-repeat
          type="primary"
          @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'

import { optionListApi } from '@/api/enterprise-menu'
import { infoApi, addApi, editApi } from '@/api/role'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const refForm = ref()
    const refCascader = ref()

    const data = reactive({
      loading: false,
      visible: false,
      form: {
        id: null,
        name: '',
        remark: '',
        enterprise_menu_ids: []
      },
      menus: []
    })

    const rules = reactive(function() {
      return {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        enterprise_menu_ids: [{ type: 'array', required: true, message: '请选择权限', trigger: 'blur' }]
      }
    }())

    const cascaderProps = computed(() => {
      const reuslt = {
        multiple: true,
        emitPath: false,
        checkStrictly: false,
        value: 'id',
        label: `name_cn`,
        children: 'children'
      }
      return reuslt
    })

    const getEnterpriseMenu = async () => {
      const r = await optionListApi()
      if (r) {
        const list = [{
          id: 0,
          name_cn: '一级菜单',
          name_en: 'First level menu',
          parent_id: 0,
          children: r.data
        }]
        data.menus = list
      }
    }

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id

      await getEnterpriseMenu()
      if (id) {
        const r = await infoApi(id)
        if (r) {
          data.form.name = r.data.name
          data.form.remark = r.data.remark
          data.form.enterprise_menu_ids = r.data.enterprise_menu_ids
        }
      }

      nextTick(() => { data.loading = false })
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
          // 处理已选 菜单 权限
          const checkedNodes = refCascader.value.getCheckedNodes(true)
          const enterpriseMenuIds = []
          checkedNodes.forEach(item => {
            enterpriseMenuIds.push.apply(enterpriseMenuIds, item.pathValues)
          })
          data.form.enterprise_menu_ids = Array.from(new Set(enterpriseMenuIds)).filter(item => item !== 0)
          const r = data.form.id ? await editApi(data.form) : await addApi(data.form)
          if (r) {
            data.visible = false
            ElMessage({
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
      cascaderProps,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
