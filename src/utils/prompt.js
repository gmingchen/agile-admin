import { ElMessage } from 'element-plus'

const prompt = Symbol('prompt')

export default class Prompt {
  success (options, single = true) {
    options.type = 'success'
    this[prompt](options, single)
  }
  warning (options, single = true) {
    options.type = 'warning'
    this[prompt](options, single)
  }
  info (options, single = true) {
    options.type = 'info'
    this[prompt](options, single)
  }
  error (options, single = true) {
    options.type = 'error'
    this[prompt](options, single)
  }
  [prompt] (options, single) {
    options = { ...options, grouping: true }
    if (single) {
      if (document.getElementsByClassName('el-message').length === 0) {
        ElMessage(options)
        return
      }
      const elements = document.getElementsByClassName('el-message')
      if (elements.length) {
        let flag = false
        for (let index = 0; index < elements.length; index++) {
          const element = elements[index]
          if (element.style.display !== 'none' && element.style.display !== '') {
            flag = true
          }
        }
        if (flag) {
          ElMessage(options)
        }
      }
    } else {
      ElMessage(options)
    }
  }
}
