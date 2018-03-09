const config = {
    
    port: 8080,

    domain: 'localhost',

    apiPath: '/api/',

    filePath: '/static',

    database: {
        DATABASE:   'books',
        USERNAME:   'root',
        PASSWORD:   'root',
        PORT:       3306,
        HOST:       'localhost'
    },

    page: { // 分页
        row: 2, // 每页显示条数
        pageNumber: 5, // 显示的页码数
        tagName: ['«', '»'], // 上一页、下一页的文字
    }
}

module.exports = config