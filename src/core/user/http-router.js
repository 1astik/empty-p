const {createUser, viewAllUsers, deleteUser} = require('./http-controller')
const parse = require('helpers/parse')
const security = require('helpers/security')


/**
 * @param {import('express').Router} express
 */
module.exports = function (express) {
    const router = express.Router()

    router.post('/admin/user', security.authorization, security.isAdmin,  parse.json, createUser)

    router.get('/admin/users', security.authorization, security.isAdmin, viewAllUsers)

    router.delete('/admin/user/:userId', security.authorization, security.isAdmin, deleteUser)

    return router
}
