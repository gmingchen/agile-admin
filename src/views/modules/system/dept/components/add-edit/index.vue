<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑部门' : '新增部门'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="上级部门" prop="parentId">
        <el-cascader
          class="w-f"
          ref="refCascader"
          v-model="form.parentId"
          :options="depts"
          :props="cascaderProps"
          :show-all-levels="false"
          collapse-tags
          collapse-tags-tooltip
          clearable />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="50" show-word-limit />
      </el-form-item>
      <el-form-item label="负责人" prop="leader">
        <el-select class="w-f" v-model="form.leader" clearable>
          <el-option v-for="item in adminers" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="手机号" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="1" controls-position="right" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <Dict v-model="form.status" :code="DICT_CODE_ENUM.STATUS" default-value></Dict>
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
import { DICT_CODE_ENUM, STATUS_ENUM } from '@/common/enums'
import { parseDataToTree } from '@/common/utils'
import { deptInfoApi, deptCreateApi, deptUpdateApi, deptSelectListApi, adminerSelectListApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const cascaderProps = {
  checkStrictly: true,
  emitPath: false,
  value: 'id',
  label: `name`,
  children: 'children'
}

const depts = ref([])
const adminers = ref([])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  leader: '',
  mobile: '',
  sort: 1,
  parentId: '',
  status: ''
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  }
})

const getDepts = async () => {
  const r = await deptSelectListApi({ status: STATUS_ENUM.ENABLE })
  if (r) {
    depts.value = parseDataToTree(r.data)
  }
}

const getAdminers = async () => {
  const r = await adminerSelectListApi()
  if (r) {
    adminers.value = r.data.map(({ id, username, nickname }) => ({ value: id, label: nickname || username }))
  }
}

const onClosed = () => {
  form.id = null
  formRef.value.resetFields()
}

const onCancel = () => {
  visible.value = false
  emits('cancel')
}

const onConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      loading.value = true
      const r = await (form.id ? deptUpdateApi(form) : deptCreateApi(form))
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
    }
  })
}

const open = (id) => {
  visible.value = true
  getDepts()
  getAdminers()
  if (id) {
    loading.value = true
    form.id = id
    deptInfoApi({ id }).then(r => {
      if (r) {
        form.name = r.data.name
        form.leader = r.data.leader
        form.mobile = r.data.mobile
        form.sort = r.data.sort
        form.parentId = r.data.parentId
        form.status = r.data.status
      }
      nextTick(() => loading.value = false)
    })
  }
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: add-edit#{$element-separator};
@include b(add-edit) {}
</style>
