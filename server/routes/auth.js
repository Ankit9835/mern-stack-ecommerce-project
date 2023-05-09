const express = require('express')
const router = express.Router()
const {createUser, currentUser, addToCart, getCart, emptyCart, saveAddress, applyCoupon} = require('../controllers/user')
const { authCheck,adminCheck } = require('../middlewares/auth')

router.post('/create-or-update-user', authCheck, createUser)
router.post('/current-user', authCheck, currentUser)
router.post('/current-admin', adminCheck, currentUser)
router.post('/add-cart', authCheck, addToCart)
router.get('/get-cart-data', authCheck, getCart)
router.get('/empty-cart', authCheck, emptyCart)
router.post('/save-address', authCheck, saveAddress)
router.post('/apply-coupon', authCheck, applyCoupon)

module.exports = router