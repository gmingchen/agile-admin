<!--
* @Description: 备份
* @Author: gumingchen
* @Email: 1240235512@qq.com
* @Date: 2022-06-17 04:43:51
* @LastEditors: gumingchen
* @LastEditTime: 2022-06-17 04:43:51
-->
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
      <el-form-item label="" prop="id">
        <el-input v-model="form.id" placeholder="" />
      </el-form-item>
      <el-form-item label="文件名" prop="name">
        <el-input v-model="form.name" placeholder="文件名" />
      </el-form-item>
      <el-form-item label="真实路径" prop="path">
        <el-input v-model="form.path" placeholder="真实路径" />
      </el-form-item>
      <el-form-item label="显示路径" prop="url">
        <el-input v-model="form.url" placeholder="显示路径" />
      </el-form-item>
      <el-form-item label="数据库名称" prop="database">
        <el-input v-model="form.database" placeholder="数据库名称" />
      </el-form-item>
      <el-form-item label="执行命令" prop="cmd">
        <el-input v-model="form.cmd" placeholder="执行命令" />
      </el-form-item>
      <el-form-item label="备份方式：1-手动 2-自动" prop="type">
        <el-input v-model="form.type" placeholder="备份方式：1-手动 2-自动" />
      </el-form-item>
      <el-form-item label="创建者" prop="creator">
        <el-input v-model="form.creator" placeholder="创建者" />
      </el-form-item>
      <el-form-item label="创建时间" prop="created_at">
        <el-input v-model="form.created_at" placeholder="创建时间" />
      </el-form-item>
      <el-form-item label="是否删除：0-否 1-是" prop="deleted">
        <el-input v-model="form.deleted" placeholder="是否删除：0-否 1-是" />
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
import { defineComponent, nextTick, reactive, ref, toRefs, onBeforeMount } from 'vue'

import { ElMessage } from 'element-plus'

import useDictionary from '@/mixins/dictionary'

import { infoApi, addApi, editApi } from '@/api/backup'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const refForm = ref()

    const { dictionaryList, getDictionary } = useDictionary()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: '',
        name: '',
        path: '',
        url: '',
        database: '',
        cmd: '',
        type: '',
        creator: '',
        created_at: '',
        deleted: ''
      }
    })

    const rules = reactive(function() {
      return {
        id: [{ required: true, message: '请输入', trigger: 'blur' }],
        name: [{ required: true, message: '请输入文件名', trigger: 'blur' }],
        path: [{ required: true, message: '请输入真实路径', trigger: 'blur' }],
        url: [{ required: true, message: '请输入显示路径', trigger: 'blur' }],
        database: [{ required: true, message: '请输入数据库名称', trigger: 'blur' }],
        cmd: [{ required: true, message: '请输入执行命令', trigger: 'blur' }],
        type: [{ required: true, message: '请输入备份方式：1-手动 2-自动', trigger: 'blur' }],
        creator: [{ required: true, message: '请输入创建者', trigger: 'blur' }],
        created_at: [{ required: true, message: '请输入创建时间', trigger: 'blur' }],
        deleted: [{ required: true, message: '请输入是否删除：0-否 1-是', trigger: 'blur' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      if (id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.id = r.data.id
          data.form.name = r.data.name
          data.form.path = r.data.path
          data.form.url = r.data.url
          data.form.database = r.data.database
          data.form.cmd = r.data.cmd
          data.form.type = r.data.type
          data.form.creator = r.data.creator
          data.form.created_at = r.data.created_at
          data.form.deleted = r.data.deleted
        }
      }
      nextTick(() => { data.loading = false })
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
          const r = data.form.id ? await editApi(params) : await addApi(params)
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

    onBeforeMount(() => {
      getDictionary('status')
    })

    return {
      refForm,
      dictionaryList,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
