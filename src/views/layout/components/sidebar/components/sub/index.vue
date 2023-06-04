<script setup>
import SubTtem from './index.vue'
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
    case 4: // 外链
      window.open(props.data.url)
      break
    case 1: // 菜单
    case 3: // iframe
      router.push({ name: props.data.name })
      break
  }
}
</script>

<template>
  <el-sub-menu v-if="data.children && data.children.length > 0" :index="data.name || data.id + ''">
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
