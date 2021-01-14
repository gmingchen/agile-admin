module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "eslint:recommended", // 启用推荐的规则
    "plugin:vue/vue3-essential",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // TODO: 关闭：'off' | 0, 警告: 'warn' | 1, 错误: 'error' | 2
  rules: {
    // TODO: Possible Errors
    "for-direction": 2,                                                           // 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
    "getter-return": 2,                                                           // 强制 getter 函数中出现 return 语句
    "no-async-promise-executor": 2,                                               // 禁止使用异步函数作为 Promise executor
    "no-await-in-loop": 0,                                                        // 禁止在循环中出现 await
    "no-compare-neg-zero": 2,                                                     // 禁止与 -0 进行比较
    "no-cond-assign": 2,                                                          // 禁止条件表达式中出现赋值操作符
    "no-console": process.env.NODE_ENV === "production" ? 1 : 0,                  // 生产环境禁用 console
    "no-constant-condition": 2,                                                   // 禁止在条件中使用常量表达式
    "no-control-regex": 2,                                                        // 禁止在正则表达式中使用控制字符
    "no-debugger": process.env.NODE_ENV === "production" ? 1 : 0,                 // 生产环境禁用 debugger
    "no-dupe-args": 2,                                                            // 禁止 function 定义中出现重名参数
    "no-dupe-keys": 2,                                                            // 禁止对象字面量中出现重复的 key
    "no-duplicate-case": 2,                                                       // 禁止出现重复的 case 标签
    "no-empty": 2,                                                                // 禁止出现空语句块
    "no-empty-character-class": 2,                                                // 禁止在正则表达式中使用空字符集
    "no-ex-assign": 2,                                                            // 禁止对 catch 子句的参数重新赋值
    "no-extra-boolean-cast": 2,                                                   // 禁止不必要的布尔转换
    "no-extra-parens": 1,                                                         // 禁止不必要的括号
    "no-extra-semi": 1,                                                           // 禁止不必要的分号
    "no-func-assign": 2,                                                          // 禁止对 function 声明重新赋值
    "no-inner-declarations": 2,                                                   // 禁止在嵌套的块中出现变量声明或 function 声明
    "no-invalid-regexp": 2,                                                       // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    "no-irregular-whitespace": 2,                                                 // 禁止不规则的空白
    "no-misleading-character-class": 2,                                           // 不允许在字符类语法中出现由多个代码点组成的字符
    "no-obj-calls": 2,                                                            // 禁止把全局对象作为函数调用
    "no-prototype-builtins": 2,                                                   // 禁止直接调用 Object.prototypes 的内置属性
    "no-regex-spaces": 2,                                                         // 禁止正则表达式字面量中出现多个空格
    "no-sparse-arrays": 2,                                                        // 禁用稀疏数组
    "no-template-curly-in-string": 0,                                             // 禁止在常规字符串中出现模板字面量占位符语法
    "no-unexpected-multiline": 2,                                                 // 禁止出现令人困惑的多行表达式
    "no-unreachable": 2,                                                          // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unsafe-finally": 2,                                                       // 禁止在 finally 语句块中出现控制流语句
    "no-unsafe-negation": 2,                                                      // 禁止对关系运算符的左操作数使用否定操作符
    "require-atomic-updates": 2,                                                  // 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
    "use-isnan": 2,                                                               // 要求使用 isNaN() 检查 NaN
    "valid-typeof": 2,                                                            // 强制 typeof 表达式与有效的字符串进行比较
    // TODO: Best Practices
    "accessor-pairs": 0,                                                          // 强制 getter 和 setter 在对象中成对出现
    "array-callback-return": 0,                                                   // 强制数组方法的回调函数中有 return 语句
    "block-scoped-var": 1,                                                        // 强制把变量的使用限制在其定义的作用域范围内
    "class-methods-use-this": 0,                                                  // 强制类方法使用 this
    "complexity": 0,                                                              // 指定程序中允许的最大环路复杂度
    "consistent-return": 0,                                                       // 要求 return 语句要么总是指定返回的值，要么不指定
    "curly": [1, 'all'],                                                          // 强制所有控制语句使用一致的括号风格
    "default-case": 0,                                                            // 要求 switch 语句中有 default 分支
    "dot-location": [1, 'property'],                                              // 强制在点号之前和之后一致的换行
    "dot-notation": 0,                                                            // 强制尽可能地使用点号
    "eqeqeq": [1, 'always'],                                                      // 要求使用 === 和 !==
    "guard-for-in": 0,                                                            // 要求 for-in 循环中有一个 if 语句
    "max-classes-per-file": 0,                                                    // 强制每个文件中包含的的类的最大数量
    "no-alert": 1,                                                                // 禁用 alert、confirm 和 prompt
    "no-caller": 2,                                                               // 禁用 arguments.caller 或 arguments.callee
    "no-case-declarations": 2,                                                    // 不允许在 case 子句中使用词法声明
    "no-div-regex": 0,                                                            // 禁止除法操作符显式的出现在正则表达式开始的位置
    "no-else-return": 0,                                                          // 禁止 if 语句中 return 语句之后有 else 块
    "no-empty-function": 1,                                                       // 禁止出现空函数
    "no-empty-pattern": 2,                                                        // 禁止使用空解构模式
    "no-eq-null": 0,                                                              // 禁止在没有类型检查操作符的情况下与 null 进行比较
    "no-eval": 0,                                                                 // 禁用 eval()
    "no-extend-native": 0,                                                        // 禁止扩展原生类型
    "no-extra-bind": 0,                                                           // 禁止不必要的 .bind() 调用
    "no-extra-label": 0,                                                          // 禁用不必要的标签
    "no-fallthrough": 2,                                                          // 禁止 case 语句落空
    "no-fallthrough": 2,                                                          // 禁止 case 语句落空
    "no-floating-decimal": 1,                                                     // 禁止数字字面量中使用前导和末尾小数点
    "no-global-assign": 2,                                                        // 禁止对原生对象或只读的全局对象进行赋值
    "no-implicit-coercion": 0,                                                    // 禁止使用短符号进行类型转换
    "no-implicit-globals": 0,                                                     // 禁止在全局范围内使用变量声明和 function 声明
    "no-implied-eval": 0,                                                         // 禁止使用类似 eval() 的方法
    "no-invalid-this": 0,                                                         // 禁止 this 关键字出现在类和类对象之外
    "no-iterator": 0,                                                             // 禁用 __iterator__ 属性
    "no-labels": 0,                                                               // 禁用标签语句
    "no-lone-blocks": 1,                                                          // 禁用不必要的嵌套块
    "no-loop-func": 0,                                                            // 禁止在循环语句中出现包含不安全引用的函数声明
    "no-magic-numbers": 1,                                                        // 禁用魔术数字
    "no-multi-spaces": 1,                                                         // 禁止使用多个空格
    "no-multi-str": 1,                                                            // 禁止使用多行字符串
    "no-new": 0,                                                                  // 禁止使用 new 以避免产生副作用
    "no-new-func": 0,                                                             // 禁止对 Function 对象使用 new 操作符
    "no-new-wrappers": 0,                                                         // 禁止对 String，Number 和 Boolean 使用 new 操作符
    "no-octal": 2,                                                                // 禁用八进制字面量
    "no-octal-escape": 0,                                                         // 禁止在字符串中使用八进制转义序列
    "no-param-reassign": 1,                                                       // 禁止对 function 的参数进行重新赋值
    "no-proto": 0,                                                                // 禁用 __proto__ 属性
    "no-redeclare": 2,                                                            // 禁止多次声明同一变量
    "no-restricted-properties": 0,                                                // 禁止使用对象的某些属性
    "no-return-assign": 0,                                                        // 禁止在 return 语句中使用赋值语句
    "no-return-await": 1,                                                         // 禁用不必要的 return await
    "no-script-url": 1,                                                           // 禁止使用 javascript: url
    "no-self-assign": 2,                                                          // 禁止自我赋值
    "no-self-compare": 1,                                                         // 禁止自身比较
    "no-sequences": 1,                                                            // 禁用逗号操作符
    "no-throw-literal": 0,                                                        // 禁止抛出异常字面量
    "no-unmodified-loop-condition": 0,                                            // 禁用一成不变的循环条件
    "no-unused-expressions": 0,                                                   // 禁止出现未使用过的表达式
    "no-unused-labels": 2,                                                        // 禁止出现未使用过的表达式
    "no-useless-call": 0,                                                         // 禁止不必要的 .call() 和 .apply()
    "no-useless-catch": 2,                                                        // 禁止不必要的 catch 子句
    "no-useless-concat": 0,                                                       // 禁止不必要的字符串字面量或模板字面量的连接
    "no-useless-escape": 2,                                                       // 禁用不必要的转义字符
    "no-useless-return": 1,                                                       // 禁止多余的 return 语句
    "no-void": 1,                                                                 // 禁用 void 操作符
    "no-warning-comments": 0,                                                     // 禁止在注释中使用特定的警告术语
    "no-with": 2,                                                                 // 禁用 with 语句
    "prefer-named-capture-group": 0,                                              // 建议在正则表达式中使用命名捕获组
    "prefer-promise-reject-errors": 0,                                            // 要求使用 Error 对象作为 Promise 拒绝的原因
    "radix": 0,                                                                   // 强制在 parseInt() 使用基数参数
    "require-await": 1,                                                           // 禁止使用不带 await 表达式的 async 函数
    "require-unicode-regexp": 1,                                                  // 强制在 RegExp 上使用 u 标志
    "vars-on-top": 0,                                                             // 要求所有的 var 声明出现在它们所在的作用域顶部
    "wrap-iife": 0,                                                               // 要求 IIFE 使用括号括起来
    "yoda": 0,                                                                    // 要求或禁止 “Yoda” 条件
    "strict": 0,                                                                  // 要求或禁止使用严格模式指令
    // TODO: Variables
    "init-declarations": 0,                                                       // 要求或禁止 var 声明中的初始化
    "no-delete-var": 2,                                                           // 禁止删除变量
    "no-label-var": 1,                                                            // 不允许标签与变量同名
    "no-restricted-globals": 0,                                                   // 禁用特定的全局变量
    "no-shadow": 1,                                                               // 禁止变量声明与外层作用域的变量同名
    "no-shadow-restricted-names": 2,                                              // 禁止将标识符定义为受限的名字
    "no-undef": 2,                                                                // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-undef-init": 0,                                                           // 禁止将变量初始化为 undefined
    "no-undefined": 1,                                                            // 禁止将 undefined 作为标识符
    "no-unused-vars": 2,                                                          // 禁止出现未使用过的变量
    "no-use-before-define": 1,                                                    // 禁止在变量定义之前使用它们
    // TODO: Node.js and CommonJS
    "callback-return": 0,                                                         // 强制数组方法的回调函数中有 return 语句
    "global-require": 1,                                                          // 要求 require() 出现在顶层模块作用域中
    "handle-callback-err": 0,                                                     // 要求回调函数中有容错处理
    "no-buffer-constructor": 0,                                                   // 禁用 Buffer() 构造函数
    "no-mixed-requires": 0,                                                       // 禁止混合常规变量声明和 require 调用
    "no-new-require": 0,                                                          // 禁止调用 require 时使用 new 操作符
    "no-path-concat": 0,                                                          // 禁止对 __dirname 和 __filename 进行字符串连接
    "no-process-env": 0,                                                          // 禁用 process.env
    "no-process-exit": 0,                                                         // 禁用 禁用 process.exit()
    "no-restricted-modules": 0,                                                   // 禁用通过 require 加载的指定模块
    "no-sync": 0,                                                                 // 禁用同步方法
    // TODO: Stylistic Issues
    "array-bracket-newline": 0,                                                   // 在数组开括号后和闭括号前强制换行
    "array-bracket-spacing": [2, 'never'],                                        // 在数组开括号后和闭括号前强制换行
    "array-element-newline": [2, 'never'],                                        // 强制数组元素间出现换行
    "block-spacing": 0,                                                           // 禁止或强制在代码块中开括号前和闭括号后有空格
    "brace-style": 0,                                                             // 强制在代码块中使用一致的大括号风格
    "camelcase": 0,                                                               // 强制使用骆驼拼写法命名约定
    "capitalized-comments": 0,                                                    // 强制或禁止对注释的第一个字母大写
    "comma-dangle": 0,                                                            // 要求或禁止末尾逗号
    "comma-spacing": 0,                                                           // 强制在逗号前后使用一致的空格
    "comma-style": 0,                                                             // 强制使用一致的逗号风格
    "computed-property-spacing": 0,                                               // 强制在计算的属性的方括号中使用一致的空格
    "consistent-this": 0,                                                         // 当获取当前执行环境的上下文时，强制使用一致的命名
    "eol-last": 1,                                                                // 要求或禁止文件末尾存在空行
    "func-call-spacing": 0,                                                       // 要求或禁止在函数标识符和其调用之间有空格
    "func-name-matching": 0,                                                      // 要求函数名与赋值给它们的变量名或属性名相匹配
    "func-names": 0,                                                              // 要求或禁止使用命名的 function 表达式
    "func-style": 0,                                                              // 强制一致地使用 function 声明或表达式
    "function-paren-newline": 0,                                                  // 强制在函数括号内使用一致的换行
    "id-blacklist": 0,                                                            // 禁用指定的标识符
    "id-length": 0,                                                               // 强制标识符的最小和最大长度
    "id-match": 0,                                                                // 要求标识符匹配一个指定的正则表达式
    "implicit-arrow-linebreak": 0,                                                // 强制隐式返回的箭头函数体的位置
    "indent": 0,                                                                  // 强制使用一致的缩进
    "jsx-quotes": 0,                                                              // 强制在 JSX 属性中一致地使用双引号或单引号
    "key-spacing": 0,                                                             // 强制在对象字面量的属性中键和值之间使用一致的间距
    "keyword-spacing": 0,                                                         // 强制在关键字前后使用一致的空格
    "line-comment-position": 0,                                                   // 强制行注释的位置
    "linebreak-style": 0,                                                         // 强制使用一致的换行风格
    "linebreak-style": 0,                                                         // 强制使用一致的换行风格
    "lines-around-comment": 1,                                                    // 要求在注释周围有空行
    "lines-between-class-members": 0,                                             // 要求或禁止类成员之间出现空行
    "max-depth": 0,                                             // 强制可嵌套的块的最大深度
    "max-len": 0,                                             // 强制一行的最大长度
    "max-lines": 0,                                             // 强制最大行数
    "max-lines-per-function": 0,                                             // 强制函数最大代码行数
    "max-nested-callbacks": 0,                                             // 强制回调函数最大嵌套深度
    "max-params": 0,                                             // 强制函数定义中最多允许的参数数量
    "max-statements": 0,                                             // 强制函数块最多允许的的语句数量
    "max-statements-per-line": 0,                                             // 强制每一行中所允许的最大语句数量
    "multiline-comment-style": 0,                                             // 强制对多行注释使用特定风格
    "multiline-ternary": 0,                                             // 要求或禁止在三元操作数中间换行
    "new-cap": 0,                                             // 要求构造函数首字母大写
    "new-parens": 0,                                             // 强制或禁止调用无参构造函数时有圆括号
    "newline-per-chained-call": 0,                                             // 要求方法链中每个调用都有一个换行符
    "no-array-constructor": 0,                                             // 禁用 Array 构造函数
    "no-bitwise": 0,                                             // 禁用按位运算符
    "no-continue": 0,                                             // 禁用 continue 语句
    "no-inline-comments": 0,                                             // 禁止在代码后使用内联注释
    "no-lonely-if": 0,                                             // 禁止 if 作为唯一的语句出现在 else 语句中
    "no-mixed-operators": 0,                                             // 禁止混合使用不同的操作符
    "no-mixed-spaces-and-tabs": 1,                                             // 禁止空格和 tab 的混合缩进
    "no-multi-assign": 1,                                             // 禁止连续赋值
    "no-multiple-empty-lines": 1,                                             // 禁止出现多行空行
    "no-negated-condition": 0,                                             // 禁用否定的表达式
    "no-nested-ternary": 0,                                             // 禁用嵌套的三元表达式
    "no-new-object": 0,                                             // 禁用 Object 的构造函数
    "no-plusplus": 0,                                             // 禁用一元操作符 ++ 和 --
    "no-restricted-syntax": 0,                                             // 禁用特定的语法
    "no-tabs": 0,                                             // 禁用 tab
    "no-ternary": 0,                                             // 禁用三元操作符
    "no-trailing-spaces": 0,                                             // 禁用行尾空格
    "no-underscore-dangle": 0,                                             // 禁止标识符中有悬空下划线
    "no-unneeded-ternary": 0,                                             // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    "no-whitespace-before-property": 0,                                             // 禁止属性前有空白
    "nonblock-statement-body-position": 0,                                             // 强制单个语句的位置
    "object-curly-newline": 0,                                             // 强制大括号内换行符的一致性
    "object-curly-spacing": 0,                                             // 强制大括号内换行符的一致性






    "prettier/prettier": "off",
    
    'vue/max-attributes-per-line': [2, {
      'singleline': 10,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline':'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'dot-notation': [0, { 'allowKeywords': false }],
    'eol-last': 2,
    'eqeqeq': ['error', 'always', {'null': 'ignore'}],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never'],
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-inferrable-types': 'off'
  }
};
