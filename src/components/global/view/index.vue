<script setup>
import { cacheHandle } from '@/utils/cache'

const props = defineProps({
  // 过度动画 不传则没有动画
  transition: {
    type: String,
    default: () => ''
  },
  rename: {
    type: Boolean,
    default: () => false
  }
})

const route = useRoute()

const menuStore = useMenuStore()

const keepalives = computed(() => menuStore.keepaliveNames)

/**
 * 开始进入动画时将父级元素 overflow 设置为空
 * @param {*} el
 */
const onEnter = (el) => {
  const parent = el.parentNode
  parent.style.overflow = ''
}
/**
 * 开始进入动画时将父级元素 overflow 设置为 hidden
 * 处理滚动条问题
 * @param {*} el
 */
const onLeave = (el) => {
  const parent = el.parentNode
  parent.style.overflow = 'hidden'
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <template v-if="transition">
      <transition
        :name="transition"
        mode="out-in"
        @enter="onEnter"
        @leave="onLeave">
        <keep-alive :include="keepalives">
          <component :is="rename ? cacheHandle(Component, route) : Component" />
        </keep-alive>
      </transition>
    </template>
    <template v-else>
      <keep-alive :include="keepalives">
        <component :is="rename ? cacheHandle(Component, route) : Component" />
      </keep-alive>
    </template>
  </router-view>
</template>
