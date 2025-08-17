const express = require('express')
const stroke = require('../controller/stroke.controller')
const protectRoute = require('../middleware/protectRoute')
const diabetes = require('../controller/diabetes.controller')
const heart = require('../controller/heart.controller')
const router = express.Router()

router.post('/stroke', protectRoute, stroke)
router.post('/diabetes', protectRoute, diabetes)
router.post('/heart', protectRoute, heart)

module.exports = router