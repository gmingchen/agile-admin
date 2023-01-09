import { uploadUrlApi } from '@/api/file'
import { SUCCESS_CODE } from '@/utils/constant'
import Prompt from '@/utils/prompt'

// toolbar工具栏的工具选项（默认展示全部）
export const toolOptions = {
  toolbarKeys: [
    'fontSize',
    'fontFamily',
    'bold',
    'color',
    'bgColor',
    'underline',
    'italic',
    'through',
    'code',
    'sub',
    'sup',
    'emotion',
    'clearStyle',

    'headerSelect',
    'indent',
    'delIndent',
    'justifyLeft',
    'justifyRight',
    'justifyCenter',
    'justifyJustify',
    'lineHeight',
    'blockquote',
    'enter',
    'divider',

    'todo',
    'bulletedList',
    'numberedList',

    'insertImage',
    'uploadImage',
    'editImage',
    'deleteImage',
    'viewImageLink',
    'imageWidth30',
    'imageWidth50',
    'imageWidth100',

    'insertVideo',
    'uploadVideo',
    'editVideoSize',

    'insertLink',
    'editLink',
    'unLink',
    'viewLink',

    'insertTable',
    'tableFullWidth',
    'tableHeader',
    'insertTableRow',
    'deleteTableRow',
    'insertTableCol',
    'deleteTableCol',
    'deleteTable',

    'undo',
    'redo'

    // 'codeSelectLang',
    // 'fullScreen',
  ]
}
// 编辑器配置
export const editorOptions = {
  placeholder: '请输入内容...', // 输入框占位符提示
  readOnly: false, // 是否只读
  autoFocus: true, // 是否自动获得焦点
  scroll: true, // 是否支持滚动
  maxLength: null, // 最大长度
  onMaxLength: (editer) => null, // 当达到 maxlength 限制时，触发该回调函数
  hoverbarKeys: {}, // hover tool 元素的处理
  customPaste: (editor, event) => true, // 自定义粘贴。可阻止编辑器的默认粘贴，实现自己的粘贴逻辑 editor.insertText('xxx')
  customAlert: (message, type) => { // 自定义编辑器 alert
    switch (type) {
      case 'success':
        break
      case 'info':
        break
      case 'warning':
        break
      case 'error':
        break
      default:
        break
    }
    console.log(message)
  },
  MENU_CONF: {
    uploadImage: {
      server: uploadUrlApi(), // 服务端地址
      fieldName: 'file', // 上传文件key
      maxFileSize: 2 * 1024 * 1024, // 单个文件的最大体积限制
      maxNumberOfFiles: 100, // 最多上传文件数量
      allowedFileTypes: ['image/*'], // 选择文件时的类型限制
      meta: {}, // 自定义上传参数, 参数会被添加到 formData
      metaWithUrl: false, // 将 meta 拼接到 url 参数中
      headers: {}, // 自定义增加 http  header
      withCredentials: false, // 跨域是否传递 cookie
      timeout: 10 * 1000, // 超时时间
      onBeforeUpload: (file) => file, // 上传之前触发：return file-上传这个file return false-不上传
      onProgress: (progress) => null, // 上传进度的回调函数 是 0-100 的数字
      onSuccess: (file, res) => null, // 单个文件上传成功之后
      onFailed: (file, res) => null, // 单个文件上传失败
      onError: (file, res) => null, // 上传错误，或者触发 timeout 超时
      customInsert(res, insertFn) { // 自定义插入图片
        const { code, data, message } = res
        if (SUCCESS_CODE.includes(code)) {
          const { url, original } = data
          insertFn(url, original, url)
        } else {
          new Prompt().warning({
            message: message,
            type: 'warning',
            duration: 3000
          })
        }
      }
      // customBrowseAndUpload: () => null // 自定义上传
    },
    uploadVideo: {
      server: uploadUrlApi(), // 服务端地址
      fieldName: 'file', // 上传文件key
      maxFileSize: 5 * 1024 * 1024, // 单个文件的最大体积限制
      maxNumberOfFiles: 5, // 最多上传文件数量
      allowedFileTypes: ['video/*'], // 选择文件时的类型限制
      meta: {}, // 自定义上传参数, 参数会被添加到 formData
      metaWithUrl: false, // 将 meta 拼接到 url 参数中
      headers: {}, // 自定义增加 http  header
      withCredentials: false, // 跨域是否传递 cookie
      timeout: 30 * 1000, // 超时时间
      onBeforeUpload: (file) => file, // 上传之前触发：return file-上传这个file return false-不上传
      onProgress: (progress) => null, // 上传进度的回调函数 是 0-100 的数字
      onSuccess: (file, res) => null, // 单个文件上传成功之后
      onFailed: (file, res) => null, // 单个文件上传失败
      onError: (file, res) => null, // 上传错误，或者触发 timeout 超时
      customInsert(res, insertFn) { // 自定义插入视频
        const { code, data, message } = res
        if (SUCCESS_CODE.includes(code)) {
          const { url, original } = data
          insertFn(url, original, url)
        } else {
          new Prompt().warning({
            message: message,
            type: 'warning',
            duration: 3000
          })
        }
      }
      // customBrowseAndUpload: () => null // 自定义上传
    }
  }
}

