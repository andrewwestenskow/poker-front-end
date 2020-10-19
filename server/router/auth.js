const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/authController')

router.get('/', authCtrl.getUser)
router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)
router.delete('/logout', authCtrl.logout)

module.exports = router
