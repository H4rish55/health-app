const authorizeRoles = (...allowedRoles) => {
    try {
        return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(400).json({ success: false, message: "Access denied" })
        }

        next()
    }
    } catch (error) {
        console.log("Error in authorize roles:", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = authorizeRoles