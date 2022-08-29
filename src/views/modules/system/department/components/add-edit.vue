<template>
  <el-dialog
    width="600px"
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
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="上级部门" prop="parent_id">
            <el-cascader
              class="width-full"
              ref="refParaentCascader"
              v-model="form.parent_id"
              :options="departments"
              :props="parentCascaderProps"
              :show-all-levels="false"
              collapse-tags
              collapse-tags-tooltip
              clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="负责人" prop="leader">
            <el-input v-model="form.leader" placeholder="负责人" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="form.mobile" placeholder="手机号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" :min="1" controls-position="right" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="item.value" v-for="item in statusDictionary.list" :key="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="备注" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="数据权限" prop="permission">
            <el-select v-model="form.permission" class="width-full">
              <el-option
                v-for="item in permissionDictionary.list"
                :key="item.value"
                :value="item.value"
                :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="form.permission === 4">
          <el-form-item label="自定义权限" prop="custom">
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
        </el-col>
      </el-row>
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
import { nextTick, reactive, ref, onBeforeMount } from 'vue'

import { ElMessage } from 'element-plus'

import useDictionary from '@/mixins/dictionary'

import { infoApi, addApi, editApi, selectListApi } from '@/api/department'

const emits = defineEmits(['refresh'])

const { getDictionary } = useDictionary()

const parentCascaderProps = {
  checkStrictly: true,
  value: 'id',
  label: `name`,
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
const refParaentCascader = ref()
const refPermissionCascader = ref()
const visible = ref(false)
const loading = ref(false)
const statusDictionary = ref({ map: {}, list: [] })
const permissionDictionary = ref({ map: {}, list: [] })
const departments = ref([])
const form = reactive({
  id: '',
  name: '',
  leader: '',
  mobile: '',
  permission: 0,
  custom: [],
  sort: 1,
  remark: '',
  status: 1,
  parent_id: ''
})
const rules = reactive(function() {
  const checkCustom = (_rule, value, callback) => {
    if (form.permission === 4 && (value.length < 1)) {
      callback(new Error('请选择自定义数据权限'))
    } else {
      callback()
    }
  }
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    custom: [{ validator: checkCustom, trigger: 'change' }]
  }
}())

const getDepartment = () => {
  selectListApi().then(r => {
    if (r) {
      departments.value = r.data
    }
  })
}

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  getDepartment()
  if (id) {
    const r = await infoApi(form.id)
    if (r) {
      form.id = r.data.id
      form.name = r.data.name
      form.leader = r.data.leader
      form.mobile = r.data.mobile
      form.permission = r.data.permission
      form.custom = r.data.custom ? r.data.custom.split(';').map(item => +item) : []
      form.sort = r.data.sort
      form.remark = r.data.remark
      form.status = r.data.status
      form.parent_id = r.data.parent_id
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
      if (params.parent_id) {
        const checkedNodes = refParaentCascader.value.getCheckedNodes()
        params.parent_id = checkedNodes.map(item => item.value).join(';')
      } else {
        params.parent_id = 0
      }
      if (params.permission === 4) {
        const checkedNodes = refPermissionCascader.value.getCheckedNodes()
        params.custom = checkedNodes.map(item => item.value).join(';')
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

/**
 * @description: 弹窗关闭动画结束时的回调
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const dialogClosedHandle = () => {
  refForm.value.resetFields()
}

onBeforeMount(async () => {
  statusDictionary.value = await getDictionary('status')
  permissionDictionary.value = await getDictionary('dataPermission')
})

defineExpose({
  init
})
</script>
