const userService = require('./service')
const validation = require('./validation')
const {validationId} = require('utils/validation')
const {asyncHttpWrapper} = require('utils/error-wrappers')


module.exports.createUser = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validation.createUser(req.body)

        const response = await userService.createUser(req.body)

        res.status(201).json(response)
    }
)

module.exports.viewAllUsers = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validation.getUsers(req.query)

        const response = await userService.findAllUsers(req.query)

        res.status(200).json(response)
    }
)

module.exports.deleteUser = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    async(req, res) => {
        validationId(req.params.userId)

        await userService.deleteUser(req.params.userId)

        res.status(200).json({message: `User deleted`})
    }
)