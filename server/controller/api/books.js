const config = require('../../config')
const path = require('path')
const Model = require('../../models/books')
const { uploadFile } = require('../../service/upload')

const add = async (ctx) => {

    let result = {}
    let serverFilePath = path.join(__dirname, `../../..${config.filePath}`)
    let FileResult = await uploadFile(ctx, {
        fileType: 'pdf',
        path: serverFilePath
    })
    
    let { success, formData } = FileResult

    if (!success) {
        result.code = 401
        result.message = '文件上失败'
        ctx.json(result)
        return
    }

    if (formData.url === undefined || formData.url === 'undefined') {
        result.code = 401
        result.message = '请上传文件'
        ctx.json(result)
        return
    }
    
    if (!formData.title) {
        result.code = 402
        result.message = '书名不能为空'
        ctx.json(result)
        return
    }

    if (!formData.author) {
        result.code = 402
        result.message = '作者不能为空'
        ctx.json(result)
        return
    }

    let userResult = await Model.insertData(formData)
    if ( userResult && userResult.insertId * 1 > 0) {
        result.data = {
            id: userResult.insertId
        }
        result.message = '新增成功'
    } else {
        result.code = 402
        result.message = '新增失败'
    }
    ctx.json(result)
}

const edit = async (ctx) => {

    let result = {}
    let serverFilePath = path.join(__dirname, `../../..${config.filePath}`)
    let FileResult = await uploadFile(ctx, {
        fileType: 'pdf',
        path: serverFilePath
    })
    
    let { success, formData } = FileResult

    if (!success) {
        result.code = 401
        result.message = '文件上失败'
        ctx.json(result)
        return
    }

    if (formData.url === undefined || formData.url === 'undefined') {
        delete formData.url
    }
    
    if (!formData.title) {
        result.code = 402
        result.message = '书名不能为空'
        ctx.json(result)
        return
    }

    if (!formData.author) {
        result.code = 402
        result.message = '作者不能为空'
        ctx.json(result)
        return
    }
    
    let bookResult = await Model.updateData(formData)
    if ( bookResult && bookResult.affectedRows * 1 > 0) {
        result.message = '修改成功'
    } else {
        result.code = 402
        result.message = '修改失败'
    }
    ctx.json(result)
}

const del = async (ctx) => {
    let formData = ctx.request.body
    let result = {}
    let bookResult = await Model.deleteData(formData.ids)
    if (bookResult) {
        if (bookResult.affectedRows && bookResult.affectedRows > 0) {
            result.message = '删除成功'
        } else {
            result.code = 404
            result.message = bookResult.message || '数据不存在'
        }
    } else {
        result.code = 401
        result.message = '删除失败'
    } 
    ctx.json(result)
}

module.exports = {
    add,
    del,
    edit,
}