const db = require('../util/db')
const moment = require('moment')
const BOOK_TB = 'books'

/**
 * 查找用户总数
 * @return {object|null}         查找结果
 * @param  {array} keys     用户字段
 */
const queryTotal = async (keys = ['*']) => {
    let result = await db.queryTotal(BOOK_TB)
    if (Array.isArray(result) && result.length > 0) {
        return result[0].count
    }
    return null
}

/**
 * 查找列表
 * @param  {array} keys     用户字段
 * @param  {number} page     当前页数
 * @return {object|null}    查找结果
 */
const getList = async (keys = ['*'], page) => {
    let result = await db.select(BOOK_TB, keys, page)
    if (Array.isArray(result) && result.length > 0) {
        return result
    }
    return null
}

/**
 * 查找id数据
 * @param  {array} keys     用户字段
 * @param  {int} id         id
 * @return {object|null}    查找结果
 */
const getById = async (id, keys = ['*']) => {
    let result = await db.findDataById(BOOK_TB, id, keys)
    if (Array.isArray(result) && result.length > 0) {
        return result[0]
    }
    return null
}

/**
 * 查找一个存在的数据
 * @param  {string} key       
 * @param  {string} value       
 * @return {object|null}      查找结果
 */
  const getExist = async ( key, value ) => {
    let _sql = `
    SELECT * from ${BOOK_TB}
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
 * 新增数据
 * @param  {array} keys 用户字段
 * @return {object}     查找结果
 */
const insertData = async (keys) => {
    keys.create_time = moment().format("YYYY-MM-DD HH:mm:ss")
    let result = await db.insert(BOOK_TB, keys)
    return result
}

/**
 * 修改用户
 * @param  {array} keys 用户字段
 * @return {object}     查找结果
 */
const updateData = async (keys) => {
    keys.modified_time = moment().format("YYYY-MM-DD HH:mm:ss")
    let result = await db.updateData(BOOK_TB, keys, keys.id)
    return result
}

/**
 * 删除用户
 * @param  {array} keys 字段
 * @return {object}     查找结果
 */
const deleteData = async (keys) => {
    let result = await db.deleteByIds(BOOK_TB, keys)
    return result
}

module.exports = {
    queryTotal,
    getList,
    getById,
    getExist,
    insertData,
    updateData,
    deleteData,
}