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
      <el-form-item label="" prop="id">
        <el-input v-model="form.id" placeholder="" />
      </el-form-item>
      <el-form-item label="编码" prop="code">
        <el-input v-model="form.code" placeholder="编码" />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" />
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input v-model="form.describe" placeholder="描述" />
      </el-form-item>
      <el-form-item label="状态：0-禁用 1-启用" prop="status">
        <el-input v-model="form.status" placeholder="状态：0-禁用 1-启用" />
      </el-form-item>
      <el-form-item label="创建者" prop="creator">
        <el-input v-model="form.creator" placeholder="创建者" />
      </el-form-item>
      <el-form-item label="创建时间" prop="created_at">
        <el-input v-model="form.created_at" placeholder="创建时间" />
      </el-form-item>
      <el-form-item label="更新者" prop="updater">
        <el-input v-model="form.updater" placeholder="更新者" />
      </el-form-item>
      <el-form-item label="更新时间" prop="updated_at">
        <el-input v-model="form.updated_at" placeholder="更新时间" />
      </el-form-item>
      <el-form-item label="" prop="deleted">
        <el-input v-model="form.deleted" placeholder="" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false" />
        <el-button
          v-repeat
          type="primary"
          @click="submit()" />
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
        describe: '',
        status: '',
        creator: '',
        created_at: '',
        updater: '',
        updated_at: '',
        deleted: ''
      }
    })

    const rules = reactive(function() {
      return {
        id: [{ required: true, message: '请输入', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        describe: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        status: [{ required: true, message: '请输入状态：0-禁用 1-启用', trigger: 'blur' }],
        creator: [{ required: true, message: '请输入创建者', trigger: 'blur' }],
        createdAt: [{ required: true, message: '请输入创建时间', trigger: 'blur' }],
        updater: [{ required: true, message: '请输入更新者', trigger: 'blur' }],
        updatedAt: [{ required: true, message: '请输入更新时间', trigger: 'blur' }],
        deleted: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      if (data.form.id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.id = r.data.id
          data.form.code = r.data.code
          data.form.name = r.data.name
          data.form.describe = r.data.describe
          data.form.status = r.data.status
          data.form.creator = r.data.creator
          data.form.created_at = r.data.created_at
          data.form.updater = r.data.updater
          data.form.updated_at = r.data.updated_at
          data.form.deleted = r.data.deleted
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
