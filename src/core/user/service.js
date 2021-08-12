const userRepository = require('./repository')
const bcrypt = require('bcrypt')
const config = require('@config')
const {EntityExists, Forbidden} = require('utils/error')
const {checkErrorUniqueKey} = require('utils/error-helpers')


async function createUser(user) {
    user.password = await bcrypt.hash(user.password, 10)

    user = await userRepository
        .saveUser(user)
        .catch(err => checkErrorUniqueKey(err, 'User with this email already exists'))

    delete user.password
    delete user.updatedAt

    return user
}

async function findAllUsers({page = 1, limit = 10, isAdmin}) {
    const options = {
        skip: (page - 1) * limit,
        limit,
        find: {}
    }

    if (typeof isAdmin === 'boolean') {
        options.find.isAdmin = isAdmin
        if (isAdmin) {
            options.find.email = {$ne: config.superadmin.email}
        }
    }

    const [users, total] = await Promise.all([
        userRepository.findUsers(options),
        userRepository.countUsers(options)
    ])

    return {users, total, pageCount: Math.ceil(total / limit)}
}

async function deleteUser(userId) {
    if (userId === config.superadmin.id)
        throw new Forbidden('Cannot delete this user')

    const deletedUser = await userRepository.deleteUser(userId)

    if (!deletedUser) {
        throw new EntityExists('User not found')
    }
}



module.exports = {
    createUser,
    findAllUsers,
    deleteUser
}
