const mongose = require('mongoose')
const bcryptjs = require('bcryptjs')

const UserSchema = new mongose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, require: true },
    email: { type: String, required: true },
    celphone: { type: String, required: false, default: '' },
    password: { type: String, required: true },
    pathPhoto: { type: String, required: false, default: '' },
    createOn: { type: Date, default: Date.now }
})

const UserModel = mongose.model('User', UserSchema)

class User {
    constructor(body) {
        this.body = body
        this.erros = []
        this.user = null
    }

    cleanBody() {
        this.cleanField()
        if (!this.body.firstName) this.erros.push('First name is empty')
        if (!this.body.lastName) this.erros.push('Last name is empty')
        if (!this.body.age) this.erros.push('Age name is empty')
        if (!this.body.gender) this.erros.push('Gender is empty')
        if (!this.body.email) this.erros.push('Email is empty')
        if (!this.body.password) this.erros.push('Password is empty')
    }

    cleanField() {
        this.body = {
            firstName: this.body.firstName,
            lastName: this.body.lastName,
            age: this.body.age,
            gender: this.body.gender,
            email: this.body.email,
            password: this.body.password
        }
    }

    async checkUser() {
        this.user = await UserModel.findOne({ email: this.body.email })
        if (this.user) this.erros.push('E-mail already in use.')
    }

    // CREATE
    async create() {
        this.cleanBody()
        if (this.erros.length > 0) return
        await this.checkUser()
        if (this.erros.length > 0) return

        // Bcrypt HASH PASSWORD
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        this.user = await UserModel.create(this.body)
    }
    // SHOW ALL (REMOVE LATER)
    async index() {
        const user = await UserModel.find().sort({ createOn: -1 })
        return user
    }
    // SHOW (FIND ONE)
    async show(id) {
        try {
            const query = await UserModel.findById(id)
            return query
        } catch (err) {
            return false
        }
    }
    // EDIT
    async updated(id) {
        // if (typeof id !== 'string') return
        // this.cleanBody()
        // if (this.erros.length > 0) return this.erros
        // this.user = await UserModel.findByIdAndUpdate(id, this.body, { new: true })

        

    }
}

module.exports = User

