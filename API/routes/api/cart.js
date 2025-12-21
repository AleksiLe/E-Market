const express = require('express');
const path = require('path');
const router = express.Router();
const { validateToken } = require("../../auth/validateToken");

// get /api/cart/getCartItems
router.get('/getCartItems', validateToken, (req, res) => {
    const cartItems = req.user.cart || {};
    res.json({
        success: true,
        cartItems: Array.from(cartItems.entries()).map(([productId, quantity]) => ({
            productId,
            quantity
        }))
    });
});

// post /api/cart/updateCart
router.post('/updateCart', validateToken, async (req, res) => {
    const { productId, quantity } = req.body;
    console.log("Received updateCart request:", { productId, quantity });
    if (!productId || typeof quantity !== 'number') {
        return res.status(400).json({ success: false, message: 'Invalid input' });
    }
    try {
        if (quantity > 0) {
            req.user.cart.set(productId, quantity);
        } else {
            req.user.cart.delete(productId);
        }
        await req.user.save();
        return res.json({ success: true });
    } catch (error) {
        console.error(`Error updating cart: ${error}`);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;