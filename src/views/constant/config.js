const links = [
  'https://www.iqiyi.com/',
  'https://youku.com/channel/webhome',
  'https://v.qq.com/',
  'https://www.mgtv.com/',
  'https://www.4399.com/',
]

export const openLink = () => {
  const index = Math.floor(Math.random() * 5)
  const link = links[index]
  window.open(link, '_self')
}
