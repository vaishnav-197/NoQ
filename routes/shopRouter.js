const router = require('express').Router()
const shopCtrl = require('../controllers/ShopController')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/authAdmin')


// Shop
router.route('/shop')
    .get(shopCtrl.shoplist) // List of Shops    
    .post(shopCtrl.createShop) // Create a Shop
    .put(shopCtrl.updateShop) // Update Shop Details
    .delete(shopCtrl.deleteShop) // Remove a Shop

// Shop Login / Logout / RefreshToken
router.post('/shop/login',shopCtrl.login)
router.get('/shop/logout',shopCtrl.logout)
router.get('/shop/refresh_token',shopCtrl.refreshToken)


// Products