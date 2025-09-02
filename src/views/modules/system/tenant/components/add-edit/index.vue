<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑租户' : '新增租户'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="50" show-word-limit />
      </el-form-item>
      <el-form-item label="Logo" prop="logo">
        <UploadImage v-model="form.logo" />
      </el-form-item>
      <el-form-item label="联系人" prop="contactName">
        <el-input v-model="form.contactName" placeholder="联系人" maxlength="50" />
      </el-form-item>
      <el-form-item label="手机号" prop="contactMobile">
        <el-input v-model="form.contactMobile" placeholder="手机号" maxlength="50" />
      </el-form-item>
      <template v-if="!form.id">
        <el-form-item label="用户名" prop="contactUsername">
          <el-input v-model="form.contactUsername" placeholder="用户名" maxlength="50" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码" maxlength="50" type="password" />
        </el-form-item>
      </template>
      <el-form-item label="帐号额度" prop="accountCount">
        <el-input-number v-model="form.accountCount" :min="0" :max="999999999" placeholder="不限" />
      </el-form-item>
      <el-form-item label="租户套餐" prop="packageIds">
        <el-select
          v-model="form.packageIds"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="租户套餐"
          @visible-change="onPackageChange">
          <el-option v-for="item in packageList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-table v-show="form.packages.length" :data="form.packages" border size="small">
        <el-table-column align="center" label="租户套餐" prop="name" />
        <el-table-column align="center" label="到期时间" prop="expireAt">
          <template v-slot="{row}">
            <el-date-picker
              v-model="row.expireAt"
              type="datetime"
              placeholder="到期时间"
              value-format="YYYY-MM-DD HH:mm:ss"
              :disabled-date="date => new Date().getTime() > date.getTime()" />
          </template>
        </el-table-column>
      </el-table>
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
import { Dict, UploadImage } from '@/components'
import { DICT_CODE_ENUM } from '@/common/enums'
import { isUsername } from '@/common/utils'
import { tenantInfoApi, tenantCreateApi, tenantUpdateApi, packageSelectListApi } from '@/apis'
import { useNamespace } from '@/hooks';

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  logo: '',
  contactName: '',
  contactUsername: '', // 该字段不可编辑
  contactMobile: '',
  password: '', // 该字段不可编辑
  accountCount: null,
  status: '',
  packageIds: [],
  packages: []
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    contactName: [{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
    contactUsername: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      {
        validator: (_rule, value, callback) => {
          if (!isUsername(value)) {
            callback(new Error('用户名由4-12位字母开头的、数字、字母、下划线组成'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    packageIds: [{ type: 'array', required: true, message: '请选择租户套餐', trigger: 'change' }]
  }
})
const packageList = ref([])

const getPackageList = async () => {
  const r = await packageSelectListApi()
  if (r) {
    packageList.value = r.data
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

const onPackageChange = (value) => {
  if (!value) {
    const { packages, packageIds } = form

    const existIds = packages.map(item => item.packageId)
    const absentIds = packageIds.concat(existIds).filter(id => !existIds.includes(id))

    const exist = packages.filter(item => packageIds.includes(item.packageId))
    const absent = packageList.value.filter(item => absentIds.includes(item.id)).map(item => ({ packageId: item.id, name: item.name, expireAt: null }))

    form.packages = [...exist, ...absent]
  }
}

const onConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      const {
        id, contactUsername, password,
        packages, packageIds,
        ...other
      } = form
      let params = {
        id, ...other,
        packages: packages.map(item => ({ id: item.id, packageId: item.packageId, expireAt: item.expireAt }))
      }
      if (!id) {
        params = { ...params, contactUsername, password }
      }
      loading.value = true
      const r = await form.id ? tenantUpdateApi(form) : tenantCreateApi(form)
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
    }
  })
}

const open = async (id) => {
  visible.value = true
  if (!packageList.value.length) {
    await getPackageList()
  }
  if (id) {
    form.id = id
    loading.value = true
    tenantInfoApi({ id }).then(r => {
      if (r) {
        const { name, logo, contactName, contactMobile, accountCount, status, packages } = r.data
        form.name = name
        form.logo = logo || ''
        form.contactName = contactName
        form.contactMobile = contactMobile
        form.accountCount = accountCount
        form.status = status
        form.packageIds = []
        form.packages = []
        packages.forEach(item => {
          form.packageIds.push(item.packageId)
          const list = packageList.value.filter(it => it.id === item.packageId)
          const packageName = list.length > 0 ? list[0].name : ''
          form.packages.push({ ...item, name: packageName })
        })
      }
      nextTick(() => loading.value = false)
    })
  }
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(add-edit) {}
</style>
