const express = require('express')
const router = express.Router()

const { register, login } = require('../controllers/authController')

router.route('/create').post(register)
router.route('/find').post(login)

module.exports = router