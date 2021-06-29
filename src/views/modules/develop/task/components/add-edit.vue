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
    :title="t(!form.id ? 'button.add' : 'button.edit')"
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
      <el-form-item :label="t('field.fullName', ['Bean'])" prop="bean_name">
        <el-input v-model="form.bean_name" :placeholder="t('field.fullName', ['Bean'])" />
      </el-form-item>
      <el-form-item :label="t('base.task.expression', ['Cron'])" prop="cron_expression">
        <el-input v-model="form.cron_expression" :placeholder="t('base.task.expression', ['Cron'])" />
      </el-form-item>
      <el-form-item :label="t('base.task.parameter')" prop="params">
        <el-input v-model="form.params" :placeholder="t('base.task.parameter')" />
      </el-form-item>
      <el-form-item :label="t('field.remark')" prop="params">
        <el-input v-model="form.remark" :placeholder="t('field.remark')" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">{{ t('button.cancel') }}</el-button>
        <el-button type="primary" @click="submit()">{{ t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import useInstance from '@/mixins/instance'
import { addApi, editApi, infoApi } from '@/api/develop/task'

import { Task } from 'Type/task'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, ctx) {
    const { t } = useI18n()
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
      } as Task.Base
    })

    const rules = computed(() => {
      const rule = {
        bean_name: [{ required: true, message: t('rule.notBlank', [t('field.fullName', ['Bean'])]), trigger: 'blur' }],
        cron_expression: [{ required: true, message: t('rule.notBlank', [t('base.task.expression', ['Cron'])]), trigger: 'blur' }]
      }
      nextTick(() => {
        refForm.value.clearValidate()
      })
      return rule
    })

    const init = async (id?: number): Promise<void> => {
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
    const submit = (): void => {
      refForm.value.validate(async (valid: boolean) => {
        if (valid) {
          const r = !data.form.id ? await addApi(data.form) : await editApi(data.form)
          if (r) {
            data.visible = false
            $message({
              message: t('tip.success'),
              type: 'success'
            })
            ctx.emit('refresh')
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
    const dialogClosedHandle = (): void => {
      refForm.value.resetFields()
    }

    return {
      refForm,
      ...toRefs(data),
      rules,
      init,
      submit,
      dialogClosedHandle,
      t
    }
  }
})
</script>
