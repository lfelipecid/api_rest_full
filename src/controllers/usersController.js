const { userModel } = require('../models/UserModel')
const UserModel = require('../models/UserModel')

class UsersController {

    // INDEX
    async index(req, res) {
        const allUsers = await UserModel.find()
        return res.json(allUsers)
    }
    // SHOW ONE
    async show(req, res) {
        const user = await UserModel.findById(req.params.id)
        if (!user) return res.json('INVALID USER')
        return res.json(user)
    }
    // CERATE
    async create(req, res) {
        const user = await UserModel.createUser(req.body)
        return res.json(user)
    }
    // UPDATED  
    async updated(req, res) {
        await UserModel.updateUser(req.params.id)
        return res.json('TESTE')
    }
    // DELETE
    async delete(req, res) {
        return res.json('DELETE STUDEND')
    }
}

module.exports = new UsersController()      