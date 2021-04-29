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
    :title="$t(!form.id ? 'button.add' : 'button.edit')"
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
      <el-form-item :label="$t('field.account')" prop="username">
        <el-input v-model="form.username" :placeholder="$t('field.account')" />
      </el-form-item>
      <el-form-item :label="$t('field.nickname')" prop="nickname">
        <el-input v-model="form.nickname" :placeholder="$t('field.nickname')" />
      </el-form-item>
      <el-form-item :label="$t('field.password')" prop="password">
        <el-input v-model="form.password" :placeholder="$t('field.password')" show-password />
      </el-form-item>
      <el-form-item :label="$t('field.confirmPassword')" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" :placeholder="$t('field.confirmPassword')" show-password />
      </el-form-item>
      <el-form-item :label="$t('field.mobile')" prop="mobile">
        <el-input v-model="form.mobile" :placeholder="$t('field.mobile')" />
      </el-form-item>
      <el-form-item :label="$t('field.email')" prop="email">
        <el-input v-model="form.email" :placeholder="$t('field.email')" />
      </el-form-item>
      <el-form-item :label="$t('base.role.roleName')" size="mini" prop="role_ids">
        <el-checkbox-group v-model="form.role_ids">
          <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">{{ role.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('field.state')" size="mini" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="0">{{ $t('button.disable') }}</el-radio>
          <el-radio :label="1">{{ $t('button.enable') }}</el-radio>
        </el-radio-group>
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
import { Options, Vue } from 'vue-class-component'
import { add, edit, info } from '@/api/base/user'
import { select } from '@/api/base/role'
import { isEmail, isMobile } from '@/utils/regular'
import { IObject } from '@/types'
import { User } from '@/types/user'
import { Role } from '@/types/role'

@Options({
  emits: ['refresh']
})
export default class extends Vue {
  protected visible: boolean = false
  protected loading: boolean = false

  protected roles: Role.Simple[] = []
  protected form: User.Dto = {
    id: null,
    username: '',
    nickname: '',
    password: '',
    mobile: '',
    email: '',
    status: 0,
    role_ids: [],
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
    const checkConfirmPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void): void => {
      if (this.form.password !== value) {
        callback(new Error(this.$t('rule.notConsistent', [this.$t('field.confirmPassword'), this.$t('field.password')])))
      } else {
        callback()
      }
    }
    const rules = {
      username: [{ required: true, message: this.$t('rule.notBlank', [this.$t('field.account')]), trigger: 'blur' }],
      nickname: [{ required: true, message: this.$t('rule.notBlank', [this.$t('field.nickname')]), trigger: 'blur' }],
      password: [{ required: true, message: this.$t('rule.notBlank', [this.$t('field.password')]), trigger: 'blur' }],
      confirmPassword: [
        { required: true, message: this.$t('rule.notBlank', [this.$t('field.confirmPassword')]), trigger: 'blur' },
        { validator: checkConfirmPassword, trigger: 'blur' }
      ],
      mobile: [{ validator: checkMobile, trigger: 'blur' }],
      email: [{ validator: checkEmail, trigger: 'blur' }]
    }
    this.$nextTick(() => {
      this.$refs.formR.clearValidate()
    })
    return rules
  }

  async init(id?: number): Promise<void> {
    this.visible = true
    this.loading = true
    this.form.id = id
    const res = await select()
    if (res) {
      this.roles = res.data
    }
    if (this.form.id) {
      const r = await info(this.form.id)
      if (r) {
        this.form.username = r.data.username
        this.form.nickname = r.data.username
        this.form.mobile = r.data.mobile
        this.form.email = r.data.email
        this.form.status = r.data.status
        this.form.role_ids = r.data.roles!.map(item => {
          return item.id
        })
      }
    }
    this.$nextTick(() => {
      this.loading = false
    })
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
        const r = !this.form.id ? await add(this.form) : await edit(this.form)
        if (r) {
          this.visible = false
          this.$message({
            message: this.$t('tip.success'),
            type: 'success'
          })
          this.$emit('refresh')
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
