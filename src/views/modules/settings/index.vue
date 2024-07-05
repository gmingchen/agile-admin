<script setup>
import { ElMessage } from 'element-plus'

import { Status } from '@enums'

import { infoApi, updateApi } from '@/api/settings'

const refForm = ref()
const loading = ref(false)
const visible = ref(false)
const amounts = ref([1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100])
const form = reactive({
  registerIntegral: 1,
  shareIntegral: 1,
  riddleIntegral: 1,

  signIntegral: 1,
  continuousSignDay: 1,
  continuousSignIntegral: 1,
  signRule: '',

  watchCount: 1,
  watchIntegral: 1,

  withdrawalSwitch: 0,
  withdrawalAmount: [],
  ratio: 1,
  withdrawalRule: ''
})
const rules = reactive(function() {
  return {
    registerIntegral: [{ required: true, message: '请输入注册赠送积分数', trigger: 'blur' }],
    shareIntegral: [{ required: true, message: '请输入分享用户成功赠送积分数', trigger: 'blur' }],
    riddleIntegral: [{ required: true, message: '请输入猜谜语成功赠送积分数', trigger: 'blur' }],

    signIntegral: [{ required: true, message: '请输入签到赠送积分数', trigger: 'blur' }],
    continuousSignDay: [{ required: true, message: '请输入连续签到天数', trigger: 'blur' }],
    continuousSignIntegral: [{ required: true, message: '请输入连续签到赠送积分数', trigger: 'blur' }],
    signRule: [{ required: true, message: '请输入签到规则', trigger: 'blur' }],

    watchCount: [{ required: true, message: '请输入每天可观看视频次数', trigger: 'blur' }],
    watchIntegral: [{ required: true, message: '请输入观看视频成功赠送积分数', trigger: 'blur' }],

    withdrawalSwitch: [{ required: true, message: '提现金额开关不能为空', trigger: 'change' }],
    withdrawalAmount: [{ type: 'array', required: true, message: '可提现金额不能为空', trigger: 'change' }],
    ratio: [{ required: true, message: '积分提现比例', trigger: 'blur' }],
    withdrawalRule: [{ required: true, message: '提现规则', trigger: 'blur' }]
  }
}())

/**
 * @description: 获取分页列表
 * @param {*}
 * @return {*}
 */
const getInfo = () => {
  loading.value = true
  infoApi().then(r => {
    if (r) {
      const { registerIntegral, shareIntegral, riddleIntegral, signIntegral, continuousSignDay, continuousSignIntegral, signRule, watchCount, watchIntegral, withdrawalSwitch, withdrawalAmount, ratio, withdrawalRule } = r.data
      form.registerIntegral = registerIntegral
      form.shareIntegral = shareIntegral
      form.riddleIntegral = riddleIntegral
      form.signIntegral = signIntegral
      form.continuousSignDay = continuousSignDay
      form.continuousSignIntegral = continuousSignIntegral
      form.signRule = signRule
      form.watchCount = watchCount
      form.watchIntegral = watchIntegral
      form.withdrawalSwitch = withdrawalSwitch
      form.withdrawalAmount = withdrawalAmount
      form.ratio = ratio
      form.withdrawalRule = withdrawalRule
    }
    nextTick(() => {
      loading.value = false
    })
  })
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 */
const submit = () => {
  refForm.value.validate(valid => {
    if (valid) {
      updateApi(form).then(r => {
        if (r) {
          visible.value = false
          ElMessage({
            message: '操作成功!',
            type: 'success'
          })
        }
      })
    }
  })
}

onBeforeMount(() => {
  getInfo()
})
onActivated(() => {})
</script>

<template>
  <Container>
    <template #default>
      <el-form
        class="form"
        v-loading="loading"
        :model="form"
        :rules="rules"
        ref="refForm"
        @keyup.enter="submit()"
        inline
        hide-required-asterisk>
        <el-row>
          <el-col :span="12">
            注册赠送
            <el-form-item prop="registerIntegral">
              <el-input-number v-model="form.registerIntegral" :min="1" />
            </el-form-item>
            积分
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            分享用户成功赠送
            <el-form-item prop="shareIntegral">
              <el-input-number v-model="form.shareIntegral" :min="1" />
            </el-form-item>
            积分
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            猜谜语成功赠送
            <el-form-item prop="shareIntegral">
              <el-input-number v-model="form.riddleIntegral" :min="1" />
            </el-form-item>
            积分
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            签到赠送
            <el-form-item prop="signIntegral">
              <el-input-number v-model="form.signIntegral" :min="1" />
            </el-form-item>
            积分
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            连续签到
            <el-form-item prop="continuousSignDay">
              <el-input-number v-model="form.continuousSignDay" :min="1" />
            </el-form-item>
            天，赠送
            <el-form-item prop="continuousSignIntegral">
              <el-input-number v-model="form.continuousSignIntegral" :min="1" />
            </el-form-item>
            积分
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <label class="width-70">签到规则</label>
            <el-form-item prop="signRule" class="width-full">
              <el-input
                v-model="form.signRule"
                type="textarea"
                rows="5"
                maxlength="200"
                show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            每天可观看视频
            <el-form-item prop="watchCount">
              <el-input-number v-model="form.watchCount" />
            </el-form-item>
            次，每次赠送
            <el-form-item prop="watchIntegral">
              <el-input-number v-model="form.watchIntegral" :min="1" />
            </el-form-item>
            积分
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            是否开启提现
            <el-form-item prop="watchCount">
              <el-switch
                v-model="form.withdrawalSwitch"
                :active-value="Status.ENABLE"
                :inactive-value="Status.DISABLE" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            积分提现比例
            <el-form-item prop="ratio">
              <el-input-number v-model="form.ratio" :min="1" />
            </el-form-item>
            即 1元 = {{ form.ratio }}积分
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="width-100">可提现金额</label>
            <el-form-item prop="withdrawalAmount">
              <el-checkbox-group v-model="form.withdrawalAmount">
                <el-checkbox v-for="item in amounts" :key="item" :label="item">{{ item }}元</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <label class="width-70">提现规则</label>
            <el-form-item prop="withdrawalRule" class="width-full">
              <el-input
                v-model="form.withdrawalRule"
                type="textarea"
                rows="5"
                maxlength="200"
                show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          v-repeat
          type="primary"
          @click="submit()">保存</el-button>
      </el-form>
    </template>
  </Container>
</template>

<style lang="scss" scoped>
.el-col {
  display: flex;
  align-items: center;
  padding: 10px 0;
  .el-form-item {
    margin: 0 10px 0px 10px;
  }
}
</style>
