const router = require('express').Router()
const categoryController = require('../controllers/categoryController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')


router.route('/category')
    .get(categoryController.getCategories)
    .post(auth, admin, categoryController.createCategory)

router.route('/category/:id')
    .delete(auth, admin, categoryController.deleteCategory)
    .put(auth, admin, categoryController.updateCategory)


module.exports = router