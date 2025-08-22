const express = require('express')
const stroke = require('../controller/stroke.controller')
const protectRoute = require('../middleware/protectRoute')
const diabetes = require('../controller/diabetes.controller')
const heart = require('../controller/heart.controller')
const authorizeRoles = require('../middleware/roleMiddleware')
const router = express.Router()

router.post('/stroke', protectRoute, authorizeRoles("doctor", "user"), stroke)
router.post('/diabetes', protectRoute, authorizeRoles("doctor", "user"), diabetes)
router.post('/heart', protectRoute, authorizeRoles("doctor", "user"), heart)

module.exports = router