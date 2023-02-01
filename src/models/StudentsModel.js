const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()

class StudentModel {
    constructor() {
        this.client = new MongoClient(process.env.MONGO_HOST)
        this.database = this.client.db('api_rest')
        this.studentModel = this.database.collection('students')
    }

    async studentSchema(body, userEmail) {
        const erros = []

        // First Name
        if (!body.firstName) erros.push('First name empty')
        if (body.firstName) {
            const fS = body.firstName
            const lenFs = fS.length
            if (lenFs < 3) erros.push('First name too short')
        }
        // Last Name
        if (!body.lastName) erros.push('Last name empty')
        if (body.lastName) {
            const lS = body.lastName
            const lenLs = lS.length
            if (lenLs < 3) erros.push('Last name too short')
        }
        // Mail
        if (!body.email) erros.push('E-mail is empty')
        if (body.email) {
            const mail = await this.mailExist(body.email)
            if (mail) erros.push('E-mail alreay in use.')
        }
        // Idade
        if (!body.age) erros.push('Age empty')
        // Weight
        if (!body.weight) erros.push('Weight empty')
        // Height
        if (!body.height) erros.push('Height empty')
        // PhotoPath
        body.photoPath = ''
        // CreateOn
        body.createOn = new Date()
        // CreateBy
        body.createBy = userEmail


        if (erros.length > 0) return erros
        return false

    }

    async mailExist(email) {
        const mail = await this.studentModel.findOne({ email })
        return mail
    }

    // CREATE
    async createStudent(body, userEmail) {
        const vlBd = await this.studentSchema(body, userEmail)
        if (Array.isArray(vlBd)) return vlBd
        if (!vlBd) {
            await this.studentModel.insertOne(body)
            return body
        }
    }
    // READ
    async readStudent(id) {
        if(id.length != 24) return false
        const user = await this.studentModel.findOne({_id: ObjectId(id)})
        return user
    }
    // UPDATE
    async updateStudent(id, body, userEmail) {
        const user = await this.readStudent(id)
        if(user.createBy !== userEmail) return false

        // Parse over BODY and fill USER
        Object.entries(body).forEach(e => {
            const [k, v] = e
            if(k in user) user[k] = v
        })

        // SAVE @ DB
        this.studentModel.replaceOne(
            {_id: ObjectId(id)},
            user
        )
        return user
    }
    // DELETE
    async deleteStudent(id, userEmail) {
        const user = await this.readStudent(id)
        if (user.createBy !== userEmail) return false
        await this.studentModel.deleteOne({_id: ObjectId(id)})
        return true
    }
    // INDEX
    async indexStudent(){
        const users = await this.studentModel.find().sort({createOn: -1}).toArray()
        return users
    }

}

module.exports = new StudentModel()
