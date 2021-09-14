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
    width="850px"
    title="发送邮件"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
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
      <el-form-item label="发送类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">私发</el-radio>
          <el-radio :label="2">群发</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="收件人" prop="to_email" v-if="form.type === 1">
        <el-input
          v-model="form.to_email"
          placeholder="收件人"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="收件人" prop="to_emails" v-if="form.type === 2">
        <el-tag
          class="email-tag"
          v-for="item in form.to_emails"
          :key="item"
          closable
          :disable-transitions="false"
          @close="closeHandle(item)">
          {{item}}
        </el-tag>
        <el-input
          ref="refInput"
          v-if="inputVisible"
          v-model="inputValue"
          size="small"
          @keyup.enter="confirmHandle" />
        <el-button
          v-else
          icon="el-icon-plus"
          size="mini"
          @click="addHandle" />
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
import { defineComponent, reactive, ref, toRefs, nextTick } from 'vue'
import useInstance from '@/mixins/instance'
import Quill from '@/components/editor/quill/index.vue'
import { addApi } from '@/api/message/email'
import { isEmail } from '@/utils/regular'

export default defineComponent({
  emits: ['refresh'],
  components: { Quill },
  setup(_props, { emit }) {
    const { $message } = useInstance()

    const refForm = ref()
    const refQuill = ref()
    const refInput = ref()
    const data = reactive({
      visible: false,
      inputVisible: false,
      inputValue: '',
      form: {
        subject: '',
        content: '',
        enclosure: '',
        type: 1,
        to_email: '',
        to_emails: []
      }
    })

    const rules = reactive(function() {
      const checkEmail = (_rule, value, callback) => {
        if (value === '' || !isEmail(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        } else {
          callback()
        }
      }
      return {
        subject: [{ required: true, message: '请输入邮件标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入邮件内容', trigger: 'blur' }],
        to_email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        to_emails: [{ type: 'array', required: true, message: '请至少输入一个邮箱地址', trigger: 'blur' }]
      }
    }())

    const init = () => {
      data.visible = true
    }

    /**
     * @description: 群发添加邮箱
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const addHandle = () => {
      data.inputVisible = true
      nextTick(_ => {
        refInput.value.$refs.input.focus()
      })
    }

    /**
     * @description: 群发输入邮箱验证
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const confirmHandle = () => {
      let message = '请输入正确的邮箱!'
      if (isEmail(data.inputValue)) {
        if (!data.form.to_emails.includes(data.inputValue)) {
          data.form.to_emails.push(data.inputValue)
          data.inputValue = ''
          data.inputVisible = false
          return
        }
        message = '该邮箱已存在!'
      }
      $message({
        message: message,
        type: 'warning'
      })
      refInput.value.$refs.input.focus()
    }

    /**
     * @description: 删除群发邮箱
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const closeHandle = (email) => {
      data.form.to_emails.splice(data.form.to_emails.indexOf(email), 1)
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
          if (data.form.type === 1) {
            params.to_emails = []
          } else {
            params.to_email = ''
          }
          const r = await addApi(params)
          if (r) {
            data.visible = false
            $message({
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
      refInput,
      ...toRefs(data),
      rules,
      init,
      closeHandle,
      addHandle,
      confirmHandle,
      submit,
      dialogClosedHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.email-tag + .email-tag, .email-tag + .el-button {
  margin-left: 10px;
}
</style>
