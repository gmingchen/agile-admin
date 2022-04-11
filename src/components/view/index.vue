<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in" mode="out-in">
      <keep-alive :include="$route.meta.keepAlive ? '': []">
        <component :is="Component" class="component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
