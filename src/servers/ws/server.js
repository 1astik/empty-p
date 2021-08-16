const http = require('http')
const socketio = require('socket.io')
const connect = require('./modules/connect')
const security = require('helpers/security')
const userEvents = require('core/user/events')
const {connectError} = require('./error')
const logger = require('@logger')


module.exports = function() {

    const server = http.createServer()

    const io = socketio(server, {
        path: '/ws',
    })

    io.on('connection', /** @param {socketio.Socket} socket */ async function(socket) {
        try {

            socket.user = await security.authorizationWs(socket.handshake.headers['authorization'])

            connect(socket)

            socket.emit('connection')

            socket.on('ping', () => socket.emit('pong'))
        } catch(error) {
            return connectError(error, socket)
        }
    })

    userEvents
        .onUpdateUserBalance(
            {
                handler: async (userId) => io.to(String(userId)).emit('create-user'),
                onError: (error) => logger.error(error)
            }
        )

    return server
}