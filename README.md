# 前端工程化
前端工程化学习、脚手架，demo,


## gulp_hello
使用gulp+babel处理js


## gulp_example
使用gulp处理js\css\html、创建服务等


## babel_app
一般项目中的babel配置， 支持转译以下功能
- [x] es6句法
- [x] es6 api
- [x] 提案句法，如do语句
- [x] 提案api
- [x] 打包多文件时es6句法帮助函数重复注入问题


## babel_lib
一般类库中的配置如何配置babel
- [x] es6句法
- [x] es6 api
- [x] 提案句法，如do语句
- [x] 提案api
- [x] 打包多文件时es6句法帮助函数重复注入问题


## rollup_js_lib
使用`rollup`构建一个类库
- [x] 支持es6 句法
- [x] 支持es6 API
- [x] 支持`cmd` `umd` `esm`


## rollup_ts_lib
使用`rollup` + `TS`构建一个类库
- [x] 支持es6 句法
- [x] 支持es6 API
- [x] 支持TS & 自动生成声明文件
- [x] 支持`cmd` `umd` `esm`
- [x] 支持排除依赖包构建

## 打包一个Vue3 UI库
- [X] 支持es6 句法
- [X] 支持es6 API
- [X] 支持TS & 自动生成声明文件
- [X] 支持cmd umd amdesm
- [X] 排除对等依赖构建（vue3 element-plus）
- [ ] scss/postcss支持

### 排除依赖包
1. 配置babel plugin  `lodash` 应该是因为lodash不是使用esm规范所以需要babel插件
2. 配置rollup.config.js 
   1. 配置input `globals: {loadsh: '_'}`
   2. 配置external `['lodash']`,

