require('module-alias/register')
const createHttpServer = require('./servers/http')
const createWsServer = require('./servers/ws')
const db = require('./utils/db')
const config = require('@config')
const logger = require('@logger')
const fs = require('utils/fs')

;(async function main() {
    const res = await db.finalConnection(config.database.credentials.connectionString)

    logger.info(`Connecting to the database. DB name: ${res.connection.name}. DB host: ${res.connection.host}`, 'main')

    const server = createHttpServer(fs.findFilePathsByFilename('http-router'))
    const wsServer = createWsServer()

    server.listen(config.server.HTTP.PORT, () => logger.info(`Http server has been started. Port: ${config.server.HTTP.PORT}`))
    wsServer.listen(config.server.WS.PORT, () => logger.info(`Ws server has been started. Port: ${config.server.WS.PORT}`))
})()