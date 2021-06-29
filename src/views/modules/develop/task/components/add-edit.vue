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
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="Bean名称" prop="bean_name">
        <el-input v-model="form.bean_name" placeholder="Bean名称" />
      </el-form-item>
      <el-form-item label="Cron表达式" prop="cron_expression">
        <el-input v-model="form.cron_expression" placeholder="Cron表达式" />
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input v-model="form.params" placeholder="参数" />
      </el-form-item>
      <el-form-item label="备注" prop="params">
        <el-input v-model="form.remark" placeholder="备注" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <gl-button sort="cancel" @click="visible = false" />
        <gl-button
          sort="confirm"
          v-repeat
          type="primary"
          @click="submit()" />
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import useInstance from '@/mixins/instance'
import { addApi, editApi, infoApi } from '@/api/develop/task'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, { emit }) {
    const { $message } = useInstance()

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      form: {
        id: null,
        bean_name: '',
        cron_expression: '',
        params: '',
        remark: '',
        status: 1
      }
    })

    const rules = reactive(function() {
      return {
        bean_name: [{ required: true, message: '请输入Bean名称', trigger: 'blur' }],
        cron_expression: [{ required: true, message: '请输入Cron表达式', trigger: 'blur' }]
      }
    }())

    const init = async (id) => {
      data.visible = true
      data.loading = true
      data.form.id = id
      if (data.form.id) {
        const r = await infoApi(data.form.id)
        if (r) {
          data.form.bean_name = r.data.bean_name
          data.form.cron_expression = r.data.cron_expression
          data.form.params = r.data.params
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
          const r = !data.form.id ? await addApi(data.form) : await editApi(data.form)
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
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle
    }
  }
})
</script>
