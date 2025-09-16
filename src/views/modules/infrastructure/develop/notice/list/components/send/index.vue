<template>
  <el-dialog
    v-model="visible"
    title="发送通知"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="模版" prop="templateId">
        <el-select v-model="form.templateId" placeholder="模版" @change="onTemplateChange">
          <el-option v-for="item in templates" :key="item.id" :label="item.name" :value="item.id" />
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
        <Dict v-model="form.scopeType" :code="DICT_CODE_ENUM.NOTICE_SCOPE" default-value @change="onScopeTypeChange"></Dict>
      </el-form-item>
      <el-form-item label="管理员" prop="scopeIds" v-show="form.scopeType === NOTICE_SCOPE_ENUM.ADMINER">
        <el-select v-model="form.scopeIds" multiple collapse-tags collapse-tags-tooltip clearable>
          <el-option v-for="item in adminers" :key="item.id" :label="item.nickname || item.username" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="scopeIds" v-show="form.scopeType === NOTICE_SCOPE_ENUM.DEPT">
        <el-cascader
          v-model="form.scopeIds"
          :options="depts"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
      <el-form-item label="通知类型" prop="type">
        <Dict v-model="form.type" :code="DICT_CODE_ENUM.NOTICE_TYPE" default-value></Dict>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Dict } from '@/components'
import { DICT_CODE_ENUM, NOTICE_SCOPE_ENUM } from '@/common/enums'
import { parseDataToTree } from '@/common/utils'
import { noticePushApi, noticeTemplateSelectListApi, deptSelectListApi, adminerSelectListApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('send')

const emits = defineEmits(['confirm', 'cancel'])

const cascaderProps = {
  multiple: true,
  emitPath: false,
  checkStrictly: true,
  value: 'id',
  label: `name`,
  children: 'children'
}

const templates = ref([])
const adminers = ref([])
const depts = ref([])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  templateId: '',
  templateContent: '',
  templateParams: [],
  scopeType: '',
  scopeIds: [],
  type: ''
})
const rules = computed(() => {
  return {
    templateId: [{ required: true, message: '请选择模版ID', trigger: 'change' }],
    templateParams: [{ required: true, message: '请输入模版参数', trigger: 'blur' }],
    scopeIds: [{
      required: true,
      validator: (_rule, value, callback) => {
        if (!value.length) {
          if (form.scopeType === NOTICE_SCOPE_ENUM.ADMINER) {
            callback(new Error('请选择管理员'))
          }
          if (form.scopeType === NOTICE_SCOPE_ENUM.DEPT) {
            callback(new Error('请选择部门'))
          }
        }
        callback()
      },
      trigger: 'blur'
    }]
  }
})

const getTemplates = async () => {
  await noticeTemplateSelectListApi().then(r => {
    if (r) {
      templates.value = r.data
    }
  })
}

const getAdminers = () => {
  adminerSelectListApi().then(r => {
    if (r) {
      adminers.value = r.data
    }
  })
}

const getDepts = () => {
  deptSelectListApi().then(r => {
    if (r) {
      depts.value = parseDataToTree(r.data)
    }
  })
}

const onClosed = () => {
  form.id = null
  formRef.value.resetFields()
}

const onCancel = () => {
  visible.value = false
  emits('cancel')
}

const onTemplateChange = (value) => {
  const template = templates.value.find(item => item.id === value)
  if (template) {
    const { content, params } = template
    form.templateContent = content
    form.templateParams = params.map(param => ({ label: param, value: '' }))
  } else {
    form.templateContent = ''
    form.templateParams = []
  }
}

const onScopeTypeChange = (value) => {
  form.scopeIds = []
  formRef.value.resetFields(['scopeIds'])
  if (value === NOTICE_SCOPE_ENUM.ADMINER && !adminers.value.length) {
    getAdminers()
  } else if (value === NOTICE_SCOPE_ENUM.DEPT && !depts.value.length) {
    getDepts()
  }
}

const onConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      loading.value = true
      const { templateParams, ...others } = form
      const params = {
        ...others,
        params: {}
      }
      templateParams.forEach(({ label, value }) => params.params[label] = value)
      const r = await noticePushApi(params)
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
      loading.value = false
    }
  })
}

const open = async () => {
  visible.value = true
  loading.value = true
  await getTemplates()
  nextTick(() => loading.value = false)
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: send#{$element-separator};
@include b(send) {}
</style>
