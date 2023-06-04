<script setup>
import { ElMessage } from 'element-plus'

import { parseData2Tree } from '@/utils'
import { DataPermission, Status } from '@/utils/enum'

import { infoApi, selectApi, setDataPermissionApi } from '@/api/dept'

const emits = defineEmits(['refresh'])

const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: true,
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
  dataScope: DataPermission.ALL,
  dataScopeDeptIds: []
})
const rules = reactive({
  dataScopeDeptIds: [{
    validator: (_rule, value, callback) => {
      if (form.dataScope === DataPermission.CUSTOM && (!value || !value.length)) {
        callback(new Error('请选择部门'))
      }
      callback()
    },
    trigger: 'change'
  }]
})
const depts = ref([])

/**
 * 获取菜单
 */
const getDeptList = async () => {
  const r = await selectApi({ status: Status.ENABLE })
  if (r) {
    depts.value = parseData2Tree(r.data)
  }
}

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  getDeptList()
  const r = await infoApi({ id })
  if (r) {
    const { name, dataScope, dataScopeDeptIds } = r.data
    form.name = name
    form.dataScope = dataScope
    form.dataScopeDeptIds = dataScopeDeptIds
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
      const params = {
        id: form.id,
        dataScope: form.dataScope,
        dataScopeDeptIds: form.dataScope === DataPermission.CUSTOM ? form.dataScopeDeptIds : null
      }
      const r = await setDataPermissionApi(params)
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
    title="设置数据权限"
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
        <el-input v-model="form.name" placeholder="名称" readonly />
      </el-form-item>
      <el-form-item label="权限范围" prop="dataScope">
        <DictSelect
          v-model="form.dataScope"
          code="DATA_PERMISSION"
          placeholder="状态"
          :search="false" />
      </el-form-item>
      <el-form-item label="部门" prop="dataScopeDeptIds" v-show="form.dataScope === DataPermission.CUSTOM">
        <el-cascader
          class="width-full"
          ref="refCascader"
          v-model="form.dataScopeDeptIds"
          :options="depts"
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
