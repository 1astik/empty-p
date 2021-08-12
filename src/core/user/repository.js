const User = require('./User')
const {ObjectId} = require('mongoose').Types


const saveUser = userData => new User(userData)
    .save()
    .then(user => user.toJSON())


const findUsers = options => User
    .find(options.find)
    .skip(options.skip)
    .limit(options.limit)
    .lean()


const countUsers = options => User
    .countDocuments(options.find)


const deleteUser = userId => User
    .findByIdAndDelete({_id: ObjectId(userId)})
    .select({_id: 1, customerId: 1})
    .lean()


const findUserByEmail = email => User
    .findOne({email})
    .select('+password')
    .lean()


const updateUser = (userId, update) => User
    .updateOne({_id: ObjectId(userId)}, update)


const findUserById = userId => User
    .findById(userId)
    .lean()


module.exports = {
    saveUser,
    findUsers,
    deleteUser,
    findUserByEmail,
    updateUser,
    findUserById,
    countUsers
}
