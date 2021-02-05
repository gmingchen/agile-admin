<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-02-03 15:48:37
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-02-05 15:11:00
-->
<template>
  <el-dialog width="500px" title="修改密码" v-model="visible" :close-on-click-modal="false">
    <el-form :model="form" :rules="rules" ref="formRef" @keyup.enter="submit()" label-width="80px">
      <el-form-item label="账号">
        <span>{{ username }}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Model } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { UPDATE_MODEL_EVENT } from '@U/constants'
import { editUserInfo } from '@API/common/index'

const userModule = namespace('user')

@Options({
  emits: [UPDATE_MODEL_EVENT]
})
export default class extends Vue {
  @Model(UPDATE_MODEL_EVENT, { type: Boolean })
  modelValue!: boolean

  @userModule.State('username')
  username!: string

  $refs!: {
    [key: string]: HTMLFormElement
  }

  get visible(): boolean {
    return this.modelValue
  }
  set visible(val: boolean) {
    this.$emit(UPDATE_MODEL_EVENT, val)
  }

  protected checkConfirmPassword = (_rule: unknown, value: string, callback: (arg?: Error | undefined) => void) => {
    if (this.form.newPassword !== value) {
      callback(new Error('确认密码与新密码不一致'))
    } else {
      callback()
    }
  }

  protected form = {
    password: '',
    newPassword: '',
    confirmPassword: ''
  }
  protected rules = {
    password: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
    newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '确认密码不能为空', trigger: 'blur' },
      { validator: this.checkConfirmPassword, trigger: 'blur' }
    ]
  }

  submit() {
    this.$refs['formRef'].validate(async (valid: boolean) => {
      if (valid) {
        const params = {
          password: this.form.password,
          newPassword: this.form.newPassword
        }
        const r = await editUserInfo(params)
        if (r && r.code === 0) {
          this.visible = false
          this['$message']({
            message: '操作成功',
            type: 'success',
            onClose: () => {
              this.$nextTick(() => {
                this.$router.replace({ name: 'login' })
              })
            }
          })
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
* {
  text-align: left;
}
</style>
