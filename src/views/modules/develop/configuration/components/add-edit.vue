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
      <el-form-item label="键" prop="json_key">
        <el-input v-model="form.json_key" placeholder="键" />
      </el-form-item>
      <el-form-item label="Json值" prop="json_value">
        <el-input v-model="form.json_value" placeholder="Json值" type="textarea" />
        <!--
 <JsonEditorVue
          :mode-list="['code']"
          class="json-editor width-full"
          v-model="form.json_value"  />
-->
      </el-form-item>
      <el-form-item label="类型值" prop="type">
        <el-input-number
          v-model="form.type"
          :min="0"
          controls-position="right" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="item.value" v-for="item in dictionaryList" :key="item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注" type="textarea" />
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
import { nextTick, reactive, ref, onBeforeMount } from 'vue'

import { ElMessage } from 'element-plus'
// import JsonEditorVue from 'json-editor-vue3'

import useDictionary from '@/mixins/dictionary'

import { infoApi, addApi, editApi } from '@/api/configuration'

const emits = defineEmits(['refresh'])

const { dictionaryList, getDictionary } = useDictionary()

const refForm = ref()
const loading = ref(false)
const visible = ref(false)
const form = reactive({
  id: '',
  name: '',
  json_key: '',
  json_value: '',
  type: 0,
  remark: '',
  status: 0
})
const rules = reactive(function() {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    json_key: [{ required: true, message: '请输入键', trigger: 'blur' }],
    json_value: [{ required: true, message: '请输入Json值', trigger: 'blur' }],
    type: [{ required: true, message: '请输入类型值', trigger: 'blur' }]
  }
}())

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await infoApi(form.id)
    if (r) {
      form.id = r.data.id
      form.name = r.data.name
      form.json_key = r.data.json_key
      form.json_value = r.data.json_value // JSON.parse(r.data.json_value)
      form.type = r.data.type
      form.remark = r.data.remark
      form.status = r.data.status
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
        json_value: form.json_value // JSON.stringify(form.json_value)
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

onBeforeMount(() => {
  getDictionary('status')
})

defineExpose({
  init
})
</script>

<style lang="scss" scoped>
::v-deep(.json-editor) {
  .jsoneditor-sort, .jsoneditor-transform, .jsoneditor-repair, .jsoneditor-modes, .jsoneditor-poweredBy, .full-screen {
    display: none;
  }
}
</style>
