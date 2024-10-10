const express = require('express')
const router = express.Router()

const { userDmCreate, getDmMessages } = require('../controllers/dmController')

router.route('/create').post(userDmCreate)
router.route('/messages/:dmId').get(getDmMessages)

module.exports = router