const express= require('express')
const router= express.Router()

const {
    addToCart,
    getCart,
    removeItem,
    clearCart,
    updateQuantity
}= require('../controllers/cartController')

const {protect} = require("../middleware/authMiddleware")

router.post('/add',protect,addToCart)
router.get('/',protect,getCart)
router.delete('/remove/:foodId',protect,removeItem)
router.delete('/clear',protect,clearCart)
router.put('/update',protect,updateQuantity)

module.exports =router