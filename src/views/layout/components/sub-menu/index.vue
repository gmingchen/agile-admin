<script setup>
import SubTtem from './index.vue'
import { MenuType } from '@enums'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const router = useRouter()
/**
 * 菜单点击事件
 * @param name 路由名称
 */
const clickHandle = () => {
  switch (props.data.type) {
    case MenuType.URL: // 外链
      window.open(props.data.url)
      break
    case MenuType.ROUTER: // 路由
    case MenuType.MENU: // 菜单
    case MenuType.IFRAME: // iframe
      router.push({ name: props.data.name })
      break
  }
}
</script>

<template>
  <el-menu-item-group title="Group One" v-if="data.type === 5" :index="data.name || data.id + ''">
    <template #title>
      <Iconfont :name="data.icon" class="padding_r-5" v-if="data.icon" />
      <span>{{ data.label }}</span>
    </template>
    <SubTtem v-for="item in data.children" :key="item.id" :data="item" />
  </el-menu-item-group>
  <el-sub-menu v-else-if="data.children && data.children.length > 0" :index="data.name || data.id + ''">
    <template #title>
      <Iconfont :name="data.icon" class="padding_r-5" v-if="data.icon" />
      <span>{{ data.label }}</span>
    </template>
    <SubTtem v-for="item in data.children" :key="item.id" :data="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="data.name || data.id + ''" @click="clickHandle">
    <Iconfont :name="data.icon" class="padding_r-5" v-if="data.icon" />
    <template #title>
      <span>{{ data.label }}</span>
    </template>
  </el-menu-item>
</template>
