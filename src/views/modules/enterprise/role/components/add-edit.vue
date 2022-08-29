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

<script setup>
import { nextTick, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'

import { globalSelectListApi } from '@/api/enterprise-menu'
import { globalInfoApi, globalAddApi, globalEditApi } from '@/api/role'

const emits = defineEmits(['refresh'])

const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: false,
  value: 'id',
  label: `name_cn`,
  children: 'children'
}
const refForm = ref()
const refCascader = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  id: null,
  name: '',
  remark: '',
  enterprise_menu_ids: [],
  enterprise_id: ''
})
const menus = ref([])
const rules = reactive(function() {
  return {
    name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    enterprise_menu_ids: [{ type: 'array', required: true, message: '请选择权限', trigger: 'blur' }]
  }
}())

const getEnterpriseMenu = async () => {
  const r = await globalSelectListApi(form.enterprise_id)
  if (r) {
    const list = [{
      id: 0,
      name_cn: '一级菜单',
      name_en: 'First level menu',
      parent_id: 0,
      children: r.data
    }]
    menus.value = list
  }
}

const init = async (enterpriseId, id) => {
  visible.value = true
  loading.value = true
  form.enterprise_id = enterpriseId
  form.id = id

  await getEnterpriseMenu()
  if (id) {
    const r = await globalInfoApi(id)
    if (r) {
      form.name = r.data.name
      form.remark = r.data.remark
      form.enterprise_menu_ids = r.data.enterprise_menu_ids
    }
  }

  nextTick(() => { loading.value = false })
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
      form.enterprise_menu_ids = Array.from(new Set(enterpriseMenuIds)).filter(item => item !== 0)
      const r = form.id ? await globalEditApi(form) : await globalAddApi(form)
      if (r) {
        visible.value = false
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        emits('refresh')
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

defineExpose({
  init
})
</script>
