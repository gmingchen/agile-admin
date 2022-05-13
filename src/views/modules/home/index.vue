<template>
  <Container>
    <template #default>
      <el-row>
        <el-col :span="24">阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的</el-col>
      </el-row>
      <p v-for="item in 30" :key="item">{{item}}阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的</p>
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
