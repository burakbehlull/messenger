const express = require('express')
const router = express.Router()

const { messageCreate } = require('../controllers/messageController')

router.route('/').post(messageCreate)

module.exports = router