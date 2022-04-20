const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const productController = require('../controllers/productController')
const scanController = require('../controllers/scanController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const { route } = require('express/lib/application')


// router.route('/products')
//     .get(productCtrl.getProducts)
//     .post(auth, authAdmin, productCtrl.createProduct)


// router.route('/products/:id')
//     .delete(auth, authAdmin, productCtrl.deleteProduct)
//     .put(auth, authAdmin, productCtrl.updateProduct)


router.route('/products')
    // .get()
    .post(auth,authAdmin, productController.createProduct)
    .put(auth,authAdmin,productController.updateProduct)
    .delete(auth,authAdmin,productController.deleteProduct)



router.route('/scan')
    .post(scanController.findProduct)
module.exports = router
