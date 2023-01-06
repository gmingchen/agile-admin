<template>
  <div class="login-container flex-box flex_a_i-center flex_j_c-center">
    <el-card class="width-500">
      <el-form
        ref="refForm"
        :model="form"
        :rules="rules"
        @keyup.enter="submit()">
        <el-tabs v-model="form.type" @tab-change="tabChangeHandle">
          <el-tab-pane
            v-for="item in dictionaryList"
            :key="item.value"
            :label="item.label"
            :name="item.value" />
        </el-tabs>
        <el-form-item prop="username">
          <el-input v-model="form.username" :placeholder="type" clearable>
            <template #prefix>
              <Iconfont name="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="密码"
            show-password
            clearable>
            <template #prefix>
              <Iconfont name="lock" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            class="flex-item_f-1"
            v-model="form.code"
            placeholder="验证码"
            clearable>
            <template #prefix>
              <Iconfont name="verification" />
            </template>
          </el-input>
          <img
            v-show="captcha"
            class="height-32 cursor-pointer"
            :src="captcha"
            @click="getCaptcha()"
            alt="验证码">
        </el-form-item>
        <el-button
          v-repeat
          :loading="loading"
          class="margin_t-20 width-full"
          type="primary"
          @click="submit()">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { computed, defineComponent, nextTick, onBeforeMount, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { ElNotification } from 'element-plus'

import useDictionary from '@/mixins/dictionary'
import { generateUUID } from '@/utils'

import { captchaApi } from '@/api/login'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore()

    const { dictionaryMap, dictionaryList, getDictionary } = useDictionary()

    const refForm = ref()
    const data = reactive({
      loading: false,
      captcha: '',
      form: {
        username: '',
        password: '',
        uuid: '',
        code: '',
        type: 1 // 登录方式：1-账号 2-手机号 3-邮箱
      }
    })

    const type = computed({
      get: () => {
        const types = ['', '账号', '手机号', '邮箱']
        return types[data.form.type]
      }
    })

    const rules = computed(function() {
      return {
        username: [{ required: true, message: `${ type.value }不能为空`, trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      }
    })

    /**
     * @description: 获取验证码图片
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const getCaptcha = () => {
      const uuid = generateUUID()
      data.form.uuid = uuid
      captchaApi({ uuid }).then(r => {
        if (r) {
          data.captcha = r.data
        }
      })
    }

    /**
     * @description: 标签页变化事件
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const tabChangeHandle = () => {
      setTimeout(() => {
        refForm.value.clearValidate() // resetField
      }, 0)
    }

    /**
     * @description: 登录表单提交
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const submit = () => {
      refForm.value.validate(valid => {
        if (valid) {
          data.loading = true
          store.dispatch('administrator/login', data.form).then(r => {
            if (r) {
              router.push({ name: 'redirect', replace: true })
            } else {
              getCaptcha()
              nextTick(() => {
                data.loading = false
              })
            }
          })
        }
      })
    }

    /**
     * @description: 提示
     * @param {*}
     * @return {*}
     * @author: gumingchen
     */
    const notifyHandle = () => {
      const message = `
        <div class="login-notify-content">
          <div class="tip">演示环境，部分权限暂不开放</div>
          因系统禁止多点在线 所以会遇到token失效、退出登录的情况属，可以尝试更换帐号登录！
          <div class="margin_t-10">
            <p>总后台帐号：</p>
            <b>demo1，demo2，demo3，demo4</b>
          </div>
          <div class="margin-10-n">
            <p>企业超管帐号：</p>
            <b>admin1，admin2，admin3，admin4</b>
          </div>
          <p>所有帐号的密码统一为：<b>superadmin</b></p>
        </div>
      `
      ElNotification({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: message,
        type: 'warning',
        position: 'bottom-right',
        duration: 0,
        customClass: 'login-notify'
      })
    }

    onBeforeMount(() => {
      getDictionary('login')
      getCaptcha()
      notifyHandle()
    })

    return {
      refForm,
      dictionaryMap,
      dictionaryList,
      ...toRefs(data),
      type,
      rules,
      getCaptcha,
      tabChangeHandle,
      submit
    }
  }
})
</script>

<style lang="scss">
.login-container {
  input:focus + .el-input__prefix {
    color: var(--el-color-primary);
  }
}
</style>

<style lang="scss">
.login-notify {
  width: 400px;
  .login-notify-content {
    position: relative;
    .tip {
      position: absolute;
      top: -30px;
      left: 40px;
      color: var(--el-color-warning);
    }
    & > div {
      p {
        // font-weight: 700;
        color: var(--el-color-primary);
      }
      b {
        text-indent: 2em;
      }
    }
    p > b {
      color: var(--el-color-danger);
    }
  }
}
</style>
