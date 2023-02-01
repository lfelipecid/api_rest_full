const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')


exports.loginRequired = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) return res.json('LOGIN REQUIRED')

    try {
        const { _id, email } = jwt.verify(authorization, process.env.TOKEN_SECRET)
        const user = await UserModel.findById(_id)
        if (!user) return res.json('TOKEN INVALID or EXPIRED')

        req.userId = _id
        req.userEmail = email
        return next()

    } catch (err) {
        return res.status(400).json('TOKEN INVALID or EXPIRED')
    }
}

