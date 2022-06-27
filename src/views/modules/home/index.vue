<template>
  <Container>
    <template #default>
      <el-row>
        <el-col :span="24">
          apidoc -i ./ -o slipper-backstage/src/main/resources/static/apidoc
        </el-col>
      </el-row>
    </template>
  </Container>
</template>

<script >
import { defineComponent, onBeforeMount } from 'vue'

export default defineComponent({
  setup() {
    onBeforeMount(() => {
      console.log('reload')
    })
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
