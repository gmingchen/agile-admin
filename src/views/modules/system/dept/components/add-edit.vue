<script setup>
import { ElMessage } from 'element-plus'

import { parseData2Tree } from '@utils'
import { Status } from '@enums'

import { infoApi, createApi, updateApi, selectApi } from '@/api/dept'
import { selectApi as adminerSelectApi } from '@/api/adminer'

const emits = defineEmits(['refresh'])

const cascaderProps = {
  checkStrictly: true,
  emitPath: false,
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
  leader: '',
  mobile: '',
  sort: 1,
  parentId: '',
  status: Status.ENABLE
})
const rules = reactive({
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
})
const depts = ref([])
const adminers = ref([])

const getDeptList = async () => {
  const r = await selectApi({ status: Status.ENABLE })
  if (r) {
    depts.value = parseData2Tree(r.data)
  }
}

const getAdminerList = async () => {
  const r = await adminerSelectApi()
  if (r) {
    adminers.value = r.data.map(item => ({
      value: item.id,
      label: item.nickname || item.username
    }))
  }
}

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  await getDeptList()
  await getAdminerList()
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { name, leader, mobile, sort, parentId, status } = r.data
      form.name = name
      form.leader = leader
      form.mobile = mobile
      form.sort = sort
      form.parentId = parentId
      form.status = status
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
      <el-form-item label="上级部门" prop="parentId">
        <el-cascader
          class="width-full"
          ref="refCascader"
          v-model="form.parentId"
          :options="depts"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-select
          class="width-full"
          v-model="form.leader"
          clearable>
          <el-option
            v-for="item in adminers"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="form.sort"
          :min="1"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <DictRadio v-model="form.status" code="STATUS" />
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
