const UserModel = require('../models/UserModel')

class UsersController {

    // INDEX
    async index(req, res) {
        const allUsers = await UserModel.find()
        return res.json(allUsers)
    }
    // SHOW ONE
    async show(req, res) {
        const user = await UserModel.findById(req.userId)
        if (!user) return res.json('INVALID USER')
        return res.json(user)
    }
    // CERATE
    async create(req, res) {
        const user = await UserModel.createUser(req.body)
        return res.json(user)
    }
    // EDIT  
    async updated(req, res) {
        try {
            const user = await UserModel.updateUser(req.userId, req.body)
            return res.json(user)
        }
        catch (err) {
            return res.status(400).json('#ERROR')
        }
    }
    // DELETE
    async delete(req, res) {
        await UserModel.deleteUSer(req.params.id)
        return res.json(`USER: ${req.params.id} has deleted`)
    }
}

module.exports = new UsersController()      