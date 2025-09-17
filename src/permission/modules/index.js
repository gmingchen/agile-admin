// todo: 可以在一个文件内写这些数据，分文件夹是因为都在一个文件内数据太多看起来有点累

// todo: 手动导入
// import home from './home'
// import demo from './demo'
// import user from './user'
// import system from './system'
// import infrastructure from './infrastructure'
// import personal from './personal'
// export const permissions = [
//   ...home,
//   ...demo,
//   ...user,
//   ...system,
//   ...infrastructure,
//   ...personal,
// ]
// todo: 自动导入 由于是函数自动导入数据 所以需要手动设置模块顺序
const modulesSort = ['home', 'demo', 'user', 'system', 'infrastructure', 'personal']
export const permissions = []
const permissionFiles = import.meta.glob('./*/index.js', { eager: true })
for (const key in permissionFiles) {
  const list = permissionFiles[key].default
  const name = key.replace(/\.\/|\/index.js/g, '')
  for (let i = 0; i < list.length; i++) {
    const permission = list[i];
    const index = modulesSort.indexOf(name)
    if (index !== -1) {
      permissions[index] = permission
    }
  }
}
