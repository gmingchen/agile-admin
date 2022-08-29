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
      <el-form-item label="数据权限" prop="permission">
        <el-select v-model="form.permission" class="width-full">
          <el-option
            v-for="item in dictionaryList"
            :key="item.value"
            :value="item.value"
            :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item label="自定义权限" prop="custom" v-show="form.permission === 4">
        <el-cascader
          class="width-full"
          ref="refPermissionCascader"
          v-model="form.custom"
          :options="departments"
          :props="permissionCascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="备注"
          maxlength="100"
          show-word-limit />
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
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'

import useDictionary from '@/mixins/dictionary'

import { selectListApi } from '@/api/enterprise-menu'
import { selectListApi as departmentSelectApi } from '@/api/department'
import { infoApi, addApi, editApi } from '@/api/role'

const emits = defineEmits(['refresh'])

const { dictionaryList, getDictionary } = useDictionary()

const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: false,
  value: 'id',
  label: `name_cn`,
  children: 'children'
}
const permissionCascaderProps = {
  multiple: true,
  checkStrictly: true,
  value: 'id',
  label: `name`,
  children: 'children'
}
const refForm = ref()
const refCascader = ref()
const refPermissionCascader = ref()
const loading = ref(false)
const visible = ref(false)
const departments = ref([])
const form = reactive({
  id: null,
  name: '',
  permission: '',
  custom: [],
  remark: '',
  enterprise_menu_ids: []
})
const menus = ref([])
const rules = reactive(function() {
  const checkCustom = (_rule, value, callback) => {
    if (form.permission === 4 && (value.length < 1)) {
      callback(new Error('请选择自定义数据权限'))
    } else {
      callback()
    }
  }
  return {
    name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
    custom: [{ validator: checkCustom, trigger: 'change' }],
    enterprise_menu_ids: [{ type: 'array', required: true, message: '请选择权限', trigger: 'blur' }]
  }
}())

const getEnterpriseMenu = async () => {
  const r = await selectListApi()
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

const getDepartment = async () => {
  const r = await departmentSelectApi({ status: 1 })
  if (r) {
    departments.value = r.data
  }
}

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id

  await getEnterpriseMenu()
  await getDepartment()
  if (id) {
    const r = await infoApi(id)
    if (r) {
      form.name = r.data.name
      form.permission = r.data.permission
      form.custom = r.data.custom ? r.data.custom.split(';').map(item => +item) : []
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
      const params = { ...form }
      // 处理已选 菜单 权限
      const checkedNodes = refCascader.value.getCheckedNodes(true)
      const enterpriseMenuIds = []
      checkedNodes.forEach(item => {
        enterpriseMenuIds.push.apply(enterpriseMenuIds, item.pathValues)
      })
      params.enterprise_menu_ids = Array.from(new Set(enterpriseMenuIds)).filter(item => item !== 0)
      if (params.permission === 4) {
        const departmentCheckedNodes = refPermissionCascader.value.getCheckedNodes()
        params.custom = departmentCheckedNodes.map(item => item.value).join(';')
      } else {
        params.custom = ''
      }
      const r = form.id ? await editApi(params) : await addApi(params)
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

onBeforeMount(() => {
  getDictionary('dataPermission')
})

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
