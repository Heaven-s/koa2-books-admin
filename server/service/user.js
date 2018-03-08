
/**
 * 用户业务操作
 */


const userModel = require('../models/user')

/**
 * 登录业务操作
 * @param  {object} formData 登录表单信息
 * @return {object}          登录业务操作结果
 */
const login = async (formData) => {
    let resultData = await userModel.getOneByUserNameAndPassword({
        'user_name': formData.user_name,
        'password': formData.password
    })
    return resultData
}

module.exports = {
    login,
}