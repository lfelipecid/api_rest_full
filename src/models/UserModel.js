const { MongoClient, ObjectId } = require('mongodb')
const bcryptjs = require('bcryptjs')
require('dotenv').config()

class UserModel {
    constructor() {
        this.client = new MongoClient(process.env.MONGO_HOST)
        this.database = this.client.db('api_rest')
        this.userModel = this.database.collection('users')
    }

    async find() {
        const user = this.userModel.find().toArray()
        return user
    }

    async findById(id) {
        if (id.length != 24) return false
        const n_id = new ObjectId(id)
        const user = await this.userModel.find({ _id: n_id }).toArray()
        return user[0]
    }

    async mailExist(mail) {
        const email = await this.userModel.findOne({ email: mail })
        if (email) return 'E-mail already in use'
    }

    async validBody(body) {
        // VALIDATION
        const erros = []
        // First Name
        if (!body.firstName) erros.push('First Name is empty')
        if (body.firstName) {
            const fS = body.firstName
            const lenFS = fS.length
            if (lenFS < 3) erros.push('First Name is too short')
        }
        // Last Name
        if (!body.lastName) erros.push('Last Name is empty')
        if (body.lastName) {
            const lS = body.lastName
            const lenLS = lS.length
            if (lenLS < 3) erros.push('Last Name is too short')
        }
        // Age
        if (!body.age) erros.push('Age is empty')
        // Gender
        if (!body.gender) erros.push('Gender is empty')
        // Mail
        if (!body.email) erros.push('E-mail is empty')
        const mail = await this.mailExist(body.email)
        if (mail) erros.push(mail)
        // Celphone
        if (!body.cellphone) body.cellphone = ''
        // Password
        if (!body.password) erros.push('Password is empty')
        if (!body.repassword) erros.push('Repeat password is empty')
        if (body.password) {
            const pwd = body.password
            const lenPwd = pwd.length
            if (lenPwd < 4) erros.push('Password need to have more then 3 elemts')
        }
        if (body.password !== body.repassword) erros.push('Password difrent')
        delete body.repassword
        // PathPhoto
        if (!body.pathPhoto) body.pathPhoto = ''
        body.createOn = new Date()

        if (erros.length > 0) return erros
        return false
    }

    async createUser(body) {
        const vlBd = await this.validBody(body)
        if (Array.isArray(vlBd)) return vlBd
        if (!vlBd) {
            // Bcryptjs
            const salt = bcryptjs.genSaltSync()
            body.password = bcryptjs.hashSync(body.password, salt)
            await this.userModel.insertOne(body)
            return body
        }
    }

    async updateUser(id, body) {
        const user = await this.findById(id)
        
        
    }

}

module.exports = new UserModel()
