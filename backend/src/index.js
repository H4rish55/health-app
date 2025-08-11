const express = require('express')
const cookieParser = require('cookie-parser')

const authRoutes = require('./router/auth.route')
const strokeRoutes = require('./router/predict.route')

const ENV_VARS = require('../src/config/envVars')
const connectDB = require('../src/config/db')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/predict', strokeRoutes)

const PORT = ENV_VARS.PORT

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
    connectDB()
})
