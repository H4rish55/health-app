const jwt = require('jsonwebtoken')
const { JWT_SECRET, NODE_ENV } = require('../config/envVars')

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" })

    res.cookie('jwt-health', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: NODE_ENV !== 'development'
    })

    return token
}

module.exports = generateTokenAndSetCookie