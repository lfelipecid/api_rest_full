const route = require('express').Router()
const homeController = require('../src/controllers/homeController')
const usersController = require('./controllers/usersController')
const tokenController = require('./controllers/tokenController')
const loginRequired = require('./middlewares/tokenMiddlewares').loginRequired
const studentController = require('./controllers/studentController')
const photoController = require('./controllers/photoController')

// HOME ROUTE
route.get('/', homeController.index) // INDEX

// USERS ROUTE
route.get('/users/index', loginRequired, usersController.index) // SHOW ALL
route.post('/users/', usersController.create) // CREATE
route.get('/users/', loginRequired,usersController.show) // SHOW ONE
route.put('/users/', loginRequired,usersController.updated) // EDIT
route.delete('/users/', loginRequired,usersController.delete) // DELETE
route.post('/token/', tokenController.create) // LOGIN TOKEN

// STUDENTS
route.post('/student/', loginRequired, studentController.create) // CREATE
route.get('/student/:id', loginRequired, studentController.read) // READ
route.put('/student/:id', loginRequired, studentController.update) // UPDATE
route.delete('/student/:id', loginRequired, studentController.delete) // DELETE
route.get('/student/', loginRequired, studentController.index) // INDEX
route.post('/student/:id', loginRequired, photoController.create) // PHOTO CREATE


module.exports = route

