const express = require('express')
const router = express.Router()

const { userDmCreate } = require('../controllers/dmController')

router.route('/').post(userDmCreate)

module.exports = router