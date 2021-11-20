<!--
* @Description: 数据字典-主表
* @Author: slipper
* @Email: 1240235512@qq.com
* @Date: 2021-11-19 05:02:48
* @LastEditors: slipper
* @LastEditTime: 2021-11-19 05:02:48
-->
<template>
  <el-dialog
    width="500px"
    :title="!form.id ? '新增' : '编辑'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      v-loading="loading"
      ref="refForm"
      label-position="top">
      <el-form-item label="编码" prop="code">
        <el-input v-model="form.code" placeholder="编码" maxlength="32" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="32" />
      </el-form-item>
      <el-form-item label="描述" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="描述"
          type="textarea"
          maxlength="100" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
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

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'

import { addApi, editApi, infoApi } from '@/api/develop/dictionary'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: '',
        code: '',
        name: '',
        remark: '',
        status: 0
      }
    })

    const rules = reactive(function() {
      return {
        id: [{ required: true, message: '请输入', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      if (data.form.id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.code = r.data.code
          data.form.name = r.data.name
          data.form.remark = r.data.remark
          data.form.status = r.data.status
        }
      }
      nextTick(() => {
        data.loading = false
      })
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
          const params = { ...data.form }
          const r = !data.form.id ? await addApi(params) : await editApi(params)
          if (r) {
            data.visible = false
            ElMessage({
              message: '操作成功!',
              type: 'success'
            })
            emit('refresh')
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

    return {
      refForm,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
