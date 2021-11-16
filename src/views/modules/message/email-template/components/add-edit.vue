<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:59:35
-->
<template>
  <el-dialog
    width="800px"
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
      <el-form-item label="邮件标题" prop="subject">
        <el-input
          v-model="form.subject"
          placeholder="邮件标题"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="邮件内容" prop="content">
        <quill
          ref="refQuill"
          v-model="form.content"
          placeholder="输入邮件内容..." />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="备注"
          type="textarea"
          maxlength="100"
          show-word-limit />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button v-repeat type="primary" @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'

import { ElMessage } from 'element-plus'
import Quill from '@/components/editor/quill/index.vue'

import { addApi, editApi, infoApi } from '@/api/message/email-template'

export default defineComponent({
  emits: ['refresh'],
  components: { Quill },
  setup(_props, { emit }) {
    const refForm = ref()
    const refQuill = ref()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: null,
        subject: '',
        content: '',
        remark: ''
      }
    })

    const rules = reactive(function() {
      return {
        subject: [{ required: true, message: '请输入邮件标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入邮件内容', trigger: 'blur' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      if (data.form.id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.subject = r.data.subject
          data.form.content = r.data.content
          data.form.remark = r.data.remark
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
          params.content = refQuill.value.getEncodeHtml()
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
      refQuill,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
