const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/authController')

router.get('/', authCtrl.getUser)

module.exports = router
