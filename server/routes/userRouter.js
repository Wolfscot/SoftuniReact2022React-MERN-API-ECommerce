const router = require('express').Router()
const Users = require('../models/userModel.js')

const userController = require('../controllers/userController.js')

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.get('/refresh_token', userController.refreshToken)

router.get('/infofor',  userController.getUser)

module.exports = router