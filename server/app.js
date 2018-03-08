const path = require('path')
const Koa = require('koa')
const render = require('koa-ejs')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session-minimal')

const config = require('./config')
const { resDataFormat, loginStatus } = require('./middleware')
const routers = require('./router')

const app = new Koa()

app.keys = ['keys', 'keykeys'];

// 配置服务端模板渲染引擎
render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

// 配置session中间件
app.use(session({
    key: 'session_id',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
    cookie: {                   // 与 cookie 相关的配置
        //domain: config.domain,    // 写 cookie 所在的域名
        domain: 'localhost',    // 写 cookie 所在的域名
        path: '/',              // 写 cookie 所在的路径
        maxAge: 24 * 60 * 60 * 1000, //one day in ms,
        httpOnly: true,         // 是否只用于 http 请求中获取
        overwrite: false        // 是否允许重写
    }
}))

// 配置控制台日志中间件
app.use(logger())

// 配置ctx.body解析中间件
app.use(bodyParser({
    // extendTypes: {
    //     json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
    // },
    formLimit: '50mb'
}))

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, '../static')
))

// 配置restful返回格式
app.use(resDataFormat(config.apiPath))

// 登陆状态控制
app.use(loginStatus(config.apiPath))

// 初始化路由中间件
app.use(routers)

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)