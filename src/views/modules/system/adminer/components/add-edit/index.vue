<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑管理员' : '新增管理员'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <template v-if="!form.id">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名" maxlength="50" show-word-limit />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码" type="password" maxlength="50" />
        </el-form-item>
      </template>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="昵称" maxlength="20" show-word-limit />
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <UploadImage v-model="form.avatar" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="手机号" maxlength="20" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="邮箱" maxlength="50" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <Dict v-model="form.sex" :code="DICT_CODE_ENUM.SEX" :type="DICT_COMPONENT_TYPE_ENUM.RADIO" default-value></Dict>
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
        <el-select v-model="form.postIds" placeholder="岗位" multiple collapse-tags collapse-tags-tooltip>
          <el-option v-for="item in posts" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
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
import { Dict, UploadImage } from '@/components'
import { DICT_CODE_ENUM, DICT_COMPONENT_TYPE_ENUM } from '@/common/enums'
import { isUsername, isMobile, isEmail, parseDataToTree } from '@/common/utils'
import { adminerInfoApi, adminerCreateApi, adminerUpdateApi, deptSelectListApi, postSelectListApi } from '@/apis'
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
const posts = ref([])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  username: '',
  password: '',
  nickname: '',
  avatar: '',
  mobile: '',
  email: '',
  sex: '',
  deptId: '',
  postIds: [],
  status: ''
})
const rules = computed(() => {
  return {
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
    nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    mobile: [
      {
        validator: (_rule, value, callback) => {
          if (!value) {
            callback()
          } else if (!isMobile(value)) {
            callback(new Error('请输入正确的手机号'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
    email: [
      {
        validator: (_rule, value, callback) => {
          if (!value) {
            callback()
          } else if (!isEmail(value)) {
            callback(new Error('请输入正确的邮箱'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
  }
})

const getDepts = () => {
  deptSelectListApi().then(r => {
    if (r) {
      depts.value = parseDataToTree(r.data)
    }
  })
}

const getPosts = () => {
  postSelectListApi().then(r => {
    if (r) {
      posts.value = r.data
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

const onConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      loading.value = true
      const r = await (form.id ? adminerUpdateApi(form) : adminerCreateApi(form))
      if (r) {
        visible.value = false
        ElMessage.success('操作成功!')
        emits('confirm')
      }
      loading.value = false
    }
  })
}

const open = (id) => {
  visible.value = true
  getDepts()
  getPosts()
  if (id) {
    loading.value = true
    form.id = id
    adminerInfoApi({ id }).then(r => {
      if (r) {
        form.username = r.data.username
        form.nickname = r.data.nickname
        form.avatar = r.data.avatar
        form.mobile = r.data.mobile
        form.email = r.data.email
        form.sex = r.data.sex
        form.deptId = r.data.deptId
        form.postIds = r.data.postIds
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
