<script setup>
import { ElMessage } from 'element-plus'

import UploadImage from '@/components/upload-image/index.vue'

import { Status } from '@/utils/enum'
import { isUsername } from '@/utils/regular'

import { infoApi, createApi, updateApi } from '@/api/tenant'
import { selectApi } from '@/api/package'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  name: '',
  logo: '',
  contactName: '',
  contactUsername: '', // 该字段不可编辑
  contactMobile: '',
  password: '', // 该字段不可编辑
  accountCount: null,
  status: Status.ENABLE,
  packageIds: [],
  packages: []
})
const rules = reactive({
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
})
const packageList = ref([])

/**
 * 获取租户套餐
 */
const getPackageList = async () => {
  const r = await selectApi()
  if (r) {
    packageList.value = r.data
  }
}

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  await getPackageList()
  if (id) {
    const r = await infoApi({ id })
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
  }
  nextTick(() => { loading.value = false })
}

/**
 * @description: 表单验证提交
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const { id, name, logo, contactName, contactMobile, accountCount, status, packages, contactUsername, password } = form
      let params = {
        id,
        name,
        logo,
        contactName,
        contactMobile,
        accountCount,
        status,
        packages: packages.map(item => ({ id: item.id, packageId: item.packageId, expireAt: item.expireAt }))
      }
      if (!form.id) {
        params = {
          ...params,
          contactUsername,
          password
        }
      }

      const r = form.id ? await updateApi(params) : await createApi(params)
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
 * 租户套餐变化事件
 * @param {*} val
 */
const packageChangeHandle = (val) => {
  if (!val) {
    const { packages, packageIds } = form

    const existIds = packages.map(item => item.packageId)
    const absentIds = packageIds.concat(existIds).filter(id => !existIds.includes(id))

    const exist = packages.filter(item => packageIds.includes(item.packageId))
    const absent = packageList.value.filter(item => absentIds.includes(item.id)).map(item => ({ packageId: item.id, name: item.name, expireAt: null }))

    form.packages = [...exist, ...absent]
  }
}

/**
 * @description: 弹窗关闭动画结束时的回调
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const dialogClosedHandle = () => {
  refForm.value.resetFields()
  form.packages = []
}

defineExpose({
  init
})
</script>

<template>
  <el-dialog
    width="500px"
    :title="form.id ? '编辑' : '新增'"
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
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="50"
          show-word-limit />
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
          <el-input
            v-model="form.password"
            placeholder="密码"
            maxlength="50"
            type="password" />
        </el-form-item>
      </template>
      <el-form-item label="帐号额度" prop="accountCount">
        <el-input-number
          v-model="form.accountCount"
          :min="0"
          :max="999999999"
          placeholder="不限" />
      </el-form-item>
      <el-form-item label="租户套餐" prop="packageIds">
        <el-select
          v-model="form.packageIds"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="租户套餐"
          @visible-change="packageChangeHandle">
          <el-option
            v-for="item in packageList"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
      <el-table
        v-show="form.packages.length"
        :data="form.packages"
        border
        size="small">
        <el-table-column
          align="center"
          label="租户套餐"
          prop="name" />
        <el-table-column
          align="center"
          label="到期时间"
          prop="expireAt">
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
        <DictRadio v-model="form.status" code="STATUS" />
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
