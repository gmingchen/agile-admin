<template>
  <Container ref="containerRef" :class="n.b()">
    <template #sidebar>
      <Sidebar v-model="active" @change="onChange" />
    </template>
    <div :class="n.e('name')">{{ form.name }}&nbsp;</div>
    <el-row v-show="active" class="mt-20">
      <el-col :xs="24" :sm="24" :md="16" :lg="14" :xl="10">
        <el-form
          v-loading="loading"
          :model="form"
          :rules="rules"
          ref="formRef"
          label-position="top"
          :disabled="!hasPermission('permission:create|permission:update')"
          @keyup.enter="onSubmit()">
          <el-form-item label="中文名称" prop="name">
            <el-input v-model="form.name" placeholder="中文名称" maxlength="20" show-word-limit />
          </el-form-item>
          <el-form-item label="授权标识" prop="permission">
            <el-input v-model="form.permission" placeholder="授权标识" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="form.type" @change="onPermissionTypeChange">
              <el-radio-button
                v-for="item in premissionTypes"
                :key="item.code"
                :value="item.code"
                :label="item.name"
                :disabled="handlePermissionDisabled(item.code)" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="组件名称（若为空则无法进行缓存）" prop="componentName" v-if="form.type == PERMISSION_TYPE_ENUM.ROUTER || form.type == PERMISSION_TYPE_ENUM.MENU">
            <el-input v-model="form.componentName" placeholder="路由Name" />
          </el-form-item>
          <el-form-item
            label="组件Path（src/views/modules 为根目录，须省略组件文件的 .vue 后缀）/ Http[s] URL"
            prop="url"
            v-if="form.type !== PERMISSION_TYPE_ENUM.CATALOG && form.type !== PERMISSION_TYPE_ENUM.GROUP && form.type !== PERMISSION_TYPE_ENUM.BUTTON">
            <el-input v-model="form.url" placeholder="路由Path / Http[s] URL" />
          </el-form-item>
          <el-form-item label="路由Path（若为空则按照url路径处理）" prop="routePath" v-if="form.type == PERMISSION_TYPE_ENUM.ROUTER || form.type == PERMISSION_TYPE_ENUM.MENU">
            <el-input v-model="form.routePath" placeholder="路由Path" />
          </el-form-item>
          <el-form-item label="路由Name（若为空则按照url路径处理）" prop="routeName" v-if="form.type == PERMISSION_TYPE_ENUM.ROUTER || form.type == PERMISSION_TYPE_ENUM.MENU">
            <el-input v-model="form.routeName" placeholder="路由Name" />
          </el-form-item>
          <el-form-item label="路由重定向 name 属性值（用于嵌套路由）" prop="redirectName" v-if="form.type == PERMISSION_TYPE_ENUM.ROUTER">
            <el-input v-model="form.redirectName" placeholder="路由Name" />
          </el-form-item>
          <el-form-item label="图标" prop="icon" v-if="form.type !== PERMISSION_TYPE_ENUM.BUTTON">
            <IconPicker v-model="form.icon" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" :min="1" controls-position="right" />
          </el-form-item>
          <template v-if="form.type == PERMISSION_TYPE_ENUM.ROUTER || form.type === PERMISSION_TYPE_ENUM.MENU || form.type === PERMISSION_TYPE_ENUM.IFRAME">
            <el-form-item label="是否在侧边菜单栏显示（如：个人中心，详情页都不需要显示）" prop="show">
              <Dict v-model="form.show" :code="DICT_CODE_ENUM.WHETHER" />
            </el-form-item>
            <el-form-item label="是否在tab页签显示" prop="tab">
              <Dict v-model="form.tab" :code="DICT_CODE_ENUM.WHETHER" />
            </el-form-item>
            <template v-if="form.type == PERMISSION_TYPE_ENUM.ROUTER || form.type === PERMISSION_TYPE_ENUM.MENU">
              <el-form-item label="是否支持tab页签多开（如：用户1的详情页、用户2的详情并存在tab页签）" prop="multiple">
                <Dict v-model="form.multiple" :code="DICT_CODE_ENUM.WHETHER" />
              </el-form-item>
              <el-form-item label="是否支持缓存（若是路由不设置缓存，但其下的菜单或路由设置了缓存，那么离开这个路由页将不会继续缓存）" prop="keepalive">
                <Dict v-model="form.keepalive" :code="DICT_CODE_ENUM.WHETHER" />
              </el-form-item>
            </template>
          </template>
          <el-form-item label="是否启用" prop="status">
            <Dict v-model="form.status" :code="DICT_CODE_ENUM.STATUS" />
          </el-form-item>
          <el-form-item v-permission="'permission:create|permission:update'">
            <el-button v-repeat type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </Container>
