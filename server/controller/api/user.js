const userService = require('../../service/user')
const userModel = require('../../models/user')
const fs = require('fs')
const path = require('path')
const db = require('../../util/db')

const logout = async (ctx) => {
    ctx.session = null
    ctx.json({message: '退出成功'})
}

const login = async (ctx) => {
    let formData = ctx.request.body
    let result = {}
    let userResult = await userService.login(formData)
    if (userResult) {
        if (formData.user_name === userResult.user_name) {
            result.code = 200
            result.message = '登录成功'
        } else {
            result.code = 404
            result.message = '用户名或登录密码错误'
        }
    } else {
        result.code = 404
        result.message = '用户名或登录密码错误'
    }
    if (result.code === 200) {
        let session = {}
        session.isLogin = true
        session.userInfo = userResult
        ctx.session = session
    }
    ctx.json(result)
}

const add = async (ctx) => {
    let formData = ctx.request.body
    let result = {}
    if (!formData.user_name || !formData.password) {
        result.code = 401
        result.message = '参数错误'
        ctx.json(result)
        return
    }
    let existOne = await userModel.getUserExist('user_name', formData.user_name)
    
    if ( existOne && existOne.user_name === formData.user_name ) {
        result.code = 401
        result.message = '用户名已存在'
        ctx.json(result)
        return
    }

    let userResult = await userModel.insertUser(formData)
    if ( userResult && userResult.insertId * 1 > 0) {
        result.data = userResult.insertId
        result.message = '新增成功'
    } else {
        result.code = 402
    }
    ctx.json(result)
}

const edit = async (ctx) => {
    let formData = ctx.request.body
    let result = {}
    if (!formData.user_name) {
        result.code = 401
        result.message = '参数错误'
        ctx.json(result)
        return
    }

    let existOne = await userModel.getUserExist('user_name', formData.user_name)
    if ( existOne && existOne.user_name === formData.user_name && existOne.id != formData.id) {
        result.code = 401
        result.message = '用户名已存在'
        ctx.json(result)
        return
    }

    formData.password = formData.password || existOne.password
    if (formData.is_info == '1') {
        delete formData.is_info
        ctx.session.userInfo = formData
    }
    delete formData.is_info
    let userResult = await userModel.updateUser(formData)
    if (userResult && userResult.affectedRows * 1 > 0) {
        result.message = '修改成功'
    } else {
        result.code = 402
    }
    ctx.json(result)
}

const del = async (ctx) => {
    let formData = ctx.request.body
    let result = {}
    let usersResult = await userModel.deleteUser(formData.ids)
    if (usersResult) {
        if (usersResult.affectedRows && usersResult.affectedRows > 0) {
            result.message = '删除成功'
        } else {
            result.code = 404
            result.message = usersResult.message || '数据不存在'
        }
    } else {
        result.code = 401
        result.message = '删除失败'
    } 
    ctx.json(result)
}

const cat = async (ctx) => {
    let file = path.join(__dirname, '../../../static/json/moveDataList.json')
    let result = {}
    let data = fs.readFileSync(file, 'utf8');
    result.message = '修改成功'
    result.data = JSON.parse(data)
    ctx.json(result)
}

const addCat = async (ctx) => {
    let formData = ctx.request.body
    let result = {}
    let carResult = await db.insert('car', formData)
    console.log(`${carResult.insertId} - ${new Date()}`)
    if ( carResult && carResult.insertId * 1 > 0) {
        result.data = carResult.insertId
        result.message = '新增成功'
    } else {
        console.log('++++++ error ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        result.code = 402
    }
    ctx.json(result)
}

module.exports = {
    logout,
    login,
    add,
    del,
    edit,
    cat,
    addCat,
}