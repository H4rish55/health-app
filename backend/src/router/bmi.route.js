const express = require('express')
const protectRoute = require('../middleware/protectRoute')
const { bmiKgs, bmiPounds } = require('../controller/bmi.controller')
const router = express.Router()

router.post('/pounds', protectRoute, bmiPounds)
router.post('/kgs', protectRoute, bmiKgs)

module.exports = router