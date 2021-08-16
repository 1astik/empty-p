const authService = require('core/auth')
const {asyncHttpWrapper} = require('utils/error-wrappers')
const ApplicationError = require('utils/error')


module.exports.authorization = asyncHttpWrapper(
    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {Function} next
     */
    async (req, _, next) => {
        req.user = await authService.authorization(req.headers['authorization'])

        next()
    }
)

module.exports.isAdmin =
    /**
     * @param {import('express').Request & {user: {isAdmin: Boolean}}} req
     * @param {import('express').Response} res
     * @param {Function} next
     */
    async (req, res, next) => {
        if (req.user.isAdmin) {
            next()
        } else {
            next(new ApplicationError.Forbidden('Forbidden', 12))
        }
    }

module.exports.authorizationWs = bearerToken => authService.authorization(bearerToken)