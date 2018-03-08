const Model = require('../models/books')
const getPage = require('../service/page')

const index = async (ctx, next) => {
    let bread = [
        {
            'name': '书籍列表'
        }
    ]
    let page = ctx.query.page || 1
    let total = await Model.queryTotal()
    let items = await Model.getList(undefined, page)
    items = items || []
    await ctx.render('books/index', {
        bread,
        items,
        pageHtml: getPage(page, total, '/books')
    })
}

const add = async (ctx, next) => {
    await ctx.render('books/add', {
        bread: [
            {
                'name': '书籍列表',
                'url': '/books'
            },
            {
                'name': '新增',
                'url': ''
            }
        ]
    })
}

const edit = async (ctx, next) => {
    let id = ctx.params.id
    let book = await Model.getById(id)
    await ctx.render('books/edit', {
        book:  book || {},
        bread: [
            {
                'name': '书籍列表',
                'url': '/books'
            },
            {
                'name': '修改',
                'url': ''
            }
        ]
    })
}

module.exports = {
    index,
    add,
    edit,
}