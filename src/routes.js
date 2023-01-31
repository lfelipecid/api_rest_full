const route = require('express').Router()
const homeController = require('../src/controllers/homeController')
const usersController = require('./controllers/usersController')

// INDEX ROUTE
route.get('/', homeController.index) // Home

// USERS ROUTE
route.get('/users/', usersController.index) // SHOW ALL
route.post('/users/', usersController.create) // CREATE
route.get('/users/:id', usersController.show) // SHOW ONE
route.put('/users/:id', usersController.updated) // EDIT

module.exports = route

