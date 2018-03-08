const db = require('../util/db')
const moment = require('moment')
const USER_TB = 'user_info'

/**
 * 根据用户名和密码查找用户
 * @param  {object} options 用户名密码对象
 * @return {object|null}         查找结果
 */
const getOneByUserNameAndPassword = async (options) => {
    let _sql = `
    SELECT * from ${USER_TB}
        where password="${options.password}" and user_name="${options.user_name}"
        limit 1`
    let result = await db.query(_sql)
    if (Array.isArray(result) && result.length > 0) {
        return result[0]
    }
    return null
}

/**
 * 查找用户总数
 * @return {object|null}         查找结果
 * @param  {array} keys     用户字段
 */
const queryTotal = async (keys = ['*']) => {
    let result = await db.queryTotal(USER_TB)
    if (Array.isArray(result) && result.length > 0) {
        return result[0].count
    }
    return null
}

/**
 * 查找用户列表
 * @param  {array} keys 用户字段
 * @param  {number} page     当前页数
 * @return {object|null}         查找结果
 */
const getUserList = async (keys = ['*'], page) => {
    let result = await db.select(USER_TB, keys, page)
    if (Array.isArray(result) && result.length > 0) {
        return result
    }
    return null
}

/**
 * 查找用户信息
 * @param  {array} keys 用户字段
 * @return {object|null}         查找结果
 */
const getUserById = async (keys = ['*'], id) => {
    let result = await db.findDataById(USER_TB, id, keys)
    if (Array.isArray(result) && result.length > 0) {
        return result[0]
    }
    return null
}

  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  const getUserExist = async ( key, value ) => {
    let _sql = `
    SELECT * from ${USER_TB}
      where ${key} = "${value}"
      limit 1`
    let result = await db.query( _sql )
    if ( Array.isArray(result) && result.length > 0 ) {
        result = result[0]
    } else {
        result = null
    }
    return result
  }

/**
 * 新增用户
 * @param  {array} keys 用户字段
 * @return {object}     查找结果
 */
const insertUser = async (keys) => {
    keys.create_time = moment().format("YYYY-MM-DD HH:mm:ss")
    let result = await db.insert(USER_TB, keys)
    return result
}

/**
 * 修改用户
 * @param  {array} keys 用户字段
 * @return {object}     查找结果
 */
const updateUser = async (keys) => {
    keys.modified_time = moment().format("YYYY-MM-DD HH:mm:ss")
    let result = await db.updateData(USER_TB, keys, keys.id)
    return result
}

/**
 * 删除用户
 * @param  {array} keys 用户字段
 * @return {object}     查找结果
 */
const deleteUser = async (keys) => {
    let result = await db.deleteByIds(USER_TB, keys)
    return result
}

module.exports = {
    getOneByUserNameAndPassword,
    queryTotal,
    getUserList,
    insertUser,
    deleteUser,
    getUserById,
    getUserExist,
    updateUser,
}