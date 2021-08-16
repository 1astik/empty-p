const ApplicationError = require('utils/error')
const logger = require('@logger')



module.exports.connectError = function(error, socket) {
    if (error instanceof ApplicationError.ClientError) {
        socket.emit('errors', {...error, status: error.status})
    } else if (error instanceof ApplicationError) {
        const status = ApplicationError.complianceHttpCode(error)
        socket.emit('errors', {...error, status})
        if (status >= 500) {
            logger.error(error)
        }
    } else {
        socket.emit('errors', {message: 'Connection error'})
        logger.error(error)
    }
    return socket.disconnect()
}