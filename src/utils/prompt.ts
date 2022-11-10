import { ElMessage, type MessageOptions, messageTypes } from 'element-plus'

const prompt = Symbol('prompt')

export default class Prompt {
  success (options: MessageOptions, single = true) {
    options.type = messageTypes[0]
    this[prompt](options, single)
  }
  warning (options: MessageOptions, single = true) {
    options.type = messageTypes[2]
    this[prompt](options, single)
  }
  info (options: MessageOptions, single = true) {
    options.type = messageTypes[1]
    this[prompt](options, single)
  }
  error (options: MessageOptions, single = true) {
    options.type = messageTypes[3]
    this[prompt](options, single)
  }
  [prompt] (options: MessageOptions, single: boolean) {
    if (single) {
      if (document.getElementsByClassName('el-message').length === 0) {
        ElMessage(options)
        return
      }
      const elements = document.getElementsByClassName('el-message') as HTMLCollectionOf<HTMLElement>
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
