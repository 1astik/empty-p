

/**
 * @typedef CreateUserBody
 * @type {Object}
 * @property {String} email
 * @property {String} password
 * @property {Boolean} isAdmin
 */


module.exports = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            minLength: 3,
            maxLength: 50,
            emailValidator: true,
            transform: ['trim', 'toLowerCase'],
            errorMessage: {
                minLength: 'The email address cannot be shorter than three characters',
                maxLength: 'The email address cannot be longer than 50 characters',
                emailValidator: 'Invalid email address'
            }
        },
        password: {
            type: 'string',
            minLength: 8,
            maxLength: 50,
            regexp: '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/',
            errorMessage: {
                minLength: 'The password cannot be shorter than 8 characters',
                maxLength: 'The password cannot be longer than 35 characters',
                regexp: 'The password must contain at least 1 lowercase character, 1 uppercase character, and 1 digit, and must be at least 8 characters long'
            }
        },
        isAdmin: {
            type: 'boolean'
        }
    },
    additionalProperties: false,
    required: ['isAdmin', 'password', 'email'],
    errorMessage: {
        required: {
            email: 'Email is required',
            password: 'A password is required',
            isAdmin: 'Specify the user type admin/user'
        }
    }
}
