const dotenv = require('dotenv')

dotenv.config()

const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV || "development",
    MAIL_TOKEN: process.env.MAIL_TOKEN,
    MAIL_ENDPOINT: process.env.MAIL_ENDPOINT,
    OPENAI_API: process.env.OPENAI_API,
    SYSTEM_PROMPT: process.env.SYSTEM_PROMPT,
    GOOGLE_MAIL: process.env.GOOGLE_MAIL,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    ML_BASE_URL: process.env.ML_BASE_URL || 'http://127.0.0.1:5000',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
}

module.exports = ENV_VARS