</template>

<script setup>
import { Container, Dict } from '@/components'
import { Sidebar, IconPicker } from './components'
import { useDictStore } from '@/stores'
import { hasPermission } from '@/permission'
import { PERMISSION_TYPE_ENUM, DICT_CODE_ENUM } from '@/common/enums'
import { VIRTUAL_ID_KEY } from './config.js'
import { permissionInfoApi, permissionCreateApi, permissionUpdateApi } from '@/apis'
import { useNamespace } from '@/hooks'

const n = useNamespace('permission')

const dictStore = useDictStore()
const premissionTypes = computed(() => dictStore.dicts[DICT_CODE_ENUM.PERMISSION_TYPE])

const containerRef = useTemplateRef('containerRef')

const loading = ref(false)
const active = ref('')

const row = ref(null) // todo: 引用传递 用于编辑之后修改 列表数据
const parentType = ref(0) // 父级的类型
const formRef = useTemplateRef('formRef')
const form = reactive({
  id: null,
  name: '',
  routePath: '',
  routeName: '',
  redirectName: '',
  componentName: '',
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
  status: ''
})
const checkUrl = (_rule, value, callback) => {
  const types = [PERMISSION_TYPE_ENUM.MENU, PERMISSION_TYPE_ENUM.IFRAME, PERMISSION_TYPE_ENUM.URL]
  if (types.includes(form.type) && !value) {
    callback(new Error('请输入路由Path / Http[s] URL'))
  } else {
    callback()
  }
}
const checkPermission = (_rule, value, callback) => {
  const types = [PERMISSION_TYPE_ENUM.BUTTON]
  if (types.includes(form.type) && !value) {
    callback(new Error('请输入授权标识'))
  } else {
    callback()
  }
}
const rules = computed(() => {
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
})

const getData = async () => {
  loading.value = true
  await permissionInfoApi({ id: form.id }).then(r => {
    if (r) {
      form.name = r.data.name
      form.routePath = r.data.routePath
      form.routeName = r.data.routeName
      form.redirectName = r.data.redirectName
      form.componentName = r.data.componentName
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
    nextTick(() => loading.value = false)
  })
}

const clearFrom = () => {
  form.id = null,
  form.name = ''
  form.routePath = ''
  form.routeName = ''
  form.redirectName = ''
  form.componentName = ''
  form.url = ''
  form.permission = ''
  form.icon = ''
}

const handlePermissionDisabled = (code) => {
  if (parentType.value === PERMISSION_TYPE_ENUM.CATALOG || parentType.value === PERMISSION_TYPE_ENUM.GROUP) {
    return code === PERMISSION_TYPE_ENUM.BUTTON
  } else if (parentType.value === PERMISSION_TYPE_ENUM.ROUTER) {
    return code === PERMISSION_TYPE_ENUM.CATALOG || code === PERMISSION_TYPE_ENUM.GROUP
  } else if (parentType.value === PERMISSION_TYPE_ENUM.MENU) {
    return code !== PERMISSION_TYPE_ENUM.BUTTON && code !== PERMISSION_TYPE_ENUM.MENU
  } else {
    return false
  }
}

const onChange = async (data) => {
  if (!data) {
    active.value = ''
    return
  }
  const { id, name, parentId, type } = data.row
  if ((id + '').includes(VIRTUAL_ID_KEY)) {
    clearFrom()
    form.name = name
    form.parentId = parentId
    form.type = type
    form.tab = 0
    form.sort = 1
  } else {
    form.id = id
    await getData()
  }
  row.value = data.row
  parentType.value = data.parentType
  containerRef.value.setScrollTop()
}

const onPermissionTypeChange = () => {
  form.show = 1
  form.tab = 1
  form.multiple = 0
  form.keepalive = 0
}

const onSubmit = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      const r = form.id ? await permissionUpdateApi(form) : await permissionCreateApi(form)
      if (r) {
        ElMessage.success('操作成功!')
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
</script>

<style lang="scss" scoped>
@use '@/assets/sass/bem.scss' as *;
@include b(permission) {
  @include e(name) {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
