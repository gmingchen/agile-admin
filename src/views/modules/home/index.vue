<template>
  <Container>
    <template #default>
      <p v-for="item in 30" :key="item">{{item}}阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的阿斯都费劲阿是大姐夫哦啊司机是奥斯大姐夫哦爱神的箭覅哦啊是大姐夫ioasjd奥斯大姐夫爱睡觉的</p>
    </template>

  </Container>
</template>

<script >
import { defineComponent, onBeforeMount } from 'vue'

import Container from '@/components/container'

export default defineComponent({
  components: { Container },
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
