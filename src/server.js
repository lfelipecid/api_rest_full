const express = require('express')
const routes = require('./routes')
const { MongoClient } = require('mongodb')
const { resolve } = require('path')
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

        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
        this.app.use(express.static(resolve(__dirname, 'uploads')))
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