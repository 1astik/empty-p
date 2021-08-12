const {Schema, model} = require('mongoose')


const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'E-mail is required']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false
        },
        isAdmin: {
            type: Boolean,
            required: [true, 'Type is required'],
            default: false
        },
        updatedAt: {
            type: Date,
            select: false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)


UserSchema.index({email: 1}, {unique: true})
UserSchema.index({isAdmin: 1})


module.exports = model('User', UserSchema, 'users')


