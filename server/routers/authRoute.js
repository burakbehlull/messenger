const express = require('express')
const router = express.Router()

const { register, login, userVerify, userIsOnline } = require('../controllers/authController')

router.route('/create').post(register)
router.route('/find').post(login)
router.route('/verify').post(userVerify)
router.route('/status').post(userIsOnline)

module.exports = router