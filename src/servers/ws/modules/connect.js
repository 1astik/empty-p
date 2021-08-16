

/**
 * @param {import('socket.io').Socket} socket 
 */
module.exports = function(socket) {
    socket.join(String(socket.user._id))
}