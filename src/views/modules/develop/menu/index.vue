<script setup>
import { ElMessage } from 'element-plus'
import ContainerSidebar from '@/components/container-sidebar/index.vue'
import Sidebar from './components/sidebar.vue'
import IconSelectInput from '@/components/icon-select-input/index.vue'

import useDict from '@/hooks/dict'

import { havePermission } from '@/utils'
import { MenuType, Status } from '@/utils/enum'
import { VIRTUAL_ID_KEY } from './index.js'

import { infoApi, createApi, updateApi } from '@/api/menu'

const { dict, getDict } = useDict()

const refContainerSidebar = ref()
const refForm = ref()
const readonly = ref(!havePermission('menu:create|menu:update'))
const active = ref('')
const loading = ref(false)
const form = reactive({
  id: null,
  name: '',
  routePath: '',
  routeName: '',
  url: '',
  permission: '',
  type: '',
  icon: '',
  show: 1,
  tab: 1,
  multiple: 0,
  keepalive: 0,
  sort: 1,
  parentId: '',
  status: Status.ENABLE
})
const row = ref(null) // todo: 引用传递 用于编辑之后修改 列表数据
const parentType = ref(0) // 父级的类型
const rules = reactive(function() {
  const checkUrl = (_rule, value, callback) => {
    const types = [MenuType.MENU, MenuType.IFRAME, MenuType.URL]
    if (types.includes(form.type) && !value) {
      callback(new Error('请输入路由Path / Http[s] URL'))
    } else {
      callback()
    }
  }
  const checkPermission = (_rule, value, callback) => {
    const types = [MenuType.BUTTON]
    if (types.includes(form.type) && !value) {
      callback(new Error('请输入授权标识'))
    } else {
      callback()
    }
  }
  const checkIcon = (_rule, value, callback) => {
    const types = [MenuType.CATALOG, MenuType.MENU, MenuType.IFRAME, MenuType.URL]
    if (types.includes(form.type) && !value) {
      callback(new Error('请输入授权标识'))
    } else {
      callback()
    }
  }
  return {
    name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    url: [
      { required: false, message: '请输入路由Path / Http[s] URL', trigger: 'blur' },
      { validator: checkUrl, trigger: 'blur' }
    ],
    permission: [
      { required: false, message: '请输入授权标识', trigger: 'blur' },
      { validator: checkPermission, trigger: 'blur' }
    ]
  }
}())

const getInfo = async () => {
  loading.value = true
  const r = await infoApi({ id: form.id })
  if (r) {
    form.name = r.data.name
    form.routePath = r.data.routePath
    form.routeName = r.data.routeName
    form.url = r.data.url
    form.permission = r.data.permission
    form.type = r.data.type
    form.icon = r.data.icon || ''
    form.show = r.data.show
    form.tab = r.data.tab
    form.multiple = r.data.multiple
    form.keepalive = r.data.keepalive
    form.sort = r.data.sort
    form.parentId = r.data.parentId
    form.status = r.data.status
  }
  nextTick(() => { loading.value = false })
}

const clearFrom = () => {
  form.id = null,
  form.name = ''
  form.routePath = ''
  form.routeName = ''
  form.url = ''
  form.permission = ''
  form.icon = ''
}

const clearRouterParams = () => {
  form.show = 1
  form.tab = 1
  form.multiple = 0
  form.keepalive = 0
}

const changeHandle = (val) => {
  refContainerSidebar.value.setScrollTop()
  if (!val) {
    active.value = ''
    return
  } else if ((val.row.id + '').includes(VIRTUAL_ID_KEY)) {
    clearFrom()
    form.name = val.row.name
    form.parentId = val.row.parentId
    form.type = val.row.type
    form.tab = 0
    form.sort = 1
  } else {
    form.id = val.row.id
    getInfo()
  }
  row.value = val.row
  parentType.value = val.parentType
}

const buttonHandle = (val) => {
  let result = false
  switch (parentType.value) {
    case MenuType.CATALOG:
      if (val === MenuType.BUTTON) {
        result = true
      }
      break
    case MenuType.MENU:
      if (val === MenuType.CATALOG || val === MenuType.IFRAME || val === MenuType.URL) {
        result = true
      }
      break
  }
  return result
}

