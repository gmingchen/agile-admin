import { uploadApi } from '@/api/file'

const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter

// toolbar工具栏的工具选项（默认展示全部）
export const toolOptions = [
  ['bold'], // 加粗
  ['italic'], // 斜体
  ['strike'], // 中横线
  ['underline'], // 加粗
  [{ 'font': [] }], // 下横线
  [{ 'size': [] }], // 字体大小
  [{ 'color': [] }], // 字体颜色
  [{ 'background': [] }], // 背景色
  [{ 'script': 'sub' }], // 脚本位置-上
  [{ 'script': 'super' }], // 脚本位置-下
  [{ 'header': [1, 2, 3, 4, 5, 6] }], // H标签
  [{ 'indent': '-1' }], // 行缩进-向左
  [{ 'indent': '+1' }], // 行缩进-向右
  [{ 'align': [] }], // 居中方式
  ['blockquote'], // 块引用
  [{ 'list': 'ordered' }], // 列表-数字
  [{ 'list': 'bullet' }], // 列表-点
  [{ 'direction': 'rtl' }], // 方向
  // ['code-block'], // 代码块
  ['link'], // 超链接
  // ['formula'], // 公式
  ['image'], // 上传图片
  ['video'], // 上传视频
  ['clean'] // 清除
]
export const handlers = {
  image: function image () {
    const self = this
    let fileInput = this.container.querySelector('input.ql-image[type=file]')
    if (fileInput === null) {
      // 创建图片上传input标签
      fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      // 设置图片参数名
      fileInput.setAttribute('name', 'file')
      // 可设置上传图片的格式
      fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon')
      fileInput.classList.add('ql-image')
      // 监听选择文件
      fileInput.addEventListener('change', function () {
        const params = {
          file: fileInput.files[0]
        }
        uploadApi(params).then(r => {
          if (r) {
            const length = self.quill.getSelection(true).index
            self.quill.insertEmbed(length, 'image', r.data.url)
            self.quill.setSelection(length + 1)
          }
        })
      })
      this.container.appendChild(fileInput)
    }
    fileInput.click()
  }
}

export const options = {
  debug: 'warn',
  theme: 'snow', // 主题 snow / bubble
  placeholder: '请输入...',
  readOnly: false,
  modules: {
    toolbar: {
      container: toolOptions,
      handlers: handlers
    }
  }
}

/**
 * 获取html字符串
 */
export const delta2Html = (delta) => {
  const deltaOptions = {
    inlineStyles: {
      align: (val) => {
        return `text-align: ${ val }`
      }
    }
  }
  const html = new QuillDeltaToHtmlConverter(delta.ops, deltaOptions).convert()
  return html
}
