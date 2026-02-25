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

        if (!cart.items || cart.items.size === 0) {
            await cart.deleteOne();
            req.user.cart = undefined;
            await req.user.save();

            return res.json({ success: true, message: "Empty cart deleted" });
        }

        await cart.save();
        return res.json({ success: true, cart: Object.fromEntries(cart.items) });

    } catch (error) {
        console.error(`Error updating cart for user ${req.user._id}:`, error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// delete /api/cart/deleteCart
router.delete('/deleteCart', validateToken, async (req, res) => {
    try {
        if (!req.user.cart) {
            return res.json({ success: true, message: "There was no cart on user" }); //Could log this
        }

        const cart = await Cart.findById(req.user.cart);

        if (!cart) {
            req.user.cart = undefined;
            await req.user.save();
            return res.json({ success: true, message: "Cart not found but reference cleared" }); //Could log this happening
        }

        await cart.deleteOne();

        req.user.cart = undefined;
        await req.user.save();

        return res.json({ success: true, message: "Cart deleted" });

    } catch (error) {
        console.error(`Error deleting cart for user ${req.user._id}:`, error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;