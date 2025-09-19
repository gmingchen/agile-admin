import { svgs } from './svg'

export const key = 'u8ibq3pnacpk49hw0ojc11ydeszowazcww1jy1kakuv6xnxg'

// 上传
export const registryUploadIcon = (el) => {
  el.ui.registry.addIcon('upload', svgs.uploadSvg);
}
export const registryUploadButton = (el, onAction = (() => { })) => {
  el.ui.registry.addButton('upload', {
    icon: 'upload',
    tooltip: '上传图片或视频',
    onAction
  });
}

const plugins = 'advlist anchor autolink autosave code codesample directionality emoticons fullscreen image insertdatetime link lists media nonbreaking pagebreak preview save searchreplace table visualblocks visualchars wordcount'
const toolbar = [
  'undo redo removeformat searchreplace | fontsizeinput fontfamily forecolor backcolor | bold italic underline strikethrough subscript superscript blockquote ',
  'alignleft aligncenter alignright outdent indent | hr bullist numlist pagebreak ',
  'emoticons insertdatetime table link image media codesample | upload charmap anchor code fullscreen preview'
]
export const config = {
  language_url: new URL(`./lang/zh_CN`, import.meta.url).href,
  language: 'zh_CN',
  height: '100%',
  plugins,
  toolbar,
  iframe_attrs: {
    'class': 'tinymce__iframe'
  }
}
