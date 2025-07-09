const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// get server status
router.get('/', function(req,res)  {
     
    res.status(200).json({
    success: true,
    msg:"Server is Up"
  });

});

// GET /api/cart/:userId - Get user's cart
router.get('/:userId', getCart);

// POST /api/cart - Add item to cart
router.post('/', addToCart);

// PUT /api/cart - Update cart item quantity
router.put('/', updateCartItem);

// DELETE /api/cart/:userId/:productId - Remove item from cart
router.delete('/:userId/:propertyId', removeFromCart);

// DELETE /api/cart/:userId - Clear cart
router.delete('/:userId', clearCart);

module.exports = router;