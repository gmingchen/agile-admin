<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <Sidebar v-model="active" @change="changeHandle" />
    </template>
    <template #default>
      <div class="name-box margin_b-20 font-size-20">{{form.name_cn}}&nbsp;</div>
      <el-row v-show="active">
        <el-col
          :xs="24"
          :sm="24"
          :md="16"
          :lg="14"
          :xl="10">
          <el-form
            v-loading="loading"
            :model="form"
            :rules="rules"
            ref="refForm"
            @keyup.enter="submit()"
            label-position="top">
            <el-form-item label="中文名称" prop="name_cn">
              <el-input
                v-model="form.name_cn"
                placeholder="中文名称"
                maxlength="20"
                show-word-limit
                :readonly="!havePermission('\menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="英文名称" prop="name_en">
              <el-input
                v-model="form.name_en"
                placeholder="英文名称"
                maxlength="30"
                show-word-limit
                :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type" :disabled="!havePermission('menu:create|menu:update', '|')" @change="clearRouterParams">
                <el-radio-button
                  :label="item.value"
                  :disabled="buttonHandle(item.value)"
                  v-for="item in dictionaryList"
                  :key="item.value">{{item.label}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="组件Path（modules 为根目录可省略首个反斜杠，须省略组件文件的 .vue 后缀） / Http[s] URL" prop="url" v-if="form.type !== 0 && form.type !== 2">
              <el-input v-model="form.url" placeholder="路由Path / Http[s] URL" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="路由Path（若为空则按照url路径处理）" prop="path" v-if="form.type == 1">
              <el-input v-model="form.path" placeholder="路由Path" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="路由Name（若为空则按照url路径处理）" prop="name" v-if="form.type == 1">
              <el-input v-model="form.name" placeholder="路由Name" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="授权标识" prop="permission" v-if="form.type == 1 || form.type == 2">
              <el-input v-model="form.permission" placeholder="授权标识" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="图标" prop="icon" v-if="form.type !== 2">
              <IconSelectInput v-model="form.icon" :readonly="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="form.sort"
                :min="1"
                controls-position="right"
                :disabled="!havePermission('menu:create|menu:update', '|')" />
            </el-form-item>
            <template v-if="form.type === 1 || form.type === 3">
              <el-form-item label="是否在侧边菜单栏显示（如：个人中心，详情页都不需要显示）" prop="show">
                <el-radio-group v-model="form.show" :disabled="!havePermission('menu:create|menu:update', '|')">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否在tab页签显示" prop="tab">
                <el-radio-group v-model="form.tab" :disabled="!havePermission('menu:create|menu:update', '|')">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <template v-if="form.type === 1">
                <el-form-item label="是否支持tab页签多开（如：用户1的详情页、用户2的详情并存在tab页签）" prop="multiple">
                  <el-radio-group v-model="form.multiple" :disabled="!havePermission('menu:create|menu:update', '|')">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="是否支持缓存" prop="keepalive">
                  <el-radio-group v-model="form.keepalive" :disabled="!havePermission('menu:create|menu:update', '|')">
                    <el-radio :label="0">否</el-radio>
                    <el-radio :label="1">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </template>
            </template>
            <el-form-item>
              <el-button v-permission="'menu:update'" type="primary" @click="submit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template>
  </ContainerSidebar>
</template>

<script setup>
import { nextTick, onBeforeMount, reactive, ref } from 'vue'

import { ElMessage } from 'element-plus'
import ContainerSidebar from '@/components/container-sidebar/index.vue'
import Sidebar from './components/sidebar.vue'
import IconSelectInput from '@/components/icon-select-input/index.vue'

import useDictionary from '@/mixins/dictionary'
import { havePermission } from '@/utils'
import { VIRTUAL_ID_KEY } from './index.js'

import { infoApi, addApi, editApi } from '@/api/menu'

const { dictionaryList, getDictionary } = useDictionary()

const refContainerSidebar = ref()
const refForm = ref()
const active = ref('')
const loading = ref(false)
const form = reactive({
  id: null,
  name_cn: '',
  name_en: '',
  path: '',
  name: '',
  url: '',
  permission: '',
  type: '',
  icon: '',
  show: 1,
  tab: 1,
  multiple: 0,
  keepalive: 0,
  sort: 1,
  parent_id: ''
})
const row = ref(null) // todo: 引用传递 用于编辑之后修改 列表数据
const parentType = ref(0) // 父级的类型
const rules = reactive(function() {
  const checkUrl = (_rule, value, callback) => {
    const types = [1, 3, 4]
    if (types.includes(form.type) && !value) {
      callback(new Error('请输入路由Path / Http[s] URL'))
    } else {
      callback()
    }
  }
  const checkPermission = (_rule, value, callback) => {
    const types = [2]
    if (types.includes(form.type) && !value) {
      callback(new Error('请输入授权标识'))
    } else {
      callback()
    }
  }
  const checkIcon = (_rule, value, callback) => {
    const types = [0, 1, 3, 4]
    if (types.includes(form.type) && !value) {
      callback(new Error('请输入授权标识'))
    } else {
      callback()
    }
  }
  return {
    name_cn: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
    name_en: [{ required: false, message: '请输入英文名称', trigger: 'blur' }],
    url: [
      { required: false, message: '请输入路由Path / Http[s] URL', trigger: 'blur' },
      { validator: checkUrl, trigger: 'blur' }
    ],
    permission: [
      { required: false, message: '请输入授权标识', trigger: 'blur' },
      { validator: checkPermission, trigger: 'blur' }
    ]
    // icon: [
    //   { required: false, message: '请选择图标', trigger: 'change' },
    //   { validator: checkIcon, trigger: 'blur' }
    // ]
  }
}())

const getInfo = async () => {
  loading.value = true
  const r = await infoApi(form.id)
  if (r) {
    form.name_cn = r.data.name_cn
    form.name_en = r.data.name_en
    form.path = r.data.path
    form.name = r.data.name
    form.url = r.data.url
    form.permission = r.data.permission
    form.type = r.data.type
    form.icon = r.data.icon || ''
    form.show = r.data.show
    form.tab = r.data.tab
    form.multiple = r.data.multiple
    form.keepalive = r.data.keepalive
    form.sort = r.data.sort
    form.parent_id = r.data.parent_id
  }
  nextTick(() => { loading.value = false })
}

const clearFrom = () => {
  form.id = null,
  form.name_cn = ''
  form.name_en = ''
  form.path = ''
  form.name = ''
  form.url = ''
  form.permission = ''
  form.icon = ''
  // refForm.value.resetFields()
}

const clearRouterParams = () => {
  form.show = 1
  form.tab = 1
  form.multiple = 0
  form.keepalive = 0
}

const changeHandle = (val) => {
  refContainerSidebar.value.setScrollTop()
  row.value = row
  parentType.value = parentType
  if ((val.row.id + '').includes(VIRTUAL_ID_KEY)) {
    clearFrom()
    form.name_cn = val.row.name_cn
    form.name_en = val.row.name_en
    form.parent_id = val.row.parent_id
    form.type = val.row.type
    form.tab = 0
    form.sort = 1
  } else {
    form.id = val.row.id
    getInfo()
  }
}

const buttonHandle = (val) => {
  let result = false
  switch (parentType.value) {
    case 0:
      if (val === 2) {
        result = true
      }
      break
    case 1:
      if (val === 0 || val === 3 || val === 4) {
        result = true
      }
      break
  }
  return result
}

const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const r = form.id ? await editApi(form) : await addApi(form)
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        if (r.data) {
          row.value.id = r.data
          form.id = r.data.id
        }
        row.value.name_cn = form.name_cn
        row.value.name_en = form.name_en
        row.value.type = form.type
      }
    }
  })
}

onBeforeMount(() => {
  getDictionary('menu')
})

</script>

<style lang="scss" scoped>
.name-box {
  font-weight: bold;
}
</style>
