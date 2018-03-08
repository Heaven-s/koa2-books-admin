const Router = require('koa-router')
const config = require('../config')
const url = config.apiPath
const pathView = '../controller/'
const pathApi = '../controller/api/'
const router = new Router()

const userController = require(`${pathView}user`)
const booksController = require(`${pathView}books`)

const userControllerAPI = require(`${pathApi}user`)
const booksControllerAPI = require(`${pathApi}books`)


/**
 * view api list
 */
// 个人中心
router.get('/my', userController.my)
router.get('/my/edit', userController.myEdit)

// 用户管理
router.get('/', userController.home)
router.get('/login', userController.login)
router.get('/user', userController.index)
router.get('/user/add', userController.add)
router.get('/user/:id/edit', userController.edit)
router.get('/user/:id/detail', userController.detail)

// 书籍管理
router.get('/books', booksController.index)
router.get('/books/add', booksController.add)
router.get('/books/:id/edit', booksController.edit)


/**
 * restful api list
 */

// 用户管理
router.get(`${url}logout`, userControllerAPI.logout)
router.post(`${url}login`, userControllerAPI.login)
router.post(`${url}user/add`, userControllerAPI.add)
router.post(`${url}user/edit`, userControllerAPI.edit)
router.post(`${url}user/del`, userControllerAPI.del)
router.post(`${url}user/cat`, userControllerAPI.cat)
router.post(`${url}user/addCat`, userControllerAPI.addCat)

// 书籍管理
router.post(`${url}books/add`, booksControllerAPI.add)
router.post(`${url}books/edit`, booksControllerAPI.edit)
router.post(`${url}books/del`, booksControllerAPI.del)


module.exports = router.routes();