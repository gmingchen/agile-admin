<template>
  <div class="home">
    <svg-icon name="home"></svg-icon><hr>
    <el-button type="primary" @click="Loading">Loading</el-button><hr>
    <el-button type="primary" @click="Message">Message</el-button><hr>
    <el-button type="primary" @click="Alert">Alert</el-button><hr>
    <el-button type="primary" @click="Confirm">Confirm</el-button><hr>
    <el-button type="primary" @click="Prompt">Prompt</el-button><hr>
    <el-button type="primary" @click="Notify">Notify</el-button>
  </div>
</template>

<script lang="ts">
import { Loading, Message, Alert, Confirm, Prompt, Notify } from '@/mixins/element/index'
import { Options } from 'vue-class-component'
import { Mixins } from 'vue-property-decorator'

@Options({})
export default class Index extends Mixins(Loading, Message, Alert, Confirm, Prompt, Notify) {
  Loading () {
    const loading = this.$loading({
      target: document.body,
      body: false,
      fullscreen: true,
      lock: false,
      text: 'loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass: ''
    })
    setTimeout(() => {
      loading.close()
    }, 2000)
  }
  Message () {
    this.$message({
      message: 'message',
      type: 'success', // success / info / warning / error
      iconClass: '',
      dangerouslyUseHTMLString: false,
      customClass: '',
      duration: 3000,
      showClose: false,
      center: false,
      offset: 20,
      onClose: () => {
        console.log('close')
      }
    })
  }
  Alert () {
    this.$alert('内容', '标题', {
      confirmButtonText: '确定',
      callback: action => {
        console.log(action)
      }
    })
  }
  Confirm () {
    this.$confirm('内容', '标题', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      console.log('ok')
    }).catch(() => {
      console.log('cancel')
    })
  }
  Prompt () {
    this.$prompt('请输入邮箱', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      inputErrorMessage: '邮箱格式不正确'
    }).then(({ value }) => {
      console.log(value)
    }).catch(() => {
      console.log('cancel')
    })
  }
  Notify () {
    this.$notify({
      title: '标题',
      message: '说明文字',
      dangerouslyUseHTMLString: false,
      type: 'success',	// success/warning/info/error
      iconClass: '',
      customClass: '',
      duration: 4500,
      position: 'top-right', // top-right/top-left/bottom-right/bottom-left
      showClose: true,
      onClose: () => {
        console.log('close')
      },
      onClick: () => {
        console.log('click')
      },
      offset: 0
    })
  }
}
</script>
