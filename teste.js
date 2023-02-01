const { MongoClient } = require('mongodb')
require('dotenv').config()

let singleton

async function connect() {
    if (singleton) return singleton

    const client = new MongoClient(process.env.MONGO_HOST)
    await client.connect()

    singleton = client.db('API_REST')
    return singleton
}

const COLLECTION = 'Users'

async function findAll() {
    const db = await connect()
    return db.collection(COLLECTION).find().toArray()
}


async function show() {
    const user = await findAll()
    console.log(user)
}

show().catch(console.dir)

