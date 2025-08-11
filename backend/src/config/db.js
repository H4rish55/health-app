const mongoose = require('mongoose')
const ENV_VARS = require('./envVars')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MongoDB connected:", conn.connection.host)
    } catch (error) {
        console.log("Error in connecting to MongoDB:", error.message)
        process.exit(1)
    }
}

module.exports = connectDB