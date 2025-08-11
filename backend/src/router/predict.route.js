const express = require('express')
const stroke = require('../controller/stroke.controller')
const protectRoute = require('../middleware/protectRoute')
const diabetes = require('../controller/diabetes.controller')
const router = express.Router()

router.post('/stroke', protectRoute, stroke)
router.post('/diabetes', protectRoute, diabetes)

module.exports = router