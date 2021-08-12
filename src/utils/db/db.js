const mongoose = require('mongoose')
const config = require('@config')
const bcrypt = require('bcrypt')
const {ObjectId} = require('mongoose').Types
const logger = require('@logger')

async function connect(connectString = config.database.credentials.connectionString) {
    return await mongoose.connect(connectString, config.database.options)
}

async function init() {
    const timestamp = Date.now()

    const hash = await bcrypt.hash(config.superadmin.password, 10)

    await mongoose.connection.collection('users')
        .findOneAndUpdate(
            {
                _id: ObjectId(config.superadmin.id)
            },
            {
                $set: {
                    password: hash,
                    email: config.superadmin.email,
                    isAdmin: true
                },
                $setOnInsert: {
                    createdAt: timestamp,
                    updatedAt: timestamp
                }
            },
            {
                upsert: true
            }
        )

    logger.info('Assured superadmin')
}

async function finalConnection(connectString = config.database.credentials.connectionString) {
    const connection = await connect(connectString).catch((err) => {
        throw new Error(err.message)
    })

    await init()

    return connection
}


module.exports = {
    connect,
    finalConnection
}