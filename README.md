<p align="center">
  <a href="https://github.com/vuejs/vue-next">
    <img src="https://img.shields.io/badge/vue-3.0-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-1.x-brightgreen.svg" alt="element-plus">
  </a>
  <a href="https://github.com/microsoft/TypeScript">
    <img src="https://img.shields.io/badge/typescript-4.x-brightgreen.svg" alt="typescript">
  </a>
</p>

[vue3-element-plus-admin](https://github.com/gmingchen/vue3-element-plus-admin)主要目的在于学习 __`vue3`__ + __`ts`__,功能还未很完善,目前只有基础的 __`RBAC`__ 权限控制,后续会 __`持续迭代更新`__。

后端是基于 __`java`__ 的 __`springboot`__,由于后端还 __`未完善`__,存在问题有很多,所以目前 __`暂未开源`__。待功能完成后 __`会开源后端代码`__。如有需求也可翻到底部 __`添加微信/QQ`__ 索取后端代码。

### 简介

[vue3-element-plus-admin](https://github.com/gmingchen/vue3-element-plus-admin) 是一个管理后台基础功能框架，基于 [vue3](https://github.com/vuejs/vue-next) 、 [element-plus](https://github.com/element-plus/element-plus) 和 [typescript](https://github.com/microsoft/TypeScript) 实现。内置了 i18n 国际化，动态路由，权限验证。

- [在线预览](https://gmingchen.github.io/vue3-element-plus-admin/index.html)

**默认 master 分支默认使用 composition-api ，若需要 class 风格 + Typescript 请使用[class-style](https://github.com/1240235512/vue3/tree/class-style)分支，若需要 composition-api + Typescript + I18n 请使用[composition-api](https://github.com/1240235512/vue3/tree/composition-api)分支，若只需要 基础版本 请使用[base](https://github.com/1240235512/vue3/tree/base)分支，但它们不会和 master 保持同步更新**

### 分支
- [master](https://github.com/gmingchen/vue3-element-plus-admin/tree/master) 轻量版本：持续维护分支
- [base](https://github.com/gmingchen/vue3-element-plus-admin/tree/base) 精简版本：基于 RBAC 的权限功能-仅包含 `菜单管理`、`角色管理`、`用户管理` 三个模块
- [composition-api](https://github.com/1240235512/vue3/tree/composition-api) 内置__`Type Script`__、__`I18n`__
- [class-style](https://github.com/1240235512/vue3/tree/class-style) 使用 class 风格开发，内置__`Type Script`__、__`I18n`__

### 功能模块

- [x] 菜单管理
- [x] 角色管理
- [x] 账户管理
- [x] 定时任务
- [x] 文件管理
- [x] 备份管理
- [ ] 区域管理
- [ ] 代码生成器
- [x] 接口文档
- [x] SQL监控
- [ ] 登录日志
- [ ] 定时任务日志
- [ ] 操作日志

### 项目结构

```bash
vue3-src
├─api 接口模块
│
├─assets 静态资源模块
│  ├─icon svg图标
│  ├─images 图片
│  └─sass 样式
│ 
├─components 全局组件模块
│  └─gl-svg svg图标组件
│ 
├─directive 全局自定义指令
│ 
├─element element-plus按需加载
│ 
├─mixins 代码复用 （vue2混入）
│  ├─instance element的$message、$confirm、$loading可进行补充
│  └─page 分页
│ 
├─router 动态路由
│ 
├─store vuex
│  ├─modules
│  │  ├─menu 菜单模块
│  │  ├─setting 设置模块
│  │  ├─tab 标签页模块
│  │  └─user 用户登录信息模块
│  └─index 动态加载模块
│ 
├─types typescript接口
│ 
├─utils 工具模块
│  ├─constants 常量
│  ├─index 工具
│  ├─regular 正则
│  ├─request axios二次封装
│  └─storage 本地缓存工具
│
├─views 视图模块
│  ├─components
│  │  ├─iframe iframe组件用于加载其他页面
│  │  ├─language 国际化设置组件
│  │  └─page 分页组件
│  ├─global
│  │  ├─401 401页面
│  │  ├─404 404页面
│  │  └─login 登录页面
│  ├─layout
│  │  ├─components
│  │  │  ├─edit-info 修改信息
│  │  │  ├─headbar 顶部导航
│  │  │  ├─sidebar 侧边栏
│  │  │  └─tabsbar 标签页
│  │  └─index 布局入口页面
│  └─modules 页面模块

```

### 开发

```bash
# 克隆项目
git clone https://github.com/gmingchen/vue3-element-plus-admin.git

# 进入项目目录
cd vue3

# 安装依赖
npm install

# 启动服务
npm run dev   # 开发环境
npm run prod  # 正式环境
npm run test  # 测试环境

# 发布
npm run build:dev   # 开发环境
npm run build:prod  # 正式环境
npm run build:test  # 测试环境
```

### 联系方式

<table>
  <tr>
    <td>
      <img src="https://gmingchen.github.io/vue3-element-plus-admin/wechat.jpg" width="200px" title="微信" alt="WeChat:Gy1240235512" />
    </td>
    <td>
      <img src="https://gmingchen.github.io/vue3-element-plus-admin/qicq.jpg" width="200px" title="QQ" alt="QQ:1240235512" />
    </td>
  </tr>
</table>
