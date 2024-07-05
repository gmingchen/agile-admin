<!--
* @Description: 消息通知（站内通知）
* @Author: 拖孩
* @Email: 1240235512@qq.com
* @Date: 2023-05-15 17:24:38
-->
<script setup>
import { ElMessage } from 'element-plus'

import { parseData2Tree } from '@utils'
import { Status, NoticeScope, NoticeType } from '@enums'

import { selectApi as templateSelectApi } from '@/api/notice-template'
import { selectApi as deptSelectApi } from '@/api/dept'
import { selectApi as adminerSelectApi } from '@/api/adminer'

import { pushApi } from '@/api/notice'

const emits = defineEmits(['refresh'])

const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: true,
  value: 'id',
  label: `name`,
  children: 'children'
}

const refForm = ref()
const refCascader = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  templateId: '',
  templateContent: '',
  templateParams: [],
  scopeType: NoticeScope.ALL,
  scopeIds: [],
  type: NoticeType.SYSTEM
})
const rules = reactive(function() {
  return {
    templateId: [{ required: true, message: '请选择模版ID', trigger: 'change' }],
    templateParams: [{ required: true, message: '请输入模版参数', trigger: 'blur' }],
    scopeIds: [{
      required: true,
      validator: (_rule, value, callback) => {
        if (!value.length) {
          if (form.scopeType === NoticeScope.ADMINER) {
            callback(new Error('请选择管理员'))
          }
          if (form.scopeType === NoticeScope.DEPT) {
            callback(new Error('请选择部门'))
          }
        }
        callback()
      },
      trigger: 'blur'
    }]
  }
}())
const templates = ref([])
const adminers = ref([])
const depts = ref([])

const getTemplateList = async () => {
  const r = await templateSelectApi()
  if (r) {
    templates.value = r.data
  }
}

const getAdminerList = async () => {
  const r = await adminerSelectApi()
  if (r) {
    adminers.value = r.data.map(item => ({
      value: item.id,
      label: item.nickname || item.username
    }))
  }
}

const getDeptList = async () => {
  const r = await deptSelectApi({ status: Status.ENABLE })
  if (r) {
    depts.value = parseData2Tree(r.data)
  }
}

const init = async () => {
  visible.value = true
  loading.value = true
  await getTemplateList()
  nextTick(() => { loading.value = false })
}

const templateChangeHandle = (val) => {
  const template = templates.value.find(item => item.id === val)
  if (template) {
    const { content, params } = template
    form.templateContent = content
    form.templateParams = params.map(param => ({ label: param, value: '' }))
  } else {
    form.templateContent = ''
    form.templateParams = []
  }
}

const scopeTypeChangeHandle = (val) => {
  form.scopeIds = []
  refForm.value.resetFields(['scopeIds'])
  switch (val) {
    case NoticeScope.ADMINER:
      if (!adminers.value.length) {
        getAdminerList()
      }
      break
    case NoticeScope.DEPT:
      if (!depts.value.length) {
        getDeptList()
      }
      break
    default:
      break
  }
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 */
const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const { tenantId, templateId, templateParams, scopeType, scopeIds, type } = form
      const params = {
        tenantId,
        templateId,
        scopeType,
        scopeIds,
        type,
        params: {}
      }
      templateParams.forEach(item => {
        const { label, value } = item
        params.params[label] = value
      })
      const r = await pushApi(params)
      if (r) {
        visible.value = false
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        emits('refresh')
      }
    }
  })
}

/**
 * @description: 弹窗关闭动画结束时的回调
 * @param {*}
 * @return {*}
 */
const dialogClosedHandle = () => {
  refForm.value.resetFields()
}

defineExpose({
  init
})
</script>

<template>
  <el-dialog
    width="500px"
    title="发送通知"
    v-model="visible"
    :close-on-click-modal="false"
    @closed="dialogClosedHandle"
    append-to-body
    draggable>
    <el-form
      v-loading="loading"
      :model="form"
      :rules="rules"
      ref="refForm"
      label-width="80px"
      @keyup.enter="submit()">
      <el-form-item label="模版" prop="templateId">
        <el-select v-model="form.templateId" placeholder="模版" @change="templateChangeHandle">
          <el-option
            v-for="item in templates"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="模版内容" prop="templateContent" v-show="form.templateContent">
        <el-input type="textarea" v-model="form.templateContent" readonly />
      </el-form-item>
      <el-form-item
        v-for="(item, index) in form.templateParams"
        :key="index"
        label="模版参数"
        :prop="`templateParams[${index}].value`"
        :rules="rules.templateParams">
        <el-input v-model="item.value" :placeholder="`\$\{${item.label}\}`" />
      </el-form-item>
      <el-form-item label="通知范围" prop="scopeType">
        <DictRadio
          v-model="form.scopeType"
          code="NOTICE_SCOPE"
          placeholder="通知范围"
          @change="scopeTypeChangeHandle" />
      </el-form-item>
      <el-form-item label="管理员" prop="scopeIds" v-show="form.scopeType === NoticeScope.ADMINER">
        <el-select
          v-model="form.scopeIds"
          multiple
          collapse-tags
          collapse-tags-tooltip
          clearable>
          <el-option
            v-for="item in adminers"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="scopeIds" v-show="form.scopeType === NoticeScope.DEPT">
        <el-cascader
          ref="refCascader"
          v-model="form.scopeIds"
          :options="depts"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
      <el-form-item label="通知类型" prop="type">
        <DictRadio v-model="form.type" code="NOTICE_TYPE" placeholder="通知类型" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          v-repeat
          type="primary"
          @click="submit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
