
<script setup>
import { ElMessage } from 'element-plus'
import Region from '@/components/region/index.vue'

import { isInteger } from '@utils/regular'

import { infoApi, createApi, updateApi } from '@/api/region'

const emits = defineEmits(['refresh'])

const refForm = ref()
const refRegion = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: null,
  name: '',
  code: '',
  level: '',
  parentId: ''
})
const rules = reactive(function() {
  const checkCode = (_rule, value, callback) => {
    if (!isInteger(value)) {
      callback(new Error('请输入整数'))
    } else {
      callback()
    }
  }
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    code: [
      { required: true, message: '请输入区域编码', trigger: 'blur' },
      { validator: checkCode, trigger: 'blur' }
    ],
    parentId: [{ required: true, message: '请选择上级', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id

  if (id) {
    const r = await infoApi({ id })
    if (r) {
      form.id = r.data.id
      form.name = r.data.name
      form.code = r.data.code
      form.level = r.data.level
      form.parentId = r.data.parentId
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
      const params = {
        ...form,
        level: refRegion.value.getCheckedNodes().level + 1
      }
      const r = form.id ? await updateApi(params) : await createApi(params)
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
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="编号" prop="code">
        <el-input v-model="form.code" placeholder="编号" />
      </el-form-item>
      <el-form-item label="上级" prop="parentId">
        <Region ref="refRegion" v-model="form.parentId" />
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
