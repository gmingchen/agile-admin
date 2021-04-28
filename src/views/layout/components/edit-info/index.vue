<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-04-21 18:50:35
-->
<template>
  <el-dialog
    width="500px"
    :title="$t('button.edit')"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      ref="formR"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item :label="$t('field.account')">
        <el-input v-model="user.username" :placeholder="$t('field.account')" readonly />
      </el-form-item>
      <el-form-item :label="$t('field.nickname')" prop="nickname">
        <el-input v-model="form.nickname" :placeholder="$t('field.nickname')" />
      </el-form-item>
      <el-form-item :label="$t('field.mobile')" prop="mobile">
        <el-input v-model="form.mobile" :placeholder="$t('field.mobile')" />
      </el-form-item>
      <el-form-item :label="$t('field.email')" prop="email">
        <el-input v-model="form.email" :placeholder="$t('field.email')" />
      </el-form-item>
      <el-form-item :label="$t('field.oldPassword')" prop="oldPassword">
        <el-input v-model="form.oldPassword" :placeholder="$t('field.oldPassword')" show-password />
      </el-form-item>
      <el-form-item :label="$t('field.newPassword')" prop="newPassword">
        <el-input v-model="form.newPassword" :placeholder="$t('field.newPassword')" show-password />
      </el-form-item>
      <el-form-item :label="$t('field.confirmPassword')" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" :placeholder="$t('field.confirmPassword')" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="submit()">{{ $t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { namespace } from 'vuex-class'
import { isEmail, isMobile } from '@/utils/regular'
import { editUserInfo, getUserInfo } from '@/api/login'
import { IObject } from '@/types'
import { User } from '@/types/user'

const userModule = namespace('user')

export default class extends Vue {
  @userModule.State('user')
  readonly user!: User.Vo

  @userModule.Action('setUser')
  setUser!: (arg: User.Vo) => void

  protected visible: boolean = false

  protected form = {
    nickname: '',
    mobile: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  get rules(): IObject {
    const checkMobile = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
      if (this.form.mobile !== '' && !isMobile(value)) {
        callback(new Error(this.$t('rule.incorrect', [this.$t('field.mobile')])))
      } else {
        callback()
      }
    }
    const checkEmail = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
      if (this.form.email !== '' && !isEmail(value)) {
        callback(new Error(this.$t('rule.incorrect', [this.$t('field.email')])))
      } else {
        callback()
      }
    }
    const checkOldPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
      if (this.form.newPassword !== '' && value === '') {
        callback(new Error(this.$t('rule.notBlank', [this.$t('field.oldPassword')])))
      } else {
        callback()
      }
    }
    const checkConfirmPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
      if (this.form.newPassword !== value) {
        callback(new Error(this.$t('rule.notConsistent', [this.$t('field.confirmPassword'), this.$t('field.newPassword')])))
      } else {
        callback()
      }
    }
    const rules = {
      nickname: [{ required: true, message: this.$t('rule.notBlank', [this.$t('field.nickname')]), trigger: 'blur' }],
      mobile: [{ validator: checkMobile, trigger: 'blur' }],
      email: [{ validator: checkEmail, trigger: 'blur' }],
      oldPassword: [{ validator: checkOldPassword, trigger: 'blur' }],
      confirmPassword: [{ validator: checkConfirmPassword, trigger: 'blur' }]
    }
    this.$nextTick(() => {
      this.$refs.formR.clearValidate()
    })
    return rules
  }

  init(): void {
    this.visible = true
    this.form.nickname = this.user.nickname
    this.form.mobile = this.user.mobile
    this.form.email = this.user.email
  }

  /**
   * @description: 表单验证提交
   * @param {*}
   * @return {*}
   * @author: gumingchen
   */
  submit(): void {
    this.$refs.formR.validate(async (valid: boolean) => {
      if (valid) {
        const params = {
          nickname: this.form.nickname,
          mobile: this.form.mobile,
          email: this.form.email,
          old_password: this.form.oldPassword,
          new_password: this.form.newPassword
        }
        const r = await editUserInfo(params)
        if (r) {
          this.visible = false
          this.$message({
            message: this.$t('tip.success'),
            type: 'success',
            onClose: () => {
              if (r.data === 1) {
                this.$router.replace({ name: 'login' })
              } else {
                getUserInfo().then(res => {
                  if (res && res.code === 0) {
                    this.setUser(res.data)
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
  dialogClosedHandle(): void {
    this.$refs['formR'].resetFields()
  }
}
</script>
