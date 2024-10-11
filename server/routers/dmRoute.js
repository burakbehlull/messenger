const express = require('express')
const router = express.Router()

const { userDmCreate, getDmMessages, getDms, showDm } = require('../controllers/dmController')

router.route('/create').post(userDmCreate)
router.route('/messages/:dmId').get(getDmMessages)
router.route('/find/:userId').get(getDms)
router.route('/show').post(showDm)

module.exports = router