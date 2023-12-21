<p align="center">
  <a href="https://github.com/gmingchen/agile-admin">
    <img src="https://admin.gumingchen.icu/file/static/slipper.jpeg" alt="logo" width="120">
  </a>
</p>
<p align="center">
  <a href="http://admin.gumingchen.icu/doc/">文档</a> |
  <a href="http://admin.gumingchen.icu">预览</a>
</p>
<p align="center">
  <a href="https://github.com/vuejs/vue-next">
    <img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-1.x-brightgreen.svg" alt="element-plus">
  </a>
  <a href="https://github.com/gmingchen/agile-admin">
    <img src="https://img.shields.io/badge/License-Apache--2.0-brightgreen.svg" />
  </a>
  <a href="https://www.oscs1024.com/project/gmingchen/agile-admin?ref=badge_small">
    <img src="https://www.oscs1024.com/platform/badge/gmingchen/agile-admin.svg?size=small" alt="vue">
  </a>
</p>
<p align="center">
  <a href="https://github.com/gmingchen/agile-admin">
    <img src="https://img.shields.io/github/stars/gmingchen/agile-admin.svg?logo=github&color=brightgreen">
  </a>
  <a href="https://github.com/gmingchen/agile-admin">
    <img src="https://img.shields.io/github/forks/gmingchen/agile-admin.svg?logo=github&color=brightgreen">
  </a>
  <a href="https://gitee.com/shychen/agile-admin">
    <img src="https://gitee.com/shychen/agile-admin/badge/star.svg?theme=dark">
  </a>
  <a href="https://gitee.com/shychen/agile-admin">
    <img src="https://gitee.com/shychen/agile-admin/badge/fork.svg?theme=dark">
  </a>
