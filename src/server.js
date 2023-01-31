const express = require('express')
const routes = require('./routes')
const { MongoClient } = require('mongodb')
require('dotenv').config()


class MyApp {
    constructor() {
        this.app = express()
        this.middleware()
        this.routes()
    }

    middleware() {
        const client = new MongoClient(process.env.MONGO_HOST)
        client.connect()
            .then(() => {
                this.app.emit('ready')
            })
            .catch(e => console.log(e))
        // moongose.set('strictQuery', false)
        // moongose.connect(process.env.mongostring)
        //     .then(() => {
        //         this.app.emit('ready')
        //     })
        //     .catch(e => console.log(e))

        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    routes() {
        this.app.use(routes)
    }

    runServer() {
        const PORT = process.env.PORT
        this.app.on('ready', () => {
            this.app.listen(PORT, () => {
                console.log(`##=> Server runing: http://localhost:${PORT}`)
            })
        })

    }
}

const app = new MyApp()
app.runServer()