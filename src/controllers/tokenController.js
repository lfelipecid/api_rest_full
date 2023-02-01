const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const bcryptjs = require('bcryptjs')
require('dotenv').config()

class TokenController {

    async create(req, res) {
        const { email = '', password = '' } = req.body
        if(!email || !password) return res.json('Login or Password are empty')

        const user = await UserModel.findByEmail(email)
        if(!user) return res.json('User dosent exist')

        // TODO: CHECK SECURITY
        const validPwd = bcryptjs.compareSync(password, user.password)
        if(!validPwd) return res.json('Login or Password invalid')

        const {_id} = user
        const token = jwt.sign({_id, email}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_DATE})
        
        return res.json(token)
    }

}

module.exports = new TokenController()