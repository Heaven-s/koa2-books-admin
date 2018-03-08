const mysql = require('mysql')
const allConfig = require('../config')
const config = allConfig.database

const pool = mysql.createPool({
    host:       config.HOST,
    user:       config.USERNAME,
    password:   config.PASSWORD,
    database:   config.DATABASE
})

const query = async (sql, values) => {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(( err, connection ) => {
            if ( err ) {
                console.log('mysql 连接失败')
                resolve( err )
            } else {
                connection.query(sql, values, ( err, rows )  => {
                    if ( err ) {
                        reject( err ) 
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
}

let insert = function( table, values ) {
    let _sql = "INSERT INTO ?? SET ?"
    return query( _sql, [ table, values ] )
}

let deleteByIds = function( table, values ) {
    let _sql = `DELETE FROM ?? WHERE id in (${values})`
    return query( _sql, [ table ] )
}

let findDataById = function( table, id, keys = '*' ) {
    let  _sql =  "SELECT ?? FROM ?? WHERE id = ? "
    return query( _sql, [ keys, table, id ] )
}

let updateData = function( table, values, id ) {
    let _sql = "UPDATE ?? SET ? WHERE id = ?"
    return query( _sql, [ table, values, id ] )
}

let queryTotal = function( table ) {
    let _sql = `select count(*)  AS count from ${table}`
    return query( _sql )
}

let select = function( table, keys, page = 1, limit = allConfig.page.row) {
    let  _sql =  `SELECT ?? FROM ?? LIMIT ${(page - 1) * limit + ',' + limit}`
    return query( _sql, [ keys, table ] )
}

module.exports = {
    query,
    queryTotal,
    select,
    insert,
    deleteByIds,
    findDataById,
    updateData,
}