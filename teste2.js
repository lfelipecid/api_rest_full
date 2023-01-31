const { MongoClient } = require('mongodb')
require('dotenv').config()

const client = new MongoClient(process.env.MONGO_HOST)

async function mongoDriver() {
    try {
        const database = client.db('api_rest')
        const usersModel = database.collection('users')

        const users = await usersModel.find().toArray()
        console.log(users)

    } finally {
        await client.close()
    }
}

