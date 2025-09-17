<template>
  <el-config-provider :size="size" :locale="locale" :z-index="zIndex">
    <View></View>
  </el-config-provider>
</template>

<script setup>
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { View } from "@/components";

const size = ref("default");
const locale = ref(zhCn);
const zIndex = ref(2000);

</script>

<style>
#app {
  height: 100%;
  overflow: auto;
}
</style>
