const { MongoClient } = require('mongodb')
require('dotenv').config()

const client = new MongoClient(process.env.MONGO_HOST)

async function mongoDriver() {
    try {
        const database = client.db('api_rest')
        const usersModel = database.collection('users')

        return usersModel

    } finally {
        await client.close()
    }
}

