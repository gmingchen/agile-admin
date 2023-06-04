<script setup>
import { ElMessage } from 'element-plus'

import UploadImage from '@/components/upload-image/index.vue'

import { parseData2Tree } from '@/utils'
import { Status, Sex } from '@/utils/enum'
import { isUsername } from '@/utils/regular'

import { infoApi, createApi, updateApi } from '@/api/adminer'
import { selectApi as deptSelectApi } from '@/api/dept'
import { selectApi as postSelectApi } from '@/api/post'

const emits = defineEmits(['refresh'])

const cascaderProps = {
  checkStrictly: true,
  emitPath: false,
  value: 'id',
  label: `name`,
  children: 'children'
}

const refForm = ref()
const refCascader = ref()

const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  username: '',
  password: '',
  nickname: '',
  avatar: '',
  mobile: '',
  email: '',
  sex: Sex.UNKNOWN,
  deptId: '',
  postIds: [],
  status: Status.ENABLE
})
const rules = reactive({
  username: [
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
  nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }]
})
const depts = ref([])
const posts = ref([])

const getDeptList = async () => {
  const r = await deptSelectApi({ status: Status.ENABLE })
  if (r) {
    depts.value = parseData2Tree(r.data)
  }
}
const getPostList = async () => {
  const r = await postSelectApi()
  if (r) {
    posts.value = r.data
  }
}

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  await getDeptList()
  await getPostList()
  if (id) {
    const r = await infoApi({ id })
    if (r) {
      const { username, nickname, avatar, mobile, email, sex, deptId, postIds, status } = r.data
      form.username = username
      form.nickname = nickname
      form.avatar = avatar
      form.mobile = mobile
      form.email = email
      form.sex = sex
      form.deptId = deptId
      form.postIds = postIds
      form.status = status
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
      const r = form.id ? await updateApi(form) : await createApi(form)
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
 * @author: gumingchen
 */
const dialogClosedHandle = () => {
  form.username = ''
  form.password = ''
  refForm.value.resetFields()
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
      <template v-if="!form.id">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            maxlength="50"
            show-word-limit />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="密码"
            type="password"
            maxlength="50" />
        </el-form-item>
      </template>
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="form.nickname"
          placeholder="昵称"
          maxlength="20"
          show-word-limit />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <UploadImage v-model="form.avatar" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="手机号"
          maxlength="20" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="form.email"
          placeholder="邮箱"
          maxlength="50" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <DictRadio v-model="form.sex" code="SEX" />
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-cascader
          class="width-full"
          ref="refCascader"
          v-model="form.deptId"
          :options="depts"
          :props="cascaderProps"
          :show-all-levels="false"
          clearable />
      </el-form-item>
      <el-form-item label="岗位" prop="postIds">
        <el-select
          v-model="form.postIds"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="岗位">
          <el-option
            v-for="item in posts"
            :key="item.id"
            :label="item.name"
            :value="item.id" />
        </el-select>
      </el-form-item>
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
