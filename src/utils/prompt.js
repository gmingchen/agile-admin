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
    if (single) {
      if (document.getElementsByClassName('el-message').length === 0 || document.getElementsByClassName('el-message')[0].style.display === 'none') {
        ElMessage(options)
      }
    } else {
      ElMessage(options)
    }
  }
}
