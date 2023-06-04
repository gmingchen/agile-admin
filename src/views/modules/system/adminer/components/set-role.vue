<script setup>
import { ElMessage } from 'element-plus'

import { parseData2Tree } from '@/utils'
import { DataPermission, Status } from '@/utils/enum'

import { infoApi, setRoleApi } from '@/api/adminer'
import { selectApi } from '@/api/role'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  username: '',
  nickname: '',
  roleIds: []
})
const rules = reactive({
  roleIds: [{ type: 'array', min: 1, message: '请选择角色', trigger: 'change' }]
})
const roles = ref([])

/**
 * 获取菜单
 */
const getRoleList = async () => {
  const r = await selectApi()
  if (r) {
    roles.value = r.data
  }
}

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  await getRoleList()
  const r = await infoApi({ id })
  if (r) {
    const { username, nickname, roleIds } = r.data
    form.username = username
    form.nickname = nickname
    form.roleIds = roleIds
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
        roleIds: form.roleIds
      }
      const r = await setRoleApi(params)
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
    title="分配角色"
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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="用户名" readonly />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="昵称" readonly />
      </el-form-item>
      <el-form-item label="角色" prop="roleIds">
        <el-checkbox-group v-model="form.roleIds">
          <el-checkbox
            v-for="item in roles"
            :key="item.id"
            :label="item.id">
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>
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
