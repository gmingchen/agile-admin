<script setup>
import Upload from '@/components/upload/index.vue'
</script>

<template>
  <Upload
    class="width-100 height-100"
    :show-file-list="false"
    accept="image/*"
    v-bind="$attrs">
    <template v-slot="{ url }">
      <img v-if="url" :src="url" class="image height-full width-full">
      <Iconfont name="plus" v-else />
    </template>
  </Upload>
</template>

<style lang="scss" scoped>
::v-deep(.el-upload), ::v-deep(.el-upload-list) {
  height: 100%;
  width: 100%;
}
::v-deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
  }
}
.image {
  object-fit: contain;
}
</style>
