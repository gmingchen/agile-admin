// todo: 手动导入
// import home from './home'
// import demo from './demo'
// export const menus = [
//   ...home,
//   ...demo,
// ]
// todo: 自动导入 由于是函数自动导入数据 所以需要手动设置模块顺序
const modulesSort = ['home', 'demo']
export const permissions = []
const menuFiles = import.meta.glob('./**/index.js', { eager: true})
for (const key in menuFiles) {
  const list = menuFiles[key].default
  for (let i = 0; i < list.length; i++) {
    const menu = list[i];
    const index = modulesSort.indexOf(menu.value)
    if (index !== -1) {
      permissions[index] = menu
    }
  }
}
