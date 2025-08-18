const dotenv = require('dotenv')

dotenv.config()

const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    MAIL_TOKEN: process.env.MAIL_TOKEN,
    MAIL_ENDPOINT: process.env.MAIL_ENDPOINT,
}

module.exports = ENV_VARS