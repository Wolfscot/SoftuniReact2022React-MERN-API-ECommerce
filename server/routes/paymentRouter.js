const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')


router.route('/payment')
    .get(auth, admin, paymentController.getPayments)
    .post(auth, paymentController.createPayment)


module.exports = router