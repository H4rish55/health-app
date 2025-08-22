const express = require('express')
const protectRoute = require('../middleware/protectRoute')
const authorizeRoles = require('../middleware/roleMiddleware')
const { patientRecords } = require('../controller/doctor.controller')
const router = express.Router()

router.get('/patient-records', protectRoute, authorizeRoles("doctor"), patientRecords)

module.exports = router