const router = require('express').Router()
const productController = require('../controllers/productController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')


router.route('/products')
    .get(productController.getProducts)
    .post(auth, admin, productController.createProduct)


router.route('/products/:id')
    .delete(auth, admin, productController.deleteProduct)
    .put(auth, admin, productController.updateProduct)



module.exports = router