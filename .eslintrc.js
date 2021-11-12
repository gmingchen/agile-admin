// https://eslint.bootcss.com/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 6,
    parser: '@babel/eslint-parser'
  },
  rules: {
    // todo: vue eslint plugin
    "vue/max-attributes-per-line": [1, { "singleline": 3, "multiline": { "max": 1, "allowFirstLine": false } }], // 超过3个特性的元素应该分多行撰写，每个特性一行
    "vue/singleline-html-element-content-newline": 0, // 在单行元素的内容前后需要换行符
    "vue/multiline-html-element-content-newline": 0, // 在多行元素的内容之前和之后需要换行符
    "vue/name-property-casing": [2, 'PascalCase'], // JS/JSX中的组件名应该始终是帕斯卡命名法
    "vue/html-closing-bracket-newline": [1, { 'singleline': 'never', 'multiline': 'never' }], // 结束标签不能在新行
    "vue/html-closing-bracket-spacing": [1, { 'startTag': 'never', 'endTag': 'never', 'selfClosingTag': 'always'}], // 开始、结束标签空格
    "vue/html-end-tags": 1, // 需要结束标签
    "vue/html-indent": [1, 2, { 'attribute': 1, 'baseIndent': 1, 'closeBracket': 0, 'alignAttributesVertically': true }], // 标签对齐格式化
    "vue/html-quotes": [1, "double", { "avoidEscape": false }], // 标签使用双引号
    "vue/html-self-closing": [1, { 'html': { 'void': 'never', 'normal': 'always', 'component': 'always' } }], // 自动关闭标签
    "vue/html-comment-content-newline": [1, { 'singleline': 'never', 'multiline': 'always' }], // 注释换行
    "vue/no-v-html": 0,
    // todo: eslint
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'quotes': [1, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }], // 默认都使用 '' 或者 ``
    'semi': [1, 'never'], // 结尾处不使用分号
    'no-extra-parens': [1, 'functions'], // 禁止不必要的括号
    'comma-dangle': [1, 'never'], // 禁止末尾逗号
    'comma-spacing': [1, { 'before': false, 'after': true }], // 逗号后空一格
    'comma-style': [1, 'last'], // 强制使用一致的逗号风格
    'no-var': 1, // 要求使用 let 或 const 而不是 var
    'prefer-const': 1, // 要求使用 const 声明那些声明后不再被修改的变量
    'spaced-comment': [1, 'always', { 'markers': [ 'global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',' ] }], // 强制在注释中 // 或 /* 使用一致的空格
    'require-atomic-updates': 0, // 禁止由于 await 或 yield的使用而可能导致出现条件的赋值
    'accessor-pairs': 1, // 强制 getter 和 setter 在对象中成对出现
    'block-scoped-var': 1, // 强制把变量的使用限制在其定义的作用域范围内
    'curly': [1, 'multi-line'], // 强制所有控制语句使用一致的括号风格
    'dot-location': [1, 'property'], // 强制在点号之前和之后一致的换行 点号紧着参数前
    'eqeqeq': ['error', 'always', {'null': 'ignore'}], // 要求使用 === 和 !==
    'no-alert': process.env.NODE_ENV === 'production' ? 1 : 0, // 禁用 alert、confirm 和 prompt
    'no-caller': 1, // 禁用 arguments.caller 或 arguments.callee
    'no-empty-function': 1, // 禁止出现空函数
    'no-extend-native': 1, // 禁止扩展原生类型
    'no-fallthrough': [0, { 'commentPattern': 'break[\\s\\w]*omitted' }], // 禁止 case 语句落空
    'no-floating-decimal': 1, // 禁止数字字面量中使用前导和末尾小数点
    'no-labels': [1, { 'allowLoop': false, 'allowSwitch': false }], // 禁用标签语句
    'no-lone-blocks': 1, // 禁用不必要的嵌套块
    'no-multi-spaces': 1, // 禁止使用多个空格
    'no-multi-str': 1, // 禁止使用多行字符串
    // 'no-param-reassign': 1, // 禁止对 function 的参数进行重新赋值
    'no-proto': 1, // 禁用 __proto__ 属性
    'no-return-assign': [1, 'except-parens'], // 禁止在 return 语句中使用赋值语句
    'no-return-await': 1, // 禁用不必要的 return await
    'no-script-url': 1, // 禁止使用 javascript:void(0)
    'no-self-compare': 1, // 禁止自身比较
    // 'no-sequences': [1, { 'allowInParentheses': false }], // 禁用逗号操作符
    'no-throw-literal': 1, // 禁止抛出异常字面量
    'no-unmodified-loop-condition': 1, // 禁用一成不变的循环条件
    'no-useless-return': 1, // 禁止多余的 return 语句
    'no-void': 1, // 禁用 void 操作符
    'require-await': 1, // 禁止使用不带 await 表达式的 async 函数
    'wrap-iife': [1, 'any'], // 要求 IIFEs 使用括号括起来
    'no-label-var': 1, // 不允许标签与变量同名
    'no-shadow': 1, // 禁止变量声明与外层作用域的变量同名
    'no-undef-init': 1, // 禁止将变量初始化为 undefined
    'no-undefined': 1, // 禁止将 undefined 作为标识符
    'no-unused-vars': [0, { 'vars': 'all', /* 'varsIgnorePattern': '[iI]gnored', */ 'args': 'none', 'argsIgnorePattern': '^_' }], // 未使用过的变量 用下划线开头
    'no-use-before-define': 1, // 禁止在变量定义之前使用它们
    'global-require': 0, // 要求 require() 出现在顶层模块作用域中
    'handle-callback-err': [1, '^(err|error)$'], // 要求回调函数中有容错处理
    'no-new-require': 1, // 禁止调用 require 时使用 new 操作符
    'no-path-concat': 1, // 禁止对 __dirname 和 __filename 进行字符串连接
    'array-bracket-spacing': [1, 'never'], // 在数组开括号后和闭括号前强制换行
    'array-element-newline': [1, 'consistent'], // 强制数组元素间出现换行
    'block-spacing': [1, 'always'], // 禁止或强制在代码块中开括号前和闭括号后有空格
    'brace-style': [1, '1tbs', { 'allowSingleLine': true }], // 强制在代码块中使用一致的大括号风格
    'eol-last': 1, // 要求或禁止文件末尾存在空行
    'func-call-spacing': 1, // 要求或禁止在函数标识符和其调用之间有空格
    'indent': [1, 2, { 'SwitchCase': 1 }], // 强制使用一致的缩进 switch case 使用1个空格
    'key-spacing': [1, { 'beforeColon': false, 'afterColon': true }], // 强制在对象字面量的属性中键和值之间使用一致的间距
    'keyword-spacing': [1, { 'before': true, 'after': true }], // 强制在关键字前后使用一致的空格
    'lines-around-comment': [1, { 'beforeBlockComment': true, 'allowBlockStart': true }], // 在块注释之前需要空行
    'new-cap': [1, { 'newIsCap': true, 'capIsNew': false }], // 要求构造函数首字母大写
    'new-parens': 1, // 强制或禁止调用无参构造函数时有圆括号
    'no-mixed-spaces-and-tabs': 1, // 禁止空格和 tab 的混合缩进
    'no-multiple-empty-lines': [1, { 'max': 1 }], // 禁止出现多行空行 最多空1行
    'no-trailing-spaces': 1, // 禁用行尾空格
    'no-unneeded-ternary': [1, { 'defaultAssignment': false }], // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-whitespace-before-property': 1, // 禁止属性前有空白
    'object-curly-newline': [1, { 'consistent': true }], // 强制大括号内换行符的一致性
    'object-curly-spacing': [1, 'always'], // 强制在大括号中使用一致的空格
    'one-var': [0, { 'initialized': 'consecutive',   'uninitialized': 'never' }], // 强制函数中的变量要么一起声明要么分开声明
    'operator-linebreak': [1, 'before', { 'overrides': { '?': 'before', ':': 'before' } }], // 强制操作符使用一致的换行符
    'padded-blocks': [1, 'never'], // 要求或禁止块内填充
    'semi-spacing': [1, { 'before': false,  'after': true   }], // 强制分号之前和之后使用一致的空格
    'space-before-blocks': [1, 'always'], // 强制在块之前使用一致的空格
    'space-in-parens': [1, 'never'], // 强制在圆括号内使用一致的空格
    'space-infix-ops': 1, // 要求操作符周围有空格
    'space-unary-ops': [1, { 'words': true, 'nonwords': false }], // 强制在一元操作符前后使用一致的空格
    'arrow-spacing': [1, { 'before': true, 'after': true }], // 强制箭头函数的箭头前后使用一致的空格
    'generator-star-spacing': [1, { 'before': true, 'after': true }], // 强制 generator 函数中 * 号周围使用一致的空格
    'no-duplicate-imports': 1, // 禁止重复模块导入
    'require-yield': 1, // 要求 generator 函数内有 yield
    'template-curly-spacing': [1, 'always'], // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    'yield-star-spacing': [1, 'both'], // 强制在 yield* 表达式中 * 周围使用空格
    'space-before-function-paren': 0 // 函数 括号前需要空格
  }
}
