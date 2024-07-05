<script setup>
import { ElMessage } from 'element-plus'

import { parseData2Tree } from '@utils'
import { Status } from '@enums'

import { infoApi, createApi, updateApi } from '@/api/package'
import { selectApi } from '@/api/menu'

const emits = defineEmits(['refresh'])

const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: false,
  value: 'id',
  label: `name`,
  children: 'children'
}

const refForm = ref()
const refCascader = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  name: '',
  remark: '',
  status: Status.ENABLE,
  menuIds: []
})
const rules = reactive({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  menuIds: [{ type: 'array', required: true, message: '请选择菜单', trigger: 'change' }]
})
const menus = ref([])

/**
 * 获取菜单
 */
const getMenuList = async () => {
  const r = await selectApi()
  if (r) {
    const list = [{
      id: 0,
      name: '一级菜单',
      parentId: 0,
      children: parseData2Tree(r.data)
    }]
    menus.value = list
  }
}

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  await getMenuList()
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { name, remark, status, menuIds } = r.data
      form.name = name
      form.remark = remark
      form.status = status
      form.menuIds = menuIds
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
      // 获取所有菜单ID
      const checkedNodes = refCascader.value.getCheckedNodes(true)
      const menuIds = []
      checkedNodes.forEach(item => {
        menuIds.push.apply(menuIds, item.pathValues)
      })
      form.menuIds = Array.from(new Set(menuIds)).filter(item => item !== 0)

      const r = form.id ? await updateApi(form) : await createApi(form)
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

<template>
  <el-dialog
    width="500px"
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
      label-width="80px"
      @keyup.enter="submit()">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="菜单权限" prop="menuIds">
        <el-cascader
          class="width-full"
          ref="refCascader"
          v-model="form.menuIds"
          :options="menus"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <DictRadio v-model="form.status" code="STATUS" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="备注"
          type="textarea"
          maxlength="200"
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
