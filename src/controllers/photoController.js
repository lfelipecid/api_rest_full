const multer = require('multer')
const { extname, resolve } = require('path')
const { updateStudent } = require('../models/StudentsModel')
const StudentModel = require('../models/StudentsModel')
require('dotenv').config()


const random = () => Math.floor(Math.random() * 10000 + 10000)

const config = {
    // TODO: CHECK SIZE BEFORE SAVE
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new multer.MulterError('File need to be PNG or JPG'))
        }
        return cb(null, true)
    },
    // TODO: INSERT ID OVER FILENAME and DESTINATION
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', 'uploads', 'imgs'))
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${random()}${extname(file.originalname)}`)
        }
    })
}

const upload = multer(config).single('img')

class PhotoController {
    create(req, res) {
        // Save file
        upload(req, res, async (err) => {
            const { originalname, filename } = req.file
            const body = {
                originalname,
                filename,
                photoPath: `${process.env.URL}/uploads/imgs/${filename}`
            }
            const user = await StudentModel.updateStudent(req.params.id, body)
            return res.json(user)
        })
    }
}

module.exports = new PhotoController()
