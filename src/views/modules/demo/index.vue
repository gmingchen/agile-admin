<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-01 16:37:45
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-07 10:27:47
-->
<template>
  <div class="demo">
    <gl-svg name="development" />
    <gl-button @click="test()" sort="save" />
    <quill v-model="content" />
    {{ content }}
    <div v-html="content" />
    <p
      v-for="item in 20"
      :key="item"
      @click="router.push({ name: 'demo', query: { id: item } })"
      :class="`ddd margin_t-${item} ellipse-${item} relative-${item}`">p-{{item}}</p>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import Quill from '@/components/editor/quill/index.vue'

export default defineComponent({
  components: { Quill },
  setup() {
    const router = useRouter()

    const data = reactive({
      content: '<h2>标题2</h2>'
    })

    const test = () => {
      console.log('content', data.content)
    }

    onBeforeMount(() => {
      console.log('init')
    })
    return {
      router,
      ...toRefs(data),
      test
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/sass/_mixin.scss';
.demo {
  width: 100%;
}
</style>
