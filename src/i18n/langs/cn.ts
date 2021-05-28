/*
 * @Description:
 * @Author: gumingchen
 * @Email: 1240235512@qq.com
 * @Date: 2021-04-15 19:20:39
 * @LastEditors: gumingchen
 * @LastEditTime: 2021-05-28 22:35:53
 */
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

const cn = {
  el: zhLocale.el,
  language: {
    chinese: '中文',
    english: '英文'
  },
  button: {
    query: '查询',
    reset: '重置',
    read: '查看',
    add: '新增',
    edit: '编辑',
    delete: '删除',
    batchDelete: '批量删除',
    save: '保存',
    confirm: '确认',
    cancel: '取消',
    login: '登录',
    logout: '退出',
    set: '设置',
    editInfo: '编辑信息',
    maximize: '最大化',
    reduction: '还原',
    clear: '清除',
    enable: '启用',
    disable: '禁用',
    download: '下载'
  },
  field: {
    account: '账户',
    password: '密码',
    captcha: '验证码',
    nickname: '昵称',
    mobile: '手机号',
    email: '邮箱',
    oldPassword: '原密码',
    newPassword: '新密码',
    confirmPassword: '确认密码',
    name: '名称',
    fullName: '{0}名称',
    title: '标题',
    type: '类型',
    remark: '备注',
    start: '开始',
    end: '结束',
    state: '状态',
    time: '{0}时间',
    date: '{0}日期',
    create: '创建',
    update: '更新',
    sort: '排序',
    icon: '图标',
    is: '是否{0}',
    operation: '操作'
  },
  rule: {
    notBlank: '{0}不能为空',
    incorrect: '{0}格式不正确',
    notConsistent: '{0}与{1}不一致'
  },
  menu: {
    home: '首页',
    demo: '演示',
    set: '设置'
  },
  tip: {
    tips: '提示',
    confirmTips: '确定对进行[{0}]操作?',
    confirmOptionTips: '确定对[id={0}]进行[{1}]操作?',
    success: '操作成功',
    fail: '操作失败',
    menuCollapse: '菜单栏展开/收起',
    exitAccount: '您确定要退出当前账号吗?'
  },
  base: {
    menu: {
      chinese: '中文',
      english: '英文',
      authMark: '授权标识',
      display: '显示',
      alive: '缓存',
      tab: '在tab显示',
      multiple: '支持tab多开',
      catalog: '目录',
      menu: '菜单',
      button: '按钮',
      superior: '上级',
      authPlaceholder: '多个用分号分隔, 如: user:page;user:create'
    },
    role: {
      role: '角色',
      auth: '授权'
    },
    task: {
      immediately: '立即执行',
      resume: '恢复',
      pause: '暂停',
      normal: '正常',
      parameter: '参数',
      expression: '{0}表达式',
      batch: '批量{0}'
    },
    file: {
      file: '文件',
      original: '原始',
      actual: '实际',
      extension: '扩展',
      size: '大小',
      physicalPath: '物理路径',
      virtualPath: '虚拟路径',
      upload: '上传'
    },
    backup: {
      backup: '备份',
      backupMode: '备份方式',
      manual: '手动',
      automatic: '自动',
      clearDatabase: '清除数据库',
      databaseName: '数据库名称',
      physicalPath: '物理路径',
      virtualPath: '虚拟路径',
      command: '命令',
      recovery: '恢复'
    }
  }
}

export default cn
