const express = require('express')
const protectRoute = require('../middleware/protectRoute')
const chatBot = require('../controller/chat.controller')
const router = express.Router()

router.post('/chatbot', protectRoute, chatBot)

module.exports = router 