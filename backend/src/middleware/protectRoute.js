const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { JWT_SECRET } = require('../config/envVars')

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-health']

        if(!token){
            return res.status(401).json({ success: false, message: "Unauthorized - No token provided" })
        }

        const decoded = jwt.verify(token, JWT_SECRET)

        if(!decoded){
            return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" })
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({ success: false, message: "User not found" })
        }

        req.user = user
        next()

    } catch (error) {
        console.log("Error in protectRoute:", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = protectRoute