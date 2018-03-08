const config = require('../config.js')
const { row, pageNumber, tagName } = config.page

module.exports = (page = 1, total = 0, url) => {
    if (total <= row) {
        return ''
    }
    page = parseFloat(page)
    url = url + '?page='
    const html = ['<ul class="pagination">']
    const pageContent = [] // 显示的页码
    const pageSum = Math.ceil(total / row)
    const sum = pageSum > pageNumber ? pageNumber : pageSum

    if (page <= Math.ceil(pageNumber / 2)) {
        for (let i = 1; i <= sum; i++) {
            pageContent.push(i)
        }
    } else if (page >= pageSum - Math.ceil(pageNumber / 2)) {
        for (let i = 0; i < sum; i++) {
            pageContent.push(pageSum - i)
        }
        pageContent.reverse()
    } else {
        for (let i = 0; i < sum; i++) {
            pageContent.push(page - parseInt(pageNumber / 2) + i)
        }
    }

    // 上一页
    if (page > 1) {
        html.push(`<li><a href="${url + (page - 1)}"><span><span aria-hidden="true">${tagName[0]}</span></span></a></li>`)
    }

    // 首页
    if (pageSum > pageNumber && (page > Math.ceil(pageNumber / 2) + 1)) {
        html.push(`<li><a href="${url + 1}">1</a></li><li><span>...</span></li>`)
    }

    // 页码
    for (let i = 0, l = pageContent.length; i < l; i++) {
        let cur = pageContent[i]
        html.push(`<li class="${(cur == page ? 'active' : '')}"><a href="${url + cur}">${cur}</a></li>`)
    }

    //尾页
    if (pageSum > pageNumber && (pageSum - page) > Math.ceil(pageNumber / 2)) {
        html.push(`<li><span>...</span></li><li><a href="${url + pageSum}">${pageSum}</a></li>`)
    }

    // 下一页
    if (page < pageSum) {
        html.push(`<li><a href="${url + (page + 1)}"><span><span aria-hidden="true">${tagName[1]}</span></span></a></li>`)
    }

    html.push('</ul>')
    return html.join('')
}