<template>
  <el-dialog
    width="450px"
    :title="form.id ? '编辑' : '新增'"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable
    destroy-on-close>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <Collapse inactive-text="展开（非必填项）">
        <template #default>
          <el-form-item label="Logo" prop="logo">
            <ImageUploadSingle v-model="form.logo" />
          </el-form-item>
          <el-form-item label="描述" prop="describe">
            <el-input
              v-model="form.describe"
              type="textarea"
              placeholder="描述"
              maxlength="200"
              show-word-limit />
          </el-form-item>
        </template>
      </Collapse>
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
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'
import Collapse from '@/components/collapse/index.vue'
import ImageUploadSingle from '@/components/image-upload-single/index.vue'

import { infoApi, addApi, editApi } from '@/api/enterprise'

export default defineComponent({
  emits: ['refresh'],
  components: { Collapse, ImageUploadSingle },
  setup(_props, { emit }) {
    const refForm = ref()
    const data = reactive({
      loading: false,
      visible: false,
      form: {
        id: null,
        name: '',
        logo: '',
        describe: ''
      },
      roles: []
    })

    const rules = reactive(function() {
      return {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      if (id) {
        const r = await infoApi(id)
        if (r) {
          data.form.name = r.data.name
          data.form.logo = r.data.logo
          data.form.describe = r.data.describe
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
          const r = data.form.id ? await editApi(data.form) : await addApi(data.form)
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
