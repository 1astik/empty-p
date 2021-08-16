const {EventEmitter} = require('events')
const {asyncEventsWrapper} = require('utils/error-wrappers')


class UserEvents extends EventEmitter {
    constructor() {
        super()
    }

    updateUserBalance(userId) {
        this.emit('create-user', userId)
    }

    onUpdateUserBalance({handler, onError}) {
        this.on('create-user', asyncEventsWrapper(handler, onError))
        return this
    }
}


module.exports = new UserEvents()