<template>
  <el-sub-menu v-if="data.children && data.children.length > 0" :index="data.name || data.id + ''">
    <template #title>
      <Iconfont :name="data.icon" :class="{ 'padding_r-5' : !collapse }" v-if="data.icon" />
      <span>{{ data.name_cn }}</span>
    </template>
    <sub-item v-for="item in data.children" :key="item.id" :data="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="data.name || data.id + ''" @click="clickHandle">
    <Iconfont :name="data.icon" :class="{ 'padding_r-5' : !collapse }" v-if="data.icon" />
    <template #title>
      <span>{{ data.name_cn }}</span>
    </template>
  </el-menu-item>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'SubItem',
  props: {
    data: {
      type: Object,
      required: true
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
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

    return {
      clickHandle
    }
  }
})
</script>