const submit = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      const r = form.id ? await updateApi(form) : await createApi(form)
      if (r) {
        ElMessage({
          message: '操作成功!',
          type: 'success'
        })
        if (r.data) {
          const { id, name, parentId, type, type_type, type_class, type_dict } = r.data
          form.id = id
          row.value.id = id
          row.value.name = name
          row.value.parentId = parentId
          row.value.type = type
          row.value.type_type = type_type
          row.value.type_class = type_class
          row.value.type_dict = type_dict
        }
      }
    }
  })
}

onBeforeMount(() => {
  getDict('MENU')
})
</script>

<template>
  <ContainerSidebar ref="refContainerSidebar" :scroll="false">
    <template #sidebar>
      <Sidebar v-model="active" @change="changeHandle" />
    </template>
    <template #default>
      <div class="name-box margin_b-20 font-size-20">{{form.name}}&nbsp;</div>
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
            <el-form-item label="中文名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="中文名称"
                maxlength="20"
                show-word-limit
                :readonly="readonly" />
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type" :disabled="readonly" @change="clearRouterParams">
                <el-radio-button
                  :label="item.value"
                  :disabled="buttonHandle(item.value)"
                  v-for="item in dict"
                  :key="item.value">{{item.label}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="组件Path（src/views/modules 为根目录，须省略组件文件的 .vue 后缀）/ Http[s] URL"
              prop="url"
              v-if="form.type !== MenuType.CATALOG && form.type !== MenuType.GROUP && form.type !== MenuType.BUTTON">
              <el-input v-model="form.url" placeholder="路由Path / Http[s] URL" :readonly="readonly" />
            </el-form-item>
            <el-form-item label="路由Path（若为空则按照url路径处理）" prop="routePath" v-if="form.type == MenuType.MENU">
              <el-input v-model="form.routePath" placeholder="路由Path" :readonly="readonly" />
            </el-form-item>
            <el-form-item label="路由Name（若为空则按照url路径处理）" prop="routeName" v-if="form.type == MenuType.MENU">
              <el-input v-model="form.routeName" placeholder="路由Name" :readonly="readonly" />
            </el-form-item>
            <el-form-item label="授权标识" prop="permission" v-if="form.type == MenuType.MENU || form.type == MenuType.BUTTON">
              <el-input v-model="form.permission" placeholder="授权标识" :readonly="readonly" />
            </el-form-item>
            <el-form-item label="图标" prop="icon" v-if="form.type !== MenuType.BUTTON">
              <IconSelectInput v-model="form.icon" :readonly="readonly" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input-number
                v-model="form.sort"
                :min="1"
                controls-position="right"
                :disabled="readonly" />
            </el-form-item>
            <template v-if="form.type === MenuType.MENU || form.type === MenuType.IFRAME">
              <el-form-item label="是否在侧边菜单栏显示（如：个人中心，详情页都不需要显示）" prop="show">
                <DictRadio v-model="form.show" code="WHETHER" :disabled="readonly" />
              </el-form-item>
              <el-form-item label="是否在tab页签显示" prop="tab">
                <DictRadio v-model="form.tab" code="WHETHER" :disabled="readonly" />
              </el-form-item>
              <template v-if="form.type === 1">
                <el-form-item label="是否支持tab页签多开（如：用户1的详情页、用户2的详情并存在tab页签）" prop="multiple">
                  <DictRadio v-model="form.multiple" code="WHETHER" :disabled="readonly" />
                </el-form-item>
                <el-form-item label="是否支持缓存" prop="keepalive">
                  <DictRadio v-model="form.keepalive" code="WHETHER" :disabled="readonly" />
                </el-form-item>
                <el-form-item label="是否启用" prop="status">
                  <DictRadio v-model="form.status" code="STATUS" :disabled="readonly" />
                </el-form-item>
              </template>
            </template>
            <el-form-item v-show="!readonly">
              <el-button
                v-repeat
                v-permission="'menu:update'"
                type="primary"
                @click="submit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template>
  </ContainerSidebar>
</template>

<style lang="scss" scoped>
.name-box {
  font-weight: bold;
}
</style>
