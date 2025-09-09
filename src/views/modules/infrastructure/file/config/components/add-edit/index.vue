<template>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑文件配置' : '新增文件配置'"
    :close-on-click-modal="false"
    width="500px"
    draggable
    append-to-body
    destroy-on-close
    @closed="onClosed">
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" @keyup.enter="submit()" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称" maxlength="32" show-word-limit />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="备注" type="textarea" maxlength="200" show-word-limit />
      </el-form-item>
      <el-form-item label="是否是主配置" prop="master">
        <Dict v-model="form.master" :code="DICT_CODE_ENUM.WHETHER" default-value></Dict>
      </el-form-item>
      <el-form-item label="存储类型" prop="storage">
        <Dict v-model="form.storage" :code="DICT_CODE_ENUM.STORAGE_TYPE" placeholder="存储类型" @change="onStorageChange" />
      </el-form-item>
      <template v-if="form.storage">
        <template v-if="form.storage === FILE_STORAGE_TYPE_ENUM.LOCAL">
          <el-form-item label="物理路径" prop="path">
            <el-input v-model="form.path" placeholder="物理路径" />
          </el-form-item>
          <el-form-item label="前缀" prop="prefix">
            <el-input v-model="form.prefix" placeholder="前缀" />
          </el-form-item>
        </template>
        <template v-else-if="form.storage === FILE_STORAGE_TYPE_ENUM.KODO || form.storage === FILE_STORAGE_TYPE_ENUM.OSS || form.storage === FILE_STORAGE_TYPE_ENUM.COS">
          <el-form-item label="密钥" prop="access">
            <el-input v-model="form.access" placeholder="密钥" />
          </el-form-item>
          <el-form-item label="私钥" prop="secret">
            <el-input v-model="form.secret" placeholder="私钥" />
          </el-form-item>
          <el-form-item label="空间" prop="bucket">
            <el-input v-model="form.bucket" placeholder="空间" />
          </el-form-item>
        </template>
        <template v-if="form.storage === FILE_STORAGE_TYPE_ENUM.OSS || form.storage === FILE_STORAGE_TYPE_ENUM.COS">
          <el-form-item label="节点" prop="endpoint">
            <el-input v-model="form.endpoint" placeholder="节点" />
          </el-form-item>
        </template>
        <el-form-item label="域名" prop="domain">
          <el-input v-model="form.domain" placeholder="域名" />
        </el-form-item>
        <el-form-item label="临时路径" prop="temp">
          <el-input v-model="form.temp" placeholder="临时路径" />
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <el-button :loading="loading" @click="onCancel">取消</el-button>
      <el-button v-repeat :loading="loading" type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { Dict } from '@/components'
import { DICT_CODE_ENUM, FILE_STORAGE_TYPE_ENUM } from '@/common/enums'
import { isDomain, isURL } from '@/common/utils'
import { fileConfigInfoApi, fileConfigCreateApi, fileConfigUpdateApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('add-edit')

const emits = defineEmits(['confirm', 'cancel'])

const visible = ref(false)
const loading = ref(false)
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  remark: '',
  master: '',
  storage: '',
  // 通用配置信息字段
  domain: '',
  temp: '',
  // 本地存储配置信息字段
  path: '',
  prefix: '',
  // 七牛云、阿里云、腾讯云 通用存储配置信息字段
  access: '',
  secret: '',
  bucket: '',
  // 阿里云、腾讯云 节点配置信息字段
  endponit: ''
})
const rules = computed(() => {
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    master: [{ required: true, message: '请选择是否是主配置', trigger: 'change' }],
    storage: [{ required: true, message: '请选择存储类型', trigger: 'change' }],
    domain: [
      { required: true, message: '请输入域名', trigger: 'blur' },
      {
        validator: (_rule, value, callback) => {
          if (!isDomain(value)) {
            callback(new Error('请输入正确的域名'))
          }
          callback()
        },
        trigger: 'blur'
      }
    ],
    path: [{ required: true, message: '请输入物理路径', trigger: 'blur' }],
    access: [{ required: true, message: '请输入密钥', trigger: 'blur' }],
    secret: [{ required: true, message: '请输入私钥', trigger: 'blur' }],
    bucket: [{ required: true, message: '请输入空间', trigger: 'blur' }],
    endpoint: [
      { required: true, message: '请输入节点', trigger: 'blur' }
      // {
      //   validator: (_rule, value, callback) => {
      //     if (!isURL(value)) {
      //       callback(new Error('请输入正确的节点'))
      //     }
      //     callback()
      //   },
      //   trigger: 'blur'
      // }
    ]
  }
})

const onStorageChange = () => {
  const fields = ['path', 'access', 'secret', 'bucket', 'endpoint']
  formRef.value.resetFields(fields)
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
      const { id, name, remark, master, storage, domain, temp, path, prefix, access, secret, bucket, endpoint } = form
      let config = { domain, temp }
      switch (storage) {
        case FILE_STORAGE_TYPE_ENUM.LOCAL:
          config = { ...config, path, prefix }
          break
        case FILE_STORAGE_TYPE_ENUM.KODO:
          config = { ...config, access, secret, bucket }
          break
        case FILE_STORAGE_TYPE_ENUM.OSS:
        case FILE_STORAGE_TYPE_ENUM.COS:
          config = { ...config, access, secret, bucket, endpoint }
          break
      }
      const params = { id, name, remark, master, storage, config }
      const r = await (form.id ? fileConfigUpdateApi(params) : fileConfigCreateApi(params))
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
  if (id) {
    loading.value = true
    form.id = id
    fileConfigInfoApi({ id }).then(r => {
      if (r) {
        const {
          name, remark, master, storage,
          config: {
            domain, temp, path, prefix, access, secret, bucket, endpoint
          }
        } = r.data
        form.name = name
        form.remark = remark
        form.master = master
        form.storage = storage
        form.domain = domain
        form.temp = temp
        form.path = path
        form.prefix = prefix
        form.access = access
        form.secret = secret
        form.bucket = bucket
        form.endpoint = endpoint
      }
      nextTick(() => loading.value = false)
    })
  }
}

defineExpose({ open })
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
$prefix: sidebar#{$element-separator};
@include b(add-edit) {}
</style>
