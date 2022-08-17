const router = require('express').Router()
const Users = require('../models/userModel.js')

const userController = require('../controllers/userController.js')

router.post('/register', userController.register)




module.exports = router