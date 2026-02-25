const express = require('express');
const path = require('path');
const router = express.Router();
const { validateToken } = require("../../auth/validateToken");
const Cart = require("../../config/dbModels/cart")

// get /api/cart/getCartItems
router.get('/getCartItems', validateToken, (req, res) => {
    const cartItems = req.user.cart || {};
    res.json({
        success: true,
        cartItems: Object.entries(cartItems).map(([productId, quantity]) => ({
            productId,
            quantity
        }))
    });
});

// post /api/cart/updateCart
router.post('/updateCart', validateToken, async (req, res) => {
    // cart is json { productID: amount, ... }
    console.log(req.body)
    const items = req.body;

    if (!items || typeof items !== 'object' || Array.isArray(items)) {
        return res.status(400).json({ success: false, message: 'Invalid cart format' });
    }

    try {
        let cart;
        if (!req.user.cart) {
            cart = new Cart();
            await cart.save();
            req.user.cart = cart._id;
            await req.user.save();
        } else {
            cart = await Cart.findById(req.user.cart);
        }

        cart.items = new Map(
            Object.entries(items).filter(([_, quantity]) => typeof quantity === 'number' && quantity > 0)
        );

        await cart.save();
        return res.json({ success: true, cart: Object.fromEntries(cart.items) });

    } catch (error) {
        console.error(`Error updating cart for user ${req.user._id}:`, error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;