</p>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Java + Vue 有很多优秀的后台管理系统，但是为了可以高效的开发后台权限管理系统，作者就自己开发出 agile-admin。```本项目中未曾过度使用样式，目的是为了方便开发者可以方便修改成自己需要的样式```<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[agile-admin](https://github.com/gmingchen/agile-admin) 是一个基于 Vue3 + Element-plus + Java 的多企业后台权限管理系统，提供了完善的权限体系，让开发者把注意力集中到具体业务当中，降低开发成本，提高项目效率。
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可以用于网站管理后台、SAAS、CMS、CRM、OA、ERP等，企业和个人都可以免费使用。欢迎提交PR（需求），若开发中遇到问题可以上 Github 提 Issues。

如果觉着还不错，请点个 ⭐star 支持一下吧，这将是对我最大的支持和鼓励！

#### 由于有部分开发者需要完整后端代码，目前开始完成捐赠即可获得完整后端代码。开发者可以翻到 ```联系方式``` 栏目添加作者微信，具体的私聊！

## About the author
Hi there, I'm [Slipper](https://github.com/gmingchen)（拖孩）👋. Thank you for your attention ⭐!
I'm a code enthusiast who has been working in the IT industry for many years.
I like open source and all interesting things and want to try to do it.
I want to be an interesting person and create something that can be remembered by others.
If you want to write code with me, you can contact me for internal promotion.

- 🔭 I’m currently working on [万店掌](https://www.ovopark.com/)
- 📫 How to reach me: ```🐧1240235512``` ```🛰️Gy1240235512``` ```📪gumingchen@foxmail.com```
- 🌏 How to follow me: [Github](https://github.com/gmingchen) [Gitee](https://gitee.com/shychen) [掘金](https://juejin.cn/user/4103845398710846) [简书](https://www.jianshu.com/u/81a5a02678d3)
- ❤️ I like playing 🎮, sleeping in 🛌 and coding 👨‍💻.

![Github stats](https://github-readme-stats.vercel.app/api?username=gmingchen&show_icons=true&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515&include_all_commits=true&hide=["contribs"])

## 内置功能
- [X] 首页：数据统计
- [X] 系统管理：基本功能
  - [X] 套餐：租户套餐
  - [X] 租户：新增、编辑、删除，租户的来源
  - [X] 角色：角色菜单权限分配，角色支持配置数据权限
  - [X] 管理员：支持多角色分配，根据角色拥有的菜单权限展示不同的页面
  - [X] 部门管理：支持用户配置数据权限
  - [X] 岗位管理：用户所在的岗位
- [X] 追溯日志：日志信息
  - [X] 操作日志：当前租户下帐号的操作日志
  - [X] 登录日志：当前租户下帐号的登录日志
  - [X] 异常日志：系统内运行时候的异常记录查询
  - [X] 定时任务日志：系统内定时任务执行的记录查询
- [X] 基础设施：系统的基础设施
   - [X] 文件管理：管理当前系统上传的文件及图片等信息
    - [X] 文件配置：系统内文件上传的相关配置
    - [X] 文件列表：系统内所有上传的文件
  - [X] 消息通知：站内websocket推送通知消息
    - [X] 通知模版：配置通知的模版：如密码重置
    - [X] 通知记录：系统内所有的通知记录
  - [X] 邮箱管理：邮箱的相关配置
    - [X] 邮箱帐号：邮箱帐号的相关配置
    - [X] 邮件模版：配置邮件发送的模版：如密码重置
    - [X] 邮件记录：系统内发送的邮件记录查询
  - [X] 区域管理：全国省市区的管理
  - [X] 备份管理：系统数据库的备份管理
  - [X] IP管理：系统用户的IP管理
  - [X] 在线管理员：系统内在线的管理员
- [X] 开发配置：开发流程的相关配置
  - [X] 菜单权限：整个系统内的菜单权限配置，支持拖拽排序
  - [X] 数据字典：系统内常用且固定的数据的维护
  - [X] 定时任务：系统内的所有定时任务维护
  - [X] 代码生成器：前端（api.js、index.vue、add-edit.vue）后端单表的增删改查相关代码生成
- [X] 主题设置：整体页面主题设置，布局设置，暗黑模式

## 分支
- [master](https://github.com/gmingchen/agile-admin/tree/master) 多租户完整功能版本：多租户后台管理。```持续维护分支```
- [dev](https://github.com/gmingchen/agile-admin/tree/master) 多租户完整功能开发分支。```持续维护分支```
- [vite-pinia](https://github.com/gmingchen/agile-admin/tree/vite-pinia) 该分支是多租户概念，使用的是vite + pinia 实现的功能，使用的是vue组合式api的 setup 标签。```持续维护分支```
- [webpack-vuex-enterprise](https://github.com/gmingchen/agile-admin/tree/webpack-vuex-enterprise) 该分支是企业概念版本内容，使用的是webpack + vuex 实现的功能，使用的是vue组合式api。
- [vite-pinia-enterprise](https://github.com/gmingchen/agile-admin/tree/vite-pinia-enterprise) 该分支是企业概念版本内容，使用的是vite + pinia 实现的功能，使用的是vue组合式api的 setup 标签。
- [base](https://github.com/gmingchen/agile-admin/tree/base) 多企业基础版本：多企业基于 RBAC 的权限功能-仅包含 `菜单管理`、`企业管理`、`企业角色管理`、`企业管理员管理`、`企业菜单管理`、`角色管理`、`管理员管理`、`操作日志`、`登录日志`，对应后端[java-spring-boot-admin](https://github.com/gmingchen/java-spring-boot-admin)master分支
- [single](https://github.com/1240235512/vue3/tree/single) 单企业完整功能版本：单企业后台管理，已停止维护
- [single-base](https://github.com/1240235512/vue3/tree/single-base) 单企业基础功能版本：单个企业基于 RBAC 的权限功能-仅包含 `菜单管理`、`角色管理`、`用户管理`，已停止维护
- [composition-api](https://github.com/1240235512/vue3/tree/composition-api) 内置__`Type Script`__、__`I18n`__，__已停止维护可以参考相关的配置__
- [class-style](https://github.com/1240235512/vue3/tree/class-style) 使用 class 风格开发，内置__`Type Script`__、__`I18n`__，__已停止维护可以参考相关的配置__
- __`说明:`__ 持续维护分支是 [master](https://github.com/gmingchen/agile-admin/tree/master)、[dev](https://github.com/gmingchen/agile-admin/tree/master)、[vite-pinia](https://github.com/gmingchen/agile-admin/tree/vite-pinia)。其他分支是作者开发时使用的分支, 由于作者不断优化、重构、版本迭代的原因，[composition-api](https://github.com/1240235512/vue3/tree/composition-api) 和 [class-style](https://github.com/1240235512/vue3/tree/class-style) 没有同步迭代更新，所以建议这两个分支作为参考学习。

## 环境需求
- Node => 16.0.0
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
│  │  ├─date-range-picker 日期选择组件（二次封装）
│  │  ├─dict-radio 字典radio组件（二次封装）
│  │  ├─dict-select 字典select组件（二次封装）
│  │  ├─iconfont 使用阿里图库图标的组件
│  │  ├─page 分页组件
│  │  ├─view 视图组件（二次封装router-view）
│  │  └─index 统一全局注册
│  ├─collapse 折叠组件
│  ├─container-custom 自定义布局组件
│  ├─container-sidebar 左右布局组件
│  ├─count-to 计数组件
│  ├─editor 富文本组件
│  ├─icon-select-input 阿里图库图标选择组件
│  ├─region 区域级联选择组件
│  ├─tenant-sidebar 租户侧栏
│  ├─upload 上传组件
│  └─upload-image 单图片上传组件
│ 
├─directive 全局自定义指令
│ 
├─hooks 钩子
│  ├─dict 字典
│  └─model 双向绑定
│ 
├─router 动态路由
│ 
├─stores pinia
│  ├─modules
│  │  ├─adminer 管理员信息模块
│  │  ├─auth 登录凭证信息模块
│  │  ├─dict 数据字典模块
│  │  ├─menu 菜单模块
│  │  ├─notice 通知模块
│  │  ├─tabs 标签页模块
│  │  ├─theme 主题模块
│  │  └─websocket 消息推送模块
│  ├─index 动态加载模块
│  └─root 根模块
│ 
├─utils 工具模块
│  ├─constant 常量
│  ├─enum 枚举
│  ├─index 工具
│  ├─prompt 单次提示处理类
│  ├─regular 正则
│  ├─request axios二次封装
│  ├─storage 本地缓存工具
│  ├─uploader 分片上传
│  └─websocket websocket对象封装
│
├─views 视图模块
│  ├─constant 通用页面
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
git clone https://github.com/gmingchen/agile-admin.git

# 进入项目目录
cd agile-admin

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
<a href="https://admin.gumingchen.icu">
  <img src="https://img.shields.io/badge/点这里-brightgreen.svg" />
</a>
```
总后台帐号：admin1,admin2,admin3,admin4
企业超管帐号：demo1,demo2,demo3,demo4
所有帐号的密码统一为：superadmin
```
> 防止体验用户添加脏数据，部分操作权限未开通给演示帐号

## 演示图片
<table>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/home.jpg" title="演示图片" alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/personal.jpg" title="演示图片" alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/menu.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/theme.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/log-operate.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/log-error.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/log-login.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/log-job.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/dict.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/job.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/generator.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/ip.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/backup.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/region.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/notice-template.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/notice.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/file-config.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/file.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/package.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/tenant.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/role.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/adminer.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/post.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/dept.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/mail-account.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/mail-template.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
  <tr>
    <td><img src="https://admin.gumingchen.icu/file/frame/mail.jpg" title="演示图片"  alt="演示图片" /></td>
    <td><img src="https://admin.gumingchen.icu/file/frame/login.jpg" title="演示图片"  alt="演示图片" /></td>
  </tr>
</table>

## 联系方式
`①群已满(500人)，可以先进②群，有空位后在加①群。若二维码失效可以加微信联系作者！`
<table>
  <tr align="center">
    <td>微信交流群</td>
    <td>公众号</td>
    <td>微信</td>
    <td>QQ</td>
  </tr>
  <tr>
    <td>
      <img src="https://admin.gumingchen.icu/file/static/wechat-group-qr-code.jpg?time=1" width="200px" title="微信交流群" alt="微信交流群:124371554" />
    </td>
    <td>
      <img src="https://admin.gumingchen.icu/file/static/official-account-qr-code.jpg" width="200px" title="公众号" alt="公众号:loafer-man" />
    </td>
    <td>
      <img src="https://admin.gumingchen.icu/file/static/wechat-qr-code-1.jpg" width="200px" title="微信" alt="微信:Gy1240235512" />
    </td>
    <td>
      <img src="https://admin.gumingchen.icu/file/static/qq-qr-code.jpg" width="200px" title="QQ" alt="QQ:1240235512" />
    </td>
  </tr>
</table>

## 捐赠
>如果你觉得这个项目帮助到了你，你可以帮作者买一杯热饮表示鼓励 ☕

<table>
  <tr align="center">
    <td>微信捐赠</td>
    <td>支付宝捐赠</td>
  </tr>
  <tr>
    <td>
      <img src="https://admin.gumingchen.icu/file/static/wechat-collection-code.jpg" width="200px" title="微信捐赠" alt="微信捐赠" />
    </td>
    <td>
      <img src="https://admin.gumingchen.icu/file/static/ali-collection-code.jpg" width="200px" title="支付宝捐赠" alt="支付宝捐赠" />
    </td>
  </tr>
</table>

<!-- ### 捐赠名单
> ❤️‍🔥以下是捐赠赞助人员名单，感谢TA们的捐赠让`agile-admin`变的更好。

| 来源 | 昵称 | 金额 | 时间 |
|:------------- |:-------------:|:-------------:|:-------------:|
|微信|*王|18.80|2023-01-16|
|微信|Github-几许春秋|10.00|2023-01-03|
|微信|Github-Liuz|1.00|2023-01-03|
|微信|*。|5.20|2023-01-03|
|微信|h*g|0.01|2023-01-03|
|微信|Github-不服就干|6.66|2023-01-03|
|微信|Github-微信用户|0.02|2023-01-03|
|微信|*醒|0.01|2023-01-03|
|支付宝|*78|500.00|2022-12-27|
|微信|*王|6.66|2022-10-11|
|微信|An|6.66|2022-09-21|
|微信|=￣ω￣=|8.88|2022-07-27|
|微信|硅石|2.50|2022-07-13|
|支付宝|**雪|3.88|2022-07-12|
|微信|飞飞|1.88|2022-07-12|
|微信|Amber|1.88|2022-07-12|
|微信|Github-二当家的丶|1.25|2022-07-12| -->

### 其它开源项目

[java-spring-boot-admin](https://github.com/gmingchen/java-spring-boot-admin/tree/base)

是多企业管理后台基础功能 [base](https://github.com/gmingchen/agile-admin/tree/base) 分支的后端代码，基于 __`java`__ 的 __`springboot`__

[vue3-element-plus-im](https://github.com/gmingchen/vue3-element-plus-im)

是一个即时聊天系统，基于 [vue3](https://github.com/vuejs/vue-next) 、 [element-plus](https://github.com/element-plus/element-plus) 实现。内置了好友私聊功能。

[java-spring-boot-im](https://github.com/gmingchen/java-spring-boot-im)

是[vue3-element-plus-im](https://github.com/gmingchen/vue3-element-plus-im)即时聊天系统的 __`java`__ 后端代码，__`springboot`__ 基于 [netty](https://github.com/netty/netty) 、 [shiro](https://github.com/apache/shiro) 实现。

[node-server](https://github.com/gmingchen/node-server)
是一个基于 node 开发的后端服务框架，只要你会 SQL 就也可以写接口了，再也不用看后端的脸色了。
