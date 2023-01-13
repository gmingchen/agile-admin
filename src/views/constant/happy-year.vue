<template>
  <el-dialog
    v-model="visible"
    title="新年快乐"
    width="500px"
    :before-close="beforeCloseHandle"
    :close-on-click-modal="false"
    :show-close="false">
    <div class="content">
      <p>新年到，祝福先送到。</p>
      <p>一送福气，愿你事业步步高。</p>
      <p>二送吉祥，愿好事都来到。</p>
      <p>三送如意，愿快乐幸福围你绕。</p>
      <p class="text-align-center">祝您新年快乐!</p>
    </div>
    <div class="footer flex-box flex_j_c-space-between flex_a_i-center">
      <span class="tips">ps:过年啦，大家还是不要卷啦，留条活路吧！！！</span>
      <transition-group name="button-list" tag="div">
        <el-button
          v-for="item in buttons"
          :key="item.id"
          :class="item.class"
          @click="item.click"
          :type="item.type"
          @mouseenter="mouseEnterHandle(item)">
          {{ item.text }}
        </el-button>
      </transition-group>
    </div>
  </el-dialog>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue";

import { ElMessageBox } from 'element-plus'

import { openLink } from './config.js'

export default defineComponent({
  setup() {
    const visible = ref(true)

    const buttons = ref([
      { 
        id: 1,
        text: '不卷啦', 
        click: () => {
          openLink()
        },
        class: 'cancel',
        type: 'default'
      },
      { 
        id: 2,
        text: '继续卷', 
        click: () => { console.log(1) },
        class: 'confirm',
        type: 'primary'
      }
    ])

    const mouseEnterHandle = ({ id }) => {
      if (id === 2) {
        buttons.value = [buttons.value[1], buttons.value[0]]
      }
    }

    const beforeCloseHandle = (done) => {
      ElMessageBox.confirm(
        '居然被你发现了关闭弹窗的方式，确定要继续卷?',
        '恭喜',
        {
          confirmButtonText: '继续卷',
          cancelButtonText: '不卷啦',
          type: 'warning',
        }
      ).then(() => {
        done()
      }).catch(() => {
        openLink()
      })
    }

    onBeforeMount(() => {
      // 禁止右键弹出控制台
      window.addEventListener("contextmenu", e => e.preventDefault())
      // 禁止F12弹出控制台
      window.addEventListener("keydown", e => e.key === "F12" && e.preventDefault())
    })

    return {
      visible,
      buttons,
      mouseEnterHandle,
      beforeCloseHandle
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  font-size: 16px;
  p:not(:first-child) {
    text-indent: 2em;
  }
}
.footer {
  padding-bottom: 15px;
  text-align: right;
  .tips {
    text-align: right;
    font-size: 12px;
    color: #C0C4CC;
  }
}
.button-list-move {
  transform: 1s;
}
</style>