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

### __`注：目前由于该项目 svg 是保存在项目里面，导致 build 完之后文件过大，首次加载速度过慢。所以准备重构一下该项目，通过阿里图库使用svg图标，并加上企业级管理。会在标签 v5.0.0 上，之后 master 分支也将会在重构之后基础上继续维护！`__

[vue3-element-plus-admin](https://github.com/gmingchen/vue3-element-plus-admin)主要目的在于学习 __`vue3`__ + __`ts`__,功能在完善中,基于的 __`RBAC`__ 权限控制,后续会 __`持续迭代更新`__。

后端是基于 __`java`__ 的 __`springboot`__,目前完整版后端代码 __`暂未开源`__。后期完善之后可能 __`会开源完整后端代码`__。目前开源了[基础版的后端代码](https://github.com/gmingchen/java-admin-base.git)<br>
若该项目有帮助到你可以翻到底部 __`添加作者微信/QQ`__，如果使用中遇到什么问题可以在交流群中说明你遇到的问题，大佬们都会积极的给你解决。

`若Github项目下载代码过慢或失败，可以翻到底部，关注公众号获取基础版` [base-refactoring](https://github.com/gmingchen/vue3-element-plus-admin/tree/base-refactoring) 分支的前后端代码

### 简介

[vue3-element-plus-admin](https://github.com/gmingchen/vue3-element-plus-admin) 是一个管理后台基础功能框架，基于 [vue3](https://github.com/vuejs/vue-next) 、 [element-plus](https://github.com/element-plus/element-plus) 和 [typescript](https://github.com/microsoft/TypeScript) 实现。内置了 i18n 国际化，动态路由，权限验证。

**__`注：`__ 由于国内项目使用国际化功能的比较少，所以主分支没有添加国际化功能，如有需要可以参考 [composition-api](https://github.com/1240235512/vue3/tree/composition-api) 分支。**

- [开发文档](https://gmingchen.github.io/vue3-element-plus-admin-doc/)
- [在线预览(暂时不可用)](https://gmingchen.github.io/vue3-element-plus-admin/index.html)
- [开发文档(备用-服务器比较low，访问有点慢！)](http://frame.gumingchen.icu/docs/)
- [在线预览(备用-服务器比较low，访问有点慢！)](http://frame.gumingchen.icu)

**默认 master 分支默认使用 composition-api ，若需要 class 风格 + Typescript 请使用[class-style](https://github.com/1240235512/vue3/tree/class-style)分支，若需要 composition-api + Typescript + I18n 请使用[composition-api](https://github.com/1240235512/vue3/tree/composition-api)分支，若只需要 基础版本 请使用[base-refactoring](https://github.com/1240235512/vue3/tree/base-refactoring)分支，但它们不会和 master 保持同步更新**

### 分支
- [master](https://github.com/gmingchen/vue3-element-plus-admin/tree/master) 轻量版本：持续维护分支
- [base-refactoring](https://github.com/gmingchen/vue3-element-plus-admin/tree/base-refactoring) 精简版本：基于 RBAC 的权限功能-仅包含 `菜单管理`、`角色管理`、`用户管理` 三个模块
- [composition-api](https://github.com/1240235512/vue3/tree/composition-api) 内置__`Type Script`__、__`I18n`__
- [class-style](https://github.com/1240235512/vue3/tree/class-style) 使用 class 风格开发，内置__`Type Script`__、__`I18n`__
- __`说明:`__ 其他分支是作者开发时使用的分支, 由于 [element-plus](https://github.com/element-plus/element-plus) 版本迭代的原因，项目中间重构过，布局也同步改为 `flex` 布局。 所以 [composition-api](https://github.com/1240235512/vue3/tree/composition-api) 和 [class-style](https://github.com/1240235512/vue3/tree/class-style) 版本比较旧一点，建议这两个分支作为参考学习。 [master](https://github.com/gmingchen/vue3-element-plus-admin/tree/master) 和 [base-refactoring](https://github.com/gmingchen/vue3-element-plus-admin/tree/base-refactoring) 这两个分支是比较新的，可以放心使用。

### 功能模块

- [X] 角色管理
- [X] 账户管理
- [X] 发送邮件/邮件记录
- [X] 登录日志
- [X] 操作日志
- [X] 定时任务日志
- [X] 异常日志
- [X] 菜单管理
- [X] 数据字典
- [X] 配置管理
- [X] 定时任务
- [X] 文件管理 - 现在默认使用的是七牛云，可直接配置存储位置
  - [X] 本地存储
  - [X] 七牛云存储 
- [X] 消息推送
- [X] 区域管理
- [X] 备份管理
- [X] 代码生成器
- [X] 接口文档
- [X] SQL监控

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
├─components 通用组件
│  ├─global 全局组件
│  │  ├─icon element-plus 内置图标组件重新封装
│  │  ├─page 分页组件
│  │  ├─svg 本地svg图片使用组件
│  │  └─index 统一全局注册
│  ├─editor 富文本组件
│  └─look-around 随便看看按钮组件
│ 
├─directive 全局自定义指令
│ 
├─mixins 代码复用 （vue2混入）
│  └─page 分页
│ 
├─router 动态路由
│ 
├─store vuex
│  ├─modules
│  │  ├─dictionary 数据字典模块
│  │  ├─menu 菜单模块
│  │  ├─setting 设置模块
│  │  ├─tab 标签页模块
│  │  └─user 用户登录信息模块
│  └─index 动态加载模块
│ 
├─utils 工具模块
│  ├─constant 常量
│  ├─dictionary 字典
│  ├─index 工具
│  ├─regular 正则
│  ├─request axios二次封装
│  └─storage 本地缓存工具
│
├─views 视图模块
│  ├─global 通用页面
│  │  ├─401 401页面
│  │  ├─404 404页面
│  │  ├─500 500页面
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
cd vue3-element-plus-admin

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
  <tr align="center">
    <td>公众号</td>
    <td>QQ交流群</td>
    <td>微信交流群</td>
    <td>微信</td>
    <td>QQ</td>
  </tr>
  <tr>
    <td>
      <img src="http://oss.gumingchen.icu/image/official-account-qr-code.jpg" width="200px" title="公众号" alt="公众号:loafer-man" />
    </td>
    <td>
      <img src="http://oss.gumingchen.icu/image/qq-group-qr-code.jpg" width="200px" title="QQ交流群" alt="QQ交流群:124371554" />
    </td>
    <td>
      <img src="http://oss.gumingchen.icu/image/wechat-group-qr-code.jpg?time=1" width="200px" title="微信交流群" alt="微信交流群:124371554" />
    </td>
    <td>
      <img src="http://oss.gumingchen.icu/image/wechat-qr-code-1.jpg" width="200px" title="微信" alt="微信:Gy1240235512" />
    </td>
    <td>
      <img src="http://oss.gumingchen.icu/image/qq-qr-code.jpg" width="200px" title="QQ" alt="QQ:1240235512" />
    </td>
  </tr>
</table>

### 其它开源项目

[java-admin-base](https://github.com/gmingchen/java-admin-base)

是一个管理后台基础功能框架 [base-refactoring](https://github.com/gmingchen/vue3-element-plus-admin/tree/base-refactoring) 分支的后端代码，基于 __`java`__ 的 __`springboot`__

[vue3-element-plus-im](https://github.com/gmingchen/vue3-element-plus-im)

是一个即时聊天系统，基于 [vue3](https://github.com/vuejs/vue-next) 、 [element-plus](https://github.com/element-plus/element-plus) 实现。内置了好友私聊功能。

[java-im](https://github.com/gmingchen/java-im)

是[vue3-element-plus-im](https://github.com/gmingchen/vue3-element-plus-im)即时聊天系统的 __`java`__ 后端代码，__`springboot`__ 基于 [netty](https://github.com/netty/netty) 、 [shiro](https://github.com/apache/shiro) 实现。
