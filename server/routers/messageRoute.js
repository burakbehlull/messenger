const express = require('express')
const router = express.Router()

const { messageCreate } = require('../controllers/messageController')

router.route('/create').post(messageCreate)

module.exports = router