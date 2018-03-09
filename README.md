# koa2-books-admin
koa2 入门项目 - 书籍管理

### 基于koa2书籍管理系统简单演示
依赖 node v7.6.0 或更高版本、MySql环境

### 目录结构

```bash
├── /server/                    # 项目后端代码
│ ├── /controller/              # 控制器目录
│ │ ├── api                     # restful 接口目录
│ │ | ├── books.js              # books restful接口
│ │ | └── user.js               # user restful接口
│ │ |── books.js                # books 渲染接口
│ │ └── user.js                 # user 渲染接口
│ ├── /initdb/                  # 初始化DB目录
│ │ ├── sql                     # sql文件目录
│ │ | ├── books.sql    
│ │ | └── user_info.sql    
│ │ ├── util                    # 初始化DB公共方法
│ │ | ├── db.js    
│ │ | └── getSqlContentMap.js 
│ │ ├── index.js
│ ├── /middleware/              # koa中间件
│ │ ├── index.js    
│ │ ├── loginStatus.js          # 登录状态判断
│ │ └── resDataFormat.js        # 接口返回json函数的封装
│ ├── /models/                  # 接口与数据库交互的函数
│ │ |── books.js               
│ │ └── user.js                 
│ ├── /router/                  # 路由
│ │ └── index.js    
│ ├── /service/                 # 服务
│ │ |── page.js                 # 分页
│ │ |── upload.js               # 上传
│ │ └── user.js    
│ ├── /util/                    # 工具类
│ │ └── db.js   
│ ├── /view/                    # 模板文件目录
│ ├── app.js                    # 入口文件
│ └── config.js                 # 配置项文件    
├── /static/                    # 静态资源目录
├── package.json                # 项目信息
└── gulpfile.js                 # gulp配置
```
### 安装

``` bash
# 安装依赖包
npm install

# 初始化MySql books库的表
npm run init

# 启动环境 http://localhost:8080
npm start

```
### 技术栈
  koa2-books-admin demo项目，依赖koa2生态开发，demo中使用了下面技术，实现了路由、koa中间件、session、文件上传、数据库增删改查、模板引擎、分页等功能
  
  - koa2
  - koa-ejs
  - koa-route
  - koa-static
  - koa-bodyparser
  - koa-logger 
  - koa-session-minimal
  - mysql
  - Busboy
  ### 参考

  [koa2-note](https://chenshenhai.github.io/koa2-note/)