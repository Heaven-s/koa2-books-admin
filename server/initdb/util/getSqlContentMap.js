const fs = require('fs')

/**
 * 封装所有sql文件脚本内容
 * @return {object} 
 */
function getSqlContentMap(sqlPath, mime) {
    let sqlContentMap = {}

    let basePath = __dirname
    basePath = basePath.replace(/\\/g, '\/')
  
    let pathArr = basePath.split('\/')
    pathArr = pathArr.splice( 0, pathArr.length - 1 )
    basePath = pathArr.join('/') + '/sql/'
    
    let sqlMap = walkFile(sqlPath, mime)
    for ( let key in sqlMap ) {
        let content = fs.readFileSync(sqlMap[key], 'binary')
        sqlContentMap[key] = content
    }
    return sqlContentMap
}

/**
 * 遍历目录下的文件目录
 * @param  {string} pathResolve  需进行遍历的目录路径
 * @param  {string} mime         遍历文件的后缀名
 * @return {object}              返回遍历后的目录结果
 */
function walkFile (sqlPath, mime) {
    
    let files = fs.readdirSync(sqlPath)
    let fileList = {}
    
    for ( let [i, item] of files.entries() ) {
        let itemArr = item.split('\.')
        let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length -1] : 'undefined'
        if (mime === itemMime) {
            fileList[item] = sqlPath + item
        }
    }   
    return fileList
}

module.exports = getSqlContentMap