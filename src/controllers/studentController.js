const StudentModel = require('../models/StudentsModel')

class StudentController {
    // CREATE
    async create(req, res) {
        try {
            const student = await StudentModel.createStudent(req.body, req.userEmail)
            return res.json(student)
        } catch (err) {
            console.log(err)
            return res.status(400).json('Error on create student.')
        }
    }
    // READ
    async read(req, res) {
        try {
            const student = await StudentModel.readStudent(req.params.id)
            if (!student) return res.status(400).json('INVALID STUDENT')
            return res.json(student)
        } catch (err) {
            console.log(err)
            return res.status(400).json('#Error to load student')
        }

    }
    // UPDATE
    async update(req, res) {
        try {
            const user = await StudentModel.updateStudent(req.params.id, req.body, req.userEmail)
            if (!user) return res.json('JUST THE OWNER CAN EDIT')
            return res.json(user)
        } catch (err) {
            return res.status(400).json('#Error to update stundet')
        }
    }
    // DELETE
    async delete(req, res) {
        try {
            const user = await StudentModel.deleteStudent(req.params.id, req.userEmail)
            if (!user) return res.json('PERMISSION DENIED')
            return res.json(`USER HAS DELETED: ${req.params.id}`)
        } catch (err) {
            return res.status(400).json('#ERROR to delete student')
        }
    }
    // INDEX
    async index(req, res) {
        try {
            const users = await StudentModel.indexStudent()
            if(!users) return res.json('NO DATA')
            return res.json(users)
        } catch (err) {
            return res.status(400).json('#ERROR to load DATA')
        }
    }
}

module.exports = new StudentController()