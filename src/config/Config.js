const path = require('path')
const object = require('utils/alg/object')



class Config {

    static from(config) {
        return new Config(config, {})
    }

    constructor(config, env) {

        this.usedEnv = []

        const envTable = {
            NODE_ENV: value => {
                config.env = value
                config.production = value === 'production'
                /**
                 * Переносим дефолтные значения для конфигурации окружения
                 */
                switch (value) {
                    case 'production':
                        object.replaceDeep(require('./production.json'), config)
                        break
                    default:
                        break
                }
            },

            TEST_DB_CONNECTION: connectionString => config.database.credentials.connectionString = connectionString,
            TEST_HTTP_PORT: port => config.server.HTTP.PORT = parseInt(port),
            TEST_JWT_SECRET: secret => config.auth.jwt.secret = secret,

            TEST_SUPERADMIN_EMAIL: email => config.superadmin.email = email,
            TEST_SUPERADMIN_PASSWORD: password => config.superadmin.password = password,
        }


        Object
            .keys(envTable)
            .forEach(key => {
                if (key in env) {
                    this.usedEnv.push(key)
                    envTable[key](env[key])
                }
            })

        Object.assign(this, config)

        this.path = {
            core: path.resolve(__dirname, '../core'),
        }
    }
}


module.exports = Config