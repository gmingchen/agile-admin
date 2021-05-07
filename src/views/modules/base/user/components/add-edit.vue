<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-29 14:11:28
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
      ref="formR"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item :label="t('field.account')" prop="username">
        <el-input v-model="form.username" :placeholder="t('field.account')" />
      </el-form-item>
      <el-form-item :label="t('field.nickname')" prop="nickname">
        <el-input v-model="form.nickname" :placeholder="t('field.nickname')" />
      </el-form-item>
      <el-form-item :label="t('field.password')" prop="password">
        <el-input v-model="form.password" :placeholder="t('field.password')" show-password />
      </el-form-item>
      <el-form-item :label="t('field.confirmPassword')" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" :placeholder="t('field.confirmPassword')" show-password />
      </el-form-item>
      <el-form-item :label="t('field.mobile')" prop="mobile">
        <el-input v-model="form.mobile" :placeholder="t('field.mobile')" />
      </el-form-item>
      <el-form-item :label="t('field.email')" prop="email">
        <el-input v-model="form.email" :placeholder="t('field.email')" />
      </el-form-item>
      <el-form-item :label="t('base.role.roleName')" size="mini" prop="role_ids">
        <el-checkbox-group v-model="form.role_ids">
          <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="t('field.state')" size="mini" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">{{ t('button.disable') }}</el-radio>
          <el-radio :label="1">{{ t('button.enable') }}</el-radio>
        </el-radio-group>
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
import { isEmail, isMobile } from '@/utils/regular'
import { add, edit, getInfo } from '@/api/base/user'
import { getSelect } from '@/api/base/role'

import { User } from 'Type/user'
import { Role } from 'Type/role'

export default defineComponent({
  emits: ['refresh'],
  setup(_props, ctx) {
    const { t } = useI18n()
    const { $message } = useInstance()

    const refForm = ref()
    const data = reactive({
      visible: false,
      loading: false,
      roles: [] as Role.Simple[],
      form: {
        id: null,
        username: '',
        nickname: '',
        password: '',
        mobile: '',
        email: '',
        status: 0,
        role_ids: [],
        confirmPassword: ''
      } as User.Dto
    })

    const rules = computed(() => {
      const checkMobile = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
        if (data.form.mobile !== '' && !isMobile(value)) {
          callback(new Error(t('rule.incorrect', [t('field.mobile')])))
        } else {
          callback()
        }
      }
      const checkEmail = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
        if (data.form.email !== '' && !isEmail(value)) {
          callback(new Error(t('rule.incorrect', [t('field.email')])))
        } else {
          callback()
        }
      }
      const checkConfirmPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
        if (data.form.password !== value) {
          callback(new Error(t('rule.notConsistent', [t('field.confirmPassword'), t('field.password')])))
        } else {
          callback()
        }
      }
      const rule = {
        username: [{ required: true, message: t('rule.notBlank', [t('field.account')]), trigger: 'blur' }],
        nickname: [{ required: true, message: t('rule.notBlank', [t('field.nickname')]), trigger: 'blur' }],
        password: [{ required: true, message: t('rule.notBlank', [t('field.password')]), trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: t('rule.notBlank', [t('field.confirmPassword')]), trigger: 'blur' },
          { validator: checkConfirmPassword, trigger: 'blur' }
        ],
        mobile: [{ validator: checkMobile, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }]
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
      const res = await getSelect()
      if (res) {
        data.roles = res.data
      }
      if (data.form.id) {
        const r = await getInfo(data.form.id)
        if (r) {
          data.form.username = r.data.username
          data.form.nickname = r.data.username
          data.form.mobile = r.data.mobile
          data.form.email = r.data.email
          data.form.status = r.data.status
          data.form.role_ids = r.data.roles!.map(item => {
            return item.id
          })
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
          const r = !data.form.id ? await add(data.form) : await edit(data.form)
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
