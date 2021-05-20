<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-20 15:49:50
-->
<template>
  <el-dialog
    width="500px"
    :title="t('button.edit')"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item :label="t('field.account')">
        <el-input v-model="user.username" :placeholder="t('field.account')" readonly />
      </el-form-item>
      <el-form-item :label="t('field.nickname')" prop="nickname">
        <el-input v-model="form.nickname" :placeholder="t('field.nickname')" />
      </el-form-item>
      <el-form-item :label="t('field.mobile')" prop="mobile">
        <el-input v-model="form.mobile" :placeholder="t('field.mobile')" />
      </el-form-item>
      <el-form-item :label="t('field.email')" prop="email">
        <el-input v-model="form.email" :placeholder="t('field.email')" />
      </el-form-item>
      <el-form-item :label="t('field.oldPassword')" prop="oldPassword">
        <el-input v-model="form.oldPassword" :placeholder="t('field.oldPassword')" show-password />
      </el-form-item>
      <el-form-item :label="t('field.newPassword')" prop="newPassword">
        <el-input v-model="form.newPassword" :placeholder="t('field.newPassword')" show-password />
      </el-form-item>
      <el-form-item :label="t('field.confirmPassword')" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" :placeholder="t('field.confirmPassword')" show-password />
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
import { computed, defineComponent, nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { key, useStore } from '@/store'
import { useI18n } from 'vue-i18n'
import useInstance from '@/mixins/instance'
import { isEmail, isMobile } from '@/utils/regular'
import { editUserInfoApi, userInfoApi } from '@/api/login'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore(key)
    const { t } = useI18n()
    const { $message } = useInstance()

    const user = computed(() => store.state.user.user)

    const visible = ref(false)
    const refForm = ref()
    const form = reactive({
      nickname: '',
      mobile: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    const rules = computed(() => {
      const checkMobile = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
        if (form.mobile !== '' && !isMobile(value)) {
          callback(new Error(t('rule.incorrect', [t('field.mobile')])))
        } else {
          callback()
        }
      }
      const checkEmail = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
        if (form.email !== '' && !isEmail(value)) {
          callback(new Error(t('rule.incorrect', [t('field.email')])))
        } else {
          callback()
        }
      }
      const checkOldPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
        if (form.newPassword !== '' && value === '') {
          callback(new Error(t('rule.notBlank', [t('field.oldPassword')])))
        } else {
          callback()
        }
      }
      const checkConfirmPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
        if (form.newPassword !== value) {
          callback(new Error(t('rule.notConsistent', [t('field.confirmPassword'), t('field.newPassword')])))
        } else {
          callback()
        }
      }
      const rule = {
        nickname: [{ required: true, message: t('rule.notBlank', [t('field.nickname')]), trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        oldPassword: [{ validator: checkOldPassword, trigger: 'blur' }],
        confirmPassword: [{ validator: checkConfirmPassword, trigger: 'blur' }]
      }
      nextTick(() => {
        refForm.value.clearValidate()
      })
      return rule
    })

    /**
     * @description: 表单验证提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = (): void => {
      refForm.value.validate(async (valid: boolean) => {
        if (valid) {
          const params = {
            nickname: form.nickname,
            mobile: form.mobile,
            email: form.email,
            old_password: form.oldPassword,
            new_password: form.newPassword
          }
          const r = await editUserInfoApi(params)
          if (r) {
            visible.value = false
            $message({
              message: t('tip.success'),
              type: 'success',
              onClose: () => {
                if (r.data === 1) {
                  router.replace({ name: 'login' })
                } else {
                  userInfoApi().then(res => {
                    if (res && res.code === 0) {
                      store.dispatch('user/setUser', res.data)
                    }
                  })
                }
              }
            })
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

    const init = (): void => {
      visible.value = true
      form.nickname = user.value.nickname
      form.mobile = user.value.mobile
      form.email = user.value.email
    }

    return {
      user,
      refForm,
      visible,
      form,
      rules,
      init,
      submit,
      dialogClosedHandle,
      t
    }
  }
})
</script>
