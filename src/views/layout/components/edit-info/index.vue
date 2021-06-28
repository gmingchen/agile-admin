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
    title="编辑"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle">
    <el-form
      :model="form"
      :rules="rules"
      ref="refForm"
      @keyup.enter="submit()"
      label-position="top">
      <el-form-item label="账户">
        <el-input v-model="user.username" placeholder="账户" readonly />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="昵称" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="邮箱" />
      </el-form-item>
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" placeholder="原密码" show-password />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" placeholder="新密码" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" placeholder="确认密码" show-password />
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
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import useInstance from '@/mixins/instance'
import { isEmail, isMobile } from '@/utils/regular'
import { editUserInfoApi, userInfoApi } from '@/api/login'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()
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
    const rules = reactive(function () {
      const checkMobile = (_rule, value, callback) => {
        if (form.mobile !== '' && !isMobile(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      const checkEmail = (_rule, value, callback) => {
        if (form.email !== '' && !isEmail(value)) {
          callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      }
      const checkOldPassword = (_rule, value, callback) => {
        if (form.newPassword !== '' && value === '') {
          callback(new Error('请输入原密码'))
        } else {
          callback()
        }
      }
      const checkConfirmPassword = (_rule, value, callback) => {
        if (form.newPassword !== value) {
          callback(new Error('新密码与确认密码不一致'))
        } else {
          callback()
        }
      }
      const rule = {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        mobile: [{ validator: checkMobile, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        oldPassword: [{ validator: checkOldPassword, trigger: 'blur' }],
        confirmPassword: [{ validator: checkConfirmPassword, trigger: 'blur' }]
      }
      return rule
    }())

    /**
     * @description: 表单验证提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(async valid => {
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
              message: '操作成功!',
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
    const dialogClosedHandle = () => {
      refForm.value.resetFields()
    }

    const init = () => {
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
      dialogClosedHandle
    }
  }
})
</script>
