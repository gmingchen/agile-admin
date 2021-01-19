<!--
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-01-19 13:54:30
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-01-19 14:36:17
-->
<template>
  <div class="fog">
    <div class="fog__container">
      <div class="fog__img fog__img--first" />
      <div class="fog__img fog__img--second" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.fog {
  position: fixed;
  height: 100%;
  width: 100%;
  // background-image: url('../../assets/images/login/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -moz-background-size: 100% 100%;
}
.fog__container {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.fog__img {
  position: absolute;
  height: 100vh;
  width: 300vw;
}
.fog__img--first {
  background: url('../../assets/images/login/fog-1.png') repeat-x;
  background-size: contain;
  background-position: center;
  -webkit-animation: marquee 60s linear infinite;
  animation: marquee 60s linear infinite;
}
.fog__img--second {
  background: url('../../assets/images/login/fog-2.png') repeat-x;
  background-size: contain;
  background-position: center;
  -webkit-animation: marquee 40s linear infinite;
  animation: marquee 40s linear infinite;
}
@-webkit-keyframes marquee {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-200vw, 0, 0);
    transform: translate3d(-200vw, 0, 0);
  }
}
@keyframes marquee {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    -webkit-transform: translate3d(-200vw, 0, 0);
    transform: translate3d(-200vw, 0, 0);
  }
}
</style>
