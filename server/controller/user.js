const userModel = require('../models/user')
const userService = require('../service/user')
const getPage = require('../service/page')

const login = async ctx => {
    await ctx.render('login')
}

const home = async ctx => {
    await ctx.render('home')
}

const my = async ctx => {
    await ctx.render('my')
}

const index = async (ctx, next) => {
    if (ctx.session.userInfo.level != '0') {
        await ctx.response.redirect('/books')
        return
    }
    let bread = [
        {
            'name': '用户列表'
        }
    ]
    let page = ctx.query.page || 1
    let keys = ['id', 'user_name', 'password', 'nick_name', 'create_time', 'modified_time', 'level']
    let total = await userModel.queryTotal(keys)
    let users = await userModel.getUserList(keys, page)
    users = users || []
    await ctx.render('user/index', {
        bread,
        users,
        pageHtml: getPage(page, total, '/user')
    })
}

const add = async (ctx, next) => {
    await ctx.render('user/add', {
        bread: [
            {
                'name': '用户列表',
                'url': '/user'
            },
            {
                'name': '新增',
                'url': ''
            }
        ]
    })
}

const myEdit = async (ctx, next) => {
    let user = ctx.session.userInfo || {}
    await ctx.render('user/edit', {
        user,
        bread: null
    })
}

const edit = async (ctx, next) => {
    let id = ctx.params.id
    let keys = ['id', 'user_name', 'password', 'nick_name', 'create_time', 'modified_time', 'level', 'description']
    let user = await userModel.getUserById(keys, id)
    await ctx.render('user/edit', {
        user:  user || {},
        bread: [
            {
                'name': '用户列表',
                'url': '/user'
            },
            {
                'name': '修改',
                'url': ''
            }
        ]
    })
}

const detail = async (ctx, next) => {
    let id = ctx.params.id
    let keys = ['id', 'user_name', 'password', 'nick_name', 'create_time', 'modified_time', 'level', 'description']
    let user = await userModel.getUserById(keys, id)
    await ctx.render('user/detail', {
        user:  user || {},
        bread: [
            {
                'name': '用户列表',
                'url': '/user'
            },
            {
                'name': '详情',
                'url': ''
            }
        ]
    })
}

module.exports = {
    my,
    myEdit,
    login,
    home,
    index,
    add,
    edit,
    detail,
}