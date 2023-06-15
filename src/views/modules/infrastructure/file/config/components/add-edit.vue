<script setup>
import { ElMessage } from 'element-plus'

import { FileStorageType, Whether } from '@/utils/enum'
import { isDomain, isURL } from '@/utils/regular'

import { configInfoApi, configCreateApi, configUpdateApi } from '@/api/file'

const emits = defineEmits(['refresh'])

const refForm = ref()
const visible = ref(false)
const loading = ref(false)
const form = reactive({
  id: '',
  name: '',
  remark: '',
  master: Whether.NO,
  storage: FileStorageType.LOCAL,
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
const rules = reactive({
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
})

const init = async (id) => {
  visible.value = true
  loading.value = true
  form.id = id
  if (id) {
    const r = await configInfoApi({ id })
    if (r) {
      const { name, remark, master, storage, config } = r.data
      form.name = name
      form.remark = remark
      form.master = master
      form.storage = storage

      const { domain, temp, path, prefix, access, secret, bucket, endpoint } = config
      form.domain = domain
      form.temp = temp
      switch (storage) {
        case FileStorageType.LOCAL:
          form.path = path
          form.prefix = prefix
          break
        case FileStorageType.KODO:
          form.access = access
          form.secret = secret
          form.bucket = bucket
          break
        case FileStorageType.OSS:
        case FileStorageType.COS:
          form.access = access
          form.secret = secret
          form.bucket = bucket
          form.endpoint = endpoint
          break
      }
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
      const { id, name, remark, master, storage, domain, temp, path, prefix, access, secret, bucket, endpoint } = form
      let config = { domain, temp }
      switch (storage) {
        case FileStorageType.LOCAL:
          config = { ...config, path, prefix }
          break
        case FileStorageType.KODO:
          config = { ...config, access, secret, bucket }
          break
        case FileStorageType.OSS:
        case FileStorageType.COS:
          config = { ...config, access, secret, bucket, endpoint }
          break
      }
      const params = { id, name, remark, master, storage, config }
      const r = form.id ? await configUpdateApi(params) : await configCreateApi(params)
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
 * @description: 类型变化事件 重置表单部分属性
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const storageChangeHandle = () => {
  const fields = ['path', 'access', 'secret', 'bucket', 'endpoint']
  refForm.value.resetFields(fields)
}

/**
 * @description: 弹窗关闭动画结束时的回调 //todo: 由于 使用 v-if 会导致表单不会被重置 手动重置
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
const dialogClosedHandle = () => {
  form.name = ''
  form.remark = ''
  form.master = 0
  form.storage = 0
  form.domain = ''
  form.temp = ''
  form.path = ''
  form.prefix = ''
  form.access = ''
  form.secret = ''
  form.bucket = ''
  form.endpoint = ''
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
      label-width="110px"
      @keyup.enter="submit()">
      <el-form-item label="名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="名称"
          maxlength="50"
          show-word-limit />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="form.remark"
          placeholder="备注"
          type="textarea"
          maxlength="200"
          show-word-limit />
      </el-form-item>
      <el-form-item label="是否是主配置" prop="master">
        <DictRadio v-model="form.master" code="WHETHER" />
      </el-form-item>
      <el-form-item label="存储类型" prop="storage">
        <DictSelect
          v-model="form.storage"
          code="STORAGE"
          placeholder="存储类型"
          :search="false"
          @change="storageChangeHandle" />
      </el-form-item>
      <template v-if="form.storage !== ''">
        <template v-if="form.storage === FileStorageType.LOCAL">
          <el-form-item label="物理路径" prop="path">
            <el-input v-model="form.path" placeholder="物理路径" />
          </el-form-item>
          <el-form-item label="前缀" prop="prefix">
            <el-input v-model="form.prefix" placeholder="前缀" />
          </el-form-item>
        </template>
        <template v-else-if="form.storage === FileStorageType.KODO || form.storage === FileStorageType.OSS || form.storage === FileStorageType.COS">
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
        <template v-if="form.storage === FileStorageType.OSS || form.storage === FileStorageType.COS">
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
