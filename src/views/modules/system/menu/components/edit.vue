<template>
  <el-dialog
    width="450px"
    title="编辑"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="中文名称" prop="name_cn">
        <el-input
          v-model="form.name_cn"
          placeholder="中文名称"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <el-form-item label="英文名称" prop="name_en">
        <el-input
          v-model="form.name_en"
          placeholder="英文名称"
          maxlength="30"
          show-word-limit />
      </el-form-item>
      <el-form-item label="图标" prop="icon" v-if="row.type == 0 || row.type == 1">
        <IconSelectInput v-model="form.icon" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="1" controls-position="right" />
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
import { reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'
import IconSelectInput from '@/components/icon-select-input/index.vue'

import { updateApi } from '@/api/enterprise-menu'

const refForm = ref()
const visible = ref(false)
const form = reactive({
  id: null,
  name_cn: '',
  name_en: '',
  icon: '',
  sort: ''
})
const row = ref(null)
const rules = reactive(function() {
  return {
    name_cn: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
    name_en: [{ required: true, message: '请输入英文名称', trigger: 'blur' }],
    icon: [{ required: true, message: '请选择图标', trigger: 'blur' }]
  }
}())

const init = (val) => {
  visible.value = true
  row.value = val // todo: 引用传递 用于编辑之后修改 列表数据
  form.id = val.id
  form.name_cn = val.name_cn
  form.name_en = val.name_en
  form.icon = val.icon
  form.sort = val.sort
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const submit = () => {
  refForm.value.validate(valid => {
    if (valid) {
      updateApi(form).then(r => {
        if (r) {
          ElMessage({
            message: '操作成功!',
            type: 'success'
          })
          row.value.name_cn = form.name_cn
          row.value.name_en = form.name_en
          row.value.icon = form.icon
          row.value.sort = form.sort
          visible.value = false
        }
      })
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
