<p align="center">
  <a href="https://github.com/gmingchen/vue3-element-plus-admin">
    <img src="http://oss.gumingchen.icu/image/slipper.jpeg" alt="logo" width="120">
  </a>
</p>
<p align="center">
  <a href="http://admin.gumingchen.icu/docs/">文档</a> |
  <a href="http://admin.gumingchen.icu">预览</a>
</p>
<p align="center">
  <a href="https://github.com/vuejs/vue-next">
    <img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-1.x-brightgreen.svg" alt="element-plus">
  </a>
  <a href="https://github.com/gmingchen/vue3-element-plus-admin">
    <img src="https://img.shields.io/badge/License-Apache--2.0-brightgreen.svg" />
  </a>
  <a href="https://www.oscs1024.com/project/gmingchen/vue3-element-plus-admin?ref=badge_small">
    <img src="https://www.oscs1024.com/platform/badge/gmingchen/vue3-element-plus-admin.svg?size=small" alt="vue">
  </a>
</p>
<p align="center">
  <a href="https://github.com/gmingchen/vue3-element-plus-admin">
    <img src="https://img.shields.io/github/stars/gmingchen/vue3-element-plus-admin.svg?logo=github&color=brightgreen">
  </a>
  <a href="https://github.com/gmingchen/vue3-element-plus-admin">
    <img src="https://img.shields.io/github/forks/gmingchen/vue3-element-plus-admin.svg?logo=github&color=brightgreen">
  </a>
  <a href="https://gitee.com/shychen/vue3-element-plus-admin">
    <img src="https://gitee.com/shychen/vue3-element-plus-admin/badge/star.svg?theme=dark">
  </a>
  <a href="https://gitee.com/shychen/vue3-element-plus-admin">
    <img src="https://gitee.com/shychen/vue3-element-plus-admin/badge/fork.svg?theme=dark">
  </a>
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Java + Vue 有很多优秀的后台管理系统，但是为了可以高效的开发后台权限管理系统，作者就自己开发出 vue3-element-plus-admin。<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[vue3-element-plus-admin](https://github.com/gmingchen/vue3-element-plus-admin) 是一个基于 Vue3 + Element-plus + Java 的多企业后台权限管理系统，提供了完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以用于网站管理后台、SAAS、CMS、CRM、OA、ERP等，企业和个人都可以免费使用。欢迎提交PR（需求），若开发中遇到问题可以上 Github 提 Issues。

如果觉着还不错，请点个 ⭐star 支持一下吧，这将是对我最大的支持和鼓励！

## 内置功能
- [X] 系统管理：基本功能
  - [X] 角色：角色菜单权限分配
  - [X] 管理员：支持多角色分配，根据角色拥有的菜单权限展示不同的页面
  - [X] 菜单管理：支持修改当前企业菜单的名称、图标、排序
- [X] 日志管理：企业日志
  - [X] 登录日志：当前企业管理员登录系统的记录查询
  - [X] 操作日志：当前企业管理员对系统的正常操作的记录查询
- [X] 消息管理：消息的推送以及邮件的发送
  - [X] WebSocket：当前企业内 websocket 企业推送记录、系统推送记录查询
  - [X] 邮件管理：邮件的相关配置
    - [X] 邮件模版：配置邮件发送的模版：如验证码
    - [X] 邮件记录：企业内发送的邮件记录查询
- [X] 企业管理：完成企业相关配置
  - [X] 企业列表： 新增、编辑、删除，系统企业的来源
  - [X] 企业角色： 新增、编辑、删除企业内的角色
  - [X] 企业管理员： 新增、编辑、删除企业内的管理员
  - [X] 企业菜单： 企业拥有菜单权限的配置
- [X] 数据中心：系统的一些配置管理
  - [X] 数据字典：系统内常用且固定的数据的维护
  - [X] 配置管理：系统内第三方的配置：如 oss、邮箱
  - [X] 文件管理：管理当前系统上传的文件及图片等信息
  - [X] 备份管理：对系统数据库的备份与恢复
  - [X] 区域管理：级联区域的维护
- [X] 系统监控：对系统的监控管理
  - [X] 在线管理员：当前登录系统的管理员
  - [X] 日志：整个系统内的日志
    - [X] 登录日志：系统内所有管理员登录系统的记录查询
    - [X] 操作日志：系统内所有管理员对系统的正常操作的记录查询
    - [X] 异常日志：系统内运行是后的异常记录查询
    - [X] 定时任务日志：系统内定时任务执行的记录查询
- [X] 开发配置：开发过程中的相关配置操作
  - [X] 菜单权限：整个系统内的菜单权限配置，支持拖拽排序
  - [X] 定时任务：系统内的所有定时任务维护
  - [X] 代码生成器：前端（api.js、list.vue、add-edit.vue）后端单表的增删改查相关代码生成
  - [X] 接口文档：后端使用的是 apidoc 生成的接口文档
- [X] 主题设置：整体页面主题设置，布局设置，暗黑模式

## 分支
- [master](https://github.com/gmingchen/vue3-element-plus-admin/tree/master) 多企业完整功能版本：多企业后台管理，持续维护分支
- [dev](https://github.com/gmingchen/vue3-element-plus-admin/tree/master) 多企业完整功能开发分支
- [base](https://github.com/gmingchen/vue3-element-plus-admin/tree/base) 多企业基础版本：多企业基于 RBAC 的权限功能-仅包含 `菜单管理`、`企业管理`、`企业角色管理`、`企业管理员管理`、`企业菜单管理`、`角色管理`、`管理员管理`、`操作日志`、`登录日志`
- [single](https://github.com/1240235512/vue3/tree/single) 单企业完整功能版本：单企业后台管理，已停止维护
- [single-base](https://github.com/1240235512/vue3/tree/single-base) 单企业基础功能版本：单个企业基于 RBAC 的权限功能-仅包含 `菜单管理`、`角色管理`、`用户管理`，已停止维护
- [composition-api](https://github.com/1240235512/vue3/tree/composition-api) 内置__`Type Script`__、__`I18n`__，__已停止维护可以参考相关的配置__
- [class-style](https://github.com/1240235512/vue3/tree/class-style) 使用 class 风格开发，内置__`Type Script`__、__`I18n`__，__已停止维护可以参考相关的配置__
- __`说明:`__ 其他分支是作者开发时使用的分支, 由于作者不断优化、重构、版本迭代的原因，[composition-api](https://github.com/1240235512/vue3/tree/composition-api) 和 [class-style](https://github.com/1240235512/vue3/tree/class-style) 没有同步迭代更新，所以建议这两个分支作为参考学习。

## 环境需求
- Node => 12.0.0
- Vue-Cli => 5.0.0
- JDK = 1.8.x
- Mysql >= 8.0.0

## 项目结构
```bash
vue3-src
├─api 接口模块
│
├─assets 静态资源模块
│  ├─font 字体
│  └─sass 样式
│ 
├─components 通用组件
│  ├─global 全局组件
│  │  ├─container 布局组件
│  │  ├─iconfont 使用阿里图库图标的组件
│  │  ├─page 分页组件
│  │  └─index 统一全局注册
│  ├─collapse 折叠组件
│  ├─container-custom 自定义布局组件
│  ├─container-sidebar 左右布局组件
│  ├─enterprise-sidebar 企业侧边栏组件
│  ├─icon-select-input 阿里图库图标选择组件
│  ├─image-upload-single 单图片上传组件
│  ├─region 区域级联选择组件
│  └─view router-view 视图组件
│ 
├─directive 全局自定义指令
│ 
├─mixins 代码复用 （vue2混入）
│  ├─dictionary 字典
│  ├─model 双向绑定
│  └─page 分页
│ 
├─router 动态路由
│ 
├─store vuex
│  ├─modules
│  │  ├─administrator 管理员登录信息模块
│  │  ├─dictionary 数据字典模块
│  │  ├─enterprise 企业模块
│  │  ├─menu 菜单模块
│  │  ├─setting 设置模块
│  │  ├─tabs 标签页模块
│  │  ├─theme 主题模块
│  │  └─websocket 消息推送模块
│  └─index 动态加载模块
│ 
├─utils 工具模块
│  ├─constant 常量
│  ├─dictionary 字典
│  ├─index 工具
│  ├─prompt 单次提示处理类
│  ├─regular 正则
│  ├─request axios二次封装
│  ├─storage 本地缓存工具
│  └─websocket websocket对象封装
│
├─views 视图模块
│  ├─common 通用页面
│  │  ├─401 401页面
│  │  ├─404 404页面
│  │  ├─500 500页面
│  │  └─login 登录页面
│  ├─layout
│  │  ├─components
│  │  │  ├─headbar 顶部导航
│  │  │  ├─navigation 导航布局组件
│  │  │  ├─sidebar 侧边栏
│  │  │  ├─tabsbar 标签页
│  │  │  └─websocket 消息推送组件
│  │  └─index 布局入口页面
│  └─modules 页面模块

```

## 开发
```bash
# 克隆项目
git clone https://github.com/gmingchen/vue3-element-plus-admin.git

# 进入项目目录
cd vue3-element-plus-admin

# 安装依赖
npm install

# 若执行 npm install 报错，可能由于node版本太高原因导致，可执行一下命令
npm install --legacy-peer-deps

# 启动服务
npm run dev   # 开发环境
npm run prod  # 正式环境
npm run test  # 测试环境

# 发布
npm run build:dev   # 开发环境
npm run build:prod  # 正式环境
npm run build:test  # 测试环境
```

## 在线预览
<a href="https://github.com/gmingchen/vue3-element-plus-admin">
  <img src="https://img.shields.io/badge/点这里-brightgreen.svg" />
</a>
```
总后台帐号：demo1，demo2，demo3
企业超管帐号：admin1，admin2，admin3
所有帐号的密码统一为：superadmin
```
> 防止体验用户添加脏数据，部分操作权限未开通给演示帐号

## 演示图片
<table>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/personal.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/home.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/menu.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/file.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/operation-log.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/error-log.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/enterprise.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/enterprise-menu.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/enterprise-role.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/enterprise-administrator.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/online.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/dictionary.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/api.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/region.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/login.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/websocket.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/login-log.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/configuration.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="http://oss.gumingchen.icu/frame/timed-task.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="http://oss.gumingchen.icu/frame/mail-template.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
</table>

## 联系方式
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

[java-spring-boot-admin](https://github.com/gmingchen/java-spring-boot-admin/tree/base)

是多企业管理后台基础功能 [base](https://github.com/gmingchen/vue3-element-plus-admin/tree/base) 分支的后端代码，基于 __`java`__ 的 __`springboot`__

[vue3-element-plus-im](https://github.com/gmingchen/vue3-element-plus-im)

是一个即时聊天系统，基于 [vue3](https://github.com/vuejs/vue-next) 、 [element-plus](https://github.com/element-plus/element-plus) 实现。内置了好友私聊功能。

[java-spring-boot-im](https://github.com/gmingchen/java-spring-boot-im)

是[vue3-element-plus-im](https://github.com/gmingchen/vue3-element-plus-im)即时聊天系统的 __`java`__ 后端代码，__`springboot`__ 基于 [netty](https://github.com/netty/netty) 、 [shiro](https://github.com/apache/shiro) 实现。

[node-server](https://github.com/gmingchen/node-server)
是一个基于 node 开发的后端服务框架，只要你会 SQL 就也可以写接口了，再也不用看后端的脸色了。
