<script setup>
defineProps({
  // 过度动画 不传则没有动画
  transition: {
    type: String,
    default: () => ''
  }
})

const menuStore = useMenuStore()
const tabsStore = useTabsStore()

const keepalives = computed(() => {
  const list = []
  fo:for (let i = 0; i < tabsStore.tabs.length; i++) {
    const tab = tabsStore.tabs[i]
    for (let j = 0; j < menuStore.keepaliveMenus.length; j++) {
      const menu = menuStore.keepaliveMenus[j]
      if (menu.id === tab.menuId) {
        list.push(menu.componentName)
        continue fo
      }
    }
  }
  return list
})

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
          <component :is="Component" />
        </keep-alive>
      </transition>
    </template>
    <template v-else>
      <keep-alive :include="keepalives">
        <component :is="Component" />
      </keep-alive>
    </template>
  </router-view>
</template>
